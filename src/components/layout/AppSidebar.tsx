import SidebarChats from "./SidebarChats";
import SidebarFooter from "./SidebarFooter";
import SidebarHeader from "./SidebarHeader";
import SidebarProjects from "./SidebarProjects";

const AppSidebar = () => {
	return (
		<aside className="flex h-screen w-64 flex-col gap-5 border-r border-gray bg-black">
			<SidebarHeader />

			<div className="flex-1 space-y-6 overflow-y-auto px-2">
				<SidebarProjects />
				<SidebarChats />
			</div>

			<SidebarFooter />
		</aside>
	);
};

export default AppSidebar;
