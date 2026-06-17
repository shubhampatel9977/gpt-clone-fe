import type { ApiResponse } from "@app-types/api.types";

export interface ConversationModel {
	id: string;
	label: string;
	provider?: string;
}

export interface ConversationCount {
	messages: number;
}

export interface Conversation {
	id: string;
	title: string;
	userId?: string;
	projectId?: string | null;
	modelId: string;
	isTemporary: boolean;
	createdAt: string;
	updatedAt: string;
	model?: ConversationModel;
	_count?: ConversationCount;
}

export interface CreateConversationPayload {
	modelId: string;
	projectId?: string;
	isTemporary?: boolean;
}

export interface ConversationsResponse extends ApiResponse {
	data?: Conversation[];
}

export interface ConversationResponse extends ApiResponse {
	data?: Conversation;
}
