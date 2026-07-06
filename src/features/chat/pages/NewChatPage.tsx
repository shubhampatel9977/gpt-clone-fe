import { Button, PageLoader } from "@components";
import { useCreateConversation } from "@features/conversations";
import { useModels } from "@features/models";
import { APP_NAME } from "@src/utils";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { NewChatTopBar } from "../components";

const NewChatPage = () => {
	const navigate = useNavigate();

	const { projectId } = useParams();
	const [searchParams] = useSearchParams();
	const isTemporary = searchParams.get("temporary-chat") === "true";

	const [selectedModelId, setSelectedModelId] = useState<string | null>(null);

	const { data, isLoading, error } = useModels();

	const { mutateAsync: createConversation, isPending } =
		useCreateConversation();

	const models = useMemo(() => data?.data ?? [], [data]);

	const defaultModelId =
		models.find((model) => model.isDefault)?.id ?? models[0]?.id ?? null;

	const effectiveModelId = selectedModelId ?? defaultModelId;

	const handleStartChat = async () => {
		try {
			if (!effectiveModelId) {
				toast.error("Please select a model");
				return;
			}

			const payload = {
				modelId: effectiveModelId,

				...(projectId && {
					projectId,
				}),

				...(isTemporary && {
					isTemporary: true,
				}),
			};

			const response = await createConversation(payload);

			const conversationId = response.data?.id;

			if (!conversationId) {
				throw new Error("Conversation not created");
			}

			navigate(`/c/${conversationId}`);
		} catch (err) {
			toast.error(
				err instanceof Error ? err.message : "Failed to create conversation",
			);
		}
	};

	if (isLoading) {
		return <PageLoader />;
	}

	if (error) {
		return (
			<div className="flex h-full items-center justify-center">
				<p className="text-error">Failed to load models</p>
			</div>
		);
	}

	return (
		<>
			<NewChatTopBar title={APP_NAME} showTemporary />

			<div className="flex flex-1 flex-col overflow-hidden px-4 py-6 lg:px-8">
				<div className="mx-auto flex w-full max-w-6xl flex-1 flex-col overflow-hidden">
					{/* Header */}
					<div className="mb-4 md:mb-6 shrink-0">
						<h1 className="mb-1 md:mb-3 text-xl md:text-3xl font-semibold text-white">
							{isTemporary ? "Temporary Chat" : "Start New Chat"}
						</h1>

						<p className="max-w-2xl text-sm text-lightGray lg:text-base">
							{isTemporary
								? "Messages won't appear in history and won't be shown in the sidebar."
								: "Select a model to begin your conversation."}
						</p>
					</div>

					{/* Scrollable Models */}
					<div className="min-h-0 flex-1 overflow-y-auto">
						<div className="flex flex-wrap gap-3 md:gap-4 justify-center">
							{models.map((model) => {
								const isSelected = model.id === effectiveModelId;

								return (
									<button
										key={model.id}
										type="button"
										onClick={() => setSelectedModelId(model.id)}
										className={`w-full rounded-2xl border p-3 md:p-5 text-left transition-all duration-200 cursor-pointer sm:w-[320px] ${
											isSelected
												? "border-white bg-gray"
												: "border-gray bg-darkGray hover:border-lightGray"
										}`}
									>
										<div className="mb-3 flex items-start justify-between gap-2">
											<h3 className="text-sm md:text-lg font-semibold text-white">
												{model.label}
											</h3>

											{model.isDefault && (
												<span className="shrink-0 rounded-full border border-lightGray px-2 py-1 text-xs text-lightGray">
													Default
												</span>
											)}
										</div>

										<p className="mb-1 md:mb-2 text-xs md:text-sm text-lightGray">
											{model.provider}
										</p>

										<p className="text-xs md:text-sm text-lightGray">
											{model.description}
										</p>
									</button>
								);
							})}
						</div>
					</div>

					{/* Sticky Footer */}
					<div className="shrink-0 border-t border-gray pt-3 md:pt-4 mt-3 md:mt-6">
						<div className="flex justify-center">
							<Button
								onClick={handleStartChat}
								isLoading={isPending}
								disabled={!effectiveModelId}
								className="w-full sm:w-72"
							>
								Start Chat
							</Button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default NewChatPage;
