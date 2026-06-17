export interface UIState {
	selectedModelId: string | null;
	sidebarOpen: boolean;
	setSelectedModel: (modelId: string) => void;
	toggleSidebar: () => void;
	openSidebar: () => void;
	closeSidebar: () => void;
}
