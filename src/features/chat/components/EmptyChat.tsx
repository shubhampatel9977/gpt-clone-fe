const EmptyChat = () => {
	return (
		<div className="flex h-full flex-col items-center justify-center px-4 text-center">
			<h1 className="mb-2 text-3xl font-semibold text-white">
				How can I help you today?
			</h1>

			<p className="max-w-md text-sm text-gray-400">
				Start a new conversation and ask anything.
			</p>
		</div>
	);
};

export default EmptyChat;
