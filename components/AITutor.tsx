import React, { useState, useRef, useEffect } from 'react';
import { sendMessageToGitHubModels } from '../services/gitHubModelsService';
import { ChatMessage, Lesson } from '../types';
import { Send, Bot, User, Loader2, Sparkles } from 'lucide-react';

interface AITutorProps {
  contextLesson: Lesson;
}

export const AITutor: React.FC<AITutorProps> = ({ contextLesson }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: `Hi! I'm your SQL Tutor. I see you're working on "${contextLesson.title}". How can I help you with this lesson?`,
      timestamp: Date.now()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Reset context when lesson changes, but keep history if you want, or add a separator
  useEffect(() => {
      // Optional: Add a system message when lesson changes to indicate context switch
      const systemNote: ChatMessage = {
          role: 'model',
          text: `We've moved to **${contextLesson.title}**. Let me know if you have questions about this topic!`,
          timestamp: Date.now()
      };
      setMessages(prev => [...prev, systemNote]);
  }, [contextLesson.id]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Convert message history to GitHub Models format (model -> assistant)
    const apiHistory = messages.map(m => ({ 
      role: m.role === 'model' ? 'assistant' as const : m.role as 'user',
      content: m.text 
    }));

    const responseText = await sendMessageToGitHubModels(apiHistory, input, contextLesson.title);

    const modelMsg: ChatMessage = { role: 'model', text: responseText, timestamp: Date.now() };
    setMessages(prev => [...prev, modelMsg]);
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-900">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                msg.role === 'user' ? 'bg-indigo-600' : 'bg-emerald-600'
              }`}
            >
              {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
            </div>
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-indigo-600 text-white rounded-tr-none'
                  : 'bg-gray-700 text-gray-200 rounded-tl-none'
              }`}
            >
              <div className="whitespace-pre-wrap font-sans">
                 {/* Basic Markdown rendering for code blocks */}
                 {msg.text.split('```').map((part, i) => {
                     if (i % 2 === 1) {
                         return <code key={i} className="block bg-black/30 p-2 rounded my-2 font-mono text-xs">{part}</code>;
                     }
                     return <span key={i}>{part}</span>;
                 })}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3">
             <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center shrink-0">
                 <Bot size={16} />
             </div>
             <div className="bg-gray-700 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-2">
                 <Loader2 size={16} className="animate-spin text-gray-400" />
                 <span className="text-gray-400 text-sm">Thinking...</span>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-gray-800 border-t border-gray-700">
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a question about SQL..."
            className="w-full bg-gray-900 text-white border border-gray-600 rounded-xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none h-[50px] overflow-hidden"
            style={{ minHeight: '50px' }}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-indigo-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
          </button>
        </div>
        <div className="mt-2 flex items-center justify-center gap-2 text-xs text-gray-500">
            <Sparkles size={12} />
            <span>Powered by GitHub Models (GPT-4o mini)</span>
        </div>
      </div>
    </div>
  );
};
