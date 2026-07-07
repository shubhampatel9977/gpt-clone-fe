import { cn } from "@utils/cn";
import type { ReactNode } from "react";

interface ChipProps {
	label: string;
	icon?: ReactNode;
	isActive?: boolean;
	onClick?: () => void;
}

const Chip = ({ label, icon, isActive = false, onClick }: ChipProps) => {
	return (
		<button
			type="button"
			onClick={onClick}
			className={cn(
				"flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors cursor-pointer",
				isActive
					? "border-white bg-white text-black"
					: "border-gray text-lightGray hover:bg-darkGray hover:text-white",
			)}
		>
			{icon}
			<span>{label}</span>
		</button>
	);
};

export default Chip;
