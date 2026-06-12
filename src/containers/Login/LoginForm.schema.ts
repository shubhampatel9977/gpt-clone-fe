import { z } from "zod";

import { usernameSchema, passwordSchema } from "@utils/commonSchema";

export const loginFormSchema = () =>
	z.object({
		username: usernameSchema,
		password: passwordSchema,
	});
