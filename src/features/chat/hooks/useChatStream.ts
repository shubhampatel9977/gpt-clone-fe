import { streamFetch } from "@lib";
import { useRef, useState } from "react";
import { CHAT_API_ENDPOINTS } from "../api";

interface StreamPayload {
	conversationId: string;
	message: string;
}

interface UseChatStreamProps {
	onChunk: (chunk: string) => void;
	onComplete?: () => void;
	onError?: (error: string) => void;
}

export const useChatStream = ({
	onChunk,
	onComplete,
	onError,
}: UseChatStreamProps) => {
	const [isStreaming, setIsStreaming] = useState(false);

	const [isWaitingResponse, setIsWaitingResponse] = useState(false);

	const abortControllerRef = useRef<AbortController | null>(null);

	const stopStreaming = () => {
		abortControllerRef.current?.abort();
		setIsStreaming(false);
	};

	const startStreaming = async (payload: StreamPayload) => {
		try {
			setIsStreaming(true);
			setIsWaitingResponse(true);

			const controller = new AbortController();

			abortControllerRef.current = controller;

			const response = await streamFetch(
				CHAT_API_ENDPOINTS.streamMessage,
				payload,
				controller.signal,
			);

			if (!response.ok) {
				throw new Error("Failed to start stream");
			}

			const reader = response.body?.getReader();

			if (!reader) {
				throw new Error("Reader unavailable");
			}

			const decoder = new TextDecoder();

			while (true) {
				const { done, value } = await reader.read();

				if (done) {
					break;
				}

				const chunk = decoder.decode(value, { stream: true });

				const lines = chunk.split("\n").filter(Boolean);

				for (const line of lines) {
					if (!line.startsWith("data:")) {
						continue;
					}

					try {
						const parsed = JSON.parse(line.replace("data:", ""));

						if (parsed.error) {
							if (parsed.message?.includes("requires more credits")) {
								onError?.(
									"AI model limit reached. Please try again later or switch to another model.",
								);
							} else {
								onError?.(parsed.message ?? "Something went wrong");
							}
							setIsWaitingResponse(false);
							setIsStreaming(false);
							return;
						}

						if (parsed.done) {
							onComplete?.();
							setIsStreaming(false);
							return;
						}

						if (parsed.content) {
							setIsWaitingResponse(false);
							onChunk(parsed.content);
						}
					} catch {
						// ignore malformed chunks
					}
				}
			}
		} catch (error) {
			if (error instanceof Error && error.name === "AbortError") {
				return;
			}

			onError?.(error instanceof Error ? error.message : "Streaming failed");
		} finally {
			setIsStreaming(false);
			setIsWaitingResponse(false);
		}
	};

	return {
		isStreaming,
		isWaitingResponse,
		startStreaming,
		stopStreaming,
	};
};
