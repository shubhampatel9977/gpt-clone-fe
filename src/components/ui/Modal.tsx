import { cn } from "@utils/cn";
import { type ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

type ModalSize = "sm" | "md" | "lg" | "xl";

interface ModalProps {
	open: boolean;
	children: ReactNode;
	onClose: () => void;
	size?: ModalSize;
	closeOnEscape?: boolean;
	closeOnBackdrop?: boolean;
	className?: string;
}

const sizeClasses: Record<ModalSize, string> = {
	sm: "max-w-sm",
	md: "max-w-md",
	lg: "max-w-2xl",
	xl: "max-w-4xl",
};

const Modal = ({
	open,
	children,
	onClose,
	size = "md",
	closeOnEscape = true,
	closeOnBackdrop = true,
	className,
}: ModalProps) => {
	useEffect(() => {
		if (!open || !closeOnEscape) {
			return;
		}

		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				onClose();
			}
		};

		window.addEventListener("keydown", handleEscape);

		return () => {
			window.removeEventListener("keydown", handleEscape);
		};
	}, [open, onClose, closeOnEscape]);

	useEffect(() => {
		if (!open) {
			return;
		}

		const previousOverflow = document.body.style.overflow;

		document.body.style.overflow = "hidden";

		return () => {
			document.body.style.overflow = previousOverflow;
		};
	}, [open]);

	if (!open) {
		return null;
	}

	return createPortal(
		<div className="fixed inset-0 z-level-10 flex items-center justify-center p-2 md:p-4">
			{/* Backdrop */}

			<button
				type="button"
				aria-label="Close modal"
				disabled={!closeOnBackdrop}
				onClick={() => {
					if (closeOnBackdrop) {
						onClose();
					}
				}}
				className="absolute inset-0 cursor-pointer bg-black/70 backdrop-blur-sm"
			/>

			{/* Content */}

			<div
				className={cn(
					"relative z-level-1 w-full rounded-3xl border border-gray bg-darkGray p-4 md:p-8 shadow-2xl",
					sizeClasses[size],
					className,
				)}
			>
				{children}
			</div>
		</div>,
		document.body,
	);
};

export default Modal;
