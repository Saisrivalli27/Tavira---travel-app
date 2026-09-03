import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Sparkles, MapPin, Compass, ArrowRight } from 'lucide-react';
import { useTravel } from '../../context/TravelContext';
import { Button } from '../ui/Button';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { openAria, openLocationModal, activeLocation } = useTravel();

  if (!isOpen) return null;

  const handlePlanJourney = () => {
    onClose();
    const plannerEl = document.getElementById('tavira-planner');
    if (plannerEl) {
      plannerEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/explore');
    }
  };

  const handleOpenAria = () => {
    onClose();
    openAria();
  };

  const handleOpenLocation = () => {
    onClose();
    openLocationModal();
  };

  return (
    <div 
      className="mobile-drawer-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
    >
      <div className="mobile-drawer-content" onClick={(e) => e.stopPropagation()}>
        
        {/* Drawer Header */}
        <div className="mobile-drawer-header">
          <Link to="/" onClick={onClose} className="mobile-drawer-logo">
            TAVIRA
          </Link>
          <button onClick={onClose} className="mobile-drawer-close" aria-label="Close menu">
            <X size={26} />
          </button>
        </div>

        {/* Location Banner Pill */}
        <div className="mobile-drawer-location-bar">
          <button onClick={handleOpenLocation} className="mobile-location-btn">
            <MapPin size={16} className="text-accent" />
            <span>
              {activeLocation ? `Exploring from: ${activeLocation.label}` : 'Tap to set your location'}
            </span>
          </button>
        </div>

        {/* Primary Navigation Links */}
        <nav className="mobile-drawer-nav">
          <Link to="/explore" onClick={onClose} className="mobile-nav-link">
            <span>Destinations</span>
            <ArrowRight size={18} className="mobile-nav-arrow" />
          </Link>

          <button onClick={handleOpenAria} className="mobile-nav-link mobile-nav-btn">
            <span className="flex items-center gap-3">
              <Sparkles size={18} className="text-accent" />
              Ask AI (Trip Guide)
            </span>
            <span className="mobile-ai-badge">Online</span>
          </button>

          <button onClick={handlePlanJourney} className="mobile-nav-link mobile-nav-btn">
            <span>Trip Planner</span>
            <ArrowRight size={18} className="mobile-nav-arrow" />
          </button>
        </nav>

        {/* Bottom Actions */}
        <div className="mobile-drawer-footer">
          <Button 
            onClick={handlePlanJourney} 
            variant="primary" 
            style={{ width: '100%', height: '52px', fontSize: '13px', letterSpacing: '0.12em', textTransform: 'uppercase' }}
          >
            Plan My Trip
          </Button>

          <div className="mobile-footer-note">
            <Compass size={14} className="text-accent" />
            <span>Curated for slow, thoughtful travel</span>
          </div>
        </div>

      </div>

      <style>{`
        .mobile-drawer-overlay {
          position: fixed;
          inset: 0;
          z-index: 100;
          background-color: rgba(18, 18, 17, 0.6);
          backdrop-filter: blur(8px);
          display: flex;
          justify-content: flex-end;
          animation: drawerFadeIn 0.25s ease-out;
        }

        .mobile-drawer-content {
          width: 85%;
          max-width: 400px;
          height: 100%;
          background-color: #F7F4EE;
          border-left: 1px solid #D8D1C7;
          display: flex;
          flex-direction: column;
          box-shadow: -10px 0 30px rgba(0, 0, 0, 0.15);
          animation: drawerSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          color: #181817;
          font-family: var(--font-sans);
        }

        .mobile-drawer-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px;
          border-bottom: 1px solid #D8D1C7;
        }

        .mobile-drawer-logo {
          font-family: var(--font-serif);
          font-size: 24px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          text-decoration: none;
          color: inherit;
        }

        .mobile-drawer-close {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #181817;
          cursor: pointer;
        }

        .mobile-drawer-location-bar {
          padding: 16px 24px;
          background-color: #EFEBE4;
          border-bottom: 1px solid #D8D1C7;
        }

        .mobile-location-btn {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 12px;
          color: #181817;
          font-weight: 500;
          text-align: left;
          background: transparent;
          border: none;
          cursor: pointer;
        }

        .mobile-drawer-nav {
          flex: 1;
          padding: 32px 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .mobile-nav-link {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 0;
          font-family: var(--font-serif);
          font-size: 24px;
          text-decoration: none;
          color: #181817;
          border-bottom: 1px solid rgba(24, 24, 23, 0.08);
          transition: transform 0.2s;
        }

        .mobile-nav-btn {
          width: 100%;
          text-align: left;
          background: none;
          border: none;
          border-bottom: 1px solid rgba(24, 24, 23, 0.08);
          cursor: pointer;
        }

        .mobile-ai-badge {
          font-family: var(--font-sans);
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 3px 8px;
          border-radius: 9999px;
          background-color: #181817;
          color: #F7F4EE;
          font-weight: 600;
        }

        .mobile-nav-arrow {
          color: #8C877D;
          transition: transform 0.2s;
        }

        .mobile-nav-link:hover .mobile-nav-arrow {
          transform: translateX(4px);
        }

        .mobile-drawer-footer {
          padding: 24px;
          border-top: 1px solid #D8D1C7;
          background-color: #EFEBE4;
        }

        .mobile-footer-note {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 14px;
          font-size: 11px;
          color: #6E6A62;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        @keyframes drawerFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes drawerSlideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};
