import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@utils/cn";

import Spinner from "./Spinner";

type Variant =
	| "primary"
	| "secondary"
	| "danger"
	| "ghost";

interface ButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	variant?: Variant;
	isLoading?: boolean;
}

const variants: Record<Variant, string> = {
	primary:
		"bg-white text-black hover:bg-lightGray",
	secondary:
		"border border-gray bg-transparent text-white hover:bg-gray",
	danger:
		"bg-error text-white hover:opacity-90",
	ghost:
		"text-lightGray hover:bg-darkGray hover:text-white",
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
				"inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition cursor-pointer",
				"disabled:cursor-not-allowed disabled:opacity-50",
				variants[variant],
				className,
			)}
			disabled={disabled || isLoading}
			{...props}
		>
			{isLoading ? (
				<>
					<Spinner />
					<span>Loading...</span>
				</>
			) : (
				children
			)}
		</button>
	);
};

export default Button;
