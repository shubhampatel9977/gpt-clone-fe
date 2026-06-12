import type { ApiResponse } from "@apis";

export type Role = "ADMIN" | "USER";
export interface UserLoginInfo {
	id: string;
	name: string;
	email: string;
	role: Role;
}
export interface LoginPayload {
	username: string;
	password: string;
}

export interface LoginResponse extends ApiResponse {
	data?: UserLoginInfo;
}


