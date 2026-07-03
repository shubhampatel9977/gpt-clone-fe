import type { ReactNode } from "react";

interface ChatWindowProps {
	children: ReactNode;
}

const ChatWindow = ({
	children,
}: ChatWindowProps) => {
	return (
		<div className="flex-1 overflow-y-auto">
			<div className="mx-auto flex w-full max-w-4xl flex-col py-8">
				{children}
			</div>
		</div>
	);
};

export default ChatWindow;
