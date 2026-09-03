import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Sparkles, RefreshCw, Compass, ArrowRight, User } from 'lucide-react';
import { assistantService, type DestinationContext } from '../../services/assistantService';

interface AriaAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  destinationContext?: DestinationContext;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export const AriaAssistantModal: React.FC<AriaAssistantModalProps> = ({
  isOpen,
  onClose,
  destinationContext
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Default suggested prompts tailored to destination
  const destName = destinationContext?.name || 'Paris';
  const suggestedPrompts = [
    `Best things to do in ${destName}`,
    `How many days should I stay?`,
    `When should I visit?`,
    `Plan a 4-day trip to ${destName}`
  ];

  // Initialize conversation when modal opens or destination changes
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const initialGreeting = destinationContext
        ? `✦ AI TRAVEL ASSISTANT\n\n"Tell me where you're going. I'll help shape the journey for ${destinationContext.name}."\n\nI can advise on quiet spots, local dining, best times to visit, or help plan an easy daily schedule for you.`
        : `✦ AI TRAVEL ASSISTANT\n\n"Tell me where you'd like to travel."\n\nAsk me about any destination, what to see, when to visit, or what kind of trip you want.`;

      setMessages([
        {
          id: 'aria-intro',
          role: 'assistant',
          text: initialGreeting,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen, destinationContext]);

  // Auto-scroll on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Handle escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (isOpen && e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || loading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);
    setError(null);

    try {
      const history = messages.map((m) => ({ role: m.role, text: m.text }));
      const response = await assistantService.askQuestion(query, destinationContext, history);

      const ariaMsg: ChatMessage = {
        id: `aria-${Date.now()}`,
        role: 'assistant',
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, ariaMsg]);
    } catch {
      setError('I encountered an unexpected pause in my thought process. Please try asking again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRetryLast = () => {
    const lastUserMsg = [...messages].reverse().find((m) => m.role === 'user');
    if (lastUserMsg) {
      handleSendMessage(lastUserMsg.text);
    }
  };

  // Render markdown-like formatting (bold, bullet points, paragraphs)
  const renderFormattedText = (rawText: string) => {
    const paragraphs = rawText.split('\n\n');
    return (
      <div className="aria-text-body">
        {paragraphs.map((p, idx) => {
          if (p.startsWith('* ') || p.startsWith('- ')) {
            const listItems = p.split('\n').map((item) => item.replace(/^[*\\-]\s*/, ''));
            return (
              <ul key={idx} className="aria-list">
                {listItems.map((li, lIdx) => (
                  <li key={lIdx} dangerouslySetInnerHTML={{ __html: formatInline(li) }} />
                ))}
              </ul>
            );
          }
          if (p.match(/^\d+\.\s/)) {
            const listItems = p.split('\n').map((item) => item.replace(/^\d+\.\s*/, ''));
            return (
              <ol key={idx} className="aria-ordered-list">
                {listItems.map((li, lIdx) => (
                  <li key={lIdx} dangerouslySetInnerHTML={{ __html: formatInline(li) }} />
                ))}
              </ol>
            );
          }
          return <p key={idx} dangerouslySetInnerHTML={{ __html: formatInline(p) }} />;
        })}
      </div>
    );
  };

  const formatInline = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code>$1</code>');
  };

  if (!isOpen) return null;

  return (
    <div 
      className="aria-drawer-backdrop" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="ARIA Travel Companion"
    >
      <div className="aria-drawer-panel" onClick={(e) => e.stopPropagation()}>
        
        {/* Top Header */}
        <div className="aria-header">
          <div className="aria-header-left">
            <div className="aria-avatar-wrap">
              <Sparkles size={16} className="aria-avatar-icon" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="aria-name">✦ AI TRAVEL ASSISTANT</h3>
                <span className="aria-status-badge">
                  <span className="aria-status-dot" /> Online
                </span>
              </div>
              <span className="aria-role">
                {destinationContext 
                  ? `Curator for ${destinationContext.name}, ${destinationContext.country}`
                  : 'Tavira Travel Atelier · ARIA'}
              </span>
            </div>
          </div>
          <button onClick={onClose} className="aria-close-btn" aria-label="Close ARIA assistant">
            <X size={20} />
          </button>
        </div>

        {/* Message Thread */}
        <div className="aria-messages-container">
          
          {/* Destination Context Pill */}
          {destinationContext && (
            <div className="aria-context-banner">
              <Compass size={14} className="text-accent" />
              <span>
                Active Context: <strong>{destinationContext.name}</strong>
                {destinationContext.currentWeather ? ` (${destinationContext.currentWeather.temperature}°C, ${destinationContext.currentWeather.condition})` : ''}
              </span>
            </div>
          )}

          {/* Messages */}
          {messages.map((msg) => (
            <div key={msg.id} className={`aria-msg-row msg-row-${msg.role}`}>
              {msg.role === 'assistant' && (
                <div className="aria-msg-avatar">
                  <Sparkles size={13} />
                </div>
              )}
              <div className={`aria-msg-bubble bubble-${msg.role}`}>
                {msg.role === 'assistant' ? (
                  renderFormattedText(msg.text)
                ) : (
                  <p className="user-msg-text">{msg.text}</p>
                )}
                <span className="msg-timestamp">{msg.timestamp}</span>
              </div>
              {msg.role === 'user' && (
                <div className="user-msg-avatar">
                  <User size={13} />
                </div>
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {loading && (
            <div className="aria-msg-row msg-row-assistant">
              <div className="aria-msg-avatar">
                <Sparkles size={13} />
              </div>
              <div className="aria-msg-bubble bubble-assistant aria-typing-bubble">
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-text">ARIA is consulting destination archives...</span>
              </div>
            </div>
          )}

          {/* Error & Retry */}
          {error && (
            <div className="aria-error-banner">
              <p>{error}</p>
              <button onClick={handleRetryLast} className="aria-retry-btn">
                <RefreshCw size={13} /> Retry response
              </button>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompts Pills */}
        <div className="aria-prompts-tray">
          <span className="prompts-tray-label">Curated Inquiries:</span>
          <div className="prompts-scroll-wrap">
            {suggestedPrompts.map((prompt, pIdx) => (
              <button
                key={pIdx}
                onClick={() => handleSendMessage(prompt)}
                disabled={loading}
                className="aria-prompt-pill"
              >
                <span>{prompt}</span>
                <ArrowRight size={12} />
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
          className="aria-input-form"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Ask ARIA about ${destinationContext ? destinationContext.name : 'any destination'}...`}
            disabled={loading}
            className="aria-chat-input"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="aria-send-btn"
            aria-label="Send inquiry"
          >
            <Send size={16} />
          </button>
        </form>

      </div>

      <style>{`
        .aria-drawer-backdrop {
          position: fixed;
          inset: 0;
          z-index: 130;
          background-color: rgba(18, 18, 17, 0.6);
          backdrop-filter: blur(8px);
          display: flex;
          justify-content: flex-end;
          animation: ariaFadeIn 0.25s ease-out;
        }

        .aria-drawer-panel {
          width: 100%;
          max-width: 520px;
          height: 100%;
          background-color: #F7F4EE;
          border-left: 1px solid #D8D1C7;
          display: flex;
          flex-direction: column;
          box-shadow: -15px 0 40px rgba(0, 0, 0, 0.2);
          animation: ariaSlideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          font-family: var(--font-sans);
          color: #181817;
        }

        .aria-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          border-bottom: 1px solid #D8D1C7;
          background-color: #EFEBE4;
        }

        .aria-header-left {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .aria-avatar-wrap {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #181817;
          color: #F7F4EE;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .aria-avatar-icon {
          color: #D4AF37;
        }

        .aria-name {
          font-family: var(--font-serif);
          font-size: 20px;
          font-weight: 400;
          letter-spacing: 0.04em;
          margin: 0;
        }

        .aria-status-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-weight: 600;
          color: #15803D;
          background: #DCFCE7;
          padding: 2px 6px;
          border-radius: 9999px;
        }

        .aria-status-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: #15803D;
        }

        .aria-role {
          display: block;
          font-size: 12px;
          color: #6E6A62;
          margin-top: 2px;
        }

        .aria-close-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #6E6A62;
          cursor: pointer;
          transition: background-color 0.2s, color 0.2s;
        }

        .aria-close-btn:hover {
          background-color: rgba(0, 0, 0, 0.06);
          color: #181817;
        }

        .aria-messages-container {
          flex: 1;
          overflow-y: auto;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .aria-context-banner {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          background-color: #EFEBE4;
          border: 1px solid #D8D1C7;
          border-radius: 2px;
          font-size: 12px;
          color: #6E6A62;
          align-self: center;
        }

        .aria-msg-row {
          display: flex;
          gap: 12px;
          max-width: 88%;
        }

        .msg-row-assistant {
          align-self: flex-start;
        }

        .msg-row-user {
          align-self: flex-end;
          flex-direction: row-reverse;
        }

        .aria-msg-avatar, .user-msg-avatar {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .aria-msg-avatar {
          background-color: #181817;
          color: #D4AF37;
        }

        .user-msg-avatar {
          background-color: #D8D1C7;
          color: #181817;
        }

        .aria-msg-bubble {
          padding: 16px 20px;
          border-radius: 2px;
          font-size: 14.5px;
          line-height: 1.6;
        }

        .bubble-assistant {
          background-color: #FFFFFF;
          border: 1px solid #D8D1C7;
          color: #181817;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
        }

        .bubble-user {
          background-color: #181817;
          color: #F7F4EE;
          border: 1px solid #181817;
        }

        .user-msg-text {
          margin: 0;
        }

        .aria-text-body p {
          margin: 0 0 12px 0;
        }

        .aria-text-body p:last-child {
          margin-bottom: 0;
        }

        .aria-list, .aria-ordered-list {
          margin: 8px 0 12px 20px;
          padding: 0;
        }

        .aria-list li, .aria-ordered-list li {
          margin-bottom: 6px;
        }

        .msg-timestamp {
          display: block;
          font-size: 10px;
          opacity: 0.6;
          margin-top: 8px;
          text-align: right;
        }

        .aria-typing-bubble {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 14px 18px;
        }

        .typing-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #181817;
          animation: dotPulse 1.4s infinite;
        }

        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }

        .typing-text {
          font-size: 12px;
          color: #6E6A62;
          margin-left: 8px;
          font-style: italic;
        }

        @keyframes dotPulse {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40% { transform: scale(1.1); opacity: 1; }
        }

        .aria-error-banner {
          padding: 12px 16px;
          background-color: #FDF2F2;
          border: 1px solid #F8B4B4;
          color: #9B1C1C;
          border-radius: 2px;
          font-size: 13px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .aria-retry-btn {
          align-self: flex-start;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-weight: 600;
          color: #9B1C1C;
          cursor: pointer;
        }

        .aria-prompts-tray {
          padding: 12px 24px;
          background-color: #EFEBE4;
          border-top: 1px solid #D8D1C7;
        }

        .prompts-tray-label {
          display: block;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          font-weight: 600;
          color: #6E6A62;
          margin-bottom: 8px;
        }

        .prompts-scroll-wrap {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding-bottom: 4px;
          scrollbar-width: none;
        }

        .prompts-scroll-wrap::-webkit-scrollbar {
          display: none;
        }

        .aria-prompt-pill {
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          background-color: #FFFFFF;
          border: 1px solid #D8D1C7;
          border-radius: 9999px;
          font-size: 12px;
          color: #181817;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
        }

        .aria-prompt-pill:hover:not(:disabled) {
          background-color: #181817;
          color: #F7F4EE;
          border-color: #181817;
        }

        .aria-input-form {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 16px 24px;
          border-top: 1px solid #D8D1C7;
          background-color: #FFFFFF;
        }

        .aria-chat-input {
          flex: 1;
          height: 48px;
          padding: 0 16px;
          background-color: #F7F4EE;
          border: 1px solid #D8D1C7;
          border-radius: 2px;
          font-size: 14.5px;
          color: #181817;
          outline: none;
          transition: border-color 0.2s;
        }

        .aria-chat-input:focus {
          border-color: #181817;
        }

        .aria-send-btn {
          width: 48px;
          height: 48px;
          background-color: #181817;
          color: #F7F4EE;
          border: none;
          border-radius: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background-color 0.2s, opacity 0.2s;
        }

        .aria-send-btn:hover:not(:disabled) {
          background-color: #2D2D2B;
        }

        .aria-send-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        @keyframes ariaFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes ariaSlideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }

        @media (max-width: 640px) {
          .aria-drawer-panel {
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  );
};
