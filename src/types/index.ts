// src/types/index.ts - Main type definitions

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface Message {
  id: string;
  content: string;
  type: 'user' | 'bot';
  timestamp: string;
  conversationId: string;
  metadata?: {
    confidence?: number;
    sources?: string[];
  };
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface Machine {
  id: string;
  name: string;
  model: string;
  serialNumber: string;
  status: 'operational' | 'maintenance' | 'offline' | 'error';
  location: string;
  lastMaintenance?: string;
  nextMaintenance?: string;
  description?: string;
  image?: string;
}

export interface MaintenanceTask {
  id: string;
  machineId: string;
  title: string;
  description: string;
  type: 'preventive' | 'corrective' | 'emergency';
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  assignedTo?: string;
  dueDate: string;
  completedAt?: string;
  notes?: string;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  errors?: string[];
}

export interface PaginationParams {
  page: number;
  limit: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
