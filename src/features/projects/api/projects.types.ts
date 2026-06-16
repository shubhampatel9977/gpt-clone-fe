import type { ApiResponse } from "@app-types/api.types";

export interface ProjectCount {
	conversations: number;
}

export interface Project {
	id: string;
	name: string;
	userId?: string;
	createdAt: string;
	updatedAt: string;
	_count?: ProjectCount;
}

export interface CreateProjectPayload {
	name: string;
}

export interface UpdateProjectPayload {
	name?: string;
}

export interface ProjectsResponse extends ApiResponse {
	data?: Project[];
}

export interface ProjectResponse extends ApiResponse {
	data?: Project;
}
