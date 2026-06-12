import { useUserLogOut } from "@apis";
import { useAuthStore } from "@store";

/**
 * Custom hook to handle user logout.
 *
 * This hook calls the logout API, clears authentication and base stores,
 * and provides a logout handler and pending state.
 *
 * @function useLogout
 * @returns {Object} Hook return object
 * @returns {Function} return.handleLogout - Function to trigger the logout process.
 * @returns {boolean} return.isPending - Indicates whether the logout request is in progress.
 *
 * @example
 * const { handleLogout, isPending } = useLogout();
 *
 * <Button onClick={handleLogout} isLoading={isPending}>
 *   Logout
 * </Button>
 */
export const useLogout = () => {
	const user = useAuthStore((state) => state.user);
	const clearAuthStore = useAuthStore((state) => state.logout);
	const { mutate: userLogout, isPending } = useUserLogOut();

	// Logout confirmation logic
	const handleLogout = () => {
		if (!user?.userId) return;

		userLogout(
			{ userId: user.userId },
			{
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
