import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, LogOut } from "lucide-react";

import { Avatar, ConfirmDialog, DropdownMenu } from "@components";
import { useAuthStore, useLogout } from "@features/auth";
import { ROUTES } from "@src/routes/routes.constants";

interface UserProfileProps {
	onNavigate?: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ onNavigate }) => {

	const navigate = useNavigate();

	const [showMenu, setShowMenu] = useState(false);
	const [showLogoutModal, setShowLogoutModal] = useState(false);

	const { user } = useAuthStore((state) => state);

	const { handleLogout, isPending } = useLogout();

	const menuItems = [
		{
			id: "account",
			label: "Account",
			icon: <User size={18} />,
			destructive: false,
		},
		{
			id: "logout",
			label: "Logout",
			icon: <LogOut size={18} />,
			destructive: true,
		},
	];

	return (
		<>
			<div className="relative">
				<button
					type="button"
					onClick={() => setShowMenu((prev) => !prev)}
					className="flex w-full items-center gap-3 rounded-xl px-3 py-2 hover:bg-darkGray transition-colors cursor-pointer"
				>
					<Avatar name={user?.userName || "Guest"} />

					<div className="min-w-0 flex-1 text-left">
						<p className="truncate text-sm font-medium text-white">
							{user?.userName}
						</p>
						<p className="truncate text-xs text-lightGray">{user?.userEmail}</p>
					</div>
				</button>

				<div className="absolute bottom-full left-0 mb-2">
					<DropdownMenu
						open={showMenu}
						items={menuItems}
						onClose={() => setShowMenu(false)}
						onSelect={(item) => {
							if (item.id === "logout") {
								setShowLogoutModal(true);
								return;
							}
							if (item.id === "account") {
								onNavigate?.();
								navigate(ROUTES.ACCOUNT);
								return;
							}
						}}
					/>
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

export default UserProfile;
