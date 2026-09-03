import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Sparkles } from 'lucide-react';
import { useTravel } from '../../context/TravelContext';

export const Footer: React.FC = () => {
  const { openAria } = useTravel();

  return (
    <footer className="editorial-footer">
      <div className="container">
        <div className="footer-inner-grid">
          
          {/* Brand Col */}
          <div className="footer-brand-col">
            <Link to="/" className="footer-brand-link">
              <Compass size={18} className="text-accent-gold" />
              <span>TAVIRA</span>
            </Link>
            <p className="footer-brand-tagline">
              Plan thoughtfully, travel accordingly. Curated journeys for the intentional traveler.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="footer-nav-col">
            <h4 className="footer-nav-title">Navigation</h4>
            <ul className="footer-nav-list">
              <li>
                <Link to="/explore">Destinations</Link>
              </li>
              <li>
                <button onClick={() => openAria()} className="footer-nav-btn flex items-center gap-1.5">
                  <Sparkles size={12} className="text-accent-gold" />
                  <span>Ask AI</span>
                </button>
              </li>
              <li>
                <Link to="/explore">Trip Planner</Link>
              </li>
            </ul>
          </div>

          {/* Editorial Note */}
          <div className="footer-note-col">
            <h4 className="footer-nav-title">Philosophy</h4>
            <p className="footer-note-text">
              Designed for unhurried decisions, architectural wonder, and journeys with room to breathe.
            </p>
          </div>

        </div>

        {/* Bottom Baseline Bar */}
        <div className="footer-baseline-bar">
          <p>&copy; {new Date().getFullYear()} Tavira Travel. All rights reserved.</p>
          <p className="footer-legal-tag">Curated Travel Experience</p>
        </div>
      </div>

      <style>{`
        .editorial-footer {
          background-color: #FAF8F4;
          border-top: 1px solid var(--color-border);
          padding: 64px 0 32px;
          color: var(--color-text-primary);
        }

        .footer-inner-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
          margin-bottom: 48px;
        }

        @media (min-width: 768px) {
          .footer-inner-grid {
            grid-template-columns: 1.5fr 1fr 1fr;
            gap: 48px;
          }
        }

        .footer-brand-col {
          max-width: 340px;
        }

        .footer-brand-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-serif);
          font-size: 20px;
          letter-spacing: 0.2em;
          text-decoration: none;
          color: var(--color-text-primary);
          margin-bottom: 12px;
        }

        .footer-brand-tagline {
          font-family: var(--font-sans);
          font-size: 13.5px;
          color: var(--color-text-secondary);
          line-height: 1.6;
        }

        .footer-nav-title {
          font-family: var(--font-sans);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-text-muted);
          margin-bottom: 14px;
        }

        .footer-nav-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .footer-nav-list a,
        .footer-nav-btn {
          font-family: var(--font-sans);
          font-size: 13.5px;
          color: var(--color-text-secondary);
          text-decoration: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          transition: color 0.2s;
        }

        .footer-nav-list a:hover,
        .footer-nav-btn:hover {
          color: var(--color-accent-primary);
        }

        .footer-note-text {
          font-family: var(--font-sans);
          font-size: 13.5px;
          color: var(--color-text-secondary);
          line-height: 1.6;
          max-width: 280px;
        }

        .footer-baseline-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
          padding-top: 24px;
          border-top: 1px solid var(--color-border);
          font-family: var(--font-sans);
          font-size: 12.5px;
          color: var(--color-text-muted);
        }
      `}</style>
    </footer>
  );
};
