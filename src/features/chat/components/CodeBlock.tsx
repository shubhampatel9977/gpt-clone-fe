import { Copy } from "lucide-react";
import toast from "react-hot-toast";

interface CodeBlockProps {
	language?: string;
	code: string;
}

const CodeBlock = ({
	language,
	code,
}: CodeBlockProps) => {
	const copyCode = async () => {
		await navigator.clipboard.writeText(
			code,
		);

		toast.success(
			"Code copied",
		);
	};

	return (
		<div className="my-4 overflow-hidden rounded-2xl border border-gray">
			<div className="flex items-center justify-between bg-black px-4 py-2">
				<span className="text-xs text-lightGray">
					{language || "text"}
				</span>

				<button
					type="button"
					onClick={copyCode}
					className="text-lightGray hover:text-white"
				>
					<Copy size={16} />
				</button>
			</div>

			<pre className="overflow-x-auto bg-darkGray p-4">
				<code>
					{code}
				</code>
			</pre>
		</div>
	);
};

export default CodeBlock;
