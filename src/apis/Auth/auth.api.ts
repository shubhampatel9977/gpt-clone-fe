import type { ApiResponse } from "@apis";
import { axiosPublic, axiosWithAuth } from "@lib";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { AUTH_API_ENDPOINTS } from "./auth.endpoint";
import type {
	LoginPayload,
	LoginResponse,
	LogoutPayload,
	RegisterPayload,
	RegisterResponse,
} from "./auth.types";

/** POST Create User */
export const useUserRegister = () => {
	return useMutation({
		mutationFn: async (input: RegisterPayload): Promise<RegisterResponse> => {
			try {
				const { data } = await axiosPublic.post(
					AUTH_API_ENDPOINTS.registerUser,
					input,
				);
				return data;
			} catch (err: unknown) {
				if (axios.isAxiosError(err)) {
					throw new Error(
						err.response?.data?.message || "Failed to register user",
						{ cause: err },
					);
				}
				throw new Error("Unexpected error occurred while user register", {
					cause: err,
				});
			}
		},
	});
};

/** POST Login User */
export const useUserLogin = () => {
	return useMutation({
		mutationFn: async (input: LoginPayload): Promise<LoginResponse> => {
			try {
				const { data } = await axiosPublic.post(
					AUTH_API_ENDPOINTS.loginUser,
					input,
				);
				return data;
			} catch (err: unknown) {
				if (axios.isAxiosError(err)) {
					throw new Error(
						err.response?.data?.message || "Failed to login user",
						{ cause: err },
					);
				}
				throw new Error("Unexpected error occurred while user login", {
					cause: err,
				});
			}
		},
	});
};

/** POST user logout */
export const useUserLogOut = () => {
	return useMutation({
		mutationFn: async (input: LogoutPayload): Promise<ApiResponse> => {
			try {
				const { data } = await axiosWithAuth.post(
					AUTH_API_ENDPOINTS.logoutUser,
					input,
				);
				return data;
			} catch (err: unknown) {
				if (axios.isAxiosError(err)) {
					throw new Error(
						err.response?.data?.message || "Failed to logout user",
						{ cause: err },
					);
				}
				throw new Error("Unexpected error occurred while user logout", {
					cause: err,
				});
			}
		},
	});
};
