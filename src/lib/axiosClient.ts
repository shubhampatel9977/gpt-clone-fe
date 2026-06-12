import axios from "axios";
import type {
	AxiosError,
	AxiosResponse,
	InternalAxiosRequestConfig,
} from "axios";

import { AUTH_API_ENDPOINTS } from "@apis";
import { useAuthStore } from "@store";

const env = import.meta.env;

export const axiosPublic = axios.create({
	baseURL: env.VITE_API_BASE_URL,
	withCredentials: true,
});

export const axiosWithAuth = axios.create({
	baseURL: env.VITE_API_BASE_URL,
	withCredentials: true,
});

let isRefreshing = false;

let refreshPromise: Promise<void> | null = null;

axiosWithAuth.interceptors.response.use(
	(response: AxiosResponse) => response,

	async (error: AxiosError) => {
		const originalRequest =
			error.config as InternalAxiosRequestConfig & {
				_retry?: boolean;
			};

		const status = error.response?.status;

		if (status !== 401) {
			return Promise.reject(error);
		}

		if (originalRequest._retry) {
			return Promise.reject(error);
		}

		originalRequest._retry = true;

		try {
			if (!isRefreshing) {
				isRefreshing = true;

				refreshPromise = axiosPublic
					.post(AUTH_API_ENDPOINTS.refreshToken)
					.then(() => {})
					.catch((refreshError) => {
						useAuthStore.getState().logout();

						throw refreshError;
					})
					.finally(() => {
						isRefreshing = false;
					});
			}

			await refreshPromise;

			return axiosWithAuth(originalRequest);
		} catch (err) {
			return Promise.reject(err);
		}
	},
);
