import React, { useState, useEffect, useRef } from 'react';
import { X, Search, MapPin, Loader2, Compass, AlertCircle, Check } from 'lucide-react';
import { locationService, type UserLocation, type GeocodedPlace } from '../../services/locationService';
import { destinationService } from '../../services/destinationService';

interface LocationSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLocation?: (location: UserLocation) => void;
}

export const LocationSearchModal: React.FC<LocationSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectLocation
}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<GeocodedPlace[]>([]);
  const [searching, setSearching] = useState(false);
  const [locating, setLocating] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusType, setStatusType] = useState<'info' | 'error' | 'success'>('info');
  const [currentLocation, setCurrentLocation] = useState<UserLocation | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      const stored = locationService.getStoredLocation();
      if (stored) setCurrentLocation(stored);
      setTimeout(() => inputRef.current?.focus(), 150);
    } else {
      setQuery('');
      setSuggestions([]);
      setStatusMessage(null);
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOpen && e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Debounced search for places
  useEffect(() => {
    if (!query.trim() || query.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      setSearching(true);
      try {
        // 1. Search Open-Meteo Geocoding
        const geocoded = await locationService.searchLocations(query);

        // 2. Also search local curated destinations
        const allDestinations = await destinationService.getAllDestinations();
        const localMatches: GeocodedPlace[] = allDestinations
          .filter(d => 
            d.name.toLowerCase().includes(query.toLowerCase()) ||
            d.country.toLowerCase().includes(query.toLowerCase())
          )
          .map(d => ({
            id: `dest-${d.id}`,
            name: d.name,
            country: d.country,
            admin1: d.region,
            lat: d.coordinates.lat,
            lng: d.coordinates.lng,
            formatted: `${d.name}, ${d.country} (Tavira Destination)`
          }));

        // Merge without duplicates
        const combined = [...localMatches, ...geocoded.filter(g => !localMatches.some(l => l.name.toLowerCase() === g.name.toLowerCase()))];
        setSuggestions(combined.slice(0, 6));
      } catch (err) {
        console.warn('Location query error:', err);
      } finally {
        setSearching(false);
      }
    }, 280);

    return () => clearTimeout(timer);
  }, [query]);

  // Handle Browser Geolocation Request
  const handleUseBrowserLocation = async () => {
    setLocating(true);
    setStatusMessage('Consulting browser sensors for precise coordinates...');
    setStatusType('info');

    const result = await locationService.requestCurrentLocation();
    setLocating(false);

    if (result.state === 'granted' && result.location) {
      setCurrentLocation(result.location);
      setStatusMessage(`Coordinates resolved: Exploring from ${result.location.label}`);
      setStatusType('success');
      if (onSelectLocation) onSelectLocation(result.location);
      setTimeout(() => onClose(), 1200);
    } else {
      setStatusMessage(result.errorMsg || "Location access isn't available. Search for a destination instead.");
      setStatusType('error');
    }
  };

  const handleSelectPlace = (place: GeocodedPlace) => {
    const newLoc: UserLocation = {
      city: place.name,
      country: place.country,
      state: place.admin1,
      lat: place.lat,
      lng: place.lng,
      label: `${place.name}, ${place.country}`
    };

    locationService.setStoredLocation(newLoc);
    setCurrentLocation(newLoc);
    setStatusMessage(`Location updated to ${newLoc.label}`);
    setStatusType('success');

    if (onSelectLocation) onSelectLocation(newLoc);
    setTimeout(() => onClose(), 800);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="location-modal-backdrop" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="location-modal-title"
    >
      <div className="location-modal-panel" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="location-modal-header">
          <div className="flex items-center gap-2">
            <Compass size={18} className="text-accent" />
            <h3 id="location-modal-title" className="location-modal-title">
              Select Your Location
            </h3>
          </div>
          <button onClick={onClose} className="location-close-btn" aria-label="Close location modal">
            <X size={20} />
          </button>
        </div>

        {/* Browser Geolocation Trigger */}
        <div className="location-geo-trigger">
          <button 
            onClick={handleUseBrowserLocation}
            disabled={locating}
            className="location-geo-btn"
          >
            {locating ? (
              <Loader2 size={16} className="animate-spin text-accent" />
            ) : (
              <MapPin size={16} className="text-accent" />
            )}
            <span>{locating ? 'Detecting position...' : 'Use my current location (GPS)'}</span>
          </button>
          <span className="location-geo-note">
            Uses browser sensors to resolve your city and live local weather.
          </span>
        </div>

        {/* Status Message */}
        {statusMessage && (
          <div className={`location-status-bar status-${statusType}`}>
            {statusType === 'error' ? (
              <AlertCircle size={15} />
            ) : statusType === 'success' ? (
              <Check size={15} />
            ) : (
              <Compass size={15} />
            )}
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Divider */}
        <div className="location-modal-divider">
          <span>or search manually</span>
        </div>

        {/* Search Input */}
        <div className="location-search-field">
          <Search size={18} className="location-search-icon" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search any global city or country (e.g. Kyoto, Lisbon, Zurich)..."
            className="location-search-input"
          />
          {searching && <Loader2 size={16} className="animate-spin location-search-loader" />}
        </div>

        {/* Suggestions List */}
        <div className="location-suggestions-wrap">
          {suggestions.length > 0 ? (
            <ul className="location-suggestions-list">
              {suggestions.map((place) => (
                <li key={place.id}>
                  <button 
                    onClick={() => handleSelectPlace(place)}
                    className="location-suggestion-item"
                  >
                    <MapPin size={15} className="location-suggestion-icon" />
                    <div className="location-suggestion-details">
                      <span className="location-suggestion-name">{place.name}</span>
                      <span className="location-suggestion-country">
                        {place.admin1 ? `${place.admin1}, ` : ''}{place.country}
                      </span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          ) : query.trim().length >= 2 && !searching ? (
            <div className="location-empty-state">
              <p>No locations found matching "{query}". Try a different spelling or country.</p>
            </div>
          ) : (
            currentLocation && (
              <div className="location-current-display">
                <span className="location-current-eyebrow">Active Exploration Base</span>
                <div className="location-current-val">
                  <MapPin size={16} className="text-accent" />
                  <strong>{currentLocation.label}</strong>
                  <span className="location-active-badge">Active</span>
                </div>
              </div>
            )
          )}
        </div>

      </div>

      <style>{`
        .location-modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 120;
          background-color: rgba(20, 20, 19, 0.65);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: modalFadeIn 0.25s ease-out;
        }

        .location-modal-panel {
          width: 100%;
          max-width: 540px;
          background-color: #141413;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 2px;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6);
          padding: 32px;
          color: #F5F2EB;
          font-family: var(--font-sans);
        }

        .location-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .location-modal-title {
          font-family: var(--font-serif);
          font-size: 24px;
          font-weight: 400;
          margin: 0;
          color: #F5F2EB;
        }

        .location-close-btn {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          color: #9E9A91;
          cursor: pointer;
          transition: background-color 0.2s, color 0.2s;
        }

        .location-close-btn:hover {
          background-color: rgba(255, 255, 255, 0.1);
          color: #FFFFFF;
        }

        .location-geo-trigger {
          margin-bottom: 20px;
        }

        .location-geo-btn {
          width: 100%;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background-color: var(--color-accent-primary);
          color: #0D0D0C;
          border: none;
          border-radius: 2px;
          font-size: 13px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .location-geo-btn:hover:not(:disabled) {
          background-color: var(--color-accent-hover);
        }

        .location-geo-btn:disabled {
          opacity: 0.7;
          cursor: wait;
        }

        .location-geo-note {
          display: block;
          font-size: 11px;
          color: #6E6A62;
          margin-top: 8px;
          text-align: center;
        }

        .location-status-bar {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
          border-radius: 2px;
          font-size: 13px;
          margin-bottom: 20px;
        }

        .location-status-bar.status-info {
          background-color: #EFEBE4;
          color: #181817;
        }

        .location-status-bar.status-error {
          background-color: #FDF2F2;
          color: #9B1C1C;
          border: 1px solid #F8B4B4;
        }

        .location-status-bar.status-success {
          background-color: #F0FDF4;
          color: #166534;
          border: 1px solid #BBF7D0;
        }

        .location-modal-divider {
          display: flex;
          align-items: center;
          text-align: center;
          margin: 20px 0;
        }

        .location-modal-divider::before,
        .location-modal-divider::after {
          content: '';
          flex: 1;
          border-bottom: 1px solid #D8D1C7;
        }

        .location-modal-divider span {
          padding: 0 14px;
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #8C877D;
          font-weight: 500;
        }

        .location-search-field {
          position: relative;
          display: flex;
          align-items: center;
          margin-bottom: 20px;
        }

        .location-search-icon {
          position: absolute;
          left: 16px;
          color: #8C877D;
        }

        .location-search-input {
          width: 100%;
          height: 52px;
          padding: 0 46px 0 46px;
          background-color: #FFFFFF;
          border: 1px solid #D8D1C7;
          border-radius: 2px;
          font-size: 15px;
          color: #181817;
          outline: none;
          transition: border-color 0.2s;
        }

        .location-search-input:focus {
          border-color: #181817;
        }

        .location-search-loader {
          position: absolute;
          right: 16px;
          color: #8C877D;
        }

        .location-suggestions-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 6px;
          max-height: 240px;
          overflow-y: auto;
        }

        .location-suggestion-item {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px 14px;
          text-align: left;
          background: transparent;
          border: 1px solid transparent;
          border-radius: 2px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .location-suggestion-item:hover {
          background-color: #EFEBE4;
          border-color: #D8D1C7;
        }

        .location-suggestion-icon {
          color: var(--color-accent-primary);
          flex-shrink: 0;
        }

        .location-suggestion-details {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .location-suggestion-name {
          font-size: 15px;
          font-weight: 600;
          color: #181817;
        }

        .location-suggestion-country {
          font-size: 12px;
          color: #6E6A62;
        }

        .location-empty-state {
          padding: 24px 0;
          text-align: center;
          font-size: 14px;
          color: #6E6A62;
        }

        .location-current-display {
          padding: 16px;
          background-color: #EFEBE4;
          border: 1px solid #D8D1C7;
          border-radius: 2px;
        }

        .location-current-eyebrow {
          display: block;
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #6E6A62;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .location-current-val {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 15px;
          color: #181817;
        }

        .location-active-badge {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          background-color: #181817;
          color: #F7F4EE;
          padding: 2px 8px;
          border-radius: 9999px;
          font-weight: 600;
          margin-left: auto;
        }

        @keyframes modalFadeIn {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};
