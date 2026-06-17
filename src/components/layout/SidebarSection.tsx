import type { ReactNode } from "react";

interface SidebarSectionProps {
	title: string;
	children: ReactNode;
}

const SidebarSection = ({
	title,
	children,
}: SidebarSectionProps) => {
	return (
		<div className="space-y-2">
			<h3 className="px-3 text-xs font-semibold uppercase tracking-wide text-lightGray">
				{title}
			</h3>

			<div className="space-y-1">
				{children}
			</div>
		</div>
	);
};

export default SidebarSection;
