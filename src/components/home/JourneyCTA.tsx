import React from 'react';
import { ArrowRight, MapPin } from 'lucide-react';

interface JourneyCTAProps {
  onPlanTripClick: () => void;
}

export const JourneyCTA: React.FC<JourneyCTAProps> = ({ onPlanTripClick }) => {
  return (
    <section className="journey-cta-section" aria-label="Plan your journey">
      
      {/* Decorative Ridge & Trail Accents */}
      <div className="cta-contour-container" aria-hidden="true">
        <div className="trail-pin-left">
          <MapPin size={15} fill="#FAF8F5" stroke="#3E4A3D" strokeWidth={2} />
        </div>
        <div className="trail-pin-right">
          <MapPin size={15} fill="#FAF8F5" stroke="#3E4A3D" strokeWidth={2} />
        </div>
      </div>

      <div className="container journey-cta-inner">
        <h2 className="cta-headline">
          Good plans. <span className="cta-headline-accent">Great journeys.</span>
        </h2>

        <p className="cta-subtext">
          Let Travira shape your next trip around your time, interests, and pace.
        </p>

        <button 
          onClick={onPlanTripClick}
          className="cta-plan-btn"
          aria-label="Plan Your Trip"
        >
          <span>Plan Your Trip</span>
          <ArrowRight size={15} className="cta-arrow" />
        </button>
      </div>

      <style>{`
        .journey-cta-section {
          position: relative;
          padding: 80px 0 100px;
          background: linear-gradient(to bottom, var(--color-bg-primary) 0%, #EFECE4 100%);
          text-align: center;
          overflow: hidden;
        }

        .cta-contour-container {
          position: absolute;
          inset: 0;
          pointer-events: none;
          max-width: 1100px;
          margin: 0 auto;
        }

        .trail-pin-left {
          position: absolute;
          bottom: 70px;
          left: 12%;
          opacity: 0.8;
        }

        .trail-pin-right {
          position: absolute;
          bottom: 90px;
          right: 14%;
          opacity: 0.8;
        }

        @media (max-width: 768px) {
          .cta-contour-container {
            display: none;
          }
        }

        .journey-cta-inner {
          position: relative;
          z-index: 2;
          max-width: 680px;
          margin: 0 auto;
        }

        .cta-headline {
          font-family: var(--font-serif);
          font-size: clamp(2.25rem, 4.5vw, 3.5rem);
          font-weight: 400;
          line-height: 1.15;
          color: var(--color-text-primary);
          margin-bottom: 12px;
          letter-spacing: -0.015em;
        }

        .cta-headline-accent {
          font-style: italic;
          color: var(--color-accent-primary);
        }

        .cta-subtext {
          font-family: var(--font-sans);
          font-size: 15px;
          color: var(--color-text-secondary);
          margin-bottom: 32px;
          line-height: 1.6;
        }

        .cta-plan-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 13px 32px;
          border-radius: 9999px;
          background-color: var(--color-accent-primary);
          color: #FFFFFF;
          font-family: var(--font-sans);
          font-size: 14px;
          font-weight: 500;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 18px rgba(62, 74, 61, 0.22);
          transition: all 0.25s ease;
        }

        .cta-plan-btn:hover {
          background-color: var(--color-accent-hover);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(62, 74, 61, 0.3);
        }

        .cta-plan-btn .cta-arrow {
          transition: transform 0.2s ease;
        }

        .cta-plan-btn:hover .cta-arrow {
          transform: translateX(3px);
        }
      `}</style>
    </section>
  );
};
