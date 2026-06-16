import { useState } from "react";

import { Chip } from "@components";

const MODELS = [
	"GPT-4o",
	"Claude Sonnet",
	"Gemini Pro",
];

const ModelSelector = () => {
	const [selectedModel, setSelectedModel] =
		useState("GPT-4o");

	return (
		<div className="flex flex-wrap justify-center gap-2">
			{MODELS.map((model) => (
				<Chip
					key={model}
					label={model}
					isActive={
						selectedModel === model
					}
					onClick={() =>
						setSelectedModel(model)
					}
				/>
			))}
		</div>
	);
};

export default ModelSelector;
