import { ChevronDown } from "lucide-react";
import { useState, type ReactNode } from "react";

interface SidebarSectionProps {
	title: string;
	children: ReactNode;
	defaultOpen?: boolean;
}

const SidebarSection = ({
	title,
	children,
	defaultOpen = true,
}: SidebarSectionProps) => {
	const [open, setOpen] =
		useState(defaultOpen);

	return (
		<div className="space-y-2">
			<button
				type="button"
				onClick={() =>
					setOpen((prev) => !prev)
				}
				className="flex w-full items-center justify-between px-3"
			>
				<h3 className="text-xs font-semibold uppercase tracking-wide text-lightGray">
					{title}
				</h3>

				<ChevronDown
					size={14}
					className={`transition-transform ${
						open
							? ""
							: "-rotate-90"
					}`}
				/>
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
