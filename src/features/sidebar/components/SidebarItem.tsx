interface SidebarItemProps {
	title: string;
}

const SidebarItem = ({ title }: SidebarItemProps) => {
	return (
		<button
			type="button"
			className="w-full rounded-lg px-3 py-2 text-left text-sm text-gray-300 transition hover:bg-neutral-800"
		>
			{title}
		</button>
	);
};

export default SidebarItem;
