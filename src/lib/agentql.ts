import type { LoginResponse, MessageResponse, AgentQLResponse } from '@/lib/types';

export async function loginToInstagram(username: string, password: string): Promise<LoginResponse> {
  try {
    const response = await fetch('/api/agent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'login',
        username,
        password,
      }),
    });
    
    const result = await response.json() as AgentQLResponse<LoginResponse>;
    if (!result.success) throw new Error(result.error);
    return result.data!;
  } catch (error) {
    console.error('Error logging in to Instagram:', error);
    throw error;
  }
}

export async function sendInstagramMessage(recipient: string, message: string): Promise<MessageResponse> {
  try {
    const response = await fetch('/api/agent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'sendMessage',
        recipient,
        message,
      }),
    });
    
    const result = await response.json() as AgentQLResponse<MessageResponse>;
    if (!result.success) throw new Error(result.error);
    return result.data!;
  } catch (error) {
    console.error('Error sending Instagram message:', error);
    throw error;
  }
}