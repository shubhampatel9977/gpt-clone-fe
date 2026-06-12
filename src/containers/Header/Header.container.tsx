import logo from "@assets/logo.png";
import LogoutIcon from "@mui/icons-material/Logout";
import {
	AppBar,
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	Toolbar,
	Typography,
} from "@mui/material";
import { ROUTES } from "@utils/constants";
import { useLogout } from "@utils/useLogout";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const TopHeaderBar = () => {
	const location = useLocation();
	const navigate = useNavigate();

	// State for controlling modal visibility
	const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);

	const { handleLogout, isPending } = useLogout();

	// Close modal handler
	const handleOnClose = () => setShowLogoutConfirmation((prev) => !prev);

	// Logout button handler
	function logoutHandler() {
		setShowLogoutConfirmation(false);
		handleLogout();
	}

	const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();

		if (location.pathname === ROUTES.HOME) {
			// already on home refresh
			window.location.reload();
		} else {
			// not on home navigate without refresh
			navigate(ROUTES.HOME);
		}
	};

	return (
		<>
			{/* Header */}
			<Box>
				<AppBar
					position="static"
					elevation={0}
					sx={{
						backgroundColor: "grey.100",
						zIndex: 1,
					}}
				>
					<Toolbar
						sx={{
							display: "flex",
							justifyContent: "space-between",
							px: 2,
							py: 1,
						}}
					>
						{/* Logo */}
						<Box
							component="a"
							href={ROUTES.HOME}
							onClick={handleLogoClick}
							sx={{
								width: 60,
								display: "flex",
								alignItems: "center",
							}}
						>
							<Box
								component="img"
								src={logo}
								alt="SYExchange"
								sx={{
									width: "100%",
									objectFit: "contain",
								}}
							/>
						</Box>

						{/* Logout Button */}
						<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
							<IconButton
								onClick={() => setShowLogoutConfirmation(true)}
								sx={{
									border: "1px solid",
									borderColor: "primary.main",
									color: "primary.main",
								}}
							>
								<LogoutIcon />
							</IconButton>
						</Box>
					</Toolbar>
				</AppBar>
			</Box>

			{/* Logout Confirmation Dialog */}
			<Dialog
				open={showLogoutConfirmation}
				onClose={handleOnClose}
				maxWidth="xs"
				fullWidth
			>
				<DialogTitle>Logout</DialogTitle>

				<DialogContent>
					<Typography variant="body1">
						Are you sure you want to logout?
					</Typography>
				</DialogContent>

				<DialogActions sx={{ px: 3, pb: 3 }}>
					<Button variant="outlined" onClick={handleOnClose}>
						Cancel
					</Button>

					<Button
						variant="contained"
						color="error"
						onClick={logoutHandler}
						disabled={isPending}
					>
						{isPending ? "Logging out..." : "Logout"}
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default TopHeaderBar;
