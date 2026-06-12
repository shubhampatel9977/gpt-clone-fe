import { useState } from "react";
import { LogOut } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import logo from "@assets/logo.png";
import { Modal, Button } from "@components";
import { ROUTES } from "@utils/constants";
import { useLogout } from "@utils/useLogout";

const Header = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

	const { handleLogout, isPending } = useLogout();

	const handleLogoClick = (
		e: React.MouseEvent<HTMLAnchorElement>,
	) => {
		e.preventDefault();

		if (location.pathname === ROUTES.HOME) {
			window.location.reload();
			return;
		}

		navigate(ROUTES.HOME);
	};

	const handleConfirmLogout = () => {
		setIsLogoutModalOpen(false);
		handleLogout();
	};

	return (
		<>
			<header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
				<div className="flex h-16 items-center justify-between px-4">
					<a
						href={ROUTES.HOME}
						onClick={handleLogoClick}
						className="flex w-15 items-center"
					>
						<img
							src={logo}
							alt="GPT Clone"
							className="w-full object-contain"
						/>
					</a>

					<button
						type="button"
						onClick={() => setIsLogoutModalOpen(true)}
						className="flex h-10 w-10 items-center justify-center rounded-lg border border-red-500 text-red-500 transition-colors hover:bg-red-50"
						aria-label="Logout"
					>
						<LogOut size={18} />
					</button>
				</div>
			</header>

			<Modal
				open={isLogoutModalOpen}
				title="Logout"
				onClose={() => setIsLogoutModalOpen(false)}
			>
				<div className="space-y-5">
					<p className="text-sm text-gray-600">
						Are you sure you want to logout?
					</p>

					<div className="flex justify-end gap-3">
						<Button
							variant="secondary"
							onClick={() =>
								setIsLogoutModalOpen(false)
							}
						>
							Cancel
						</Button>

						<Button
							variant="danger"
							onClick={handleConfirmLogout}
							isLoading={isPending}
						>
							Logout
						</Button>
					</div>
				</div>
			</Modal>
		</>
	);
};

export default Header;