import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { TravelProvider, useTravel } from '../../context/TravelContext';
import { AriaAssistantModal } from '../ai/AriaAssistantModal';
import { LocationSearchModal } from './LocationSearchModal';

const LayoutContent: React.FC = () => {
  const location = useLocation();
  const { 
    isAriaOpen, 
    closeAria, 
    destinationContext, 
    isLocationModalOpen, 
    closeLocationModal,
    setActiveLocation 
  } = useTravel();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--color-bg-primary)' }}>
      <Header />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />

      {/* Global ARIA Assistant Companion Modal */}
      <AriaAssistantModal
        isOpen={isAriaOpen}
        onClose={closeAria}
        destinationContext={destinationContext}
      />

      {/* Global Location Detection & Search Modal */}
      <LocationSearchModal
        isOpen={isLocationModalOpen}
        onClose={closeLocationModal}
        onSelectLocation={setActiveLocation}
      />
    </div>
  );
};

export const Layout: React.FC = () => {
  return (
    <TravelProvider>
      <LayoutContent />
    </TravelProvider>
  );
};
