import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Navigation, BookOpen, MapPin, Compass } from 'lucide-react';
import { searchService, type SearchResult } from '../../services/searchService';
import { imageService } from '../../services/imageService';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const QUICK_SEARCH_SUGGESTIONS = ['Kyoto', 'Paris', 'Udaipur', 'Slow mornings', 'Mountain air'];

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setResults([]);
      setSelectedIndex(-1);
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [isOpen]);

  const handleSelect = React.useCallback((result: SearchResult) => {
    onClose();
    navigate(result.url);
  }, [navigate, onClose]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
      } else if (e.key === 'Enter' && selectedIndex >= 0) {
        e.preventDefault();
        handleSelect(results[selectedIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, onClose, handleSelect]);

  useEffect(() => {
    const fetchResults = async () => {
      if (query.trim().length < 2) {
        setResults([]);
        return;
      }
      setLoading(true);
      const res = await searchService.globalSearch(query);
      setResults(res);
      setSelectedIndex(-1);
      setLoading(false);
    };

    const debounceId = setTimeout(fetchResults, 220);
    return () => clearTimeout(debounceId);
  }, [query]);

  if (!isOpen) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'destination': return <MapPin size={16} className="text-accent" />;
      case 'journal': return <BookOpen size={16} className="text-accent" />;
      case 'mood': return <Compass size={16} className="text-accent" />;
      default: return <Navigation size={16} className="text-accent" />;
    }
  };

  return (
    <div 
      className="search-overlay-backdrop animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Search destinations"
    >
      <div 
        className="search-overlay-panel"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Search Bar */}
        <div className="search-input-container">
          <Search size={20} className="search-lead-icon" />
          <input 
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search destinations, moods, stories..."
            className="search-overlay-input"
            aria-label="Global search input"
          />
          {query && (
            <button 
              onClick={() => setQuery('')} 
              className="search-clear-btn" 
              aria-label="Clear search input"
            >
              <X size={16} />
            </button>
          )}
          <button 
            onClick={onClose} 
            className="search-esc-badge" 
            aria-label="Close search overlay"
          >
            ESC
          </button>
        </div>

        {/* Results Area */}
        <div className="search-results-area">
          {query.trim().length < 2 ? (
            <div className="search-empty-state">
              <div className="search-empty-icon-wrap">
                <Compass size={28} className="text-accent" />
              </div>
              <h3 className="search-empty-title">Where would you like to go?</h3>
              <p className="search-empty-subtitle">Explore places worth crossing the map for.</p>
              
              {/* Quick suggestion pills */}
              <div className="search-suggestion-chips">
                {QUICK_SEARCH_SUGGESTIONS.map((sug) => (
                  <button
                    key={sug}
                    type="button"
                    onClick={() => setQuery(sug)}
                    className="search-suggestion-chip"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            </div>
          ) : loading ? (
            <div className="search-loading-state">
              <span className="search-loading-dot" />
              <span>Consulting archives...</span>
            </div>
          ) : results.length === 0 ? (
            <div className="search-no-results">
              <p className="no-results-title">No destinations found for "{query}"</p>
              <p className="no-results-subtitle">Try searching for a country, mood, or city name.</p>
            </div>
          ) : (
            <ul className="search-results-list">
              {results.map((result, index) => {
                const isSelected = index === selectedIndex;
                const img = result.imageId ? imageService.getImage(result.imageId) : null;

                return (
                  <li key={result.id}>
                    <button
                      onClick={() => handleSelect(result)}
                      className={`search-result-item ${isSelected ? 'selected' : ''}`}
                      onMouseEnter={() => setSelectedIndex(index)}
                    >
                      {/* Thumbnail or Category Icon */}
                      <div className="search-result-media">
                        {img ? (
                          <img src={img.url} alt={result.title} className="search-result-img" />
                        ) : (
                          getIcon(result.type)
                        )}
                      </div>
                      
                      {/* Titles */}
                      <div className="search-result-info">
                        <span className="search-result-title">
                          {result.title}
                        </span>
                        <span className="search-result-subtitle">
                          {result.subtitle}
                        </span>
                      </div>
                      
                      {/* Arrow indicator */}
                      <div className="search-result-arrow">
                        <Navigation size={14} />
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      <style>{`
        .search-overlay-backdrop {
          position: fixed;
          inset: 0;
          z-index: 120;
          background-color: rgba(10, 10, 9, 0.78);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: 80px 20px;
        }

        .search-overlay-panel {
          width: 100%;
          max-width: 660px;
          background-color: #141413;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 4px;
          box-shadow: 0 25px 70px rgba(0, 0, 0, 0.7);
          overflow: hidden;
        }

        .search-input-container {
          display: flex;
          align-items: center;
          padding: 16px 22px;
          background-color: #181817;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          gap: 12px;
        }

        .search-lead-icon {
          color: var(--color-accent-primary);
          flex-shrink: 0;
        }

        .search-overlay-input {
          flex: 1;
          border: none;
          outline: none;
          background: transparent;
          font-family: var(--font-sans);
          font-size: 17px;
          color: #F5F2EB;
          padding: 0;
        }

        .search-overlay-input::placeholder {
          color: rgba(245, 242, 235, 0.38);
          font-weight: 300;
        }

        .search-clear-btn {
          background: none;
          border: none;
          color: #9E9A91;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px;
          border-radius: 50%;
          transition: all 0.2s;
        }

        .search-clear-btn:hover {
          color: #F5F2EB;
          background-color: rgba(255, 255, 255, 0.1);
        }

        .search-esc-badge {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 4px;
          padding: 4px 8px;
          font-size: 10.5px;
          letter-spacing: 0.08em;
          font-weight: 600;
          color: #9E9A91;
          cursor: pointer;
          transition: all 0.2s;
        }

        .search-esc-badge:hover {
          color: #F5F2EB;
          border-color: rgba(255, 255, 255, 0.25);
        }

        .search-results-area {
          max-height: 55vh;
          overflow-y: auto;
          background-color: #141413;
        }

        .search-empty-state {
          padding: 48px 24px;
          text-align: center;
        }

        .search-empty-icon-wrap {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(197, 168, 128, 0.08);
          border: 1px solid rgba(197, 168, 128, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
        }

        .search-empty-title {
          font-family: var(--font-serif);
          font-size: 22px;
          font-weight: 400;
          color: #F5F2EB;
          margin: 0 0 6px 0;
        }

        .search-empty-subtitle {
          font-size: 13.5px;
          color: #9E9A91;
          margin: 0 0 24px 0;
          font-weight: 300;
        }

        .search-suggestion-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          justify-content: center;
        }

        .search-suggestion-chip {
          padding: 6px 14px;
          font-size: 12px;
          color: #D6D0C7;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 9999px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .search-suggestion-chip:hover {
          color: #FFFFFF;
          border-color: var(--color-accent-primary);
          background: rgba(197, 168, 128, 0.12);
        }

        .search-loading-state {
          padding: 48px 24px;
          text-align: center;
          font-size: 13.5px;
          color: #9E9A91;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .search-loading-dot {
          width: 6px;
          height: 6px;
          background-color: var(--color-accent-primary);
          border-radius: 50%;
          animation: pulse 1s infinite;
        }

        .search-no-results {
          padding: 48px 24px;
          text-align: center;
        }

        .no-results-title {
          font-size: 16px;
          color: #F5F2EB;
          margin-bottom: 6px;
        }

        .no-results-subtitle {
          font-size: 13px;
          color: #9E9A91;
        }

        .search-results-list {
          padding: 8px 0;
          margin: 0;
          list-style: none;
        }

        .search-result-item {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px 20px;
          background: transparent;
          border: none;
          text-align: left;
          cursor: pointer;
          transition: background-color 0.15s ease;
        }

        .search-result-item:hover, .search-result-item.selected {
          background-color: #1E1E1D;
        }

        .search-result-media {
          width: 38px;
          height: 38px;
          border-radius: 2px;
          overflow: hidden;
          background-color: #1C1B1A;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .search-result-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .search-result-info {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .search-result-title {
          font-size: 15px;
          font-weight: 500;
          color: #F5F2EB;
        }

        .search-result-subtitle {
          font-size: 11.5px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--color-accent-primary);
        }

        .search-result-arrow {
          color: #9E9A91;
          transform: rotate(45deg);
          transition: transform 0.2s, color 0.2s;
        }

        .search-result-item:hover .search-result-arrow {
          color: var(--color-accent-primary);
          transform: rotate(45deg) translate(2px, -2px);
        }
      `}</style>
    </div>
  );
};
