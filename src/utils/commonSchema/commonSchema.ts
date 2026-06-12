import { z } from "zod";

/** Username Schema – validates username with start letter & alphanumeric rules. */
export const usernameSchema = z
	.string()
	.trim()
	.min(1, "Username is required.")
	.regex(
		/^[A-Za-z][A-Za-z0-9_]*$/,
		"Username must start with a letter and should not contain spaces or special characters except underscores.",
	)
	.min(3, "Username must be at least 3 characters.")
	.max(24, "Username must be at most 24 characters.");

/** Email Schema – validates email format. */
export const emailSchema = z
	.string()
	.trim()
	.min(1, "Email is required.")
	.email("Please enter a valid email address.")
	.max(254, "Email must be at most 254 characters.")
	.refine(
		(email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
		{
			message: "Please enter a valid email address.",
		},
	);

/** Password Schema – validates password with min/max length, uppercase, number & special character. */
export const passwordSchema = z
	.string()
	.trim()
	.min(1, "Password is required.")
	.min(8, "Password must be at least 8 characters.")
	.max(14, "Password must be at most 14 characters.")
	.regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
	.regex(/\d/, "Password must contain at least one number.")
	.regex(
		/[!@#$%^&*()[\]{}\-_+=|:;"'<>,.?/~`]/,
		"Password must contain at least one special character.",
	);
