import { Input } from "@components";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

const LoginForm = () => {
	const [showPassword, setShowPassword] = useState(false);

	const {
		control,
		formState: { errors },
	} = useFormContext();

	return (
		<div className="flex flex-col gap-5">
			<Controller
				control={control}
				name="email"
				render={({ field }) => (
					<Input
						{...field}
						label="Email*"
						placeholder="Enter Email"
						error={errors.email?.message as string}
					/>
				)}
			/>

			<Controller
				control={control}
				name="password"
				render={({ field }) => (
					<div className="relative">
						<Input
							{...field}
							label="Password*"
							placeholder="Enter Password"
							type={showPassword ? "text" : "password"}
							error={errors.password?.message as string}
						/>

						<button
							type="button"
							onClick={() => setShowPassword((prev) => !prev)}
							className="absolute right-3 top-9 text-lightGray"
							aria-label="Toggle password visibility"
						>
							{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
						</button>
					</div>
				)}
			/>
		</div>
	);
};

export default LoginForm;
