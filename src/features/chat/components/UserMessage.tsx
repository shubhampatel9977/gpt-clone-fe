interface UserMessageProps {
	content: string;
}

const UserMessage = ({
	content,
}: UserMessageProps) => {
	return (
		<div className="mb-6 flex justify-end">
			<div className="max-w-[80%] rounded-3xl bg-gray px-4 py-3 text-white">
				{content}
			</div>
		</div>
	);
};

export default UserMessage;
