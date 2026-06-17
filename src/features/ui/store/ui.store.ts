import { create } from "zustand";

import type {
	SelectedModelDetails,
	UIState,
} from "./store.types";

export const useUIStore =
	create<UIState>((set) => ({
		selectedModel: null,

		sidebarOpen: true,

		setSelectedModel: (
			model: SelectedModelDetails | null,
		) =>
			set({
				selectedModel: model,
			}),

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