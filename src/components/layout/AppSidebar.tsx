import { MultiModalSortLogo } from "@assets";
import { X } from "lucide-react";
import { useEffect } from "react";
import SidebarChats from "./SidebarChats";
import SidebarFooter from "./SidebarFooter";
import SidebarHeader from "./SidebarHeader";
import SidebarProjects from "./SidebarProjects";

interface AppSidebarProps {
	open: boolean;
	onClose: () => void;
}

const AppSidebar: React.FC<AppSidebarProps> = ({ open, onClose }) => {
	useEffect(() => {
		if (!open) {
			document.body.style.overflow = "";
			return;
		}

		document.body.style.overflow = "hidden";

		return () => {
			document.body.style.overflow = "";
		};
	}, [open]);

	const sidebarContent = (
		<>
			<div className="mx-3 my-4 flex items-center justify-between">
				<img className="h-8" src={MultiModalSortLogo} alt="multimodal logo" />

				<button
					type="button"
					onClick={onClose}
					className="rounded-lg p-2 text-lightGray transition-colors hover:bg-darkGray hover:text-white lg:hidden"
					aria-label="Close sidebar"
				>
					<X size={20} />
				</button>
			</div>

			<SidebarHeader onNavigate={onClose} />

			<div className="mt-4 flex-1 space-y-6 overflow-y-auto px-2">
				<SidebarProjects onNavigate={onClose} />

				<SidebarChats onNavigate={onClose} />
			</div>

			<SidebarFooter onNavigate={onClose} />
		</>
	);

	return (
		<>
			{/* Desktop Sidebar */}
			<aside className="hidden h-screen w-64 flex-col gap-2 border-r border-gray bg-black lg:flex">
				{sidebarContent}
			</aside>

			{/* Mobile Backdrop */}
			{open && (
				<button
					type="button"
					onClick={onClose}
					className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[1px] lg:hidden"
				/>
			)}

			{/* Mobile Drawer */}
			<aside
				className={`fixed left-0 top-0 z-50 flex h-screen w-[85vw] max-w-72 flex-col gap-2 border-r border-gray bg-black transition-transform duration-200 ease-out lg:hidden ${
					open ? "translate-x-0" : "-translate-x-full"
				}`}
			>
				{sidebarContent}
			</aside>
		</>
	);
};

export default AppSidebar;
