interface AssistantMessageProps {
	content: string;
}

const AssistantMessage = ({
	content,
}: AssistantMessageProps) => {
	return (
		<div className="mb-6 flex justify-start">
			<div className="max-w-[90%] text-white">
				{content}
			</div>
		</div>
	);
};

export default AssistantMessage;
