import toast from "react-hot-toast";
import { FormProvider } from "react-hook-form";

import { type LoginResponse, useUserLogin } from "@apis";
import { Button } from "@components";
import { LogInForm } from "@forms";
import { type AuthState, useAuthStore } from "@store";
import type { LoginFormData } from "./Login.types";
import { useLoginForm } from "./useLoginForm";

const Login = () => {
	const loginMethods = useLoginForm();

	const { mutate: userLogin, isPending } = useUserLogin();

	const setLoginData = useAuthStore(
		(state) => state.login,
	);

	const onSubmit = (data: LoginFormData) => {
		userLogin(data, {
			onSuccess: (res: LoginResponse) => {
				if (!res.data) return;

				const payload: Partial<AuthState> = {
					user: {
						userId: res.data.userId,
						userName: res.data.username,
						role: res.data.role,
					},
					isLoggedIn: true,
				};

				setLoginData(payload);

				loginMethods.reset();

				toast.success("Login successful");
			},

			onError: (err) => {
				toast.error(
					err?.message || "Failed to login",
				);
			},
		});
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-900 px-4">
			<div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl md:p-8">
				<h1 className="mb-8 text-center text-3xl font-bold">
					Login
				</h1>

				<FormProvider {...loginMethods}>
					<form
						onSubmit={loginMethods.handleSubmit(
							onSubmit,
						)}
						className="flex flex-col gap-6"
					>
						<LogInForm />

						<Button
							type="submit"
							isLoading={isPending}
							className="w-full"
						>
							{isPending
								? "Logging in..."
								: "Login"}
						</Button>
					</form>
				</FormProvider>
			</div>
		</div>
	);
};

export default Login;
