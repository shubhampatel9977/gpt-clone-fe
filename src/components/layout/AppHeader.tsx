import { MultiModalSortLogo } from "@assets";
import { Menu } from "lucide-react";

interface AppHeaderProps {
	onOpenSidebar: () => void;
}

const AppHeader = ({ onOpenSidebar }: AppHeaderProps) => {
	return (
		<header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-gray bg-black px-4 lg:hidden">
			<img src={MultiModalSortLogo} alt="Logo" className="h-7" />

			<button
				type="button"
				onClick={onOpenSidebar}
				className="rounded-lg p-2 text-lightGray transition-colors hover:bg-darkGray hover:text-white"
				aria-label="Open sidebar"
			>
				<Menu size={22} />
			</button>
		</header>
	);
};

export default AppHeader;
