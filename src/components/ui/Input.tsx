import { cn } from "@utils/cn";
import { forwardRef, useId } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
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
						className="mb-2 block text-white text-sm font-medium"
					>
						{label}
					</label>
				)}

				<input
					id={inputId}
					ref={ref}
					className={cn(
						"w-full text-lightGray rounded-lg border border-lightGray px-3 py-2 outline-none",
						"focus:border-white",
						error && "border-error",
						className,
					)}
					{...props}
				/>

				{error && <p className="mt-1 ml-2 text-sm text-error">{error}</p>}
			</div>
		);
	},
);

Input.displayName = "Input";

export default Input;
