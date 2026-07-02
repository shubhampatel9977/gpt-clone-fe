import type { Message } from "@features/messages";

import AssistantMessage from "./AssistantMessage";
import UserMessage from "./UserMessage";

interface MessageListProps {
	messages: Message[];
}

const MessageList = ({
	messages,
}: MessageListProps) => {
	return (
		<>
			{messages.map((message) => {
				if (
					message.role ===
					"USER"
				) {
					return (
						<UserMessage
							key={message.id}
							content={
								message.content
							}
						/>
					);
				}

				return (
					<AssistantMessage
						key={message.id}
						content={message.content}
						isThinking={message.isThinking}
					/>
				);
			})}
		</>
	);
};

export default MessageList;
