import { MainLayout } from "@layouts";

import { LoginPage } from "@src/features/auth";
import { createBrowserRouter, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import { ROUTES } from "./routes.constants";

export const router = createBrowserRouter([
	{
		element: <PublicRoute />, // For non-authenticated users only
		children: [{ path: ROUTES.LOGIN, element: <LoginPage /> }],
	},
	{
		path: "/",
		element: <ProtectedRoute />, // For authenticated users only
		children: [
			{
				path: "/",
				element: <MainLayout />,
				children: [
					{ path: "/", element: <Navigate to={ROUTES.HOME} replace /> },
					{ path: ROUTES.HOME, element: <h1>Home Page</h1> },
				],
			},
		],
	},
	{ path: "*", element: <p>page not found</p> }, // Catch-all invalid route
]);
