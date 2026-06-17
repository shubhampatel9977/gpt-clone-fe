import { ArrowUp } from "lucide-react";
import { useState } from "react";

interface PromptInputProps {
	isStreaming?: boolean;
	onSubmit: (
		message: string,
	) => void;
}

const PromptInput = ({
	onSubmit,
	isStreaming = false,
}: PromptInputProps) => {
	const [message, setMessage] =
		useState("");

	const handleSubmit = () => {
		const trimmed =
			message.trim();

		if (!trimmed) return;

		onSubmit(trimmed);

		setMessage("");
	};

	return (
		<div className="rounded-3xl border border-gray bg-darkGray p-4">
			<textarea
				rows={4}
				value={message}
				onChange={(e) =>
					setMessage(
						e.target.value,
					)
				}
				placeholder="Ask anything..."
				className="w-full resize-none bg-transparent text-white outline-none placeholder:text-lightGray"
			/>

			<div className="mt-4 flex justify-end">
				<button
					type="button"
					onClick={
						handleSubmit
					}
					disabled={
						!message.trim() ||
						isStreaming
					}
					className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black disabled:opacity-50"
				>
					<ArrowUp size={18} />
				</button>
			</div>
		</div>
	);
};

export default PromptInput;
