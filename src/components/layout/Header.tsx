import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, Search, MapPin, Sparkles, ChevronDown, Compass } from 'lucide-react';
import { MobileMenu } from './MobileMenu';
import { SearchOverlay } from './SearchOverlay';
import { useTravel } from '../../context/TravelContext';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const { openAria, openLocationModal, activeLocation } = useTravel();

  const isHome = location.pathname === '/';
  const isExplore = location.pathname.startsWith('/explore') || location.pathname.startsWith('/destinations');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  const handlePlanJourney = () => {
    if (isHome) {
      const plannerEl = document.getElementById('tavira-planner');
      if (plannerEl) {
        plannerEl.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    navigate('/explore');
  };

  return (
    <>
      <header className={`editorial-header ${isScrolled ? 'header-scrolled' : ''}`}>
        <div className="container header-inner">
          
          {/* Left: Brand Wordmark with Star / Compass Emblem */}
          <div className="header-left">
            <Link to="/" className="brand-link" aria-label="Tavira Home">
              <span className="brand-emblem">
                <Compass size={18} strokeWidth={1.75} />
              </span>
              <span className="brand-text">TAVIRA</span>
            </Link>
          </div>

          {/* Center: Clean, Understandable Everyday Navigation */}
          <nav className="header-center desktop-only" aria-label="Main Navigation">
            <Link 
              to="/explore" 
              className={`nav-item ${isExplore ? 'nav-item-active' : ''}`}
            >
              Destinations
            </Link>
            <button 
              onClick={() => openAria()}
              className="nav-item nav-btn-item flex items-center gap-1.5"
              title="Ask our AI travel assistant for advice"
            >
              <Sparkles size={13} className="text-accent-gold" />
              <span>Ask AI</span>
            </button>
            <button 
              onClick={handlePlanJourney} 
              className="nav-item nav-btn-item"
              title="Create your daily trip schedule"
            >
              Trip Planner
            </button>
          </nav>

          {/* Right: Location Selector, Search, & Plan a Trip Pill CTA */}
          <div className="header-right desktop-only">
            
            {/* Interactive Location Badge */}
            <button
              onClick={openLocationModal}
              className="header-location-pill"
              aria-label="Current location"
              title="Click to detect or change your location"
            >
              <MapPin size={12} className="text-secondary" />
              <span className="location-label">
                {activeLocation ? activeLocation.city : 'Tokyo'}
              </span>
              <ChevronDown size={12} className="chevron-icon" />
            </button>

            {/* Circular Search Trigger Button */}
            <button 
              onClick={() => setSearchOpen(true)}
              className="header-search-btn"
              aria-label="Open search"
            >
              <Search size={16} strokeWidth={1.75} />
            </button>

            {/* Dark Olive Pill CTA */}
            <button 
              onClick={handlePlanJourney}
              className="header-journey-cta"
            >
              Plan a Trip
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button 
            className="mobile-toggle-btn" 
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu size={24} />
          </button>

        </div>
      </header>

      {/* Global Modals & Overlays */}
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <MobileMenu 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
      />

      <style>{`
        .editorial-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 76px;
          z-index: 50;
          background-color: rgba(248, 246, 240, 0.92);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-bottom: 1px solid var(--color-border);
          transition: background-color 300ms ease, box-shadow 300ms ease, height 300ms ease;
        }

        .editorial-header.header-scrolled {
          background-color: rgba(248, 246, 240, 0.98);
          box-shadow: 0 4px 20px rgba(36, 35, 31, 0.04);
        }

        .header-inner {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        @media (min-width: 900px) {
          .header-inner {
            display: grid;
            grid-template-columns: 1fr auto 1fr;
          }
          .header-left { justify-content: flex-start; }
          .header-center { justify-content: center; }
          .header-right { justify-content: flex-end; }
        }

        .header-left {
          display: flex;
          align-items: center;
        }

        .brand-link {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          color: var(--color-text-primary);
          transition: opacity 0.2s;
        }

        .brand-link:hover {
          opacity: 0.85;
        }

        .brand-emblem {
          color: var(--color-accent-gold);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .brand-text {
          font-family: var(--font-serif);
          font-size: 21px;
          font-weight: 500;
          letter-spacing: 0.22em;
          color: var(--color-text-primary);
        }

        .header-center {
          display: flex;
          align-items: center;
          gap: 36px;
        }

        .nav-item {
          font-family: var(--font-sans);
          font-size: 13.5px;
          font-weight: 500;
          color: var(--color-text-primary);
          text-decoration: none;
          position: relative;
          padding: 6px 0;
          letter-spacing: 0.02em;
          transition: color 0.2s;
          background: none;
          border: none;
          cursor: pointer;
        }

        .nav-item:hover {
          color: var(--color-accent-primary);
        }

        .nav-item-active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 1.5px;
          background-color: var(--color-accent-primary);
          border-radius: 1px;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .header-location-pill {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 7px 14px;
          border-radius: 9999px;
          background-color: #FFFFFF;
          border: 1px solid var(--color-border);
          box-shadow: 0 1px 4px rgba(36, 35, 31, 0.03);
          color: var(--color-text-primary);
          font-family: var(--font-sans);
          font-size: 12.5px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .header-location-pill:hover {
          border-color: var(--color-border-hover);
          box-shadow: 0 2px 8px rgba(36, 35, 31, 0.06);
        }

        .chevron-icon {
          color: var(--color-text-muted);
          transition: transform 0.2s;
        }

        .header-location-pill:hover .chevron-icon {
          transform: translateY(1px);
        }

        .header-search-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background-color: #FFFFFF;
          border: 1px solid var(--color-border);
          color: var(--color-text-primary);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .header-search-btn:hover {
          border-color: var(--color-border-hover);
          color: var(--color-accent-primary);
          transform: translateY(-1px);
        }

        .header-journey-cta {
          padding: 9px 20px;
          border-radius: 9999px;
          background-color: var(--color-accent-primary);
          color: #FFFFFF;
          font-family: var(--font-sans);
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.02em;
          border: none;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(62, 74, 61, 0.2);
          transition: all 0.2s ease;
        }

        .header-journey-cta:hover {
          background-color: var(--color-accent-hover);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(62, 74, 61, 0.28);
        }

        .mobile-toggle-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          background: none;
          border: none;
          color: var(--color-text-primary);
          cursor: pointer;
          padding: 6px;
        }

        @media (min-width: 900px) {
          .mobile-toggle-btn {
            display: none;
          }
        }
      `}</style>
    </>
  );
};
