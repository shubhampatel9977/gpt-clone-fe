import { cn } from "@utils/cn";

interface DividerProps {
	className?: string;
}

const Divider = ({ className }: DividerProps) => {
	return <div className={cn("h-px w-full bg-gray", className)} />;
};

export default Divider;
