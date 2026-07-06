import { useProjectConversations } from "@features/conversations";
import { CreateProjectModal, useProjects } from "@features/projects";
import { INITIAL_SHOW_CHATS_LIMIT } from "@src/utils";
import {
	FolderClosed,
	FolderOpen,
	LoaderCircle,
	PenSquare,
	SquarePen,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SidebarItem from "./SidebarItem";
import SidebarSection from "./SidebarSection";

interface ProjectRowProps {
	projectId: string;
	projectName: string;
	onOpenProject: (projectId: string) => void;
}

const ProjectRow = ({
	projectId,
	projectName,
	onOpenProject,
}: ProjectRowProps) => {
	const [expanded, setExpanded] = useState(false);

	const [showAll, setShowAll] = useState(false);

	const { data, isLoading } = useProjectConversations(projectId, expanded);

	const conversations = data?.data ?? [];

	const visibleConversations = showAll
		? conversations
		: conversations.slice(0, INITIAL_SHOW_CHATS_LIMIT);

	return (
		<div>
			<div className="group flex items-center rounded-lg hover:bg-darkGray">
				<button
					type="button"
					onClick={() => setExpanded((prev) => !prev)}
					className="flex flex-1 items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-white transition-colors cursor-pointer"
				>
					{expanded ? <FolderOpen size={16} /> : <FolderClosed size={16} />}

					<span className="flex-1 truncate">{projectName}</span>
				</button>

				<button
					type="button"
					onClick={() => onOpenProject(projectId)}
					className="mr-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100 text-lightGray hover:text-white cursor-pointer"
				>
					<SquarePen size={14} />
				</button>
			</div>

			{expanded && (
				<>
					<div className="ml-4 mt-1 space-y-1">
						{isLoading && (
							<div className="flex py-5 items-center justify-center text-lightGray">
								<LoaderCircle className="animate-spin" />
							</div>
						)}

						{!isLoading && !conversations.length && (
							<p className="px-3 pb-3 text-xs text-lightGray">
								No conversations
							</p>
						)}

						{visibleConversations.map((conversation) => (
							<SidebarItem
								key={conversation.id}
								label={conversation.title}
								to={`/c/${conversation.id}`}
							/>
						))}
					</div>
					<div className="ml-2">
						{conversations.length > INITIAL_SHOW_CHATS_LIMIT && (
							<button
								type="button"
								onClick={() => setShowAll((prev) => !prev)}
								className="px-3 text-xs text-lightGray hover:text-white cursor-pointer"
							>
								{showAll ? "Show Less" : "See More"}
							</button>
						)}
					</div>
				</>
			)}
		</div>
	);
};

const SidebarProjects = () => {
	const [showAll, setShowAll] = useState(false);

	const navigate = useNavigate();

	const [showCreateModal, setShowCreateModal] = useState(false);

	const { data, isLoading } = useProjects();

	const projects = data?.data ?? [];

	const visibleProjects = showAll
		? projects
		: projects.slice(0, INITIAL_SHOW_CHATS_LIMIT);

	if (isLoading) {
		return (
			<SidebarSection title="Projects">
				<div className="flex py-5 items-center justify-center text-lightGray">
					<LoaderCircle className="animate-spin" />
				</div>
			</SidebarSection>
		);
	}

	const handleOpenProject = (projectId: string) => {
		navigate(`/project/${projectId}`);
	};

	return (
		<>
			<SidebarSection
				title="Projects"
				action={
					<button
						type="button"
						onClick={(e) => {
							e.stopPropagation();
							setShowCreateModal(true);
						}}
						className="text-lightGray transition-colors hover:text-white cursor-pointer"
					>
						<PenSquare size={16} />
					</button>
				}
			>
				{!projects.length && (
					<p className="px-3 text-xs text-lightGray">No projects yet</p>
				)}

				{visibleProjects.map((project) => (
					<div key={project.id} className="px-2">
						<ProjectRow
							projectId={project.id}
							projectName={project.name}
							onOpenProject={handleOpenProject}
						/>
					</div>
				))}

				{projects.length > INITIAL_SHOW_CHATS_LIMIT && (
					<button
						type="button"
						onClick={() => setShowAll((prev) => !prev)}
						className="px-3 text-xs text-lightGray hover:text-white cursor-pointer"
					>
						{showAll ? "Show Less" : "See More"}
					</button>
				)}
			</SidebarSection>

			<CreateProjectModal
				open={showCreateModal}
				onClose={() => setShowCreateModal(false)}
			/>
		</>
	);
};

export default SidebarProjects;
