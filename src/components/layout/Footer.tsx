import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer style={{ 
      backgroundColor: 'var(--color-bg-primary)',
      borderTop: '1px solid var(--color-border)',
      padding: 'var(--space-16) 0 var(--space-8)'
    }}>
      <div className="container">
        <div className="grid" style={{ 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 'var(--space-12)',
          marginBottom: 'var(--space-16)'
        }}>
          <div>
            <Link to="/" className="text-serif text-3xl" style={{ display: 'block', marginBottom: 'var(--space-4)' }}>
              TAVIRA
            </Link>
            <p className="text-secondary" style={{ maxWidth: '300px' }}>
              Travel, thoughtfully. An editorial approach to discovering the world's most quietly spectacular places.
            </p>
          </div>
          
          <div>
            <h4 style={{ marginBottom: 'var(--space-4)', fontSize: 'var(--text-sm)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Explore</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }} className="text-secondary">
              <li><Link to="/explore">Destinations</Link></li>
              <li><Link to="/explore?mood=Slow%20mornings">Slow Mornings</Link></li>
              <li><Link to="/explore?mood=Cultural%20depth">Cultural Depth</Link></li>
              <li><Link to="/explore?mood=Wild%20horizons">Wild Horizons</Link></li>
            </ul>
          </div>

          <div>
            <h4 style={{ marginBottom: 'var(--space-4)', fontSize: 'var(--text-sm)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tavira Notes</h4>
            <p className="text-secondary" style={{ maxWidth: '260px', lineHeight: 1.7 }}>
              Designed for unhurried decisions, clear local context, and journeys with room to unfold.
            </p>
          </div>
        </div>
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 'var(--space-4)',
          paddingTop: 'var(--space-8)',
          borderTop: '1px solid var(--color-border)',
          fontSize: 'var(--text-sm)'
        }} className="text-tertiary">
          <p>&copy; {new Date().getFullYear()} Tavira Travel. All rights reserved.</p>
          <p>Mock experience · No bookings or accounts</p>
        </div>
      </div>
    </footer>
  );
};
