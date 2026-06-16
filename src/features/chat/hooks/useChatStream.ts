import { useState } from "react";

import type { SendMessagePayload } from "../api";

interface UseChatStreamReturn {
	isStreaming: boolean;
	streamedContent: string;
	error: string | null;

	startStream: (
		payload: SendMessagePayload,
	) => Promise<void>;

	resetStream: () => void;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useChatStream =
	(): UseChatStreamReturn => {
		const [isStreaming, setIsStreaming] =
			useState(false);

		const [streamedContent, setStreamedContent] =
			useState("");

		const [error, setError] =
			useState<string | null>(null);

		const resetStream = () => {
			setStreamedContent("");
			setError(null);
		};

		const startStream = async (
			payload: SendMessagePayload,
		) => {
			try {
				setIsStreaming(true);
				setError(null);
				setStreamedContent("");

				const response = await fetch(
					`${API_BASE_URL}/api/chat/stream`,
					{
						method: "POST",

						credentials: "include",

						headers: {
							"Content-Type":
								"application/json",
						},

						body: JSON.stringify(
							payload,
						),
					},
				);

				if (!response.ok) {
					throw new Error(
						"Failed to start stream",
					);
				}

				const reader =
					response.body?.getReader();

				if (!reader) {
					throw new Error(
						"Stream reader unavailable",
					);
				}

				const decoder =
					new TextDecoder();

				let accumulatedContent = "";

				while (true) {
					const {
						done,
						value,
					} = await reader.read();

					if (done) break;

					const chunk =
						decoder.decode(value);

					const lines =
						chunk
							.split("\n")
							.filter(Boolean);

					for (const line of lines) {
						try {
							const parsed =
								JSON.parse(line);

							if (
								parsed.error
							) {
								throw new Error(
									parsed.message ||
										"Stream error",
								);
							}

							if (
								parsed.done
							) {
								setIsStreaming(
									false,
								);
								return;
							}

							if (
								parsed.content
							) {
								accumulatedContent +=
									parsed.content;

								setStreamedContent(
									accumulatedContent,
								);
							}
						} catch {
							// ignore malformed chunk
						}
					}
				}
			} catch (err) {
				setError(
					err instanceof Error
						? err.message
						: "Stream failed",
				);
			} finally {
				setIsStreaming(false);
			}
		};

		return {
			isStreaming,
			streamedContent,
			error,

			startStream,
			resetStream,
		};
	};
    