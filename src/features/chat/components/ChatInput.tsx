import { Send } from "lucide-react";

const ChatInput = () => {
	return (
		<div className="border-t border-neutral-800 p-4">
			<div className="mx-auto flex max-w-3xl items-end gap-2 rounded-3xl border border-neutral-700 bg-neutral-900 px-4 py-3">
				<textarea
					rows={1}
					placeholder="Ask anything..."
					className="max-h-40 flex-1 resize-none bg-transparent text-white outline-none placeholder:text-gray-500"
				/>

				<button
					type="button"
					className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black transition hover:opacity-90"
				>
					<Send size={16} />
				</button>
			</div>
		</div>
	);
};

export default ChatInput;
