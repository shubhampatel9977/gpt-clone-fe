import { Outlet } from "react-router-dom";

import Header from "./Header";

const MainLayout: React.FC = () => {
	return (
		<>
			<Header />
			<Outlet />
		</>
	);
};

export default MainLayout;
