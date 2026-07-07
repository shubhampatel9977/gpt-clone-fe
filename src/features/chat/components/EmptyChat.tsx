import { Code2, MessageSquare, Sparkles } from "lucide-react";

interface EmptyChatProps {
	modelName?: string;
}

const EmptyChat = ({ modelName }: EmptyChatProps) => {
	const suggestions = [
		{
			icon: <Code2 size={18} />,
			title: "Help me write code",
		},
		{
			icon: <MessageSquare size={18} />,
			title: "Explain a concept",
		},
		{
			icon: <Sparkles size={18} />,
			title: "Generate ideas",
		},
	];

	return (
		<div className="flex flex-1 flex-col items-center justify-center px-6">
			<h1 className="mb-2 text-4xl font-semibold text-white">
				{modelName || "AI Assistant"}
			</h1>

			<p className="mb-10 text-lightGray">How can I help you today?</p>

			<div className="grid w-full max-w-3xl gap-4 md:grid-cols-3">
				{suggestions.map((suggestion) => (
					<div
						key={suggestion.title}
						className="rounded-2xl border border-gray bg-darkGray p-4"
					>
						<div className="mb-3 text-lightGray">{suggestion.icon}</div>

						<p className="text-sm text-white">{suggestion.title}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default EmptyChat;
