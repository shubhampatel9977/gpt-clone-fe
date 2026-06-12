import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

import type { loginFieldConfig } from "./LoginForm.types";

const LogInForm: React.FC = () => {
	const [showPassword, setShowPassword] = useState(false);

	const {
		control,
		formState: { errors },
	} = useFormContext();

	const loginFieldConfig: loginFieldConfig[] = [
		{
			name: "username",
			label: "Username*",
			placeholder: "Enter Username",
			fieldType: "text",
			isRequired: true,
		},
		{
			name: "password",
			label: "Password*",
			placeholder: "Enter Password",
			fieldType: showPassword ? "text" : "password",
			isRequired: true,
		},
	];
	return (
		<div className="md:space-y-5 space-y-2 flex flex-col gap-8">
			{loginFieldConfig.map(({ name, fieldType, label, placeholder }) => (
				<Controller
					key={name}
					control={control}
					name={name}
					render={({ field }) => (
						<TextField
							{...field}
							fullWidth
							label={label}
							placeholder={placeholder}
							type={fieldType}
							error={!!errors[name]}
							helperText={errors[name]?.message as string}
							slotProps={
								name === "password"
									? {
											input: {
												endAdornment: (
													<InputAdornment position="end">
														<IconButton
															onClick={() => setShowPassword((prev) => !prev)}
															edge="end"
															aria-label="toggle password visibility"
														>
															{showPassword ? (
																<VisibilityOff />
															) : (
																<Visibility />
															)}
														</IconButton>
													</InputAdornment>
												),
											},
										}
									: undefined
							}
						/>
					)}
				/>
			))}
		</div>
	);
};

export default LogInForm;
