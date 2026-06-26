import {
	FolderClosed,
	FolderOpen,
	LoaderCircle,
	Plus,
	SquarePen,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useProjectConversations } from "@features/conversations";
import {
	CreateProjectModal,
	useProjects,
} from "@features/projects";

import SidebarItem from "./SidebarItem";
import SidebarSection from "./SidebarSection";

const INITIAL_LIMIT = 5;

interface ProjectRowProps {
	projectId: string;
	projectName: string;
	onOpenProject: (
		projectId: string,
	) => void;
}

const ProjectRow = ({
	projectId,
	projectName,
	onOpenProject,
}: ProjectRowProps) => {

	const [expanded, setExpanded] =
		useState(false);

	const [showAll, setShowAll] =
		useState(false);

	const { data, isLoading } =
		useProjectConversations(
			projectId,
			expanded,
		);

	const conversations =
		data?.data ?? [];

	const visibleConversations =
		showAll
			? conversations
			: conversations.slice(
					0,
					INITIAL_LIMIT,
				);



	return (
		<div>
			<div className="group flex items-center rounded-lg px-3 py-2 hover:bg-darkGray">
				<button
					type="button"
					onClick={() =>
						setExpanded(
							(prev) =>
								!prev,
						)
					}
					className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-lightGray transition-colors hover:bg-darkGray"
				>
					{expanded ? (
						<FolderOpen size={16} />
					) : (
						<FolderClosed size={16} />
					)}

					<span className="flex-1 truncate">
						{projectName}
					</span>

					<button
						type="button"
						onClick={(e) => {
							e.stopPropagation();
							onOpenProject(
								projectId,
							);
						}}
						className="opacity-0 transition-opacity duration-200 group-hover:opacity-100 text-lightGray hover:text-white"
					>
						<SquarePen size={14} />
					</button>
				</button>
			</div>

			{expanded && (
				<div className="ml-4 mt-1 space-y-1">
					{isLoading && (
						<div className="flex py-5 items-center justify-center">
							<LoaderCircle className="animate-spin" color="#C0C0C1" />
						</div>
					)}

					{!isLoading &&
						!conversations.length && (
							<p className="px-3 text-xs text-lightGray">
								No conversations
							</p>
						)}

					{visibleConversations.map(
						(
							conversation,
						) => (
							<SidebarItem
								key={
									conversation.id
								}
								label={
									conversation.title
								}
								to={`/c/${conversation.id}`}
							/>
						),
					)}

					{conversations.length >
						INITIAL_LIMIT && (
						<button
							type="button"
							onClick={() =>
								setShowAll(
									(
										prev,
									) =>
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
				</div>
			)}
		</div>
	);
};

const SidebarProjects = () => {

	const navigate = useNavigate();

	const [showCreateModal, setShowCreateModal] =
		useState(false);

	const { data, isLoading } =
		useProjects();

	const projects =
		data?.data ?? [];

	if (isLoading) {
		return (
			<SidebarSection title="Projects">
				<div className="flex py-5 items-center justify-center">
					<LoaderCircle className="animate-spin" color="#C0C0C1" />
				</div>
			</SidebarSection>
		);
	}

	const handleOpenProject = (projectId: string) => {
		navigate(
			`/project/${projectId}`,
		);
	};

	return (
		<>
			<SidebarSection
				title="Projects"
				action={
					<button
						type="button"
						onClick={() =>
							setShowCreateModal(true)
						}
						className="text-lightGray transition-colors hover:text-white"
					>
						<Plus size={14} />
					</button>
				}
			>
				{!projects.length && (
					<p className="px-3 text-xs text-lightGray">
						No projects yet
					</p>
				)}

				{projects.map(
					(project) => (
						<ProjectRow
							key={
								project.id
							}
							projectId={
								project.id
							}
							projectName={
								project.name
							}
							onOpenProject={handleOpenProject}
						/>
					),
				)}
			</SidebarSection>

			<CreateProjectModal
				open={
					showCreateModal
				}
				onClose={() =>
					setShowCreateModal(
						false,
					)
				}
			/>
		</>
	);
};

export default SidebarProjects;
