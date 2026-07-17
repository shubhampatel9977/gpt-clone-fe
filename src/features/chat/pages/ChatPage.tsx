import { useState } from "react";
import toast from "react-hot-toast";
import { PageLoader } from "@components";
import { useParams } from "react-router-dom";

import { type Message, useMessages } from "@features/messages";
import { ChatTopBar } from "../components";
import ChatWindow from "../components/ChatWindow";
import EmptyChat from "../components/EmptyChat";
import MessageList from "../components/MessageList";
import PromptInput from "../components/PromptInput";
import { useAutoScroll, useChatStream } from "../hooks";

const ChatPage = () => {
	const { conversationId = "" } = useParams();

	const { data, isLoading, refetch } = useMessages(conversationId);

	const [optimisticUserMessage, setOptimisticUserMessage] = useState<string | null>(null);
	const [streamingContent, setStreamingContent] = useState("");

	const { startStreaming, isStreaming, isWaitingResponse } = useChatStream({
		onChunk: (chunk) => {
			setStreamingContent((prev) => prev + chunk);
		},

		onComplete: async () => {
			await refetch();

			setOptimisticUserMessage(null);
			setStreamingContent("");
		},

		onError: async (error) => {
			toast.error(error);
			await refetch()

			setOptimisticUserMessage(null);
			setStreamingContent("");
		},
	});

	const handleSendMessage = async (message: string) => {
		setOptimisticUserMessage(message);

		setStreamingContent("");

		await startStreaming({
			conversationId,
			message,
		});
	};

	const renderedMessages: Message[] = [...(data?.data?.messages ?? [])];

	if (optimisticUserMessage) {
		renderedMessages.push({
			id: "temp-user",
			conversationId,
			role: "USER",
			content: optimisticUserMessage,
			promptTokens: 0,
			completionTokens: 0,
			totalTokens: 0,
			createdAt: new Date().toISOString(),
		});

		renderedMessages.push({
			id: "temp-assistant",
			conversationId,
			role: "ASSISTANT",
			content: streamingContent,
			isThinking: isWaitingResponse,
			promptTokens: 0,
			completionTokens: 0,
			totalTokens: 0,
			createdAt: new Date().toISOString(),
		});
	}

	const bottomRef = useAutoScroll(
		renderedMessages.length + streamingContent.length,
	);

	if (isLoading) {
		return <PageLoader />;
	}

	return (
		<div className="flex h-full flex-col px-4">
			<ChatTopBar
				title={data?.data?.conversation.title}
				modelLabel={data?.data?.conversation.model.label}
				modelProvider={data?.data?.conversation.model.provider}
			/>

			<ChatWindow>
				{renderedMessages.length === 0 ? (
					<EmptyChat modelName={data?.data?.conversation?.model?.label} />
				) : (
					<>
						<MessageList messages={renderedMessages} />
						<div ref={bottomRef} />
					</>
				)}
			</ChatWindow>

			<div className="mx-auto w-full max-w-4xl pb-6">
				<PromptInput isStreaming={isStreaming} onSubmit={handleSendMessage} />
			</div>
		</div>
	);
};

export default ChatPage;
