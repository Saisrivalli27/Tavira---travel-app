import React from 'react';
import { Sparkles, ArrowRight, MessageSquare } from 'lucide-react';
import { useTravel } from '../../context/TravelContext';

export const ConciergePreview: React.FC = () => {
  const { openAria } = useTravel();

  const examplePrompts = [
    'Quiet places for a week?',
    'Best cities for architecture?',
    'Where should I go in October?'
  ];

  const handlePromptClick = (_prompt: string) => {
    openAria();
  };

  return (
    <section className="concierge-preview-section" aria-label="AI Concierge Guidance">
      <div className="container">
        <div className="concierge-editorial-card">
          
          <div className="concierge-eyebrow-row">
            <span className="concierge-badge">
              <Sparkles size={13} className="text-accent-gold" />
              <span>AI TRAVEL ASSISTANT</span>
            </span>
          </div>

          <div className="concierge-headline-group">
            <h3 className="concierge-question">Not sure where to go?</h3>
            <h2 className="concierge-statement">
              Tell Travira how you <span className="text-serif-italic">want to travel.</span>
            </h2>
          </div>

          <p className="concierge-desc">
            Our AI travel assistant advises on ideal travel pacing, best arrival seasons, quiet historic spots, and local hidden gems.
          </p>

          {/* 3 Editorial Example Prompts */}
          <div className="concierge-prompts-flex">
            {examplePrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handlePromptClick(prompt)}
                className="concierge-chip-btn"
                aria-label={`Ask: ${prompt}`}
              >
                <MessageSquare size={13} className="chip-msg-icon" />
                <span>"{prompt}"</span>
                <ArrowRight size={12} className="chip-arrow" />
              </button>
            ))}
          </div>

          {/* Primary Trigger CTA */}
          <div className="concierge-cta-row">
            <button 
              onClick={() => openAria()}
              className="btn-concierge-primary"
            >
              <span>Ask AI Assistant</span>
              <ArrowRight size={14} className="cta-arrow" />
            </button>
          </div>

        </div>
      </div>

      <style>{`
        .concierge-preview-section {
          padding: 20px 0 60px;
          background-color: var(--color-bg-primary);
        }

        .concierge-editorial-card {
          background-color: #FFFFFF;
          border: 1px solid var(--color-border);
          border-radius: 20px;
          padding: 40px 32px;
          box-shadow: 0 4px 24px rgba(36, 35, 31, 0.04);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          max-width: 860px;
          margin: 0 auto;
        }

        @media (min-width: 768px) {
          .concierge-editorial-card {
            padding: 56px 48px;
          }
        }

        .concierge-eyebrow-row {
          margin-bottom: 16px;
        }

        .concierge-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 12px;
          border-radius: 9999px;
          background-color: #FAF8F4;
          border: 1px solid var(--color-border);
          font-family: var(--font-sans);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          color: var(--color-text-secondary);
        }

        .concierge-headline-group {
          margin-bottom: 16px;
        }

        .concierge-question {
          font-family: var(--font-sans);
          font-size: 15px;
          font-weight: 500;
          color: var(--color-text-secondary);
          margin-bottom: 4px;
        }

        .concierge-statement {
          font-family: var(--font-serif);
          font-size: clamp(1.85rem, 3.2vw, 2.5rem);
          font-weight: 400;
          line-height: 1.2;
          color: var(--color-text-primary);
        }

        .text-serif-italic {
          font-style: italic;
          color: var(--color-accent-primary);
        }

        .concierge-desc {
          font-family: var(--font-sans);
          font-size: 14.5px;
          color: var(--color-text-secondary);
          max-width: 580px;
          line-height: 1.65;
          margin-bottom: 28px;
        }

        .concierge-prompts-flex {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 32px;
        }

        .concierge-chip-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: 9999px;
          background-color: #FAF8F5;
          border: 1px solid var(--color-border);
          color: var(--color-text-primary);
          font-family: var(--font-sans);
          font-size: 13px;
          font-weight: 450;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .chip-msg-icon {
          color: var(--color-accent-gold);
        }

        .chip-arrow {
          color: var(--color-text-muted);
          transition: transform 0.2s;
        }

        .concierge-chip-btn:hover {
          background-color: #FFFFFF;
          border-color: var(--color-border-hover);
          color: var(--color-accent-primary);
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(36, 35, 31, 0.05);
        }

        .concierge-chip-btn:hover .chip-arrow {
          transform: translateX(2px);
          color: var(--color-accent-primary);
        }

        .btn-concierge-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 28px;
          border-radius: 9999px;
          background-color: var(--color-accent-primary);
          color: #FFFFFF;
          font-family: var(--font-sans);
          font-size: 13.5px;
          font-weight: 500;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 16px rgba(62, 74, 61, 0.2);
          transition: all 0.25s ease;
        }

        .btn-concierge-primary:hover {
          background-color: var(--color-accent-hover);
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(62, 74, 61, 0.26);
        }

        .btn-concierge-primary .cta-arrow {
          transition: transform 0.2s ease;
        }

        .btn-concierge-primary:hover .cta-arrow {
          transform: translateX(3px);
        }
      `}</style>
    </section>
  );
};
