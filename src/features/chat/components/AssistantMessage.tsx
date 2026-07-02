import MarkdownMessage from "./MarkdownMessage";

interface AssistantMessageProps {
	content: string;
	isThinking?: boolean;
}

const ThinkingDots: React.FC = () => {
	return (
		<div className="flex items-center gap-1">
			<span className="text-lightGray">
				Thinking
			</span>

			<span className="animate-pulse">
				.
			</span>

			<span
				className="animate-pulse"
				style={{
					animationDelay: "150ms",
				}}
			>
				.
			</span>

			<span
				className="animate-pulse"
				style={{
					animationDelay: "300ms",
				}}
			>
				.
			</span>
		</div>
	)
}

const AssistantMessage = ({
	content,
	isThinking = false,
}: AssistantMessageProps) => {
	return (
		isThinking ? (
			<ThinkingDots />
		) : (
			<div className="flex justify-start mb-10">
				<div className="max-w-full text-white">
					<MarkdownMessage
						content={content}
					/>
				</div>
			</div>
		)
	);
};

export default AssistantMessage;
