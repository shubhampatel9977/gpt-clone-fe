import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import type { LoginFormData } from "./Login.types";
import { loginFormSchema } from "./LoginForm.schema";

export const useLoginForm = () => {
	return useForm<LoginFormData>({
		resolver: yupResolver(loginFormSchema()),
		defaultValues: {
			username: "",
			password: "",
		},
	});
};
