import { Navigate, Outlet } from "react-router-dom";

import { ROUTES } from "./routes.constants";
import { useAuthStore } from "../features/auth/store";

const ProtectedRoute = () => {
	const isAuthenticated = useAuthStore((state) => state.isLoggedIn);

	if (!isAuthenticated) {
		return <Navigate to={ROUTES.LOGIN} replace />;
	}

	return <Outlet />;
};

export default ProtectedRoute;
