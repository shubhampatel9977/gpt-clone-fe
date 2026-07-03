interface ChatTopBar {
	title?: string;
	modelLabel?: string;
	modelProvider?: string;
}

const ChatTopBar = ({
	title = "New Chat",
	modelLabel = "",
	modelProvider = "",
}: ChatTopBar) => {
	return (
		<div className="pt-2">
			<h1 className="text-lg font-medium text-white">
				{title}
			</h1>
			{modelLabel && modelProvider && (
				<p className="text-sm text-lightGray">
					{modelLabel}
					{" • "}
					{modelProvider}
				</p>
			)}
		</div>
	);
};

export default ChatTopBar;
