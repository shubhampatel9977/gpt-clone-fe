import { FormProvider } from "react-hook-form";
import toast from "react-hot-toast";

import { Button } from "@components";
import { MultiModalSortLogo } from "@src/assets";
import { type LoginResponse, useUserLogin } from "../api";
import type { LoginFormData } from "../auth.types";
import { GoogleLoginButton, LoginForm } from "../components";
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
				<div className="flex justify-center mb-8">
					<img
						src={MultiModalSortLogo}
						alt="multimodal_ai_logo"
						className="w-60"
					/>
				</div>

				<FormProvider {...loginMethods}>
					<form
						onSubmit={loginMethods.handleSubmit(onSubmit)}
						className="flex flex-col gap-6"
					>
						<LoginForm />

						<Button type="submit" isLoading={isPending} className="w-full">
							{isPending ? "Logging in..." : "Login"}
						</Button>

						<div className="flex items-center gap-3">
							<div className="h-px flex-1 bg-gray" />

							<span className="text-sm text-lightGray">OR</span>

							<div className="h-px flex-1 bg-gray" />
						</div>
						<GoogleLoginButton />
					</form>
				</FormProvider>
			</div>
		</div>
	);
};

export default LoginPage;
