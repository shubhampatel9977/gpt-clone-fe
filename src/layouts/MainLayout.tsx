import { Header } from "@containers";
import { Outlet } from "react-router-dom";

const MainLayout: React.FC = () => {
	return (
		<>
			<Header />
			<Outlet />
		</>
	);
};

export default MainLayout;
