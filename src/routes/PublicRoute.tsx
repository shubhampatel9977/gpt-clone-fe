import { useAuthStore } from "@store";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
	const isAuthenticated = useAuthStore((state) => state.isLoggedIn);

	if (isAuthenticated) {
		return <Navigate to="/" replace />;
	}

	return <Outlet />;
};

export default PublicRoute;
