// src/store/slices/chatSlice.ts - Redux slice for chat management

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Message } from '../../types/chat';

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  isTyping: boolean;
  error: string | null;
  sessionId: string;
  lastMessageId: string | null;
  connectionStatus: 'connected' | 'disconnected' | 'connecting';
}

const initialState: ChatState = {
  messages: [],
  isLoading: false,
  isTyping: false,
  error: null,
  sessionId: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  lastMessageId: null,
  connectionStatus: 'disconnected',
};

// Async thunk for sending messages
export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async (messageText: string, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { chat: ChatState };
      const userMessage: Message = {
        id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        text: messageText,
        sender: 'user',
        timestamp: new Date().toISOString(),
        status: 'sent',
      };

      // Return the user message and session info for processing
      return {
        userMessage,
        sessionId: state.chat.sessionId,
      };
    } catch (error) {
      return rejectWithValue('Failed to send message');
    }
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
      state.lastMessageId = action.payload.id;
    },
    addBotMessage: (state, action: PayloadAction<{ text: string; metadata?: any }>) => {
      const botMessage: Message = {
        id: `bot_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        text: action.payload.text,
        sender: 'assistant',
        timestamp: new Date().toISOString(),
        status: 'delivered',
        metadata: action.payload.metadata,
      };
      state.messages.push(botMessage);
      state.lastMessageId = botMessage.id;
      state.isTyping = false;
    },
    updateMessageStatus: (state, action: PayloadAction<{ id: string; status: Message['status'] }>) => {
      const message = state.messages.find(msg => msg.id === action.payload.id);
      if (message) {
        message.status = action.payload.status;
      }
    },
    setTyping: (state, action: PayloadAction<boolean>) => {
      state.isTyping = action.payload;
    },
    setConnectionStatus: (state, action: PayloadAction<ChatState['connectionStatus']>) => {
      state.connectionStatus = action.payload;
    },
    clearMessages: (state) => {
      state.messages = [];
      state.lastMessageId = null;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    initializeChat: (state) => {
      // Add welcome message if no messages exist
      if (state.messages.length === 0) {
        const welcomeMessage: Message = {
          id: `welcome_${Date.now()}`,
          text: "Hello! I'm LISA, your intelligent assistant for machine maintenance and support. How can I help you today?",
          sender: 'assistant',
          timestamp: new Date().toISOString(),
          status: 'delivered',
          metadata: {
            isWelcomeMessage: true,
          },
        };
        state.messages.push(welcomeMessage);
        state.lastMessageId = welcomeMessage.id;
      }
      state.connectionStatus = 'connected';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        // Add user message
        state.messages.push(action.payload.userMessage);
        state.lastMessageId = action.payload.userMessage.id;
        // Set typing indicator for bot response
        state.isTyping = true;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isTyping = false;
      });
  },
});

export const {
  addMessage,
  addBotMessage,
  updateMessageStatus,
  setTyping,
  setConnectionStatus,
  clearMessages,
  setError,
  initializeChat,
} = chatSlice.actions;

export default chatSlice.reducer;
