import { AgentQL } from 'agentql';
import type { AgentQLRequest, AgentQLResponse, LoginResponse, MessageResponse } from '@/lib/types';

const agentql = new AgentQL(process.env.AGENTQL_API_KEY!);

export async function POST(request: Request) {
  try {
    const { action, ...data }: AgentQLRequest = await request.json();

    switch (action) {
      case 'login': {
        const loginResult = await agentql.execute('instagram.login', {
          username: data.username,
          password: data.password
        });
        return Response.json<AgentQLResponse<LoginResponse>>({ 
          success: true, 
          data: loginResult 
        });
      }

      case 'sendMessage': {
        const messageResult = await agentql.execute('instagram.sendMessage', {
          recipient: data.recipient,
          message: data.message
        });
        return Response.json<AgentQLResponse<MessageResponse>>({ 
          success: true, 
          data: messageResult 
        });
      }

      default:
        return Response.json<AgentQLResponse>({ 
          success: false, 
          error: 'Invalid action' 
        }, { status: 400 });
    }
  } catch (error) {
    console.error('AgentQL Error:', error);
    return Response.json<AgentQLResponse>({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}