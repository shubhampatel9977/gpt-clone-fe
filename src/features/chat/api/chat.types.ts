export interface SendMessagePayload {
	conversationId: string;
	message: string;
}

export interface StreamChunk {
	content?: string;
	done?: boolean;
	error?: boolean;
	message?: string;
}
