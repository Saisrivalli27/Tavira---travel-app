import { type Destination } from '../../data/mockDestinations';
import { DestinationHighlights } from './DestinationHighlights';
import { DestinationAtAGlance } from './DestinationAtAGlance';

interface DestinationOverviewProps {
  destination: Destination;
}

export const DestinationOverview = ({ destination }: DestinationOverviewProps) => {
  return (
    <section className="container" style={{ padding: 'var(--space-24) 0', borderBottom: '1px solid var(--color-border)' }}>
      <div className="overview-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-12)' }}>
        
        {/* Left Column: Intro & Highlights */}
        <div className="overview-left" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-16)' }}>
          
          <div className="destination-intro">
            <h2 
              className="text-sans uppercase" 
              style={{ 
                fontSize: '11px', 
                letterSpacing: '0.14em', 
                color: 'var(--color-accent-primary)',
                marginBottom: 'var(--space-6)',
                fontWeight: 600
              }}
            >
              The essence of {destination.name}
            </h2>
            <p 
              className="text-serif" 
              style={{ 
                fontSize: 'clamp(28px, 2.4vw, 42px)', 
                lineHeight: 1.25, 
                color: 'var(--color-text-primary)',
                maxWidth: '700px',
                margin: 0
              }}
            >
              {destination.description}
            </p>
          </div>

          <DestinationHighlights highlights={destination.detailedHighlights} legacyHighlights={destination.highlights} name={destination.name} />

        </div>

        {/* Right Column: Premium "At a glance" Card */}
        <div className="overview-right">
          <DestinationAtAGlance destination={destination} />
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .overview-grid {
            grid-template-columns: repeat(12, 1fr) !important;
            gap: var(--space-8) !important;
          }
          .overview-left {
            grid-column: span 7;
            padding-right: var(--space-12);
          }
          .overview-right {
            grid-column: span 5;
          }
        }
      `}</style>
    </section>
  );
};
