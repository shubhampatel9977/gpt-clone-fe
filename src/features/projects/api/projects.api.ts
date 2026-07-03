import { axiosWithAuth } from "@lib";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { PROJECTS_API_ENDPOINTS } from "./projects.endpoints";

import type {
	CreateProjectPayload,
	ProjectResponse,
	ProjectsResponse,
	UpdateProjectPayload,
} from "./projects.types";

/** GET all projects */
export const useProjects = () => {
	return useQuery({
		queryKey: ["projects"],

		queryFn: async (): Promise<ProjectsResponse> => {
			try {
				const { data } = await axiosWithAuth.get(
					PROJECTS_API_ENDPOINTS.getProjects,
				);

				return data;
			} catch (err: unknown) {
				if (axios.isAxiosError(err)) {
					throw new Error(
						err.response?.data?.message || "Failed to fetch projects",
						{
							cause: err,
						},
					);
				}

				throw new Error("Unexpected error occurred while fetching projects", {
					cause: err,
				});
			}
		},
	});
};

/** GET project by id */
export const useProject = (projectId: string) => {
	return useQuery({
		queryKey: ["project", projectId],

		enabled: !!projectId,

		queryFn: async (): Promise<ProjectResponse> => {
			try {
				const { data } = await axiosWithAuth.get(
					PROJECTS_API_ENDPOINTS.getProjectById(projectId),
				);

				return data;
			} catch (err: unknown) {
				if (axios.isAxiosError(err)) {
					throw new Error(
						err.response?.data?.message || "Failed to fetch project",
						{
							cause: err,
						},
					);
				}

				throw new Error("Unexpected error occurred while fetching project", {
					cause: err,
				});
			}
		},
	});
};

/** CREATE project */
export const useCreateProject = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (
			input: CreateProjectPayload,
		): Promise<ProjectResponse> => {
			try {
				const { data } = await axiosWithAuth.post(
					PROJECTS_API_ENDPOINTS.createProject,
					input,
				);

				return data;
			} catch (err: unknown) {
				if (axios.isAxiosError(err)) {
					throw new Error(
						err.response?.data?.message || "Failed to create project",
						{
							cause: err,
						},
					);
				}

				throw new Error("Unexpected error occurred while creating project", {
					cause: err,
				});
			}
		},

		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["projects"],
			});
		},
	});
};

/** UPDATE project */
export const useUpdateProject = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({
			projectId,
			payload,
		}: {
			projectId: string;
			payload: UpdateProjectPayload;
		}): Promise<ProjectResponse> => {
			try {
				const { data } = await axiosWithAuth.patch(
					PROJECTS_API_ENDPOINTS.updateProject(projectId),
					payload,
				);

				return data;
			} catch (err: unknown) {
				if (axios.isAxiosError(err)) {
					throw new Error(
						err.response?.data?.message || "Failed to update project",
						{
							cause: err,
						},
					);
				}

				throw new Error("Unexpected error occurred while updating project", {
					cause: err,
				});
			}
		},

		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({
				queryKey: ["projects"],
			});

			queryClient.invalidateQueries({
				queryKey: ["project", variables.projectId],
			});
		},
	});
};

/** DELETE project */
export const useDeleteProject = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (projectId: string): Promise<ProjectResponse> => {
			try {
				const { data } = await axiosWithAuth.delete(
					PROJECTS_API_ENDPOINTS.deleteProject(projectId),
				);

				return data;
			} catch (err: unknown) {
				if (axios.isAxiosError(err)) {
					throw new Error(
						err.response?.data?.message || "Failed to delete project",
						{
							cause: err,
						},
					);
				}

				throw new Error("Unexpected error occurred while deleting project", {
					cause: err,
				});
			}
		},

		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["projects"],
			});
		},
	});
};
