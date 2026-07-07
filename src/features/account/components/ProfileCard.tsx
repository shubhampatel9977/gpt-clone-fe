import { Mail, Shield } from "lucide-react";

import { useAuthStore } from "@features/auth";

const ProfileCard: React.FC = () => {

	const user = useAuthStore((state) => state.user);

	const initials = user?.userName?.trim().charAt(0).toUpperCase() ?? "?";

	return (
		<div className="rounded-3xl border border-gray bg-darkGray p-3 md:p-6">
			<div className="flex flex-col items-center gap-3 md:gap-5 text-center sm:flex-row sm:text-left">
				<div className="flex h-16 md:h-20 w-16 md:w-20 items-center justify-center rounded-full bg-gray text-3xl font-semibold">
					{initials}
				</div>

				<div className="flex-1">
					<h2 className="text-xl md:text-2xl font-semibold text-white">
						{user?.userName}
					</h2>

					<div className="mt-2 md:mt-3 space-y-2 text-sm text-lightGray">
						<div className="flex items-center justify-center gap-2 sm:justify-start">
							<Mail size={16} />
							{user?.userEmail}
						</div>

						{/* <div className="flex items-center justify-center gap-2 sm:justify-start">
							<User size={16} />

							Google Account
						</div> */}

						<div className="flex items-center justify-center gap-2 sm:justify-start">
							<Shield size={16} />
							{user?.role}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileCard;
