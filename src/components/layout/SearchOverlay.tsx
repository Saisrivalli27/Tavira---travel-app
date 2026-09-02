import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Navigation, BookOpen, MapPin, Compass } from 'lucide-react';
import { searchService, type SearchResult } from '../../services/searchService';
import { imageService } from '../../services/imageService';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

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
      // Small delay to ensure render before focus
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

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
  }, [isOpen, results, selectedIndex, onClose]);

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

    const debounceId = setTimeout(fetchResults, 250);
    return () => clearTimeout(debounceId);
  }, [query]);

  const handleSelect = (result: SearchResult) => {
    onClose();
    navigate(result.url);
  };

  if (!isOpen) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'destination': return <MapPin size={18} />;
      case 'journal': return <BookOpen size={18} />;
      case 'mood': return <Compass size={18} />;
      default: return <Navigation size={18} />;
    }
  };

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        backgroundColor: 'rgba(17, 20, 26, 0.8)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: 'var(--space-12) var(--space-4)'
      }}
      className="animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div 
        style={{
          width: '100%',
          maxWidth: '700px',
          backgroundColor: 'var(--color-bg-primary)',
          boxShadow: 'var(--shadow-lg)',
          overflow: 'hidden' // strict square corners per instructions
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Area */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          padding: 'var(--space-4) var(--space-6)',
          borderBottom: '1px solid var(--color-border)',
          backgroundColor: 'var(--color-white)'
        }}>
          <Search size={22} className="text-secondary" />
          <input 
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search destinations, moods, stories..."
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              padding: 'var(--space-2) var(--space-4)',
              fontSize: 'var(--text-xl)',
              fontFamily: 'var(--font-sans)',
              backgroundColor: 'transparent'
            }}
            aria-label="Global search input"
          />
          {query && (
            <button onClick={() => setQuery('')} className="btn-icon text-secondary" aria-label="Clear search">
              <X size={20} />
            </button>
          )}
          <button onClick={onClose} className="text-sm uppercase text-secondary font-medium ml-4" style={{ letterSpacing: '0.05em' }}>
            Esc
          </button>
        </div>

        {/* Results Area */}
        <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
          {query.trim().length < 2 ? (
            <div style={{ padding: 'var(--space-12) var(--space-6)', textAlign: 'center', color: 'var(--color-text-tertiary)' }}>
              <Compass size={32} style={{ margin: '0 auto var(--space-4)', opacity: 0.5 }} />
              <p className="text-lg">Where would you like to go?</p>
              <p className="text-sm mt-2">Try searching for "Kyoto", "Mountain air", or "Slow travel".</p>
            </div>
          ) : loading ? (
            <div style={{ padding: 'var(--space-12) var(--space-6)', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
              Searching...
            </div>
          ) : results.length === 0 ? (
            <div style={{ padding: 'var(--space-12) var(--space-6)', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
              <p className="text-lg">No results found for "{query}"</p>
              <p className="text-sm mt-2 text-tertiary">Try a different destination, country, or mood.</p>
            </div>
          ) : (
            <ul style={{ padding: 'var(--space-2) 0', margin: 0, listStyle: 'none' }}>
              {results.map((result, index) => {
                const isSelected = index === selectedIndex;
                const img = result.imageId ? imageService.getImage(result.imageId) : null;

                return (
                  <li key={result.id}>
                    <button
                      onClick={() => handleSelect(result)}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-4)',
                        padding: 'var(--space-3) var(--space-6)',
                        backgroundColor: isSelected ? 'var(--color-bg-secondary)' : 'transparent',
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'background-color var(--transition-fast)'
                      }}
                      onMouseEnter={() => setSelectedIndex(index)}
                    >
                      {/* Icon or Image thumbnail */}
                      <div style={{ 
                        width: '40px', height: '40px', flexShrink: 0, 
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        backgroundColor: img ? 'transparent' : 'var(--color-bg-tertiary)',
                        color: 'var(--color-text-secondary)',
                        overflow: 'hidden'
                      }}>
                        {img ? (
                          <img src={img.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          getIcon(result.type)
                        )}
                      </div>
                      
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <span className="text-lg" style={{ fontFamily: result.type === 'journal' ? 'var(--font-serif)' : 'var(--font-sans)', fontWeight: 500 }}>
                          {result.title}
                        </span>
                        <span className="text-xs uppercase text-secondary" style={{ letterSpacing: '0.05em' }}>
                          {result.subtitle}
                        </span>
                      </div>
                      
                      <div className="text-tertiary">
                        <Navigation size={16} style={{ transform: 'rotate(45deg)' }} />
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
