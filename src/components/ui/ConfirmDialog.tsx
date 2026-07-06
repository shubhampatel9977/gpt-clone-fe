import { Button, Modal } from "@components";

interface ConfirmDialogProps {
	open: boolean;
	title: string;
	description?: string;
	email?: string;
	isLoading?: boolean;
	onClose: () => void;
	onConfirm: () => void;
}

const ConfirmDialog = ({
	open,
	title,
	description,
	email,
	isLoading = false,
	onClose,
	onConfirm,
}: ConfirmDialogProps) => {
	return (
		<Modal open={open} onClose={onClose}>
			<div className="flex flex-col items-center text-center">
				<h2 className="mb-2 md:mb-6 text-2xl md:text-3xl font-semibold text-white">
					{title}
				</h2>

				{description && (
					<p className="mb-2 text-lg md:text-xl text-white">{description}</p>
				)}

				{email && <p className="mb-2 md:mb-6 text-md text-white">{email}</p>}

				<Button
					className="mb-3 md:mb-4 w-full rounded-full"
					isLoading={isLoading}
					onClick={onConfirm}
				>
					Confirm
				</Button>

				<Button
					variant="secondary"
					className="w-full rounded-full"
					onClick={onClose}
				>
					Cancel
				</Button>
			</div>
		</Modal>
	);
};

export default ConfirmDialog;
