export type Role = "ADMIN" | "USER";

export interface ApiResponse {
	statusCode: number;
	success: boolean;
	message: string;
}
