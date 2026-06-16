import type { ReactNode } from "react";

import { cn } from "@src/utils/cn";

interface SidebarItemProps {
	label: string;
	icon?: ReactNode;
	isActive?: boolean;
	onClick?: () => void;
}

const SidebarItem = ({
	label,
	icon,
	isActive = false,
	onClick,
}: SidebarItemProps) => {
	return (
		<button
			type="button"
			onClick={onClick}
			className={cn(
				"flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors cursor-pointer",
				isActive
					? "bg-gray text-white"
					: "text-lightGray hover:bg-darkGray hover:text-white",
			)}
		>
			{icon}

			<span className="truncate">
				{label}
			</span>
		</button>
	);
};

export default SidebarItem;
