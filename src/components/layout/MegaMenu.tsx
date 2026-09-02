import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { imageService } from '../../services/imageService';

interface MegaMenuProps {
  type: 'destinations' | 'moods';
  isOpen: boolean;
  onClose: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ type, isOpen, onClose }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOpen && e.key === 'Escape') onClose();
    };
    
    // Optional click outside
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        // We only want to close if the click wasn't on the toggle button itself
        // Handled via state lifting in Header
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      ref={menuRef}
      style={{
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        backgroundColor: 'var(--color-bg-primary)',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-lg)',
        padding: 'var(--space-12) 0',
        color: 'var(--color-text-primary)'
      }}
      className="animate-fade-in"
    >
      <div className="container">
        {type === 'destinations' ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-12)' }}>
            
            {/* Column 1: Popular Now */}
            <div>
              <h3 className="text-sm uppercase text-secondary mb-6" style={{ letterSpacing: '0.1em' }}>Popular Now</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
                {[
                  { name: 'Kyoto, Japan', slug: 'kyoto', img: 'kyoto-hero' },
                  { name: 'Oaxaca, Mexico', slug: 'oaxaca', img: 'oaxaca-hero' },
                  { name: 'Lisbon, Portugal', slug: 'lisbon', img: 'lisbon-hero' }
                ].map(dest => (
                  <Link key={dest.slug} to={`/destinations/${dest.slug}`} className="group" onClick={onClose} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                    <div style={{ width: '80px', height: '60px', overflow: 'hidden' }}>
                      <img src={imageService.getImage(dest.img).url} alt={dest.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform var(--transition-slow)' }} className="group-hover:scale-105" />
                    </div>
                    <span className="text-serif text-lg group-hover:text-accent transition-colors">{dest.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Column 2: By Region */}
            <div>
              <h3 className="text-sm uppercase text-secondary mb-6" style={{ letterSpacing: '0.1em' }}>Explore by Region</h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {['Asia', 'Europe', 'Africa', 'North America', 'Oceania'].map(region => (
                  <li key={region}>
                    <Link to={`/explore?region=${encodeURIComponent(region)}`} onClick={onClose} className="text-lg hover:text-accent transition-colors">
                      {region}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: India Focus */}
            <div>
              <h3 className="text-sm uppercase text-secondary mb-6" style={{ letterSpacing: '0.1em' }}>India Collection</h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {['Udaipur', 'Jaipur', 'Varanasi', 'Kochi', 'Munnar', 'Ladakh', 'Hampi', 'Pondicherry'].map(city => (
                  <li key={city}>
                    <Link to={`/destinations/${city.toLowerCase()}`} onClick={onClose} className="text-lg hover:text-accent transition-colors">
                      {city}
                    </Link>
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: 'var(--space-8)', paddingTop: 'var(--space-6)', borderTop: '1px solid var(--color-border)' }}>
                <Link to="/explore" onClick={onClose} className="text-sm uppercase text-accent font-medium" style={{ letterSpacing: '0.1em' }}>
                  View all destinations &rarr;
                </Link>
              </div>
            </div>

          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-16)' }}>
            
            {/* Moods List */}
            <div>
              <h3 className="text-sm uppercase text-secondary mb-6" style={{ letterSpacing: '0.1em' }}>Travel by Feeling</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4) var(--space-8)' }}>
                {[
                  { name: 'Slow mornings', img: 'mood-slow-mornings' },
                  { name: 'Sacred journeys', img: 'mood-sacred' },
                  { name: 'Mountain air', img: 'mood-mountain' },
                  { name: 'Coastal light', img: 'mood-coastal' },
                  { name: 'Craft and culture', img: 'mood-craft' },
                  { name: 'Design cities', img: 'mood-design' },
                  { name: 'Cultural depth', img: 'menu-cultural' },
                  { name: 'Wild horizons', img: 'menu-wild' }
                ].map(mood => (
                  <Link key={mood.name} to={`/explore?mood=${encodeURIComponent(mood.name)}`} onClick={onClose} className="group" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', padding: 'var(--space-2) 0' }}>
                    <div style={{ width: '40px', height: '40px', overflow: 'hidden', borderRadius: '50%' }}>
                      <img src={imageService.getImage(mood.img).url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <span className="text-lg hover:text-accent transition-colors">{mood.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Featured Mood Card */}
            <Link to="/explore?mood=Mountain%20air" onClick={onClose} className="group" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
              <div style={{ position: 'relative', height: '240px', overflow: 'hidden', marginBottom: 'var(--space-4)' }}>
                <img src={imageService.getImage('mood-mountain').url} alt="Mountain air" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform var(--transition-slow)' }} className="group-hover:scale-105" />
              </div>
              <h4 className="text-serif text-2xl mb-2">Mountain air</h4>
              <p className="text-secondary text-sm">Crisp mornings, immense silence, and landscapes that put time into perspective. Discover high-altitude sanctuaries.</p>
            </Link>

          </div>
        )}
      </div>
      <style>{`
        .group-hover\\:scale-105:hover { transform: scale(1.05); }
        .group-hover\\:text-accent:hover { color: var(--color-accent-primary); }
      `}</style>
    </div>
  );
};
