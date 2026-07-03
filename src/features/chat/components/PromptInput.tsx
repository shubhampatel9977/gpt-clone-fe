import { MAX_CHAT_INPUT_ROWS } from "@src/utils";
import { ArrowUp } from "lucide-react";
import {
	useEffect,
	useRef,
	useState,
	type KeyboardEvent,
} from "react";

interface PromptInputProps {
	onSubmit: (message: string) => void;
	isStreaming?: boolean;
}

const PromptInput = ({
	onSubmit,
	isStreaming = false,
}: PromptInputProps) => {
	const [message, setMessage] = useState("");

	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const handleSubmit = () => {
		const trimmed = message.trim();

		if (!trimmed || isStreaming) {
			return;
		}

		onSubmit(trimmed);

		setMessage("");
	};

	useEffect(() => {
		const textarea = textareaRef.current;

		if (!textarea) {
			return;
		}

		textarea.style.height = "auto";

		const lineHeight = 24;

		const maxHeight = lineHeight * MAX_CHAT_INPUT_ROWS;

		textarea.style.height = `${Math.min(
			textarea.scrollHeight,
			maxHeight,
		)}px`;

		textarea.style.overflowY =
			textarea.scrollHeight >
			maxHeight
				? "auto"
				: "hidden";
	}, [message]);

	const handleKeyDown = (
		event: KeyboardEvent<HTMLTextAreaElement>,
	) => {
		if (event.key === "Enter" && !event.shiftKey) {
			event.preventDefault();
			handleSubmit();
		}
	};

	return (
		<div className="rounded-3xl border border-gray bg-darkGray p-4 transition-colors focus-within:border-lightGray">
			<textarea
				ref={textareaRef}
				rows={1}
				value={message}
				disabled={isStreaming}
				placeholder="Ask anything..."
				onChange={(e) =>setMessage(e.target.value)}
				onKeyDown={handleKeyDown}
				className="scrollbar max-h-60 w-full resize-none overflow-hidden hide-scrollbar bg-transparent text-white outline-none placeholder:text-lightGray disabled:cursor-not-allowed disabled:opacity-60"
			/>

			<div className="mt-4 flex justify-end">
				<button
					type="button"
					onClick={handleSubmit}
					disabled={!message.trim() || isStreaming}
					className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white text-black transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
				>
					<ArrowUp size={18}/>
				</button>
			</div>
		</div>
	);
};

export default PromptInput;
