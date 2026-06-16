import { LogOut } from "lucide-react";

import { useLogout } from "@features/auth";

import NewChatButton from "./NewChatButton";
import SidebarItem from "./SidebarItem";

const Sidebar = () => {
	const { handleLogout } = useLogout();

	return (
		<aside className="flex h-screen w-[280px] flex-col border-r border-neutral-800 bg-neutral-950">
			<div className="p-3">
				<NewChatButton />
			</div>

			<div className="flex-1 overflow-y-auto px-2">
				<p className="mb-2 px-3 text-xs uppercase tracking-wide text-gray-500">
					Recent Chats
				</p>

				<div className="space-y-1">
					<SidebarItem title="React Query Setup" />
					<SidebarItem title="JWT Auth Flow" />
					<SidebarItem title="Streaming Chat" />
				</div>
			</div>

			<div className="border-t border-neutral-800 p-3">
				<button
					type="button"
					onClick={handleLogout}
					className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-400 transition hover:bg-neutral-800"
				>
					<LogOut size={18} />
					Logout
				</button>
			</div>
		</aside>
	);
};

export default Sidebar;
