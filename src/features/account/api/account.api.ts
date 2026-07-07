import axios from "axios";

import { useQuery } from "@tanstack/react-query";
import type { AccountResponse } from "./account.types";
import { axiosWithAuth } from "@src/lib";
import { ACCOUNT_API_ENDPOINTS } from "./account.endpoints";

/** GET Account Information */
export const useAccount = () => {
	return useQuery({
		queryKey: ["account"],

		queryFn: async (): Promise<AccountResponse> => {
			try {
				const { data } = await axiosWithAuth.get(
					ACCOUNT_API_ENDPOINTS.getAccount,
				);

				return data;
			} catch (err: unknown) {
				if (axios.isAxiosError(err)) {
					throw new Error(
						err.response?.data?.message || "Failed to fetch Account",
						{
							cause: err,
						},
					);
				}

				throw new Error(
					"Unexpected error occurred while fetching Account",
					{
						cause: err,
					},
				);
			}
		},
	});
};
