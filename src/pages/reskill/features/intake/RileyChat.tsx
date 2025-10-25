import { useState, useEffect, useRef } from 'react';
import type { QuestionConfig, RileyMessage } from './rileyPersona';
import ConversationalInput from './ConversationalInput';

interface Message {
  id: string;
  sender: 'riley' | 'user';
  content: string;
  personaType?: 'skills-training' | 'career-development';
  timestamp: Date;
}

interface RileyChatProps {
  currentQuestion: QuestionConfig | null;
  rileyMessage: RileyMessage | null;
  isTyping: boolean;
  value: any;
  onChange: (field: string, value: any) => void;
  onSubmit: () => void;
  messages: Message[];
  context?: Record<string, string>;
}

const RileyChat: React.FC<RileyChatProps> = ({
  currentQuestion,
  rileyMessage: _rileyMessage,
  isTyping,
  value,
  onChange,
  onSubmit,
  messages,
  context,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    // Show input after Riley's message appears
    if (!isTyping && currentQuestion) {
      const timer = setTimeout(() => setShowInput(true), 300);
      return () => clearTimeout(timer);
    } else {
      setShowInput(false);
    }
  }, [isTyping, currentQuestion]);

  return (
    <div className="riley-chat">
      <div className="chat-messages">
        {/* Riley Avatar and Intro */}
        <div className="riley-intro">
          <div className="riley-avatar-large">👋</div>
          <div className="riley-name">Riley</div>
          <div className="riley-title">Your Career Development Assistant</div>
        </div>

        {/* Message History */}
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.sender === 'riley' ? 'message-riley' : 'message-user'}`}
          >
            {message.sender === 'riley' && (
              <div className="message-avatar">👋</div>
            )}
            <div className={`message-bubble ${message.personaType ? `persona-${message.personaType}` : ''}`}>
              <div className="message-content">{message.content}</div>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="message message-riley">
            <div className="message-avatar">👋</div>
            <div className="message-bubble typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}

        {/* Current Input */}
        {showInput && currentQuestion && !isTyping && (
          <div className="message message-user-input">
            <div className="input-container">
              <ConversationalInput
                question={currentQuestion}
                value={value}
                onChange={onChange}
                onSubmit={onSubmit}
                context={context}
              />
              <button
                onClick={onSubmit}
                disabled={!value || (Array.isArray(value) && value.length === 0)}
                className="btn-submit"
              >
                {currentQuestion.field === 'learningPreferences' ? 'Generate Plan' : 'Continue'} →
              </button>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default RileyChat;
export type { Message };
