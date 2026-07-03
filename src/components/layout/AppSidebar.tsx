import { MultiModalSortLogo } from "@assets";
import SidebarChats from "./SidebarChats";
import SidebarFooter from "./SidebarFooter";
import SidebarHeader from "./SidebarHeader";
import SidebarProjects from "./SidebarProjects";

const AppSidebar = () => {
	return (
		<aside className="flex h-screen w-64 flex-col gap-2 border-r border-gray bg-black">
			<div className="mx-2 my-5">
				<img className="h-8" src={MultiModalSortLogo} alt="multimodal logo" />
			</div>
			<SidebarHeader />

			<div className="flex-1 space-y-6 overflow-y-auto px-2 mt-5">
				<SidebarProjects />
				<SidebarChats />
			</div>

			<SidebarFooter />
		</aside>
	);
};

export default AppSidebar;
