import { Navigate, Outlet } from "react-router-dom";

import { useAuthStore } from "../features/auth/store";

const PublicRoute = () => {
	const isAuthenticated = useAuthStore((state) => state.isLoggedIn);

	if (isAuthenticated) {
		return <Navigate to="/" replace />;
	}

	return <Outlet />;
};

export default PublicRoute;
