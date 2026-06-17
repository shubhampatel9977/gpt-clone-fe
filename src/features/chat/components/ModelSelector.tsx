import { useEffect } from "react";

import { Chip } from "@components";

import { useModels } from "@features/models";
import { useUIStore } from "@features/ui";

const ModelSelector = () => {
	const {
		data,
		isLoading,
		error,
	} = useModels();

	const selectedModelId = useUIStore(
		(state) => state.selectedModelId,
	);

	const setSelectedModel = useUIStore(
		(state) => state.setSelectedModel,
	);

	const models = data?.data ?? [];

	useEffect(() => {
		if (
			selectedModelId ||
			models.length === 0
		) {
			return;
		}

		const defaultModel =
			models.find(
				(model) => model.isDefault,
			) ?? models[0];

		setSelectedModel(defaultModel.id);
	}, [
		models,
		selectedModelId,
		setSelectedModel,
	]);

	if (isLoading) {
		return (
			<div className="flex flex-wrap gap-2">
				<div className="h-9 w-32 animate-pulse rounded-full bg-gray" />
				<div className="h-9 w-32 animate-pulse rounded-full bg-gray" />
				<div className="h-9 w-32 animate-pulse rounded-full bg-gray" />
			</div>
		);
	}

	if (error) {
		return (
			<p className="text-sm text-error">
				Failed to load models
			</p>
		);
	}

	return (
		<div className="flex flex-wrap gap-2">
			{models.map((model) => (
				<Chip
					key={model.id}
					label={model.label}
					isActive={
						selectedModelId ===
						model.id
					}
					onClick={() =>
						setSelectedModel(
							model.id,
						)
					}
				/>
			))}
		</div>
	);
};

export default ModelSelector;
