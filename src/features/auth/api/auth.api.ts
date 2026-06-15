import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";

import type { ApiResponse } from "@app-types/api.types";
import { axiosPublic, axiosWithAuth } from "@lib";
import { AUTH_API_ENDPOINTS } from "./auth.endpoints";
import type { LoginPayload, LoginResponse } from "./auth.types";

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
		mutationFn: async (): Promise<ApiResponse> => {
			try {
				const { data } = await axiosWithAuth.post(
					AUTH_API_ENDPOINTS.logoutUser,
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

export const useGetUserData = () => {
  return useQuery({
    queryKey: ["get_user_data"],
    queryFn: async (): Promise<ApiResponse> => {
      const { data } = await axiosWithAuth.get("/me");
      return data;
    },
  });
};
