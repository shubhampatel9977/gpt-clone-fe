import type { ApiResponse } from "@apis";

export interface LoginResponse extends ApiResponse {
	data?: {
		token: string;
		refreshToken: string;
		username: string;
		role: string;
		userId: number;
	};
}

export interface LoginPayload {
	username: string;
	password: string;
}

export type Role = "ADMIN" | "USER";

export interface RegisterPayload {
	email: string | null;
	contactNumber: string | null;
	userName: string;
	password: string;
	role: Role;
}

export interface RegisterResponse extends ApiResponse {
	data?: null;
}

export interface LogoutPayload {
	userId: number;
}

export interface PaginationRequest {
	pageNumber: number;
	pageSize: number;
	sortColumn: string;
	sortDirection: "asc" | "desc" | "";
	search: string;
}
