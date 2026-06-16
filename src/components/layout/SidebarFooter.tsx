import { UserProfile } from "@components/layout";
import { Divider } from "@components/ui";

const SidebarFooter = () => {
	return (
		<div className="p-3">
			<Divider className="mb-3" />

			<UserProfile />
		</div>
	);
};

export default SidebarFooter;
