export interface User {
	userId: number;
	userName: string;
	role: string;
}

export interface AuthState {
	accessToken: string | null;
	refreshToken: string | null;
	user: User | null;
	isLoggedIn: boolean | null;
	login: (data: Partial<AuthState>) => void;
	updateToken: (data: Partial<AuthState>) => void;
	logout: () => void;
}
