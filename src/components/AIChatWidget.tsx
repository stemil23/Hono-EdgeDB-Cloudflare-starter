import React, { useState } from 'react';
import { e } from '../dbschema/edgeql-js';
import { client } from '../edgedb';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export function AIChatWidget() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!input.trim()) return;

    const userMessage: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      const response = await client.query(e.ext.ai.query_ai_index(
        e.MovieWithActorsTxt,
        input,
        { limit: 5 }
      ));

      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: formatResponse(response)
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error querying AI index:', error);
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error while processing your request.'
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const formatResponse = (response: any[]): string => {
    if (response.length === 0) {
      return "I couldn't find any relevant information for your query.";
    }
    return response.map(item => 
      `Title: ${item.title}\nActors: ${item.actors}\nScore: ${item.score.toFixed(2)}`
    ).join('\n\n');
  };

  return (
    <div className="ai-chat-widget">
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.role}`}>
            {message.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about movies and actors..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}