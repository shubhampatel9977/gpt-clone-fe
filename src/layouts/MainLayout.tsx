import { Outlet } from "react-router-dom";

import { AppSidebar } from "@components/layout";

const MainLayout = () => {
	return (
		<div className="flex h-screen bg-black text-white">
			<AppSidebar />

			<main className="flex-1 overflow-y-auto">
				<Outlet />
			</main>
		</div>
	);
};

export default MainLayout;
