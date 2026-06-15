import { z } from "zod";

import { emailSchema, passwordSchema } from "../schemas/auth.schema";

export const loginFormSchema = () =>
	z.object({
		email: emailSchema,
		password: passwordSchema,
	});
