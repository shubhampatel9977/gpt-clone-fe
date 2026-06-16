import type { ApiResponse } from "@app-types/api.types";

export interface Model {
	id: string;
	label: string;
	provider: string;
	description: string;
	isDefault: boolean;
	isActive: boolean;
}

export interface ModelsResponse extends ApiResponse {
	data?: Model[];
}
