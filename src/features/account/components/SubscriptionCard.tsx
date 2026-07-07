import { Sparkles } from "lucide-react";

const SubscriptionCard = () => {
	return (
		<div className="rounded-3xl border border-gray bg-darkGray py-3 px-6 md:py-6">
			<div className="flex items-center gap-3">
				<Sparkles />

				<div>
					<h2 className="text-xl font-semibold text-white">
						Subscription
					</h2>

					<p className="text-lightGray">
						Free Plan
					</p>
				</div>
			</div>
		</div>
	);
};

export default SubscriptionCard;
