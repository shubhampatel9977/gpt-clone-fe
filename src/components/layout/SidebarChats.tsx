import { useState } from "react";
import { LoaderCircle } from "lucide-react";

import { useConversations } from "@features/conversations";

import SidebarItem from "./SidebarItem";
import SidebarSection from "./SidebarSection";

const INITIAL_LIMIT = 5;

const SidebarChats = () => {
	const [showAll, setShowAll] =
		useState(false);

	const { data, isLoading } =
		useConversations();

	const chats =
		data?.data ?? [];

	const visibleChats =
		showAll
			? chats
			: chats.slice(
					0,
					INITIAL_LIMIT,
				);

	if (isLoading) {
		return (
			<SidebarSection title="Chats">
				<div className="flex py-5 items-center justify-center">
					<LoaderCircle className="animate-spin" color="#C0C0C1" />
				</div>
			</SidebarSection>
		);
	}

	if (!chats.length) {
		return (
			<SidebarSection title="Chats">
				<p className="px-3 text-xs text-lightGray">
					No chats yet
				</p>
			</SidebarSection>
		);
	}

	return (
		<SidebarSection title="Chats">
			{visibleChats.map(
				(chat) => (
					<SidebarItem
						key={chat.id}
						label={chat.title}
						to={`/c/${chat.id}`}
					/>
				),
			)}

			{chats.length >
				INITIAL_LIMIT && (
				<button
					type="button"
					onClick={() =>
						setShowAll(
							(prev) =>
								!prev,
						)
					}
					className="px-3 text-xs text-lightGray hover:text-white"
				>
					{showAll
						? "Show Less"
						: "See More"}
				</button>
			)}
		</SidebarSection>
	);
};

export default SidebarChats;
