import { ChevronDown } from "lucide-react";

interface TopBarProps {
	title?: string;
}

const TopBar = ({
	title = "ChatGPT",
}: TopBarProps) => {
	return (
		<header className="flex h-14 items-center px-4">
			<button
				type="button"
				className="flex items-center gap-1 text-lg font-semibold text-white"
			>
				<span>{title}</span>

				<ChevronDown size={18} />
			</button>
		</header>
	);
};

export default TopBar;
