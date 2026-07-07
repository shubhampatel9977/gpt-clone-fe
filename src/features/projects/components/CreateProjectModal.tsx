import { Button, Modal } from "@components";
import { FormProvider } from "react-hook-form";
import toast from "react-hot-toast";
import { useCreateProject, type ProjectResponse } from "../api";
import { useCreateProjectForm } from "../hooks";
import { CreateProjectForm } from "./form";
import { useNavigate } from "react-router-dom";

interface CreateProjectModalProps {
	open: boolean;
	onClose: () => void;
}

const CreateProjectModal = ({ open, onClose }: CreateProjectModalProps) => {

	const navigate = useNavigate();
	const methods = useCreateProjectForm();

	const { mutate: createProject, isPending } = useCreateProject();

	const onSubmit = (data: { name: string }) => {
		createProject(data, {
			onSuccess: (resData: ProjectResponse) => {
				methods.reset();
				toast.success("Project created successfully");
				onClose();
				navigate(`project/${resData.data?.id}`);
			},

			onError: (err) => {
				toast.error(err?.message || "Failed to create project");
			},
		});
	};

	return (
		<Modal open={open} onClose={onClose}>
			<div className="flex flex-col gap-4">
				<div>
					<h2 className="text-xl font-semibold text-white">Create Project</h2>

					<p className="mt-2 text-sm text-lightGray">
						Create a project to organize related conversations.
					</p>
				</div>

				<FormProvider {...methods}>
					<form
						onSubmit={methods.handleSubmit(onSubmit)}
						className="flex flex-col gap-3"
					>
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
