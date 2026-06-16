import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { axiosWithAuth } from "@lib";
import { MESSAGES_API_ENDPOINTS } from "./messages.endpoints";
import type { MessagesResponse } from "./messages.types";

/** GET conversation messages */
export const useMessages = (
	conversationId: string,
) => {
	return useQuery({
		queryKey: [
			"messages",
			conversationId,
		],

		enabled: !!conversationId,

		queryFn:
			async (): Promise<MessagesResponse> => {
				try {
					const { data } =
						await axiosWithAuth.get(
							MESSAGES_API_ENDPOINTS.getMessages(
								conversationId,
							),
						);

					return data;
				} catch (err: unknown) {
					if (axios.isAxiosError(err)) {
						throw new Error(
							err.response?.data
								?.message ||
								"Failed to fetch messages",
							{
								cause: err,
							},
						);
					}

					throw new Error(
						"Unexpected error occurred while fetching messages",
						{
							cause: err,
						},
					);
				}
			},
	});
};
