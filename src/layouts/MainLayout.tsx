import { ChatWindow } from "@src/features/chat";
import { Sidebar } from "@src/features/sidebar";

const MainLayout: React.FC = () => {
	return (
		<div className="flex h-screen bg-black">
			<Sidebar />
			<ChatWindow />
		</div>
	);
};

export default MainLayout;
