import { cn } from "@utils/cn";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	icon: ReactNode;
	isActive?: boolean;
}

const IconButton = ({
	icon,
	isActive = false,
	className,
	...props
}: IconButtonProps) => {
	return (
		<button
			className={cn(
				"flex h-9 w-9 items-center justify-center rounded-full transition-colors cursor-pointer",
				isActive
					? "bg-white text-black"
					: "text-lightGray hover:bg-darkGray hover:text-white",
				className,
			)}
			{...props}
		>
			{icon}
		</button>
	);
};

export default IconButton;
