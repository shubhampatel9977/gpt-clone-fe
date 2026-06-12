import type {
	AxiosError,
	AxiosInstance,
	AxiosResponse,
	InternalAxiosRequestConfig,
} from "axios";
import axios from "axios";

const env = import.meta.env;

import { AUTH_API_ENDPOINTS, type LoginResponse } from "@apis";
import { useAuthStore } from "@store";

/** Axios instance for public APIs (no auth required) */
export const axiosPublic: AxiosInstance = axios.create({
	baseURL: env.VITE_API_BASE_URL,
});

/** Axios instance for secure APIs (token required) */
export const axiosWithAuth: AxiosInstance = axios.create({
	baseURL: env.VITE_API_BASE_URL,
});

/** Attach token from Zustand before each secure request */
axiosWithAuth.interceptors.request.use(
	(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
		const token = useAuthStore.getState().accessToken;

		config.headers = config.headers ?? {};

		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		/** Handle content type automatically */
		if (config.data && !(config.data instanceof FormData)) {
			config.headers["Content-Type"] = "application/json";
		}

		return config;
	},
	(error: AxiosError): Promise<never> => Promise.reject(error),
);

/** REFRESH CONTROL */
let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;

/** Handle token expiry: use refresh token to retry once */
axiosWithAuth.interceptors.response.use(
	(response: AxiosResponse): AxiosResponse => response,

	async (error: AxiosError): Promise<AxiosResponse | undefined> => {
		const originalRequest = error.config as InternalAxiosRequestConfig & {
			__isRetryRequest?: boolean;
		};

		const { user, refreshToken, updateToken, logout } = useAuthStore.getState();

		const status = error.response?.status;

		/** If not 401 → reject */
		if (status !== 401) {
			return Promise.reject(error);
		}

		/** Prevent infinite retry loop */
		if (originalRequest.__isRetryRequest) {
			return Promise.reject(error);
		}

		/** Missing refresh data → logout */
		if (!refreshToken || !user?.userId) {
			axiosWithAuth.post(AUTH_API_ENDPOINTS.logoutUser, {
				refreshToken: refreshToken,
			});
			logout();
			return Promise.reject(error);
		}

		originalRequest.__isRetryRequest = true;

		try {
			/** ONLY ONE REFRESH CALL */
			if (!isRefreshing) {
				isRefreshing = true;

				refreshPromise = axiosPublic
					.post<LoginResponse>(AUTH_API_ENDPOINTS.refreshToken, {
						userId: user.userId,
						refreshToken: refreshToken,
					})
					.then((res) => {
						if (res.status !== 200) {
							throw new Error("Refresh failed");
						}

						const data = res.data.data;

						/** Ensure token exists */
						if (!data?.token) {
							throw new Error("No access token received");
						}

						updateToken({
							accessToken: data.token,
							refreshToken: data.refreshToken,
						});

						return data.token;
					})
					.catch((err) => {
						/** Refresh failed → logout */
						axiosWithAuth.post(AUTH_API_ENDPOINTS.logoutUser, {
							refreshToken: refreshToken,
						});
						logout();
						throw err;
					})
					.finally(() => {
						isRefreshing = false;
					});
			}

			/** WAIT for refresh */
			if (!refreshPromise) {
				return Promise.reject(error);
			}

			const newAccessToken = await refreshPromise;

			/** RETRY ORIGINAL REQUEST */
			originalRequest.headers = originalRequest.headers ?? {};
			originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

			return axiosWithAuth(originalRequest);
		} catch (err) {
			return Promise.reject(err);
		}
	},
);
