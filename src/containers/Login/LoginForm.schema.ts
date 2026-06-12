import { z } from "zod";

import { emailSchema, passwordSchema } from "@utils/commonSchema";

export const loginFormSchema = () =>
	z.object({
		email: emailSchema,
		password: passwordSchema,
	});
