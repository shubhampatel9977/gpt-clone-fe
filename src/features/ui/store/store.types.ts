export interface SelectedModelDetails {
	id: string;
	label: string;
}

export interface UIState {
	selectedModel: SelectedModelDetails | null;
	sidebarOpen: boolean;
	setSelectedModel: (model: SelectedModelDetails | null,) => void;
	toggleSidebar: () => void;
	openSidebar: () => void;
	closeSidebar: () => void;
}
