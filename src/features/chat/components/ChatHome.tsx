import HomePrompt from "./HomePrompt";
import PromptInput from "./PromptInput";
import PromptSuggestions from "./PromptSuggestions";

const ChatHome = () => {
	return (
		<div className="flex h-full flex-col items-center justify-center px-4">
			<div className="w-full max-w-4xl space-y-8">
				<HomePrompt />
				<PromptInput />
				<PromptSuggestions />
			</div>
		</div>
	);
};

export default ChatHome;
