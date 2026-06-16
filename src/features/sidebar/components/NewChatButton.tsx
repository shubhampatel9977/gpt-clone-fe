import { Plus } from "lucide-react";

const NewChatButton = () => {
	return (
		<button
			type="button"
			className="flex w-full items-center gap-2 rounded-xl border border-neutral-700 px-3 py-3 text-sm text-white transition hover:bg-neutral-800"
		>
			<Plus size={18} />
			New Chat
		</button>
	);
};

export default NewChatButton;
