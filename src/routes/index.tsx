import { createBrowserRouter, Navigate } from "react-router-dom";

import { MainLayout } from "@layouts";
import { AuthPage } from "../features/auth";
import { ROUTES } from "./routes.constants";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

export const router = createBrowserRouter([
	{
		element: <PublicRoute />, // For non-authenticated users only
		children: [{ path: ROUTES.LOGIN, element: <AuthPage /> }],
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
