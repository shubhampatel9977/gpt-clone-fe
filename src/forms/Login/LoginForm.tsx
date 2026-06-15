import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";

import { Input } from "@components";
import type { loginFieldConfig } from "./LoginForm.types";

const LogInForm = () => {
	const [showPassword, setShowPassword] = useState(false);

	const {
		control,
		formState: { errors },
	} = useFormContext();

	const loginFieldConfig: loginFieldConfig[] = [
		{
			name: "email",
			label: "Email*",
			placeholder: "Enter Email",
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
		<div className="flex flex-col gap-5">
			{loginFieldConfig.map(
				({ name, fieldType, label, placeholder }) => (
					<Controller
						key={name}
						control={control}
						name={name}
						render={({ field }) => (
							<div className="relative">
								<Input
									{...field}
									label={label}
									placeholder={placeholder}
									type={fieldType}
									error={errors[name]?.message as string}
								/>

								{name === "password" && (
									<button
										type="button"
										onClick={() =>
											setShowPassword((prev) => !prev)
										}
										className="absolute right-3 top-9.5 text-lightGray"
										aria-label="Toggle password visibility"
									>
										{showPassword ? (
											<EyeOff size={18} />
										) : (
											<Eye size={18} />
										)}
									</button>
								)}
							</div>
						)}
					/>
				),
			)}
		</div>
	);
};

export default LogInForm;
