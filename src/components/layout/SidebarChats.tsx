import { useConversations } from "@features/conversations";
import { ROUTES } from "@src/routes/routes.constants";
import { INITIAL_SHOW_CHATS_LIMIT } from "@src/utils";
import { LoaderCircle, PenSquare } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SidebarItem from "./SidebarItem";
import SidebarSection from "./SidebarSection";

interface SidebarChatsProps {
	onNavigate?: () => void;
}

const SidebarChats: React.FC<SidebarChatsProps> = ({ onNavigate }) => {
	const navigate = useNavigate();
	const [showAll, setShowAll] = useState(false);

	const { data, isLoading } = useConversations();

	const chats = data?.data ?? [];

	const visibleChats = showAll
		? chats
		: chats.slice(0, INITIAL_SHOW_CHATS_LIMIT);

	if (isLoading) {
		return (
			<SidebarSection title="Chats">
				<div className="flex py-5 items-center justify-center text-lightGray">
					<LoaderCircle className="animate-spin" />
				</div>
			</SidebarSection>
		);
	}

	if (!chats.length) {
		return (
			<SidebarSection title="Chats">
				<p className="px-3 text-xs text-lightGray">No chats yet</p>
			</SidebarSection>
		);
	}

	return (
		<SidebarSection
			title="Chats"
			action={
				<button
					type="button"
					onClick={(e) => {
						e.stopPropagation();
						onNavigate?.();
						navigate(ROUTES.NEW_CHAT);
					}}
					className="text-lightGray transition-colors hover:text-white cursor-pointer"
				>
					<PenSquare size={16} />
				</button>
			}
		>
			{visibleChats.map((chat) => (
				<div key={chat.id} className="px-2">
					<SidebarItem
						label={chat.title}
						to={`/c/${chat.id}`}
						onClick={onNavigate}
					/>
				</div>
			))}

			{chats.length > INITIAL_SHOW_CHATS_LIMIT && (
				<button
					type="button"
					onClick={() => setShowAll((prev) => !prev)}
					className="px-3 text-xs text-lightGray hover:text-white cursor-pointer"
				>
					{showAll ? "Show Less" : "See More"}
				</button>
			)}
		</SidebarSection>
	);
};

export default SidebarChats;
