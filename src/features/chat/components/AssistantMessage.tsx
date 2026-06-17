import MarkdownMessage from "./MarkdownMessage";

interface AssistantMessageProps {
	content: string;
}

const AssistantMessage = ({
	content,
}: AssistantMessageProps) => {
	return (
		<div className="flex justify-start">
			<div className="max-w-full text-white">
				<MarkdownMessage
					content={content}
				/>
			</div>
		</div>
	);
};

export default AssistantMessage;
