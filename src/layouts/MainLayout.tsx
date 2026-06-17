import { Outlet } from "react-router-dom";

import { AppSidebar, TopBar } from "@components/layout";

const MainLayout = () => {
	return (
		<div className="flex h-screen bg-black text-white">
			<AppSidebar />

			<div className="flex min-w-0 flex-1 flex-col">
				<TopBar />

				<main className="flex-1 overflow-y-auto">
					<Outlet />
				</main>
			</div>
		</div>
	);
};

export default MainLayout;
