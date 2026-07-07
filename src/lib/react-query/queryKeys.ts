export const QUERY_KEYS = {
	// Auth
	currentUser: ["current-user"],

	// Models
	models: ["models"],

	// Projects
	projects: ["projects"],

	project: (projectId: string) => ["project", projectId],

	// Conversations
	conversations: ["conversations"],

	conversation: (conversationId: string) => ["conversation", conversationId],

	projectConversations: (projectId: string) => [
		"project-conversations",
		projectId,
	],

	// Messages
	messages: (conversationId: string) => ["messages", conversationId],
} as const;
