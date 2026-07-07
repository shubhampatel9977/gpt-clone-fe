import type { ApiResponse } from "@src/types";

export interface AccountData {
	profile: {
		id: string;
		name: string;
		email: string;
		role: string;
		provider: string;
	};

	stats: {
		chatCount: number;
		projectCount: number;
		messageCount: number;
		totalTokens: number;
	};
}

export interface AccountResponse extends ApiResponse {
    data?: AccountData;
}