import { FolderClosed, Plus } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import { Button, PageLoader } from "@components";
import {
	useProjectConversations,
} from "@features/conversations";
import { useProject } from "../api";

const ProjectPage = () => {
	const navigate = useNavigate();

	const { projectId = "" } = useParams();

    const { data: projectDetails } = useProject(projectId)
	const { data, isLoading } = useProjectConversations(projectId, true);

	const conversations =
		data?.data ?? [];

	if (isLoading) {
		return <PageLoader />;
	}

	return (
		<div className="mx-auto w-full max-w-5xl px-6 py-8">
			<div className="mb-8 flex items-center justify-between">
				<div className="flex items-center gap-3">
					<FolderClosed
						size={24}
					/>

					<h1 className="text-3xl font-semibold text-white">
						{projectDetails?.data?.name}
					</h1>
				</div>

				<Button
					onClick={() =>
						navigate(
							`/project/${projectId}/new-chat`,
						)
					}
				>
					<Plus
						size={16}
					/>

					New Chat
				</Button>
			</div>

			<div className="space-y-2">
				{!conversations.length && (
					<div className="rounded-xl border border-gray bg-darkGray p-6 text-center text-lightGray">
						No conversations yet
					</div>
				)}

				{conversations.map(
					(
						conversation,
					) => (
						<button
							key={ conversation.id }
							type="button"
							onClick={() =>
								navigate(
									`/c/${conversation.id}`,
								)
							}
							className="w-full rounded-xl border border-transparent bg-darkGray p-4 text-left transition-colors hover:border-gray"
						>
							<h3 className="font-medium text-white">
								{
									conversation.title
								}
							</h3>

							<p className="mt-1 text-sm text-lightGray">
								{conversation.model?.label}
							</p>
						</button>
					),
				)}
			</div>
		</div>
	);
};

export default ProjectPage;
