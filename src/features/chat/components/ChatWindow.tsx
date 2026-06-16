import ChatInput from "./ChatInput";
import EmptyChat from "./EmptyChat";

const ChatWindow = () => {
	return (
		<div className="flex h-screen flex-1 flex-col bg-black">
			<div className="flex-1 overflow-y-auto">
				<EmptyChat />
			</div>

			<ChatInput />
		</div>
	);
};

export default ChatWindow;
