export const CONVERSATIONS_API_ENDPOINTS = {
	createConversation: "/api/conversations",
	getConversations: "/api/conversations",
	getConversationById: (conversationId: string) => `/api/conversations/${conversationId}`,
	getProjectConversations: (projectId: string) => `/api/conversations/project/${projectId}`,
	deleteConversation: (conversationId: string) => `/api/conversations/${conversationId}`,
};
