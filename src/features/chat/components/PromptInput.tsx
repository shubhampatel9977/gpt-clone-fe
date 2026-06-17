import { Mic, Plus } from "lucide-react";

import {
	IconButton,
	Textarea,
} from "@components";

const PromptInput = () => {
	return (
		<div className="mx-auto w-full max-w-3xl">
			<div className="rounded-[28px] border border-gray bg-darkGray p-3">
				<Textarea
					rows={2}
					placeholder="Ask anything"
					className="border-0 bg-transparent p-0"
				/>

				<div className="mt-3 flex items-center justify-between">
					<IconButton
						icon={<Plus size={18} />}
					/>

					<IconButton
						icon={<Mic size={18} />}
					/>
				</div>
			</div>
		</div>
	);
};

export default PromptInput;
