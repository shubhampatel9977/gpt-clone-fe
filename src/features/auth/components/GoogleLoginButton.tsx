import { GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { type GoogleLoginResponse, useGoogleLogin } from "../api";
import { type AuthState, useAuthStore } from "../store";
import { LoaderCircle } from "lucide-react";

const GoogleLoginButton = () => {
	const { mutate: googleLogin, isPending } = useGoogleLogin();

	const setLoginData = useAuthStore((state) => state.login);

	if(isPending) {
		return (
			<div className="flex py-3 items-center justify-center text-lightGray">
				<LoaderCircle className="animate-spin" />
			</div>
		)
	}

	return (
		<div className="w-full">
			<GoogleLogin
				onSuccess={(credentialResponse) => {
					const token = credentialResponse.credential;

					if (!token) {
						toast.error("Google token not found");

						return;
					}

					googleLogin({token}, {
						onSuccess: (res: GoogleLoginResponse) => {
							if (!res.data) {
								return;
							}

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
							toast.success("Login successful");
						},

						onError: (err) => {
							toast.error(err.message || "Failed to login with Google");
						},
					});
				}}
				onError={() => {
					toast.error("Google login failed");
				}}
				width="100%"
			/>
		</div>
	);
};

export default GoogleLoginButton;
