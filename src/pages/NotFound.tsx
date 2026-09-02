import React from 'react';

import { Button } from '../components/ui/Button';

export const NotFound: React.FC = () => {
  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      textAlign: 'center',
      padding: 'var(--space-6)'
    }} className="animate-fade-in">
      <h1 className="text-serif text-6xl" style={{ marginBottom: 'var(--space-4)' }}>404</h1>
      <p className="text-xl text-secondary" style={{ marginBottom: 'var(--space-8)', maxWidth: '400px' }}>
        We couldn't find the page you're looking for. It seems this destination is off the map.
      </p>
      <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
        <Button to="/" variant="primary">Return Home</Button>
        <Button to="/explore" variant="secondary">Explore Destinations</Button>
      </div>
    </div>
  );
};
