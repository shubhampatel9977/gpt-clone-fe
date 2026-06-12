import { getPasswordSchema, getUsernameSchema } from "@utils/commonSchema";
import * as yup from "yup";

export const loginFormSchema = () =>
	yup.object().shape({
		username: getUsernameSchema(),
		password: getPasswordSchema(),
	});
