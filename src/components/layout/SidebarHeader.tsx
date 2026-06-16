import { PenSquare } from "lucide-react";

import { SidebarItem } from "@components/layout";

const SidebarHeader = () => {
	return (
		<div className="p-2">
			<SidebarItem
				label="New chat"
				icon={<PenSquare size={18} />}
			/>
		</div>
	);
};

export default SidebarHeader;
