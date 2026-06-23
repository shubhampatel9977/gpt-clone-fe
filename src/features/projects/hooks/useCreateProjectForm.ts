import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import type { CreateProjectFormData } from "../projects.types";
import { createProjectSchema } from "../schemas";

export const useCreateProjectForm = () => {
	return useForm<CreateProjectFormData>({
		resolver: zodResolver(
			createProjectSchema,
		),

		defaultValues: {
			name: "",
		},
	});
};
