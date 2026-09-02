import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '../ui/Button';
import { imageService } from '../../services/imageService';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [expandedSection, setExpandedSection] = useState<'destinations' | 'moods' | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOpen && e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePlanJourney = () => {
    onClose();
    navigate('/explore');
  };

  const toggleSection = (section: 'destinations' | 'moods') => {
    setExpandedSection(prev => prev === section ? null : section);
  };

  const indiaDestinations = ['Udaipur', 'Jaipur', 'Varanasi', 'Kochi', 'Munnar', 'Ladakh', 'Hampi', 'Pondicherry'];
  const moods = ['Slow mornings', 'Sacred journeys', 'Mountain air', 'Coastal light', 'Craft and culture', 'Design cities'];

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100, // Top level
        backgroundColor: 'var(--color-bg-primary)',
        color: 'var(--color-text-primary)',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto'
      }}
      className="animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 var(--space-6)', height: 'var(--header-height)', borderBottom: '1px solid var(--color-border)' }}>
        <Link to="/" onClick={onClose} className="text-serif text-2xl" style={{ fontWeight: 500, letterSpacing: '0.05em' }}>
          TAVIRA
        </Link>
        <button onClick={onClose} aria-label="Close menu" className="btn-icon" style={{ color: 'var(--color-text-primary)' }}>
          <X size={28} />
        </button>
      </div>

      {/* Main Nav Content */}
      <div style={{ padding: 'var(--space-8) var(--space-6)', flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
        
        <Link to="/explore" onClick={onClose} className="text-serif" style={{ fontSize: '2.5rem', lineHeight: 1.2 }}>
          Explore
        </Link>

        {/* Destinations Accordion */}
        <div>
          <button 
            onClick={() => toggleSection('destinations')}
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', textAlign: 'left', fontSize: '2.5rem', fontFamily: 'var(--font-serif)', lineHeight: 1.2 }}
          >
            Destinations
            {expandedSection === 'destinations' ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          </button>
          
          {expandedSection === 'destinations' && (
            <div style={{ padding: 'var(--space-4) 0 var(--space-2) var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }} className="animate-fade-in">
              <Link to="/explore?region=Europe" onClick={onClose} className="text-lg">Europe</Link>
              <Link to="/explore?region=Asia" onClick={onClose} className="text-lg">Asia</Link>
              <Link to="/explore?region=Africa" onClick={onClose} className="text-lg">Africa</Link>
              <div style={{ height: '1px', backgroundColor: 'var(--color-border)', margin: 'var(--space-2) 0' }} />
              <p className="text-xs uppercase text-secondary" style={{ letterSpacing: '0.1em' }}>India Collection</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
                {indiaDestinations.map(city => (
                  <Link key={city} to={`/destinations/${city.toLowerCase()}`} onClick={onClose} className="text-base text-secondary">{city}</Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Moods Accordion */}
        <div>
          <button 
            onClick={() => toggleSection('moods')}
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', textAlign: 'left', fontSize: '2.5rem', fontFamily: 'var(--font-serif)', lineHeight: 1.2 }}
          >
            Travel Moods
            {expandedSection === 'moods' ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          </button>
          
          {expandedSection === 'moods' && (
            <div style={{ padding: 'var(--space-4) 0 var(--space-2) var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }} className="animate-fade-in">
              {moods.map(mood => (
                <Link key={mood} to={`/explore?mood=${encodeURIComponent(mood)}`} onClick={onClose} className="text-lg">
                  {mood}
                </Link>
              ))}
            </div>
          )}
        </div>

        <Link to="/journal" onClick={onClose} className="text-serif" style={{ fontSize: '2.5rem', lineHeight: 1.2 }}>
          The Journal
        </Link>
        
        <div style={{ marginTop: 'var(--space-8)' }}>
          <Button onClick={handlePlanJourney} variant="primary" style={{ width: '100%', padding: 'var(--space-4)', fontSize: 'var(--text-lg)' }}>
            Plan a journey
          </Button>
        </div>
      </div>

      {/* Featured Destination Image Footer */}
      <div style={{ padding: 'var(--space-6)', backgroundColor: 'var(--color-bg-secondary)', borderTop: '1px solid var(--color-border)' }}>
        <Link to="/destinations/kyoto" onClick={onClose} style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
          <img 
            src={imageService.getImage('kyoto-hero').url} 
            alt="Kyoto" 
            style={{ width: '80px', height: '60px', objectFit: 'cover' }} 
          />
          <div>
            <p className="text-xs uppercase text-secondary mb-1" style={{ letterSpacing: '0.1em' }}>Featured</p>
            <p className="text-serif text-xl">Kyoto, Japan</p>
          </div>
        </Link>
      </div>
    </div>
  );
};
