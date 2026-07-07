import { cn } from "@utils/cn";
import { forwardRef } from "react";

interface TextareaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ error, className, ...props }, ref) => {
		return (
			<div className="w-full">
				<textarea
					ref={ref}
					className={cn(
						"w-full resize-none rounded-3xl border border-gray bg-darkGray px-4 py-3 text-white outline-none",
						"placeholder:text-lightGray",
						"focus:border-white",
						error && "border-error",
						className,
					)}
					{...props}
				/>

				{error && <p className="mt-1 text-sm text-error">{error}</p>}
			</div>
		);
	},
);

Textarea.displayName = "Textarea";

export default Textarea;
