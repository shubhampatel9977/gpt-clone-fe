import { FolderClosed, FolderOpen } from "lucide-react";
import { useState } from "react";

import { useProjects } from "@features/projects";
import { useProjectConversations } from "@features/conversations";

import SidebarItem from "./SidebarItem";
import SidebarSection from "./SidebarSection";

const INITIAL_LIMIT = 5;

const ProjectRow = ({
	projectId,
	projectName,
}: {
	projectId: string;
	projectName: string;
}) => {
	const [expanded, setExpanded] =
		useState(false);

	const [showAll, setShowAll] =
		useState(false);

	const { data, isLoading } =
		useProjectConversations(
			projectId,
			expanded
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

	if (isLoading) {
		return (
			<SidebarSection title="Projects">
				<p className="px-3 text-xs text-lightGray">
					Loading...
				</p>
			</SidebarSection>
		);
	}

	if (!conversations.length) {
		return (
			<SidebarSection title="Projects">
				<p className="px-3 text-xs text-lightGray">
					No conversations yet
				</p>
			</SidebarSection>
		);
	}

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
				className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-lightGray hover:bg-darkGray"
			>
				{
					expanded ? (
						<FolderOpen size={16} />
					) : (
						<FolderClosed size={16} />
					)
				}

				<span className="truncate">
					{
						projectName
					}
				</span>
			</button>

			{expanded && (
				<div className="ml-4 mt-1 space-y-1">
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

	if (!projects.length) {
		return (
			<SidebarSection title="Projects">
				<p className="px-3 text-xs text-lightGray">
					No projects yet
				</p>
			</SidebarSection>
		);
	}

	return (
		<SidebarSection title="Projects">
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
	);
};

export default SidebarProjects;
