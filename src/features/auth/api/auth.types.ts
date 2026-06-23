import type { ApiResponse, Role } from "@app-types/api.types";

export interface UserLoginInfo {
	id: string;
	name: string;
	email: string;
	role: Role;
}
export interface LoginPayload {
	email: string;
	password: string;
}

export interface LoginResponse extends ApiResponse {
	data?: UserLoginInfo;
}

export interface CurrentUser {
	id: string;
	name: string;
	email: string;
	role: Role;
	createdAt: string;
	updatedAt: string;
}

export interface CurrentUserResponse extends ApiResponse {
	data?: CurrentUser;
}

export interface GoogleLoginPayload {
	token: string;
}

export interface GoogleLoginResponse
	extends ApiResponse {
	data?: UserLoginInfo;
}
