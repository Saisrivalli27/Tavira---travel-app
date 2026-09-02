import { useEffect, useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { X, MapPin, ArrowLeft } from 'lucide-react';
import { destinationService, type DestinationFilters } from '../services/destinationService';
import { locationService, type LocationState } from '../services/locationService';
import type { Destination } from '../data/mockDestinations';
import { imageService } from '../services/imageService';
import { Button } from '../components/ui/Button';
import { ExploreHero } from '../components/explore/ExploreHero';
import { ExploreFilterBar } from '../components/explore/ExploreFilterBar';

export const Explore = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [locState, setLocState] = useState<LocationState>('prompt');
  const [locMsg, setLocMsg] = useState('');

  // Derive filters from URL
  const filters: DestinationFilters = useMemo(() => ({
    query: searchParams.get('query') || '',
    region: searchParams.get('region') || 'All',
    country: searchParams.get('country') || 'All',
    mood: searchParams.get('mood') || 'All',
    season: searchParams.get('season') || 'All',
  }), [searchParams]);

  const [localQuery, setLocalQuery] = useState(filters.query);

  useEffect(() => {
    setLocalQuery(filters.query || '');
    let isMounted = true;
    setLoading(true);
    
    destinationService.searchAndFilter(filters).then((results) => {
      if (isMounted) {
        setDestinations(results);
        setLoading(false);
      }
    });
    return () => { isMounted = false; };
  }, [filters]);

  const updateFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value && value !== 'All') {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilter('query', localQuery || '');
  };

  const clearAllFilters = () => {
    setSearchParams(new URLSearchParams());
    setLocalQuery('');
  };

  const hasActiveFilters = filters.query || filters.region !== 'All' || filters.country !== 'All' || filters.mood !== 'All' || filters.season !== 'All';

  const handleUseLocation = async () => {
    setLocState('requesting');
    setLocMsg('Locating...');
    const result = await locationService.requestLocation();
    setLocState(result.state);
    
    if (result.state === 'granted') {
      setLocMsg('Location found. Showing nearby places.');
      // Mock: set region based on success
      updateFilter('region', 'Asia');
    } else if (result.state === 'denied') {
      setLocMsg('Location access denied. Please use the search above.');
    } else {
      setLocMsg('Location unavailable.');
    }
  };

  return (
    <>
      <ExploreHero 
        localQuery={localQuery || ''} 
        setLocalQuery={setLocalQuery} 
        handleSearchSubmit={handleSearchSubmit} 
        updateFilter={updateFilter} 
      />

      <ExploreFilterBar 
        filters={filters} 
        updateFilter={updateFilter} 
      />

      <div className="container" style={{ paddingBottom: 'var(--space-32)', paddingTop: 'var(--space-12)' }}>

      {/* Results Summary & Location */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-12)', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
        <p className="text-secondary" style={{ fontSize: 'var(--text-lg)' }}>
          {loading ? 'Searching...' : `${destinations.length} destination${destinations.length !== 1 ? 's' : ''} found`}
        </p>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)' }}>
          {locState === 'prompt' && (
            <Button variant="ghost" onClick={handleUseLocation} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <MapPin size={16} /> Use my location
            </Button>
          )}
          {locState !== 'prompt' && (
            <span className="text-sm text-secondary flex items-center gap-2">
              <MapPin size={14} /> {locMsg}
            </span>
          )}
          
          {hasActiveFilters && (
            <Button variant="secondary" onClick={clearAllFilters} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', padding: 'var(--space-2) var(--space-4)' }}>
              <X size={16} /> Clear filters
            </Button>
          )}
        </div>
      </div>

      {/* Results Editorial Grid */}
      {loading ? (
        <div className="editorial-grid">
          {[1, 2, 3, 4, 5, 6].map(n => (
            <div key={n} style={{ animation: 'pulse 1.5s infinite ease-in-out' }}>
              <div style={{ height: n % 3 === 0 ? '500px' : '350px', backgroundColor: 'var(--color-bg-secondary)', marginBottom: 'var(--space-4)', borderRadius: '0px' }} />
              <div style={{ height: '24px', width: '60%', backgroundColor: 'var(--color-bg-secondary)', marginBottom: 'var(--space-2)' }} />
              <div style={{ height: '16px', width: '40%', backgroundColor: 'var(--color-bg-secondary)' }} />
            </div>
          ))}
        </div>
      ) : destinations.length === 0 ? (
        <div style={{ 
          padding: 'var(--space-24) 0', 
          textAlign: 'center',
          backgroundColor: 'var(--color-bg-secondary)',
          borderRadius: '0px'
        }}>
          <h3 className="text-serif" style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-4)' }}>No destinations found</h3>
          <p className="text-secondary text-lg" style={{ marginBottom: 'var(--space-8)', maxWidth: '400px', margin: '0 auto var(--space-8)' }}>
            We couldn't find any places matching your exact filters. Adjust your criteria or view our full collection.
          </p>
          <Button variant="primary" onClick={clearAllFilters}>
            View all destinations
          </Button>
        </div>
      ) : (
        <div className="editorial-grid">
          {destinations.map((dest, index) => {
            const img = imageService.getImage(dest.heroImageId);
            
            // Asymmetric grid logic
            let gridColSpan = 4;
            let aspectRatio = '4/3';
            
            if (index === 0) {
              gridColSpan = 6;
              aspectRatio = '4/5';
            } else if (index === 1 || index === 2) {
              gridColSpan = 3;
              aspectRatio = '4/5';
            } else if (index % 4 === 0) {
              gridColSpan = 8;
              aspectRatio = '16/9';
            } else if (index % 5 === 0) {
              gridColSpan = 6;
              aspectRatio = '1/1';
            }

            return (
              <Link 
                to={`/destinations/${dest.slug}`} 
                key={dest.id}
                className="editorial-card"
                style={{ 
                  gridColumn: `span ${gridColSpan}` 
                }}
              >
                <div className="editorial-img-wrap" style={{ aspectRatio, width: '100%' }}>
                  <img 
                    src={img.url} 
                    alt={img.alt}
                    className="explore-img"
                    loading="lazy"
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="text-xs uppercase" style={{ letterSpacing: '0.14em', color: 'var(--color-text-secondary)' }}>
                      {dest.region} · {dest.country}
                    </span>
                    <ArrowLeft size={16} style={{ color: 'var(--color-text-secondary)', transform: 'rotate(135deg)' }} />
                  </div>
                  <h3 className="text-serif editorial-title" style={{ fontSize: 'var(--text-3xl)', color: 'var(--color-text-primary)', margin: 0 }}>
                    {dest.name}
                  </h3>
                  <div style={{ height: '1px', width: '100%', backgroundColor: 'var(--color-border)', margin: 'var(--space-2) 0' }} />
                  <p className="text-sans" style={{ fontSize: '15px', color: 'var(--color-text-secondary)', margin: 0 }}>
                    {dest.moods.join(' · ')}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
      
      <style>{`
        .editorial-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: var(--space-12) var(--space-6);
          align-items: start;
        }
        @media (min-width: 1024px) {
          .editorial-grid {
            grid-template-columns: repeat(12, 1fr);
          }
          .editorial-grid > a {
            /* Fallback default, but JS override takes precedence */
            grid-column: span 4;
          }
        }
        
        .editorial-card {
          display: flex;
          flex-direction: column;
          text-decoration: none;
          color: inherit;
        }
        .editorial-img-wrap {
          overflow: hidden;
          margin-bottom: var(--space-4);
          position: relative;
        }
        .editorial-img-wrap::after {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0);
          transition: background 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          pointer-events: none;
        }
        .editorial-card:hover .editorial-img-wrap::after {
          background: rgba(0,0,0,0.1);
        }
        .explore-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .editorial-card:hover .explore-img {
          transform: scale(1.04);
        }
        .editorial-title {
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .editorial-card:hover .editorial-title {
          transform: translateY(-2px);
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
      </div>
    </>
  );
};
