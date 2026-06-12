import * as yup from "yup";

/**
 * Username Schema – validates username with start letter & alphanumeric rules.
 */
export const getUsernameSchema = () =>
	yup
		.string()
		.trim()
		.required("Username is required.")
		.matches(
			/^[A-Za-z][A-Za-z0-9_]*$/,
			"Username must start with a letter and should not contain spaces or special characters except underscores.",
		)
		.min(3, "Username must be at least 3 characters.")
		.max(24, "Username must be at most 24 characters.");

/**
 * Password Schema:
 * – validates password with min/max length, uppercase & special char.
 */
export const getPasswordSchema = () => {
	return yup
		.string()
		.trim()
		.required("Password is required.")
		.min(8, "Password must be at least 8 characters.")
		.max(14, "Password must be at most 14 characters.")
		.matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
		.matches(/\d/, "Password must contain at least one number.")
		.matches(
			/[!@#$%^&*()[\]{}\-_+=|:;"'<>,.?/~`]/,
			"Password must contain at least one special character.",
		);
};
