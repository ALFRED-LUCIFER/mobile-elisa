// src/types/chat.ts - Chat specific types

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: string; // ISO string format
  status: 'sending' | 'sent' | 'delivered' | 'failed';
  metadata?: {
    confidence?: number;
    sources?: string[];
    processingTime?: number;
    isWelcomeMessage?: boolean;
    [key: string]: any; // Allow additional metadata
  };
}

export interface ChatApiRequest {
  message: string;
  sessionId: string;
  userId: string;
  context?: {
    previousMessages?: Message[];
  };
}

export interface ChatApiResponse {
  message: string;
  confidence: number;
  sources: string[];
  processingTime: number;
  sessionId: string;
}
