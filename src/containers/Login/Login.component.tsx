import { type LoginResponse, useUserLogin } from "@apis";
import { LogInForm } from "@forms";
import { Alert, Box, Button, Paper, Snackbar, Typography } from "@mui/material";
import { type AuthState, useAuthStore } from "@store";
import { useState } from "react";
import { FormProvider } from "react-hook-form";
import type { LoginFormData } from "./Login.types";
import { useLoginForm } from "./useLoginForm";

const Login: React.FC = () => {
	const LoginMethods = useLoginForm();
	const { mutate: userLogin, isPending } = useUserLogin();
	const setLoginData = useAuthStore((state) => state.login);
	const [snackbar, setSnackbar] = useState({
		open: false,
		message: "",
		severity: "success" as "success" | "error",
	});
	const showSnackbar = (message: string, severity: "success" | "error") => {
		setSnackbar({
			open: true,
			message,
			severity,
		});
	};

	const onSubmit = (data: LoginFormData) => {
		const payload = data;
		userLogin(payload, {
			onSuccess: (res: LoginResponse) => {
				if (res.data) {
					const payload: Partial<AuthState> = {
						accessToken: res.data.token,
						refreshToken: res.data.refreshToken,
						user: {
							userId: res.data.userId,
							userName: res.data.username,
							role: res.data.role,
						},
						isLoggedIn: true,
					};
					setLoginData(payload);
					LoginMethods.reset();
				}
			},
			onError: (err) => {
				showSnackbar(err?.message || "Failed to login", "error");
			},
		});
	};

	return (
		<>
			<Box
				sx={{
					width: "100%",
					height: "100vh",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					backgroundColor: "#111827",
					padding: 2,
				}}
			>
				<Paper
					elevation={6}
					sx={{
						width: "100%",
						maxWidth: 500,
						padding: { xs: 3, md: 5 },
						borderRadius: 3,
					}}
				>
					<Typography
						variant="h4"
						sx={{ fontWeight: 600, textAlign: "center", mb: 6 }}
					>
						Login
					</Typography>
					<FormProvider {...LoginMethods}>
						<form
							onSubmit={LoginMethods.handleSubmit(onSubmit)}
							className="flex flex-col gap-6"
						>
							<LogInForm />
							<Button
								type="submit"
								variant="contained"
								size="large"
								disabled={isPending}
								sx={{
									backgroundColor: "#111827",
									"&:hover": { backgroundColor: "#1f2937" },
									width: "100%",
								}}
							>
								{isPending ? "Logging in..." : "Login"}
							</Button>
						</form>
					</FormProvider>
				</Paper>
			</Box>
			<Snackbar
				open={snackbar.open}
				autoHideDuration={3000}
				onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
			>
				<Alert
					onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
					severity={snackbar.severity}
					variant="filled"
					sx={{ width: "100%" }}
				>
					{snackbar.message}
				</Alert>
			</Snackbar>
		</>
	);
};

export default Login;
