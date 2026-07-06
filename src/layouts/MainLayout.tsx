import { AppHeader, AppSidebar } from "@components/layout";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	return (
		<div className="flex h-screen bg-black text-white overflow-hidden">
			<AppSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

			<div className="flex flex-1 flex-col overflow-hidden">
				<AppHeader onOpenSidebar={() => setSidebarOpen(true)} />

				<main className="flex flex-1 flex-col overflow-hidden">
					<Outlet />
				</main>
			</div>
		</div>
	);
};

export default MainLayout;
