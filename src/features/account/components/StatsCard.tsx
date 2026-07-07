import {
	Folder,
	MessageCircle,
	MessagesSquare,
	Coins,
} from "lucide-react";

const stats = [
	{
		icon: MessageCircle,
		label: "Chats",
		value: "245",
	},
	{
		icon: Folder,
		label: "Projects",
		value: "18",
	},
	{
		icon: MessagesSquare,
		label: "Messages",
		value: "4,520",
	},
	{
		icon: Coins,
		label: "Tokens",
		value: "250K",
	},
];

const StatsCard = () => {
	return (
		<div className="rounded-3xl border border-gray bg-darkGray py-3 px-6 md:py-6">
			<h2 className="mb-5 text-xl font-semibold text-white">
				Usage
			</h2>

			<div className="grid grid-cols-2 gap-4">
				{stats.map((item) => (
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
