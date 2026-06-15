import { useUserLogOut } from "../api";
import { useAuthStore } from "../store";

export const useLogout = () => {
	const clearAuthStore = useAuthStore((state) => state.logout);

	const { mutate: userLogout, isPending } = useUserLogOut();

	const handleLogout = () =>
		userLogout(undefined, {
			onError: (error) => {
				console.error(error?.message);
			},
			onSettled: clearAuthStore,
		});

	return {
		handleLogout,
		isPending,
	};
};
