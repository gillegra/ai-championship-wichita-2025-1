import { useState, useRef, useEffect } from 'react';
import type { Agent, AgentMessage, AgentType } from '@/types';
import AgentSelector from './AgentSelector';
import './agents.css';

interface AgentChatProps {
  availableAgents: Agent[];
  onSendMessage: (agentType: AgentType, message: string) => Promise<string>;
}

const AgentChat: React.FC<AgentChatProps> = ({ availableAgents, onSendMessage }) => {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(
    availableAgents[0] || null
  );
  const [messages, setMessages] = useState<AgentMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    // Welcome message when agent changes
    if (selectedAgent) {
      const welcomeMessage: AgentMessage = {
        id: `welcome-${Date.now()}`,
        agentType: selectedAgent.type,
        content: `Hi! I'm ${selectedAgent.name}. ${selectedAgent.description} How can I help you today?`,
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, [selectedAgent]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !selectedAgent || isLoading) return;

    const userMessage: AgentMessage = {
      id: `user-${Date.now()}`,
      agentType: selectedAgent.type,
      content: inputMessage,
      timestamp: new Date(),
      context: { sender: 'user' },
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await onSendMessage(selectedAgent.type, inputMessage);

      const agentResponse: AgentMessage = {
        id: `agent-${Date.now()}`,
        agentType: selectedAgent.type,
        content: response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, agentResponse]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: AgentMessage = {
        id: `error-${Date.now()}`,
        agentType: selectedAgent.type,
        content: "I'm sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="agent-chat">
      <div className="agent-chat-sidebar">
        <h3>Your AI Assistants</h3>
        <AgentSelector
          agents={availableAgents}
          selectedAgent={selectedAgent}
          onSelectAgent={setSelectedAgent}
        />
      </div>

      <div className="agent-chat-main">
        {selectedAgent ? (
          <>
            <div className="agent-chat-header">
              <div className="agent-avatar">{selectedAgent.avatar}</div>
              <div className="agent-info">
                <h3>{selectedAgent.name}</h3>
                <p>{selectedAgent.description}</p>
              </div>
            </div>

            <div className="agent-messages">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`message ${
                    message.context?.sender === 'user' ? 'user-message' : 'agent-message'
                  }`}
                >
                  <div className="message-content">{message.content}</div>
                  <div className="message-timestamp">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="message agent-message loading">
                  <div className="message-content">
                    <span className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="agent-input">
              <input
                type="text"
                placeholder={`Ask ${selectedAgent.name} a question...`}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                disabled={isLoading}
              />
              <button onClick={handleSendMessage} disabled={!inputMessage.trim() || isLoading}>
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="no-agent-selected">
            <p>Select an AI assistant from the sidebar to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentChat;
