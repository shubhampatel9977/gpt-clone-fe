import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import type { LoginFormData } from "../auth.types";
import { loginSchema } from "../schemas";

export const useLoginForm = () => {
	return useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});
};
