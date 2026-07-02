import { useEffect, useRef } from "react";

import { cn } from "@utils/cn";

export interface DropdownItem {
	id: string;
	label: string;
	icon?: React.ReactNode;
	destructive?: boolean;
}

interface DropdownMenuProps {
	open: boolean;
	items: DropdownItem[];
	onClose: () => void;
	onSelect: (item: DropdownItem) => void;
	className?: string;
}

const DropdownMenu = ({
	open,
	items,
	onClose,
	onSelect,
	className,
}: DropdownMenuProps) => {
	const menuRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				menuRef.current &&
				!menuRef.current.contains(event.target as Node)
			) {
				onClose();
			}
		};

		document.addEventListener(
			"mousedown",
			handleClickOutside,
		);

		return () => {
			document.removeEventListener(
				"mousedown",
				handleClickOutside,
			);
		};
	}, [onClose]);

	if (!open) return null;

	return (
		<div
			ref={menuRef}
			className={cn(
				"min-w-64 rounded-3xl border border-gray bg-darkGray p-2 shadow-xl",
				className,
			)}
		>
			{items.map((item) => (
				<button
					key={item.id}
					type="button"
					onClick={() => {
						onSelect(item);
						onClose();
					}}
					className={cn(
						"flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition-colors cursor-pointer",
						item.destructive
							? "text-error hover:bg-gray"
							: "text-white hover:bg-gray",
					)}
				>
					{item.icon}

					<span>{item.label}</span>
				</button>
			))}
		</div>
	);
};

export default DropdownMenu;
