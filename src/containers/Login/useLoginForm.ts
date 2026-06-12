import { zodResolver  } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import type { LoginFormData } from "./Login.types";
import { loginFormSchema } from "./LoginForm.schema";

export const useLoginForm = () => {
	return useForm<LoginFormData>({
		resolver: zodResolver(loginFormSchema()),
		defaultValues: {
			username: "",
			password: "",
		},
	});
};
