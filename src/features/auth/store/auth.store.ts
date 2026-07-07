import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { AuthState } from "./store.types";

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			user: null,
			isLoggedIn: false,
			login: (data) =>
				set((state) => ({
					...state,
					...data,
				})),
			logout: () =>
				set({
					user: null,
					isLoggedIn: false,
				}),
		}),
		{
			name: "user-auth-store",
		},
	),
);
