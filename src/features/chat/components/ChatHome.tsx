import HomePrompt from "./HomePrompt";
import ModelSelector from "./ModelSelector";
import PromptInput from "./PromptInput";

const ChatHome = () => {
	return (
		<div className="flex h-full items-center justify-center px-4">
			<div className="w-full max-w-4xl space-y-8">
				<HomePrompt />
				<PromptInput />
				<ModelSelector />
			</div>
		</div>
	);
};

export default ChatHome;