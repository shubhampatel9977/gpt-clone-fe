import { z } from "zod";

export const createProjectSchema = z.object({
	name: z
		.string()
		.trim()
		.min(1, "Project name is required")
		.max(
			50,
			"Project name cannot exceed 50 characters",
		),
});

export type CreateProjectFormData =
	z.infer<
		typeof createProjectSchema
	>;
