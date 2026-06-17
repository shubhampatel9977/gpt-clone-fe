import {
	SidebarItem,
	SidebarSection,
} from "@components/layout";

const chats = [
	"React Query Setup",
	"JWT Auth Flow",
	"Streaming Chat",
];

const SidebarChats = () => {
	return (
		<SidebarSection title="Chats">
			{chats.map((chat) => (
				<SidebarItem
					key={chat}
					label={chat}
				/>
			))}
		</SidebarSection>
	);
};

export default SidebarChats;
