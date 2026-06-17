import { ArrowUp } from "lucide-react";
import { useState } from "react";

import { Button } from "@components";

const PromptInput = () => {
	const [message, setMessage] =
		useState("");

	const handleSubmit = () => {
		if (!message.trim()) return;

		console.log("Message:", message);

		setMessage("");
	};

	return (
		<div className="rounded-3xl border border-gray bg-darkGray p-3">
			<textarea
				value={message}
				onChange={(e) =>
					setMessage(e.target.value)
				}
				placeholder="Ask anything..."
				rows={4}
				className="w-full resize-none bg-transparent text-white outline-none placeholder:text-lightGray"
			/>

			<div className="mt-3 flex items-center justify-end">
				<Button
					type="button"
					onClick={handleSubmit}
					disabled={!message.trim()}
					className="h-10 w-10 rounded-full p-0"
				>
					<ArrowUp size={18} />
				</Button>
			</div>
		</div>
	);
};

export default PromptInput;
