import { ChevronDown, MessageCircleDashed, MessageCircleCheck   } from "lucide-react";
import { useSearchParams } from "react-router-dom";

interface NewChatTopBarProps {
	title?: string;
	showTemporary?: boolean;
}

const NewChatTopBar = ({
	title = "Chat",
	showTemporary = false,
}: NewChatTopBarProps) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const isTemporary = searchParams.get("temporary-chat") === "true";

	const handleTemporaryToggle = () => {
		if (isTemporary) {
			setSearchParams({});
			return;
		}

		setSearchParams({
			"temporary-chat":
				"true",
		});
	};

	return (
		<div className="flex h-14 justify-between items-center px-8">
			<button
				type="button"
				className="flex items-center gap-1 text-lg font-semibold text-white"
			>
				<span>{title}</span>

				<ChevronDown size={18} />
			</button>
			{showTemporary && (
				<button
					type="button"
					onClick={handleTemporaryToggle}
					className="cursor-pointer"
				>
					{isTemporary ? (
						<MessageCircleCheck size={24} />
					) : (
						<MessageCircleDashed size={24} />
					)}
				</button>
			)}
		</div>
	);
};

export default NewChatTopBar;
