import {
	SidebarItem,
	SidebarSection,
} from "@components/layout";

const projects = [
	"GPT Clone",
	"Portfolio",
];

const SidebarProjects = () => {
	return (
		<SidebarSection title="Projects">
			{projects.map((project) => (
				<SidebarItem
					key={project}
					label={project}
				/>
			))}
		</SidebarSection>
	);
};

export default SidebarProjects;
