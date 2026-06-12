import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@utils/cn";

type Variant = "primary" | "secondary" | "danger" | "ghost";

interface ButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	variant?: Variant;
	isLoading?: boolean;
}

const variants: Record<Variant, string> = {
	primary:
		"bg-black text-white hover:bg-neutral-800",
	secondary:
		"border border-gray-300 bg-white text-black hover:bg-gray-100",
	danger:
		"bg-red-600 text-white hover:bg-red-700",
	ghost:
		"hover:bg-gray-100",
};

const Button = ({
	children,
	variant = "primary",
	isLoading = false,
	className,
	disabled,
	...props
}: ButtonProps) => {
	return (
		<button
			className={cn(
				"inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition",
				"disabled:cursor-not-allowed disabled:opacity-50",
				variants[variant],
				className,
			)}
			disabled={disabled || isLoading}
			{...props}
		>
			{isLoading ? "Loading..." : children}
		</button>
	);
};

export default Button;
