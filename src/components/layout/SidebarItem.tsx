import { cn } from "@utils/cn";
import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";

interface SidebarItemProps {
	label: string;
	icon?: ReactNode;
	to: string;
	onClick?: () => void;
}

const SidebarItem = ({ label, icon, to, onClick }: SidebarItemProps) => {
	return (
		<NavLink
			to={to}
			onClick={onClick}
			className={({ isActive }) =>
				cn(
					"flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-white transition-colors",
					isActive ? "bg-gray" : "hover:bg-darkGray",
				)
			}
		>
			{icon}

			<span className="truncate">{label}</span>
		</NavLink>
	);
};

export default SidebarItem;
