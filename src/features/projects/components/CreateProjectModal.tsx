import { Button, Modal } from "@components";
import { FormProvider } from "react-hook-form";
import toast from "react-hot-toast";

import { useCreateProject } from "../api";
import { useCreateProjectForm } from "../hooks";
import { CreateProjectForm } from "./form";

interface CreateProjectModalProps {
	open: boolean;
	onClose: () => void;
}

const CreateProjectModal = ({ open, onClose }: CreateProjectModalProps) => {
	const methods = useCreateProjectForm();

	const { mutate: createProject, isPending } = useCreateProject();

	const onSubmit = (data: { name: string }) => {
		createProject(data, {
			onSuccess: () => {
				methods.reset();

				toast.success("Project created successfully");

				onClose();
			},

			onError: (err) => {
				toast.error(err?.message || "Failed to create project");
			},
		});
	};

	return (
		<Modal open={open} onClose={onClose}>
			<div className="space-y-6">
				<div>
					<h2 className="text-xl font-semibold text-white">Create Project</h2>

					<p className="mt-1 text-sm text-lightGray">
						Create a project to organize related conversations.
					</p>
				</div>

				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
						<CreateProjectForm />

						<div className="flex justify-end gap-3">
							<Button
								type="button"
								variant="ghost"
								onClick={() => {
									methods.reset();
									onClose();
								}}
							>
								Cancel
							</Button>

							<Button type="submit" isLoading={isPending}>
								Create
							</Button>
						</div>
					</form>
				</FormProvider>
			</div>
		</Modal>
	);
};

export default CreateProjectModal;
