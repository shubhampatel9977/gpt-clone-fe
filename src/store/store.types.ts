export interface User {
	userId: string;
	userName: string;
	userEmail: string;
	role: string;
}

export interface AuthState {
	user: User | null;
	isLoggedIn: boolean;
	login: (data: Partial<AuthState>) => void;
	logout: () => void;
}
