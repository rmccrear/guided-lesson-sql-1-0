import ModelClient from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";

// Helper to get the GitHub Models client instance safely
const getGitHubModelsClient = () => {
  const token = process.env.GITHUB_TOKEN || '';
  
  if (!token) {
    return null;
  }
  
  const endpoint = "https://models.inference.ai.azure.com";
  return new ModelClient(endpoint, new AzureKeyCredential(token));
};

export const sendMessageToGitHubModels = async (
  history: { role: 'user' | 'assistant' | 'system'; content: string }[],
  newMessage: string,
  context?: string
): Promise<string> => {
  const client = getGitHubModelsClient();

  if (!client) {
    return "Error: GITHUB_TOKEN is missing. Please check your environment variables.";
  }

  try {
    const model = 'gpt-4o-mini'; // GPT-4o mini is available on GitHub Models
    
    // Construct system message
    const systemMessage = {
      role: 'system' as const,
      content: `You are an enthusiastic and helpful SQL Tutor for a coding bootcamp. 
The student is currently working on a lesson about: ${context || 'General SQL'}.

Your goals:
1. Help them debug their SQL queries.
2. Explain concepts like SELECT, WHERE, COUNT, SUM, GROUP BY.
3. If they ask for the answer to a challenge, guide them with hints first, don't just give the code immediately unless they seem very stuck.
4. Keep responses concise and formatted with Markdown.
5. Assume they are using PostgreSQL (Supabase).`
    };

    const messages = [
      systemMessage,
      ...history.map(msg => ({
        role: msg.role,
        content: msg.content,
      })),
      {
        role: 'user' as const,
        content: newMessage,
      }
    ];

    const response = await client.path("/chat/completions").post({
      body: {
        messages,
        model,
        max_tokens: 1000,
      }
    });

    if (response.status !== "200") {
      throw new Error(`API returned status ${response.status}`);
    }

    const result = response.body.choices[0]?.message?.content;
    return result || "I couldn't generate a response.";
    
  } catch (error: any) {
    console.error("GitHub Models API Error:", error);
    return `Error: ${error.message || 'Something went wrong with the AI service.'}`;
  }
};
