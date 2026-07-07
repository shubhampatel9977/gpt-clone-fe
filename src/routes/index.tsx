import { MainLayout } from "@layouts";
import { AccountPage } from "@src/features/account/pages";
import { LoginPage } from "@src/features/auth";
import { ChatPage, NewChatPage } from "@src/features/chat";
import { ProjectPage } from "@src/features/projects";
import { Navigate, createBrowserRouter } from "react-router-dom";
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
					{ path: "/", element: <Navigate to={ROUTES.NEW_CHAT} /> },
					{ path: ROUTES.NEW_CHAT, element: <NewChatPage /> },
					{ path: ROUTES.PROJECT_NEW_CHAT, element: <NewChatPage /> },
					{ path: ROUTES.PROJECT_DETAILS, element: <ProjectPage /> },
					{ path: ROUTES.CHAT, element: <ChatPage /> },
					{ path: ROUTES.ACCOUNT, element: <AccountPage /> },
				],
			},
		],
	},
	{ path: "*", element: <p>page not found</p> }, // Catch-all invalid route
]);
