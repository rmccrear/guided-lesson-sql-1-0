import ModelClient from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import { Lesson } from "../types";

// Helper to generate ChatGPT-ready prompt
export const generateChatGPTPrompt = (
  lesson: Lesson, 
  chatHistory: { role: string; text: string }[],
  currentQuestion?: string
): string => {
  // Find the last user question from history or use current
  const lastUserMessage = currentQuestion || 
    [...chatHistory].reverse().find(msg => msg.role === 'user')?.text || 
    'How can I get started with this lesson?';

  // Format chat history if it exists
  const historySection = chatHistory.length > 0 ? `
**Previous Conversation:**
${chatHistory.map(msg => `${msg.role === 'user' ? 'Student' : 'Tutor'}: ${msg.text}`).join('\n\n')}
` : '';

  return `You are an enthusiastic and helpful Coding Tutor for a coding bootcamp.

**Current Lesson Context:**
- **Title:** ${lesson.title}
- **Type:** ${lesson.type}
- **Description:** ${lesson.description}

**Lesson Content:**
${lesson.content}

${lesson.challenges && lesson.challenges.length > 0 ? `
**Challenges:**
${lesson.challenges.map((ch, i) => `${i + 1}. ${ch}`).join('\n')}
` : ''}

${lesson.codeSnippets && lesson.codeSnippets.length > 0 ? `
**Code Examples:**
${lesson.codeSnippets.map((snippet, i) => `
${i + 1}. ${snippet.description || 'Example'}
\`\`\`${snippet.language}
${snippet.code}
\`\`\`
`).join('\n')}
` : ''}

**Your goals as a tutor:**
1. Help the student understand and apply the concepts from this lesson
2. Debug their code and explain any errors
3. If they ask for the answer to a challenge, guide them with hints first - don't just give the code immediately unless they seem very stuck
4. Keep responses concise and formatted with Markdown
5. Reference the lesson content and examples when explaining concepts
${historySection}
**Student's Current Question:**
${lastUserMessage}`;
};

// Helper to get the GitHub Models client instance safely
const getGitHubModelsClient = () => {
  const token = process.env.GITHUB_TOKEN || '';
  
  if (!token) {
    return null;
  }
  
  const endpoint = "https://models.inference.ai.azure.com";
  return ModelClient(endpoint, new AzureKeyCredential(token));
};

export const sendMessageToGitHubModels = async (
  history: { role: 'user' | 'assistant' | 'system'; content: string }[],
  newMessage: string,
  lesson: Lesson
): Promise<string> => {
  const client = getGitHubModelsClient();

  if (!client) {
    // Generate ChatGPT-ready prompt
    const chatGPTPrompt = generateChatGPTPrompt(lesson, history.map(h => ({ role: h.role, text: h.content })), newMessage);
    
    // Generate GitHub Codespaces link if we know the repository
    const repoUrl = process.env.GITHUB_REPOSITORY 
      ? `https://github.com/${process.env.GITHUB_REPOSITORY}`
      : 'the repository';
    const codespacesUrl = process.env.GITHUB_REPOSITORY
      ? `https://github.com/codespaces/new?repo=${process.env.GITHUB_REPOSITORY}`
      : '';
    
    return `**AI Tutor Unavailable**

This deployment doesn't have access to the AI service. To use the AI Tutor:

1. Open ${repoUrl} in GitHub
2. Click the **Code** button → **Codespaces** tab
3. Create a new Codespace${codespacesUrl ? ` or [click here](${codespacesUrl})` : ''}

The AI Tutor will be automatically enabled in Codespaces with GitHub Models.

---

**Or paste this prompt into ChatGPT:**

\`\`\`\`
${chatGPTPrompt}
\`\`\`\``;
  }

  try {
    const model = 'gpt-4o-mini'; // GPT-4o mini is available on GitHub Models
    
    // Construct system message with lesson context
    const systemMessage = {
      role: 'system' as const,
      content: `You are an enthusiastic and helpful Coding Tutor for a coding bootcamp. 
The student is currently working on a lesson about: ${lesson.title}.

**Lesson Description:** ${lesson.description}

Your goals:
1. Help them understand and apply the concepts from this lesson.
2. Debug their code and explain any errors.
3. If they ask for the answer to a challenge, guide them with hints first, don't just give the code immediately unless they seem very stuck.
4. Keep responses concise and formatted with Markdown.
5. Reference the lesson content and examples when explaining concepts.`
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

    const result = (response.body as any).choices?.[0]?.message?.content;
    return result || "I couldn't generate a response.";
    
  } catch (error: any) {
    console.error("GitHub Models API Error:", error);
    return `Error: ${error.message || 'Something went wrong with the AI service.'}`;
  }
};
