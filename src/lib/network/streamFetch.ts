import { AUTH_API_ENDPOINTS, useAuthStore } from "@features/auth";
import { axiosPublic } from "@lib";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

let isRefreshing = false;

let refreshPromise: Promise<void> | null = null;

export const streamFetch = async (
	url: string,
	body: unknown,
	signal?: AbortSignal,
): Promise<Response> => {
	const executeRequest = () =>
		fetch(`${API_BASE_URL}${url}`, {
			method: "POST",

			credentials: "include",

			headers: {
				"Content-Type": "application/json",
			},

			body: JSON.stringify(body),

			signal,
		});

	let response = await executeRequest();

	if (response.status !== 401) {
		return response;
	}

	try {
		if (!isRefreshing) {
			isRefreshing = true;

			refreshPromise = axiosPublic
				.post(AUTH_API_ENDPOINTS.refreshToken)
				.then(() => {})
				.catch((error) => {
					useAuthStore.getState().logout();

					throw error;
				})
				.finally(() => {
					isRefreshing = false;
				});
		}

		await refreshPromise;

		response = await executeRequest();

		return response;
	} catch (error) {
		useAuthStore.getState().logout();

		throw error;
	}
};
