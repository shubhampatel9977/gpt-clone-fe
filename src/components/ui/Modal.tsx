import type { ReactNode } from "react";

interface ModalProps {
	open: boolean;
	title?: string;
	children: ReactNode;
	onClose: () => void;
}

const Modal = ({ open, title, children, onClose }: ModalProps) => {
	if (!open) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
			<div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
				<div className="mb-4 flex items-center justify-between">
					{title && <h2 className="text-lg font-semibold">{title}</h2>}

					<button type="button" onClick={onClose} className="text-xl">
						×
					</button>
				</div>

				{children}
			</div>
		</div>
	);
};

export default Modal;
