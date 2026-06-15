import { useUserLogOut } from "../api";
import { useAuthStore } from "../store";

export const useLogout = () => {

	const clearAuthStore = useAuthStore((state) => state.logout);

	const { mutate: userLogout, isPending } = useUserLogOut();

	// Logout confirmation logic
	const handleLogout = () => {
		userLogout(undefined, {
				onError: (error) => {
					console.error(
						error?.message ?? "Something went wrong while logging out",
					);
				},
				onSettled: () => {
					clearAuthStore();
				},
			},
		);
	};

	return { handleLogout, isPending };
};
