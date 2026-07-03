import { useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { PageLoader } from "@components";
import {
	type Message,
	useMessages,
} from "@features/messages";

import ChatWindow from "../components/ChatWindow";
import MessageList from "../components/MessageList";
import PromptInput from "../components/PromptInput";
import { useChatStream, useAutoScroll} from "../hooks";
import EmptyChat from "../components/EmptyChat";
import { ChatTopBar } from "../components";

const ChatPage = () => {
	const { conversationId = "" } = useParams();

	const { data, isLoading, refetch } = useMessages(conversationId);

	const [streamingContent, setStreamingContent] = useState("");

	const [pendingUserMessage, setPendingUserMessage] = useState<string | null>(null);

	const {
		startStreaming,
		isStreaming,
		isWaitingResponse,
	} = useChatStream({
		onChunk: (chunk) => {
			setStreamingContent(
				(prev) => prev + chunk,
			);
		},

		onComplete: async () => {
			setPendingUserMessage(null);
			setStreamingContent("");

			await refetch();
		},

		onError: async (error) => {
			toast.error(error);

			setPendingUserMessage(null);
			setStreamingContent("");

			await refetch();
		},
	});

	const handleSendMessage = async (message: string ) => {
			setPendingUserMessage(
				message,
			);

			setStreamingContent("");

			await startStreaming({
				conversationId,
				message,
			});
		};

	const renderedMessages: Message[] = [
		...(data?.data?.messages ?? []),
	];

	if (isStreaming && pendingUserMessage) {
		renderedMessages.push({
			id: "temp-user",
			conversationId,
			role: "USER",
			content: pendingUserMessage,
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

	const bottomRef = useAutoScroll(renderedMessages.length + streamingContent.length);

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
				<PromptInput
					isStreaming={isStreaming}
					onSubmit={handleSendMessage}
				/>
			</div>
		</div>
	);
};

export default ChatPage;
