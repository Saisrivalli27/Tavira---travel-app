import { type DestinationFilters } from '../../services/destinationService';

interface ExploreFilterBarProps {
  filters: DestinationFilters;
  updateFilter: (key: string, value: string) => void;
}

export const ExploreFilterBar = ({ filters, updateFilter }: ExploreFilterBarProps) => {
  return (
    <div style={{ backgroundColor: 'var(--color-bg-primary)' }}>
      <div className="container">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: 'var(--space-6)',
          padding: 'var(--space-8) 0',
        }}>
          
          {/* Region Filter */}
          <div className="filter-group">
            <label htmlFor="region" className="filter-label">Region</label>
            <div className="select-wrapper">
              <select 
                id="region" 
                value={filters.region} 
                onChange={(e) => updateFilter('region', e.target.value)}
                className="custom-select"
              >
                <option value="All">All Regions</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Africa">Africa</option>
                <option value="North America">North America</option>
                <option value="Oceania">Oceania</option>
              </select>
            </div>
          </div>

          {/* Country Filter */}
          <div className="filter-group">
            <label htmlFor="country" className="filter-label">Country</label>
            <div className="select-wrapper">
              <select 
                id="country" 
                value={filters.country} 
                onChange={(e) => updateFilter('country', e.target.value)}
                className="custom-select"
              >
                <option value="All">All Countries</option>
                <option value="India">India</option>
                <option value="Japan">Japan</option>
                <option value="Portugal">Portugal</option>
                <option value="Morocco">Morocco</option>
                <option value="Iceland">Iceland</option>
                <option value="Italy">Italy</option>
                <option value="Denmark">Denmark</option>
                <option value="Mexico">Mexico</option>
                <option value="South Africa">South Africa</option>
                <option value="Vietnam">Vietnam</option>
                <option value="Türkiye">Türkiye</option>
                <option value="Greece">Greece</option>
                <option value="New Zealand">New Zealand</option>
              </select>
            </div>
          </div>

          {/* Travel Mood Filter */}
          <div className="filter-group">
            <label htmlFor="mood" className="filter-label">Travel Mood</label>
            <div className="select-wrapper">
              <select 
                id="mood" 
                value={filters.mood} 
                onChange={(e) => updateFilter('mood', e.target.value)}
                className="custom-select"
              >
                <option value="All">Any Mood</option>
                <option value="Slow mornings">Slow mornings</option>
                <option value="Sacred journeys">Sacred journeys</option>
                <option value="Mountain air">Mountain air</option>
                <option value="Coastal light">Coastal light</option>
                <option value="Craft and culture">Craft and culture</option>
                <option value="Design cities">Design cities</option>
                <option value="Cultural depth">Cultural depth</option>
                <option value="Wild horizons">Wild horizons</option>
              </select>
            </div>
          </div>

          {/* Best Season Filter */}
          <div className="filter-group">
            <label htmlFor="season" className="filter-label">Best Season</label>
            <div className="select-wrapper">
              <select 
                id="season" 
                value={filters.season} 
                onChange={(e) => updateFilter('season', e.target.value)}
                className="custom-select"
              >
                <option value="All">Any Season</option>
                <option value="Spring">Spring</option>
                <option value="Summer">Summer</option>
                <option value="Autumn">Autumn</option>
                <option value="Winter">Winter</option>
              </select>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .filter-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .filter-label {
          font-family: var(--font-sans);
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--color-text-tertiary);
          font-weight: 600;
        }
        .select-wrapper {
          position: relative;
          border-bottom: 1px solid rgba(42, 36, 33, 0.15);
        }
        .select-wrapper::after {
          content: '';
          position: absolute;
          right: 8px;
          top: 50%;
          transform: translateY(-50%);
          width: 0; 
          height: 0; 
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          border-top: 4px solid var(--color-text-primary);
          pointer-events: none;
        }
        .custom-select {
          width: 100%;
          appearance: none;
          background: transparent;
          border: none;
          padding: 8px 24px 8px 0;
          font-family: var(--font-sans);
          font-size: 18px;
          color: var(--color-text-primary);
          cursor: pointer;
          outline: none;
        }
        .custom-select:focus {
          border-bottom-color: var(--color-accent-primary);
        }
      `}</style>
    </div>
  );
};
