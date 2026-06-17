import { useParams } from "react-router-dom";

import { PageLoader } from "@components";
import { useMessages } from "@features/messages";
import ChatWindow from "../components/ChatWindow";
import MessageList from "../components/MessageList";
import PromptInput from "../components/PromptInput";

const ChatPage = () => {
	const { conversationId = "" } =
		useParams();

	const {
		data,
		isLoading,
	} = useMessages(
		conversationId,
	);

	if (isLoading) {
		return <PageLoader />;
	}

	const messages =
		data?.data?.messages ?? [];

	return (
		<div className="flex h-full flex-col">
			<ChatWindow>
				<MessageList
					messages={messages}
				/>
			</ChatWindow>

			<div className="mx-auto w-full max-w-4xl px-4 pb-6">
				<PromptInput />
			</div>
		</div>
	);
};

export default ChatPage;