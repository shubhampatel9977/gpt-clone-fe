import { axiosWithAuth } from "@lib";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { MODELS_API_ENDPOINTS } from "./models.endpoints";
import type { ModelsResponse } from "./models.types";

export const useModels = () => {
	return useQuery({
		queryKey: ["models"],

		queryFn: async (): Promise<ModelsResponse> => {
			try {
				const { data } = await axiosWithAuth.get(
					MODELS_API_ENDPOINTS.getModels,
				);

				return data;
			} catch (err: unknown) {
				if (axios.isAxiosError(err)) {
					throw new Error(
						err.response?.data?.message || "Failed to fetch models",
						{
							cause: err,
						},
					);
				}

				throw new Error("Unexpected error occurred while fetching models", {
					cause: err,
				});
			}
		},

		staleTime: Number.POSITIVE_INFINITY,
	});
};
