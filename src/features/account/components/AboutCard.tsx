import { Info } from "lucide-react";

import { APP_NAME } from "@src/utils";

const VERSION = import.meta.env.VITE_APP_VERSION ?? "1.0.0";

const AboutCard = () => {
	return (
		<div className="rounded-3xl border border-gray bg-darkGray py-3 px-6 md:py-6">
			<div className="flex items-center gap-3">
				<Info />

				<div>
					<h2 className="text-xl font-semibold text-white">
						About
					</h2>

					<p className="text-lightGray">
						{APP_NAME}
					</p>

					<p className="mt-1 text-sm text-lightGray">
						Version {VERSION}
					</p>
				</div>
			</div>
		</div>
	);
};

export default AboutCard;
