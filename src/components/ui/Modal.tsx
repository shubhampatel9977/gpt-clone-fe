import { useEffect, type ReactNode } from "react";

interface ModalProps {
	open: boolean;
	children: ReactNode;
	onClose: () => void;
}

const Modal = ({
	open,
	children,
	onClose,
}: ModalProps) => {
	useEffect(() => {
		if (!open) return;

		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				onClose();
			}
		};

		window.addEventListener("keydown", handleEscape);

		return () => {
			window.removeEventListener(
				"keydown",
				handleEscape,
			);
		};
	}, [open, onClose]);

	if (!open) return null;

	return (
		<div className="fixed inset-0 z-level-10 flex items-center justify-center p-4">
			{/* Backdrop */}
			<button
				type="button"
				aria-label="Close modal"
				onClick={onClose}
				className="absolute inset-0 bg-black/70 backdrop-blur-sm"
			/>

			{/* Modal Content */}
			<div className="relative w-full max-w-md rounded-3xl border border-gray bg-darkGray p-8 shadow-2xl">
				{children}
			</div>
		</div>
	);
};

export default Modal;
