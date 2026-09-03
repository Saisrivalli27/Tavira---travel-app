import React from 'react';
import { Search, Compass, X } from 'lucide-react';
import { MOCK_IMAGES } from '../../data/mockImages';

interface ExploreHeroProps {
  localQuery: string;
  setLocalQuery: (val: string) => void;
  handleSearchSubmit: (e: React.FormEvent) => void;
  updateFilter: (key: string, value: string) => void;
  activeFilter?: string;
}

export const ExploreHero: React.FC<ExploreHeroProps> = ({
  localQuery,
  setLocalQuery,
  handleSearchSubmit,
  updateFilter,
  activeFilter = 'All'
}) => {
  // Working category/region filters as required by Master Prompt Section 6
  const categoryFilters = [
    { label: 'All', key: 'region', value: 'All' },
    { label: 'Europe', key: 'region', value: 'Europe' },
    { label: 'Asia', key: 'region', value: 'Asia' },
    { label: 'Americas', key: 'region', value: 'Americas' },
    { label: 'Africa', key: 'region', value: 'Africa' },
    { label: 'Culture', key: 'mood', value: 'Cultural depth' },
    { label: 'Nature', key: 'mood', value: 'Wild landscapes' },
    { label: 'Slow mornings', key: 'mood', value: 'Slow mornings' }
  ];

  return (
    <div className="explore-hero-wrap section-spacing">
      <div className="container">
        <div className="hero-grid">
          
          {/* Left Column: Headings & Search Bar */}
          <div className="hero-left">
            <span className="explore-eyebrow">
              <Compass size={12} className="text-accent" />
              DESTINATION ATELIER
            </span>
            
            <h1 className="explore-heading">
              Where will you go next?
            </h1>

            <p className="explore-subtext">
              Explore places worth crossing the map for.
            </p>

            {/* Large Elegant Search Input with Clear Action */}
            <form onSubmit={handleSearchSubmit} className="explore-search-form">
              <Search size={18} className="explore-search-icon" />
              <input 
                type="text" 
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                placeholder="Search destinations, countries or cities..."
                className="explore-search-input"
              />
              {localQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setLocalQuery('');
                    updateFilter('query', '');
                  }}
                  className="explore-search-clear-btn"
                  aria-label="Clear search input"
                >
                  <X size={15} />
                </button>
              )}
              <button type="submit" className="explore-search-submit">
                Search
              </button>
            </form>

            {/* Filter Pills Bar (Section 6 Master Prompt) */}
            <div className="explore-filters-pills-bar">
              {categoryFilters.map((filter) => {
                const isActive = activeFilter === filter.value || (filter.value === 'All' && activeFilter === 'All');
                return (
                  <button
                    key={filter.label}
                    onClick={() => updateFilter(filter.key, filter.value)}
                    className={`explore-filter-pill ${isActive ? 'active' : ''}`}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Editorial Image Collage */}
          <div className="hero-right collage-grid">
            {/* Main Image */}
            <div className="collage-main">
              <img src={MOCK_IMAGES['udaipur-hero'].url} alt="Udaipur" className="collage-img" />
              <div className="collage-overlay" />
              <div className="collage-caption">
                <span className="collage-sub">Udaipur, India</span>
                <h3 className="collage-title">Lake light and marble evenings</h3>
              </div>
            </div>

            {/* Top Right */}
            <div className="collage-top">
              <img src="https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=80&w=1500&auto=format&fit=crop" alt="Lisbon" className="collage-img" />
              <div className="collage-overlay" />
              <div className="collage-caption">
                <span className="collage-sub">Lisbon, Portugal</span>
                <h3 className="collage-title">Fado echoes</h3>
              </div>
            </div>

            {/* Bottom Right */}
            <div className="collage-bottom">
              <img src={MOCK_IMAGES['kyoto-hero'].url} alt="Kyoto" className="collage-img" />
              <div className="collage-overlay" />
              <div className="collage-caption">
                <span className="collage-sub">Kyoto, Japan</span>
                <h3 className="collage-title">Zen sanctuaries</h3>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .explore-hero-wrap {
          background-color: var(--color-bg-primary);
          border-bottom: 1px solid var(--color-border);
          font-family: var(--font-sans);
        }

        .explore-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          font-weight: 600;
          color: var(--color-accent-primary);
          margin-bottom: 16px;
        }

        .explore-heading {
          font-family: var(--font-serif);
          font-size: clamp(38px, 5.5vw, 64px);
          line-height: 1.05;
          color: var(--color-text-primary);
          margin-bottom: 12px;
          font-weight: 400;
        }

        .explore-subtext {
          font-size: 18px;
          line-height: 1.6;
          color: var(--color-text-secondary);
          margin-bottom: 32px;
          font-weight: 300;
        }

        .explore-search-form {
          position: relative;
          display: flex;
          align-items: center;
          max-width: 580px;
          height: 56px;
          background-color: #141413;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 9999px;
          padding: 6px 6px 6px 18px;
          margin-bottom: 24px;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.45);
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
        }

        .explore-search-form:focus-within {
          border-color: var(--color-accent-primary);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(197, 168, 128, 0.25);
        }

        .explore-search-icon {
          color: var(--color-accent-primary);
          flex-shrink: 0;
          margin-right: 12px;
        }

        .explore-search-input {
          flex: 1;
          height: 100%;
          font-size: 15px;
          font-family: var(--font-sans);
          color: #F5F2EB !important;
          background: transparent !important;
          border: none !important;
          outline: none !important;
          padding: 0 10px 0 0;
        }

        .explore-search-input::placeholder {
          color: rgba(245, 242, 235, 0.4);
          font-weight: 300;
        }

        .explore-search-clear-btn {
          background: none;
          border: none;
          color: #9E9A91;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 6px;
          border-radius: 50%;
          margin-right: 8px;
          flex-shrink: 0;
          transition: color 0.2s, background-color 0.2s;
        }

        .explore-search-clear-btn:hover {
          color: #F5F2EB;
          background-color: rgba(255, 255, 255, 0.1);
        }

        .explore-search-submit {
          height: 44px;
          padding: 0 24px;
          background-color: var(--color-accent-primary);
          color: #0D0D0C;
          border: none;
          border-radius: 9999px;
          font-size: 12px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-weight: 600;
          cursor: pointer;
          flex-shrink: 0;
          transition: background-color 0.2s ease, transform 0.15s ease;
        }

        .explore-search-submit:hover {
          background-color: var(--color-accent-hover);
          transform: translateY(-1px);
        }

        .explore-filters-pills-bar {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          max-width: 580px;
        }

        .explore-filter-pill {
          padding: 8px 18px;
          font-size: 12.5px;
          font-weight: 500;
          white-space: nowrap !important;
          border-radius: 9999px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background-color: rgba(255, 255, 255, 0.05);
          color: #9E9A91;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .explore-filter-pill:hover {
          background-color: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.25);
          color: #F5F2EB;
          transform: translateY(-1px);
        }

        .explore-filter-pill.active {
          background-color: var(--color-accent-primary);
          color: #0D0D0C;
          border-color: var(--color-accent-primary);
          font-weight: 600;
          box-shadow: 0 4px 14px rgba(197, 168, 128, 0.25);
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
        }

        @media (min-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1.2fr 1fr;
            align-items: center;
          }
        }

        .collage-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          grid-template-rows: 1fr 1fr;
          gap: 12px;
          height: 480px;
        }

        .collage-main {
          grid-column: 1 / 2;
          grid-row: 1 / 3;
          position: relative;
          overflow: hidden;
          border-radius: 2px;
        }

        .collage-top {
          grid-column: 2 / 3;
          grid-row: 1 / 2;
          position: relative;
          overflow: hidden;
          border-radius: 2px;
        }

        .collage-bottom {
          grid-column: 2 / 3;
          grid-row: 2 / 3;
          position: relative;
          overflow: hidden;
          border-radius: 2px;
        }

        .collage-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .collage-main:hover .collage-img,
        .collage-top:hover .collage-img,
        .collage-bottom:hover .collage-img {
          transform: scale(1.04);
        }

        .collage-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(18, 18, 17, 0.75) 0%, rgba(18, 18, 17, 0) 55%);
        }

        .collage-caption {
          position: absolute;
          bottom: 18px;
          left: 18px;
          right: 18px;
          color: #F7F4EE;
        }

        .collage-sub {
          display: block;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          opacity: 0.8;
          margin-bottom: 2px;
        }

        .collage-title {
          font-family: var(--font-serif);
          font-size: 18px;
          font-weight: 400;
          margin: 0;
          line-height: 1.2;
        }
      `}</style>
    </div>
  );
};
