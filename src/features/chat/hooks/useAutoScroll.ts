import { useEffect, useRef } from "react";

export const useAutoScroll = <T>(dependency: T) => {
	const bottomRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		void dependency;

		bottomRef.current?.scrollIntoView({
			behavior: "smooth",
		});
	}, [dependency]);

	return bottomRef;
};
