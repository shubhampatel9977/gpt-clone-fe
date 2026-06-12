import { forwardRef, useId } from "react";
import { cn } from "@utils/cn";

interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
	({ label, error, className, id, ...props }, ref) => {
		const generatedId = useId();
		const inputId = id || generatedId;

		return (
			<div className="w-full">
				{label && (
					<label
						htmlFor={inputId}
						className="mb-1 block text-sm font-medium"
					>
						{label}
					</label>
				)}

				<input
					id={inputId}
					ref={ref}
					className={cn(
						"w-full rounded-lg border border-gray-300 px-3 py-2 outline-none",
						"focus:border-black",
						error && "border-red-500",
						className,
					)}
					{...props}
				/>

				{error && (
					<p className="mt-1 text-sm text-red-500">
						{error}
					</p>
				)}
			</div>
		);
	},
);

Input.displayName = "Input";

export default Input;
