export const CONVERSATIONS_API_ENDPOINTS = {
	createConversation: "/api/conversations",
	getConversations: "/api/conversations",
	getConversationById: (conversationId: string) => `/api/conversations/${conversationId}`,
	getProjectConversations: (projectId: string) => `/api/projects/${projectId}/conversations`,
	deleteConversation: (conversationId: string) => `/api/conversations/${conversationId}`,
};
