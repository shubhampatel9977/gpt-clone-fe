import {
	ChevronDown,
	MessageCircleCheck,
	MessageCircleDashed,
} from "lucide-react";
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
			"temporary-chat": "true",
		});
	};

	return (
		<div className="flex justify-between items-center py-4 px-4 lg:px-8">
			<button
				type="button"
				className="flex items-center gap-1 text-md md:text-lg font-semibold text-white"
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
						<MessageCircleCheck className="h-5 w-5 md:h-6 md:w-6" />
					) : (
						<MessageCircleDashed className="h-5 w-5 md:h-6 md:w-6" />
					)}
				</button>
			)}
		</div>
	);
};

export default NewChatTopBar;
