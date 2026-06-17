interface ChatWindowProps {
	children: React.ReactNode;
}

const ChatWindow = ({
	children,
}: ChatWindowProps) => {
	return (
		<div className="mx-auto flex w-full max-w-4xl flex-1 flex-col">
			<div className="flex-1 overflow-y-auto px-4 py-6">
				{children}
			</div>
		</div>
	);
};

export default ChatWindow;
