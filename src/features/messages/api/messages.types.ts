import type { ApiResponse } from "@src/types";

export type MessageRole =
	| "USER"
	| "ASSISTANT"
	| "SYSTEM";

export interface Message {
	id: string;
	conversationId: string;
	role: MessageRole;
	content: string;
	promptTokens: number;
	completionTokens: number;
	totalTokens: number;
	createdAt: string;
}

export interface ConversationModel {
	id: string;
	label: string;
	provider: string;
}

export interface ConversationDetails {
	id: string;
	title: string;
	isTemporary: boolean;
	userId: string;
	projectId: string | null;
	modelId: string;
	createdAt: string;
	updatedAt: string;
	model: ConversationModel;
}

export interface MessagesData {
	conversation: ConversationDetails;
	messages: Message[];
}

export interface MessagesResponse
	extends ApiResponse {
	data?: MessagesData;
}