import {
	Folder,
	MessageCircle,
	MessagesSquare,
	Coins,
} from "lucide-react";
import type { AccountData } from "../api";

interface StatsCardProps {
	stats: AccountData["stats"];
}

const StatsCard:React.FC<StatsCardProps> = ({ stats }) => {

	const statsData = [
		{
			icon: MessageCircle,
			label: "Chats",
			value: stats?.chatCount,
		},
		{
			icon: Folder,
			label: "Projects",
			value: stats?.projectCount
		},
		{
			icon: MessagesSquare,
			label: "Messages",
			value: stats?.messageCount
		},
		{
			icon: Coins,
			label: "Tokens",
			value: stats?.totalTokens
		},
	];

	return (
		<div className="rounded-3xl border border-gray bg-darkGray py-3 px-6 md:py-6">
			<h2 className="mb-5 text-xl font-semibold text-white">
				Usage
			</h2>

			<div className="grid grid-cols-2 gap-4">
				{statsData.map((item) => (
					<div
						key={item.label}
						className="rounded-2xl border border-gray p-5"
					>
						<div className="flex gap-2">
							<item.icon
								size={20}
								className="mb-1 text-lightGray"
							/>
							<p className="text-sm text-lightGray">
								{item.label}
							</p>
						</div>

						<p className="mt-1 text-lg md:text-xl font-semibold text-white">
							{item.value}
						</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default StatsCard;
