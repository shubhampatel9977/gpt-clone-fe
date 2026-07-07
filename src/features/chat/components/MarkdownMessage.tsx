import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import CodeBlock from "./CodeBlock";

interface MarkdownMessageProps {
	content: string;
}

const MarkdownMessage = ({ content }: MarkdownMessageProps) => {
	return (
		<ReactMarkdown
			remarkPlugins={[remarkGfm]}
			components={{
				code({ className, children }) {
					const match = /language-(\w+)/.exec(className || "");

					const code = String(children).replace(/\n$/, "");

					return <CodeBlock language={match?.[1]} code={code} />;
				},
			}}
		>
			{content}
		</ReactMarkdown>
	);
};

export default MarkdownMessage;
