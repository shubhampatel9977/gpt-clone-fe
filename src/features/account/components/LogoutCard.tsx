import { useState } from "react";
import { LogOut } from "lucide-react";

import { Button, ConfirmDialog } from "@components";
import { useAuthStore, useLogout } from "@src/features/auth";

const LogoutCard = () => {

	const { user } = useAuthStore((state) => state);
	const [showLogoutModal, setShowLogoutModal] = useState(false);

	const { handleLogout, isPending } = useLogout();

	return (
		<>
			<div className="rounded-3xl border border-error/40 bg-darkGray py-3 px-6 md:py-6">
				<div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
					<div>
						<h2 className="flex items-center gap-2 text-xl font-semibold text-white">
							<LogOut size={20} />

							Logout
						</h2>

						<p className="mt-2 text-lightGray">
							Sign out from your account on
							this device.
						</p>
					</div>

					<Button
						// variant="destructive"
						className="w-full sm:w-auto"
						onClick={() => setShowLogoutModal(true)}
					>
						Logout
					</Button>
				</div>
			</div>
			<ConfirmDialog
				open={showLogoutModal}
				title="Are you sure you want to log out?"
				description="Log out of MultiModal AI as"
				email={user?.userEmail}
				isLoading={isPending}
				onClose={() => setShowLogoutModal(false)}
				onConfirm={handleLogout}
			/>
		</>
	);
};

export default LogoutCard;
