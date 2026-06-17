import { createBrowserRouter } from "react-router-dom";

import { MainLayout } from "@layouts";
import { LoginPage } from "@src/features/auth";
import { ChatHome, ChatPage } from "@src/features/chat";
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
					{ path: "/", element: <ChatHome /> },
					{ path: `${ROUTES.CHAT}/:conversationId`, element: <ChatPage /> },
				],
			},
		],
	},
	{ path: "*", element: <p>page not found</p> }, // Catch-all invalid route
]);
