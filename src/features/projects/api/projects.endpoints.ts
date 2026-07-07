export const PROJECTS_API_ENDPOINTS = {
	createProject: "/api/projects",
	getProjects: "/api/projects",
	getProjectById: (projectId: string) => `/api/projects/${projectId}`,
	updateProject: (projectId: string) => `/api/projects/${projectId}`,
	deleteProject: (projectId: string) => `/api/projects/${projectId}`,
};
