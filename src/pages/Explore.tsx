import { useEffect, useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { X, MapPin, ArrowRight, Sun, Sparkles } from 'lucide-react';
import { destinationService, type DestinationFilters } from '../services/destinationService';
import type { Destination } from '../data/mockDestinations';
import { imageService } from '../services/imageService';
import { Button } from '../components/ui/Button';
import { ExploreHero } from '../components/explore/ExploreHero';
import { ExploreFilterBar } from '../components/explore/ExploreFilterBar';
import { useTravel } from '../context/TravelContext';

export const Explore = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  const { activeLocation, openLocationModal, openAria } = useTravel();

  // Derive filters from URL
  const filters: DestinationFilters = useMemo(() => ({
    query: searchParams.get('query') || '',
    region: searchParams.get('region') || 'All',
    country: searchParams.get('country') || 'All',
    mood: searchParams.get('mood') || 'All',
    season: searchParams.get('season') || 'All',
  }), [searchParams]);

  const [localQuery, setLocalQuery] = useState(filters.query);

  // Sync external searchParam updates into localQuery
  useEffect(() => {
    setLocalQuery(filters.query || '');
  }, [filters.query]);

  // Live real-time search: immediately filters as user types (200ms debounce)
  useEffect(() => {
    const timer = setTimeout(() => {
      const currentParam = searchParams.get('query') || '';
      const trimmed = (localQuery || '').trim();
      if (trimmed !== currentParam) {
        const newParams = new URLSearchParams(searchParams);
        if (trimmed) {
          newParams.set('query', trimmed);
        } else {
          newParams.delete('query');
        }
        setSearchParams(newParams, { replace: true });
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [localQuery, searchParams, setSearchParams]);

  useEffect(() => {
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

  const [dynamicImages, setDynamicImages] = useState<Record<string, string>>({});

  useEffect(() => {
    destinations.forEach(dest => {
      imageService.fetchDestinationImage(dest.name, dest.heroImageId).then(img => {
        if (img?.url) {
          setDynamicImages(prev => ({ ...prev, [dest.id]: img.url }));
        }
      });
    });
  }, [destinations]);

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
    const newParams = new URLSearchParams(searchParams);
    const trimmed = (localQuery || '').trim();
    if (trimmed) {
      newParams.set('query', trimmed);
    } else {
      newParams.delete('query');
    }
    setSearchParams(newParams);
  };

  const clearAllFilters = () => {
    setSearchParams(new URLSearchParams());
    setLocalQuery('');
  };

  const hasActiveFilters = Boolean(
    filters.query ||
    (filters.region && filters.region !== 'All') ||
    (filters.country && filters.country !== 'All') ||
    (filters.mood && filters.mood !== 'All') ||
    (filters.season && filters.season !== 'All')
  );

  return (
    <div className="explore-page">
      {/* 1. Explore Hero with Large Search Input & Category Filter Pills */}
      <ExploreHero 
        localQuery={localQuery || ''} 
        setLocalQuery={setLocalQuery} 
        handleSearchSubmit={handleSearchSubmit} 
        updateFilter={updateFilter}
        activeFilter={filters.region !== 'All' ? filters.region : filters.mood}
      />

      {/* 2. Detailed Filter Bar */}
      <ExploreFilterBar 
        filters={filters} 
        updateFilter={updateFilter} 
      />

      {/* 3. Results Section */}
      <div className="container" style={{ paddingBottom: 'var(--space-32)', paddingTop: 'var(--space-12)' }}>

        {/* Results Summary & Location Awareness Strip */}
        <div className="explore-results-bar">
          <p className="explore-results-count">
            {loading ? (
              'Consulting archives...'
            ) : (
              <span>Showing <strong>{destinations.length}</strong> curated destination{destinations.length !== 1 ? 's' : ''}</span>
            )}
          </p>
          
          <div className="explore-actions-group">
            {/* Location Selector Button */}
            <button 
              onClick={openLocationModal} 
              className="explore-loc-btn"
              title="Filter or discover by your location"
            >
              <MapPin size={15} className="text-accent" />
              <span>{activeLocation ? `Near: ${activeLocation.city}` : 'Use my location'}</span>
            </button>

            {/* AI Assistant Quick Trigger */}
            <button 
              onClick={() => openAria()}
              className="explore-aria-trigger"
            >
              <Sparkles size={14} className="text-accent" />
              <span>Ask ARIA to Recommend</span>
            </button>
            
            {hasActiveFilters && (
              <Button 
                variant="secondary" 
                onClick={clearAllFilters} 
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 16px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em' }}
              >
                <X size={14} /> Clear filters
              </Button>
            )}
          </div>
        </div>

        {/* Results Editorial Grid */}
        {loading ? (
          <div className="editorial-grid">
            {[1, 2, 3, 4, 5, 6].map(n => (
              <div key={n} className="dest-card-skeleton">
                <div className="skeleton-img-box" style={{ height: n % 3 === 0 ? '420px' : '320px' }} />
                <div className="skeleton-line" style={{ width: '45%', height: '14px', marginTop: '16px' }} />
                <div className="skeleton-line" style={{ width: '75%', height: '26px', marginTop: '10px' }} />
                <div className="skeleton-line" style={{ width: '90%', height: '16px', marginTop: '8px' }} />
              </div>
            ))}
          </div>
        ) : destinations.length === 0 ? (
          <div className="explore-empty-panel">
            <span className="empty-eyebrow">NO MATCHES FOUND</span>
            <h3 className="empty-title">A quiet corner of the map.</h3>
            <p className="empty-desc">
              We couldn't find any destinations matching your current filter combination. Clear your criteria to view the full curated collection.
            </p>
            <Button variant="primary" onClick={clearAllFilters}>
              Reset all filters
            </Button>
          </div>
        ) : (
          <div className="editorial-grid">
            {destinations.map((dest, index) => {
              const img = imageService.getImage(dest.heroImageId);
              
              // Asymmetric editorial layout
              let gridColSpan = 4;
              let aspectRatio = '4/3';
              
              if (index === 0) {
                gridColSpan = 6;
                aspectRatio = '4/5';
              } else if (index === 1 || index === 2) {
                gridColSpan = 3;
                aspectRatio = '4/5';
              } else if (index % 5 === 0) {
                gridColSpan = 6;
                aspectRatio = '16/10';
              }

              return (
                <Link 
                  to={`/destinations/${dest.slug}`} 
                  key={dest.id}
                  className="editorial-dest-card"
                  style={{ gridColumn: `span ${gridColSpan}` }}
                >
                  {/* Media Wrapper */}
                  <div className="card-media-wrapper" style={{ aspectRatio }}>
                    <img 
                      src={dynamicImages[dest.id] || img.url} 
                      alt={img.alt || dest.name}
                      className="card-dest-img"
                      loading="lazy"
                    />
                    
                    {/* Subtle Overlay */}
                    <div className="card-hover-overlay" />

                    {/* Weather / Season Teaser Badge (Section 7 Master Prompt) */}
                    <div className="card-weather-teaser">
                      <Sun size={12} className="text-accent" />
                      <span>{dest.bestSeason} Light</span>
                    </div>

                    {/* Region Pill */}
                    <span className="card-region-pill">
                      {dest.region}
                    </span>
                  </div>

                  {/* Card Editorial Content */}
                  <div className="card-text-block">
                    <div className="card-header-row">
                      <span className="card-country-label">
                        {dest.country}
                      </span>
                      <div className="card-arrow-wrap">
                        <ArrowRight size={16} className="card-arrow" />
                      </div>
                    </div>

                    <h3 className="card-dest-name">
                      {dest.name}
                    </h3>

                    <p className="card-dest-tagline">
                      "{dest.tagline}"
                    </p>

                    <div className="card-meta-line">
                      <span className="card-mood-tags">
                        {dest.moods.slice(0, 2).join(' · ')}
                      </span>
                      {dest.details?.idealStay && (
                        <span className="card-stay-badge">
                          {dest.details.idealStay}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

      </div>

      <style>{`
        .explore-results-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
          flex-wrap: wrap;
          gap: 16px;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--color-border);
          font-family: var(--font-sans);
        }

        .explore-results-count {
          font-size: 15px;
          color: var(--color-text-secondary);
          margin: 0;
        }

        .explore-actions-group {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        .explore-loc-btn, .explore-aria-trigger {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          background-color: var(--color-bg-secondary);
          border: 1px solid var(--color-border);
          border-radius: 9999px;
          font-size: 12px;
          font-weight: 500;
          color: var(--color-text-primary);
          cursor: pointer;
          transition: all 0.2s;
        }

        .explore-loc-btn:hover, .explore-aria-trigger:hover {
          background-color: #FFFFFF;
          border-color: #181817;
        }

        .editorial-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: clamp(32px, 4vw, 56px) 28px;
          align-items: start;
        }

        @media (min-width: 1024px) {
          .editorial-grid {
            grid-template-columns: repeat(12, 1fr);
          }
          .editorial-grid > a {
            grid-column: span 4;
          }
        }

        .editorial-dest-card {
          display: flex;
          flex-direction: column;
          text-decoration: none;
          color: inherit;
          font-family: var(--font-sans);
        }

        .card-media-wrapper {
          position: relative;
          overflow: hidden;
          margin-bottom: 16px;
          border-radius: 2px;
          background-color: var(--color-bg-secondary);
        }

        .card-dest-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .editorial-dest-card:hover .card-dest-img {
          transform: scale(1.05);
        }

        .card-hover-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0);
          transition: background 0.4s ease;
          pointer-events: none;
        }

        .editorial-dest-card:hover .card-hover-overlay {
          background: rgba(0, 0, 0, 0.08);
        }

        .card-weather-teaser {
          position: absolute;
          bottom: 12px;
          left: 12px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          background-color: rgba(247, 244, 238, 0.92);
          backdrop-filter: blur(8px);
          border-radius: 9999px;
          font-size: 11px;
          font-weight: 600;
          color: #181817;
          letter-spacing: 0.04em;
        }

        .card-region-pill {
          position: absolute;
          top: 12px;
          right: 12px;
          padding: 4px 10px;
          background-color: rgba(18, 18, 17, 0.7);
          backdrop-filter: blur(6px);
          border-radius: 2px;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #F7F4EE;
          font-weight: 500;
        }

        .card-text-block {
          display: flex;
          flex-direction: column;
        }

        .card-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 4px;
        }

        .card-country-label {
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          font-weight: 600;
          color: var(--color-text-secondary);
        }

        .card-arrow-wrap {
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-text-secondary);
          transition: transform 0.3s ease, color 0.3s ease;
        }

        .editorial-dest-card:hover .card-arrow-wrap {
          transform: translateX(4px);
          color: var(--color-text-primary);
        }

        .card-dest-name {
          font-family: var(--font-serif);
          font-size: 26px;
          font-weight: 400;
          color: var(--color-text-primary);
          margin: 0 0 6px 0;
          line-height: 1.15;
          transition: color 0.2s;
        }

        .editorial-dest-card:hover .card-dest-name {
          color: var(--color-accent-primary);
        }

        .card-dest-tagline {
          font-size: 14px;
          line-height: 1.55;
          color: var(--color-text-secondary);
          margin: 0 0 12px 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .card-meta-line {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 12px;
          color: var(--color-text-secondary);
          padding-top: 10px;
          border-top: 1px solid var(--color-border);
        }

        .card-stay-badge {
          font-size: 11px;
          font-weight: 600;
          color: #181817;
        }

        .explore-empty-panel {
          padding: 80px 24px;
          text-align: center;
          background-color: var(--color-bg-secondary);
          border: 1px solid var(--color-border);
          border-radius: 2px;
          max-width: 640px;
          margin: 0 auto;
        }

        .empty-eyebrow {
          font-size: 11px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--color-accent-primary);
          font-weight: 600;
          display: block;
          margin-bottom: 12px;
        }

        .empty-title {
          font-family: var(--font-serif);
          font-size: 2rem;
          margin: 0 0 14px 0;
        }

        .empty-desc {
          font-size: 16px;
          color: var(--color-text-secondary);
          line-height: 1.6;
          margin-bottom: 28px;
        }

        /* Skeleton Styles */
        .dest-card-skeleton {
          display: flex;
          flex-direction: column;
        }
        .skeleton-img-box {
          background: linear-gradient(90deg, #EFEBE4 25%, #E6E1D8 50%, #EFEBE4 75%);
          background-size: 200% 100%;
          animation: skeletonShimmer 1.5s infinite;
        }
        .skeleton-line {
          background: linear-gradient(90deg, #EFEBE4 25%, #E6E1D8 50%, #EFEBE4 75%);
          background-size: 200% 100%;
          animation: skeletonShimmer 1.5s infinite;
          border-radius: 2px;
        }
        @keyframes skeletonShimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
};
