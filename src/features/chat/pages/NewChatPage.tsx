import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import { Button, PageLoader } from "@components";
import { useCreateConversation } from "@features/conversations";
import { useModels } from "@features/models";
import { NewChatTopBar } from "../components";
import { APP_NAME } from "@src/utils";

const NewChatPage = () => {
	const navigate = useNavigate();

	const { projectId } = useParams();
	const [searchParams] = useSearchParams();
	const isTemporary = searchParams.get("temporary-chat") === "true";

	const [selectedModelId, setSelectedModelId] = useState<string | null>(null);

	const { data, isLoading, error } = useModels();

	const {
		mutateAsync: createConversation,
		isPending,
	} = useCreateConversation();

	const models = data?.data ?? [];

	useEffect(() => {
		if (
			!models.length ||
			selectedModelId
		) {
			return;
		}

		const defaultModel =
			models.find(
				(model) => model.isDefault,
			) ?? models[0];

		setSelectedModelId(
			defaultModel.id,
		);
	}, [
		models,
		selectedModelId,
	]);

	const handleStartChat = async () => {
		try {
			if (!selectedModelId) {
				toast.error(
					"Please select a model",
				);
				return;
			}

			const payload = {
				modelId:
					selectedModelId,

				...(projectId && {
					projectId,
				}),

				...(isTemporary && {
					isTemporary: true,
				}),
			};

			const response =
				await createConversation(
					payload,
				);

			const conversationId =
				response.data?.id;

			if (!conversationId) {
				throw new Error(
					"Conversation not created",
				);
			}

			navigate(
				`/c/${conversationId}`,
			);
		} catch (err) {
			toast.error(
				err instanceof Error
					? err.message
					: "Failed to create conversation",
			);
		}
	};

	if (isLoading) {
		return <PageLoader />;
	}

	if (error) {
		return (
			<div className="flex h-full items-center justify-center">
				<p className="text-error">
					Failed to load models
				</p>
			</div>
		);
	}

	return (
		<>
			<NewChatTopBar title={APP_NAME} showTemporary={true} />
			<div className="flex h-[90%] items-center justify-center px-4">
				<div className="w-full max-w-5xl">
					<div className="mb-10">
						<h1 className="mb-3 text-4xl font-semibold text-white">
							{isTemporary
								? "Temporary Chat"
								: "Start New Chat"}
						</h1>
						<p className="text-lightGray">
							{isTemporary
								? "Messages won't appear in history and won't be shown in the sidebar."
								: "Select a model to begin your conversation"}
						</p>
					</div>

					<div className="grid gap-4 md:grid-cols-3">
						{models.map((model) => {
							const isSelected =
								model.id ===
								selectedModelId;

							return (
								<button
									key={
										model.id
									}
									type="button"
									onClick={() =>
										setSelectedModelId(
											model.id,
										)
									}
									className={`rounded-2xl border p-5 text-left transition-all duration-200 cursor-pointer ${
										isSelected
											? "border-white bg-gray"
											: "border-gray bg-darkGray hover:border-lightGray"
									}`}
								>
									<div className="mb-3 flex items-center justify-between">
										<h3 className="text-lg font-semibold text-white">
											{
												model.label
											}
										</h3>

										{model.isDefault && (
											<span className="rounded-full border border-lightGray px-2 py-1 text-xs text-lightGray">
												Default
											</span>
										)}
									</div>

									<p className="mb-2 text-sm text-lightGray">
										{
											model.provider
										}
									</p>

									<p className="text-sm text-lightGray">
										{
											model.description
										}
									</p>
								</button>
							);
						})}
					</div>

					<div className="mt-10 flex justify-center">
						<Button
							onClick={
								handleStartChat
							}
							isLoading={
								isPending
							}
							disabled={
								!selectedModelId
							}
							className="min-w-55"
						>
							Start Chat
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};

export default NewChatPage;
