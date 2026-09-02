import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, Search } from 'lucide-react';
import { Button } from '../ui/Button';
import { MegaMenu } from './MegaMenu';
import { MobileMenu } from './MobileMenu';
import { SearchOverlay } from './SearchOverlay';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<'destinations' | 'moods' | null>(null);
  
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === '/';
  const isDestination = location.pathname.startsWith('/destinations/');

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
    setActiveMegaMenu(null);
  }, [location.pathname]);

  // Handle escape key for mobile menu
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveMegaMenu(null);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const handlePlanJourney = () => {
    if (isDestination) {
      const el = document.getElementById('itinerary-planner');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        setMobileMenuOpen(false);
      }
    } else {
      navigate('/explore');
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'Destinations', path: '/explore' },
    { name: 'Inspiration', path: '/journal' },
    { name: 'Plan a Trip', path: '/explore' }
  ];

  return (
    <>
      <header 
        style={{ 
          position: 'fixed', 
          top: 0, left: 0, right: 0, 
          height: 'var(--header-height)',
          zIndex: 50,
          backgroundColor: isHome && !isScrolled ? 'rgba(23, 23, 22, 0)' : 'rgba(245, 242, 236, 0.95)',
          backdropFilter: isHome && !isScrolled ? 'none' : 'blur(12px)',
          WebkitBackdropFilter: isHome && !isScrolled ? 'none' : 'blur(12px)',
          color: isHome && !isScrolled ? 'var(--color-white)' : 'var(--color-text-primary)',
          borderBottom: isHome && !isScrolled ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(23, 23, 22, 0.08)',
          transition: 'all 400ms cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <div className="container header-grid" style={{ height: '100%', alignItems: 'center' }}>
          
          {/* Left Column: Brand Logo */}
          <div className="header-left" style={{ display: 'flex', alignItems: 'center' }}>
            <Link to="/" className="brand-logo" style={{ 
              fontFamily: 'var(--font-serif)', 
              fontSize: '26px', 
              fontWeight: 400, 
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'inherit',
              textDecoration: 'none'
            }}>
              TAVIRA
            </Link>
          </div>

          {/* Center Column: Navigation Links */}
          <nav className="header-center desktop-nav" style={{ display: 'none', gap: '32px', alignItems: 'center', justifyContent: 'center' }}>
            {navLinks.map(link => (
              <Link 
                key={link.name}
                to={link.path} 
                className="nav-link" 
                style={{ 
                  fontFamily: 'var(--font-sans)',
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  fontWeight: 600, 
                  letterSpacing: '0.12em',
                  opacity: 0.9,
                  transition: 'opacity 0.2s',
                  padding: 'var(--space-2) 0'
                }}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Column: Search & CTA */}
          <div className="header-right desktop-nav" style={{ display: 'none', gap: 'var(--space-6)', alignItems: 'center', justifyContent: 'flex-end' }}>
            <button 
              onClick={() => setSearchOpen(true)}
              className="btn-icon" 
              style={{ 
                color: 'inherit', 
                width: '44px', 
                height: '44px',
                display: 'flex', 
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                transition: 'background-color 0.2s'
              }}
              aria-label="Open search"
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <Search size={18} strokeWidth={1.5} />
            </button>
            <Button 
              onClick={handlePlanJourney}
              variant={isHome && !isScrolled ? 'secondary' : 'primary'} 
              style={{
                height: '44px',
                padding: '0 20px',
                fontSize: '12px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                ...(isHome && !isScrolled ? {
                  color: 'var(--color-white)', 
                  borderColor: 'rgba(255,255,255,0.4)',
                  backgroundColor: 'transparent',
                } : {
                  backgroundColor: 'var(--color-text-primary)',
                  color: 'var(--color-bg-primary)',
                  border: 'none'
                })
              }}
              className={isHome && !isScrolled ? 'hero-cta' : ''}
            >
              Plan my trip
            </Button>
          </div>

          <button 
            className="mobile-toggle btn-icon" 
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
            style={{ color: 'inherit', zIndex: 60 }}
          >
            <Menu size={28} />
          </button>
        </div>

        <style>{`
          .header-grid {
            display: flex;
            justify-content: space-between;
          }

          @media (min-width: 768px) {
            .header-grid {
              display: grid !important;
              grid-template-columns: 1fr auto 1fr;
            }
            .desktop-nav { display: flex !important; }
            .mobile-toggle { display: none !important; }
            .header-left { justify-content: flex-start; }
            .header-center { justify-content: center; }
            .header-right { justify-content: flex-end; }
          }
          
          .nav-link {
            position: relative;
          }
          
          .nav-link::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 1px;
            background-color: currentColor;
            transform: scaleX(0);
            transform-origin: right;
            transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1);
          }
          
          .nav-link:hover::after,
          .nav-link[aria-expanded="true"]::after {
            transform: scaleX(1);
            transform-origin: left;
          }
          
          .hero-cta:hover {
            background-color: var(--color-bg-primary) !important;
            color: var(--color-text-primary) !important;
            border-color: transparent !important;
          }
        `}</style>

        {/* Mega Menus Dropdown Container */}
        {activeMegaMenu && (
          <MegaMenu 
            type={activeMegaMenu} 
            isOpen={!!activeMegaMenu} 
            onClose={() => setActiveMegaMenu(null)} 
          />
        )}
      </header>

      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};
