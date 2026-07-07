import { SidebarItem } from "@components/layout";
import { ROUTES } from "@src/routes/routes.constants";
import { PenSquare } from "lucide-react";

interface SidebarHeaderProps {
	onNavigate?: () => void;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ onNavigate }) => {
	return (
		<div className="p-2">
			<SidebarItem
				label="New chat"
				icon={<PenSquare size={18} />}
				to={ROUTES.NEW_CHAT}
				onClick={onNavigate}
			/>
		</div>
	);
};

export default SidebarHeader;
