import { useAuthStore } from "@src/features/auth";
import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "./routes.constants";

const ProtectedRoute = () => {
	const isAuthenticated = useAuthStore((state) => state.isLoggedIn);

	if (!isAuthenticated) {
		return <Navigate to={ROUTES.LOGIN} replace />;
	}

	return <Outlet />;
};

export default ProtectedRoute;
