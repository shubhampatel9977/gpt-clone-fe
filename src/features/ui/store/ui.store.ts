import { create } from "zustand";

import type { UIState } from "./store.types";

export const useUIStore = create<UIState>((set) => ({
	sidebarOpen: true,

	toggleSidebar: () =>
		set((state) => ({
			sidebarOpen: !state.sidebarOpen,
		})),

	openSidebar: () =>
		set({
			sidebarOpen: true,
		}),

	closeSidebar: () =>
		set({
			sidebarOpen: false,
		}),
}));
