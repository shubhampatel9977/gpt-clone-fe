import { useAuthStore } from "@store";

import { ROUTES } from "@utils/constants";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
	const isAuthenticated = useAuthStore((state) => state.isLoggedIn);

	if (!isAuthenticated) {
		return <Navigate to={ROUTES.LOGIN} replace />;
	}

	return <Outlet />;
};

export default ProtectedRoute;
