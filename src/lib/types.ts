export interface AgentQLResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface LoginResponse {
  // Add specific login response fields
  sessionId?: string;
  status?: string;
  // ... other fields returned by AgentQL login
}

export interface MessageResponse {
  // Add specific message response fields
  sent?: boolean;
  timestamp?: string;
  // ... other fields returned by AgentQL message send
}

export interface AgentQLRequest {
  action: 'login' | 'sendMessage';
  username?: string;
  password?: string;
  recipient?: string;
  message?: string;
}
