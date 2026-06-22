import {
	FolderClosed,
	FolderOpen,
	Plus,
} from "lucide-react";
import { useState } from "react";

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
}

const ProjectRow = ({
	projectId,
	projectName,
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
			</button>

			{expanded && (
				<div className="ml-4 mt-1 space-y-1">
					{isLoading && (
						<p className="px-3 text-xs text-lightGray">
							Loading...
						</p>
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
	const [showCreateModal, setShowCreateModal] =
		useState(false);

	const { data, isLoading } =
		useProjects();

	const projects =
		data?.data ?? [];

	if (isLoading) {
		return (
			<SidebarSection title="Projects">
				<p className="px-3 text-xs text-lightGray">
					Loading...
				</p>
			</SidebarSection>
		);
	}

	return (
		<>
			<SidebarSection
				title="Projects"
				action={
					<button
						type="button"
						onClick={() =>
							setShowCreateModal(
								true,
							)
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
