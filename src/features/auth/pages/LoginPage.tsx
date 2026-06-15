import { Button } from "@components";
import { FormProvider } from "react-hook-form";
import toast from "react-hot-toast";
import { type LoginResponse, useUserLogin } from "../api";
import type { LoginFormData } from "../auth.types";
import { LoginForm } from "../components/LoginForm";
import { useLoginForm } from "../hooks";
import { type AuthState, useAuthStore } from "../store";

const LoginPage = () => {
	const loginMethods = useLoginForm();

	const { mutate: userLogin, isPending } = useUserLogin();

	const setLoginData = useAuthStore((state) => state.login);

	const onSubmit = (data: LoginFormData) => {
		userLogin(data, {
			onSuccess: (res: LoginResponse) => {
				if (!res.data) return;

				const payload: Partial<AuthState> = {
					user: {
						userId: res.data.id,
						userName: res.data.name,
						userEmail: res.data.email,
						role: res.data.role,
					},
					isLoggedIn: true,
				};

				setLoginData(payload);

				loginMethods.reset();

				toast.success("Login successful");
			},

			onError: (err) => {
				toast.error(err?.message || "Failed to login");
			},
		});
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-black px-4">
			<div className="w-full max-w-md rounded-2xl bg-darkGray p-6 shadow-xl md:p-8">
				<h1 className="mb-8 text-white text-center text-3xl font-bold">
					Login
				</h1>

				<FormProvider {...loginMethods}>
					<form
						onSubmit={loginMethods.handleSubmit(onSubmit)}
						className="flex flex-col gap-6"
					>
						<LoginForm />

						<Button type="submit" isLoading={isPending} className="w-full">
							{isPending ? "Logging in..." : "Login"}
						</Button>
					</form>
				</FormProvider>
			</div>
		</div>
	);
};

export default LoginPage;
