import { cn } from "@utils/cn";

interface AvatarProps {
	name: string;
	className?: string;
}

const Avatar = ({ name, className }: AvatarProps) => {
	const initials = name
		.split(" ")
		.map((word) => word[0])
		.join("")
		.slice(0, 2)
		.toUpperCase();

	return (
		<div
			className={cn(
				"flex h-9 w-9 items-center justify-center rounded-full bg-gray text-sm font-medium text-white",
				className,
			)}
		>
			{initials}
		</div>
	);
};

export default Avatar;
