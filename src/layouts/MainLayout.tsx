import { MessageSquarePlus } from "lucide-react";
import { Outlet } from "react-router-dom";

import {
	SidebarItem,
	SidebarSection,
	TopBar,
	UserProfile,
} from "@components/layout";
import { Divider } from "@components/ui";

const MainLayout = () => {
	return (
		<div className="flex h-screen bg-black text-white">
			{/* Sidebar */}
			<aside className="flex w-64 flex-col border-r border-gray bg-black">
				<div className="p-3">
					<SidebarItem
						label="New Chat"
						icon={<MessageSquarePlus size={18} />}
					/>
				</div>

				<div className="flex-1 overflow-y-auto px-2 space-y-6">
					<SidebarSection title="Recent Chats">
						<SidebarItem
							label="React Query Setup"
							isActive
						/>
						<SidebarItem label="JWT Auth Flow" />
						<SidebarItem label="Streaming Chat" />
					</SidebarSection>

					<SidebarSection title="Projects">
						<SidebarItem label="GPT Clone" />
						<SidebarItem label="Portfolio" />
					</SidebarSection>
				</div>

				<div className="p-3">
					<Divider className="mb-3" />
					<UserProfile/>
				</div>
			</aside>

			{/* Content */}
			<div className="flex min-w-0 flex-1 flex-col">
				<TopBar title="ChatGPT" />

				<main className="flex-1 overflow-y-auto">
					<Outlet />
				</main>
			</div>
		</div>
	);
};

export default MainLayout;
