import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";

import { cn } from "@utils/cn";

interface SidebarItemProps {
	label: string;
	icon?: ReactNode;
	to: string;
}

const SidebarItem = ({
	label,
	icon,
	to,
}: SidebarItemProps) => {
	return (
		<NavLink
			to={to}
			className={({ isActive }) =>
				cn(
					"flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
					isActive
						? "bg-gray text-white"
						: "text-lightGray hover:bg-darkGray hover:text-white",
				)
			}
		>
			{icon}

			<span className="truncate">
				{label}
			</span>
		</NavLink>
	);
};

export default SidebarItem;
