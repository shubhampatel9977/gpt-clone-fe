import axios from "axios";
import {
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";

import { axiosWithAuth } from "@lib";
import { CONVERSATIONS_API_ENDPOINTS } from "./conversations.endpoints";
import type {
	ConversationResponse,
	ConversationsResponse,
	CreateConversationPayload,
} from "./conversations.types";

/** GET standalone conversations */
export const useConversations = () => {
	return useQuery({
		queryKey: ["conversations"],

		queryFn:
			async (): Promise<ConversationsResponse> => {
				try {
					const { data } =
						await axiosWithAuth.get(
							CONVERSATIONS_API_ENDPOINTS.getConversations,
						);

					return data;
				} catch (err: unknown) {
					if (axios.isAxiosError(err)) {
						throw new Error(
							err.response?.data
								?.message ||
								"Failed to fetch conversations",
							{
								cause: err,
							},
						);
					}

					throw new Error(
						"Unexpected error occurred while fetching conversations",
						{
							cause: err,
						},
					);
				}
			},
	});
};

/** GET conversation by id */
export const useConversation = (
	conversationId: string,
) => {
	return useQuery({
		queryKey: [
			"conversation",
			conversationId,
		],

		enabled: !!conversationId,

		queryFn:
			async (): Promise<ConversationResponse> => {
				try {
					const { data } =
						await axiosWithAuth.get(
							CONVERSATIONS_API_ENDPOINTS.getConversationById(
								conversationId,
							),
						);

					return data;
				} catch (err: unknown) {
					if (axios.isAxiosError(err)) {
						throw new Error(
							err.response?.data
								?.message ||
								"Failed to fetch conversation",
							{
								cause: err,
							},
						);
					}

					throw new Error(
						"Unexpected error occurred while fetching conversation",
						{
							cause: err,
						},
					);
				}
			},
	});
};

/** GET project conversations */
export const useProjectConversations = (
	projectId: string,
) => {
	return useQuery({
		queryKey: [
			"project-conversations",
			projectId,
		],

		enabled: !!projectId,

		queryFn:
			async (): Promise<ConversationsResponse> => {
				try {
					const { data } =
						await axiosWithAuth.get(
							CONVERSATIONS_API_ENDPOINTS.getProjectConversations(
								projectId,
							),
						);

					return data;
				} catch (err: unknown) {
					if (axios.isAxiosError(err)) {
						throw new Error(
							err.response?.data
								?.message ||
								"Failed to fetch project conversations",
							{
								cause: err,
							},
						);
					}

					throw new Error(
						"Unexpected error occurred while fetching project conversations",
						{
							cause: err,
						},
					);
				}
			},
	});
};

/** CREATE conversation */
export const useCreateConversation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (
			input: CreateConversationPayload,
		): Promise<ConversationResponse> => {
			try {
				const { data } =
					await axiosWithAuth.post(
						CONVERSATIONS_API_ENDPOINTS.createConversation,
						input,
					);

				return data;
			} catch (err: unknown) {
				if (axios.isAxiosError(err)) {
					throw new Error(
						err.response?.data
							?.message ||
							"Failed to create conversation",
						{
							cause: err,
						},
					);
				}

				throw new Error(
					"Unexpected error occurred while creating conversation",
					{
						cause: err,
					},
				);
			}
		},

		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["conversations"],
			});

			queryClient.invalidateQueries({
				queryKey: ["projects"],
			});
		},
	});
};

/** DELETE conversation */
export const useDeleteConversation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (
			conversationId: string,
		): Promise<ConversationResponse> => {
			try {
				const { data } =
					await axiosWithAuth.delete(
						CONVERSATIONS_API_ENDPOINTS.deleteConversation(
							conversationId,
						),
					);

				return data;
			} catch (err: unknown) {
				if (axios.isAxiosError(err)) {
					throw new Error(
						err.response?.data
							?.message ||
							"Failed to delete conversation",
						{
							cause: err,
						},
					);
				}

				throw new Error(
					"Unexpected error occurred while deleting conversation",
					{
						cause: err,
					},
				);
			}
		},

		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["conversations"],
			});

			queryClient.invalidateQueries({
				queryKey: ["projects"],
			});
		},
	});
};
