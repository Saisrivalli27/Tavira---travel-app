import React, { createContext, useContext, useState, useEffect } from 'react';
import { locationService, type UserLocation } from '../services/locationService';
import type { DestinationContext } from '../services/assistantService';

interface TravelContextType {
  isAriaOpen: boolean;
  setIsAriaOpen: (open: boolean) => void;
  openAria: (context?: DestinationContext) => void;
  closeAria: () => void;

  isLocationModalOpen: boolean;
  setIsLocationModalOpen: (open: boolean) => void;
  openLocationModal: () => void;
  closeLocationModal: () => void;

  activeLocation: UserLocation | null;
  setActiveLocation: (loc: UserLocation | null) => void;

  destinationContext: DestinationContext | undefined;
  setDestinationContext: (context: DestinationContext | undefined) => void;
}

const TravelContext = createContext<TravelContextType | undefined>(undefined);

export const TravelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAriaOpen, setIsAriaOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [activeLocation, setActiveLocation] = useState<UserLocation | null>(null);
  const [destinationContext, setDestinationContext] = useState<DestinationContext | undefined>(undefined);

  // Initialize stored location on mount
  useEffect(() => {
    const stored = locationService.getStoredLocation();
    if (stored) {
      setActiveLocation(stored);
    }
  }, []);

  const openAria = (context?: DestinationContext) => {
    if (context) setDestinationContext(context);
    setIsAriaOpen(true);
  };

  const closeAria = () => setIsAriaOpen(false);

  const openLocationModal = () => setIsLocationModalOpen(true);
  const closeLocationModal = () => setIsLocationModalOpen(false);

  return (
    <TravelContext.Provider
      value={{
        isAriaOpen,
        setIsAriaOpen,
        openAria,
        closeAria,
        isLocationModalOpen,
        setIsLocationModalOpen,
        openLocationModal,
        closeLocationModal,
        activeLocation,
        setActiveLocation,
        destinationContext,
        setDestinationContext
      }}
    >
      {children}
    </TravelContext.Provider>
  );
};

export const useTravel = () => {
  const context = useContext(TravelContext);
  if (!context) {
    throw new Error('useTravel must be used within a TravelProvider');
  }
  return context;
};
