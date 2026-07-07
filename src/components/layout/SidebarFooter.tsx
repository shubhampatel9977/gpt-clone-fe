import { UserProfile } from "@components/layout";
import { Divider } from "@components/ui";

interface SidebarFooterProps {
	onNavigate?: () => void;
}

const SidebarFooter: React.FC<SidebarFooterProps> = ({ onNavigate }) => {
	return (
		<div className="p-3">
			<Divider className="mb-3" />

			<UserProfile onNavigate={onNavigate} />
		</div>
	);
};

export default SidebarFooter;
