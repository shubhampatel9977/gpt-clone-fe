import { ChevronDown } from "lucide-react";
import { type ReactNode, useState } from "react";

interface SidebarSectionProps {
	title: string;
	children: ReactNode;
	defaultOpen?: boolean;
	action?: ReactNode;
}

const SidebarSection = ({
	title,
	children,
	defaultOpen = true,
	action,
}: SidebarSectionProps) => {
	const [open, setOpen] = useState(defaultOpen);

	return (
		<div className="space-y-2">
			<div className="group flex items-center px-3">
				<button
					type="button"
					onClick={() => setOpen((prev) => !prev)}
					className="flex flex-1 items-center gap-3 text-left cursor-pointer"
				>
					<h3 className="text-sm font-semibold uppercase tracking-wide text-white">
						{title}
					</h3>

					<ChevronDown
						size={16}
						className={`text-lightGray transition-transform duration-200 ${
							open ? "" : "-rotate-90"
						}`}
					/>
				</button>

				{action && <div className="ml-2 action-icon">{action}</div>}
			</div>

			{open && <div className="space-y-1">{children}</div>}
		</div>
	);
};

export default SidebarSection;
