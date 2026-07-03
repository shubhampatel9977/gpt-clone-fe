import { SidebarItem } from "@components/layout";
import { ROUTES } from "@src/routes/routes.constants";
import { PenSquare } from "lucide-react";

const SidebarHeader = () => {
	return (
		<div className="p-2">
			<SidebarItem
				label="New chat"
				icon={<PenSquare size={18} />}
				to={ROUTES.NEW_CHAT}
			/>
		</div>
	);
};

export default SidebarHeader;
