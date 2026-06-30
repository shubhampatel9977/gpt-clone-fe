import { ChevronDown } from "lucide-react";
import { useState, type ReactNode } from "react";

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
			<button
				type="button"
				onClick={() => setOpen((prev) => !prev)}
				className="group flex w-full items-center justify-between px-3"
			>
				<div className="flex items-center gap-2">
					<h3 className="text-sm font-semibold uppercase tracking-wide text-white">
						{title}
					</h3>
				
					{action && (
						<button
							type="button"
							onClick={(e) => e.stopPropagation()}
							className="opacity-0 transition-opacity duration-200 group-hover:opacity-100 text-lightGray hover:text-white"
						>
							{action}
						</button>
					)}
				</div>

				<div className="text-lightGray transition-colors hover:text-white">
					<ChevronDown
						size={16}
						className={`transition-transform ${
							open ? "" : "-rotate-90"
						}`}
					/>
				</div>
			</button>

			{open && (
				<div className="space-y-1">
					{children}
				</div>
			)}
		</div>
	);
};

export default SidebarSection;
