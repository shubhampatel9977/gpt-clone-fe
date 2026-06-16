import { Chip } from "@components";
import { useState } from "react";

const models = [
	"GPT-4o",
	"Claude Sonnet",
	"Gemini Pro",
];

const PromptSuggestions = () => {
	const [selectedModel, setSelectedModel] =
		useState("GPT-4o");

	return (
		<div className="flex flex-wrap justify-center gap-3">
			{models.map((model) => (
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

export default PromptSuggestions;
