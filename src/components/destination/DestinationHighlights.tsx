import { type Highlight } from '../../data/mockDestinations';

interface DestinationHighlightsProps {
  highlights?: Highlight[];
  legacyHighlights?: string[];
  name: string;
}

export const DestinationHighlights = ({ highlights, legacyHighlights, name }: DestinationHighlightsProps) => {
  return (
    <div className="destination-highlights" style={{ marginTop: 'var(--space-8)' }}>
      <h3 
        className="text-serif" 
        style={{ 
          fontSize: 'var(--text-3xl)', 
          marginBottom: 'var(--space-8)',
          color: 'var(--color-text-primary)' 
        }}
      >
        Why {name} stays with you
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {highlights && highlights.length > 0 ? (
          highlights.map((highlight, index) => (
            <div 
              key={index} 
              style={{ 
                display: 'flex', 
                gap: 'var(--space-6)', 
                padding: 'var(--space-6) 0',
                borderBottom: index !== highlights.length - 1 ? '1px solid var(--color-border)' : 'none'
              }}
            >
              <div 
                className="text-serif" 
                style={{ 
                  color: 'var(--color-text-tertiary)', 
                  fontSize: '18px', 
                  minWidth: '32px' 
                }}
              >
                {String(index + 1).padStart(2, '0')}
              </div>
              <div style={{ flex: 1 }}>
                <h4 
                  className="text-sans" 
                  style={{ 
                    fontSize: '16px', 
                    fontWeight: 500, 
                    marginBottom: 'var(--space-2)',
                    color: 'var(--color-text-primary)'
                  }}
                >
                  {highlight.title}
                </h4>
                <p 
                  className="text-sans" 
                  style={{ 
                    color: 'var(--color-text-secondary)', 
                    fontSize: '15px', 
                    lineHeight: 1.6,
                    margin: 0
                  }}
                >
                  {highlight.description}
                </p>
              </div>
            </div>
          ))
        ) : (
          legacyHighlights?.map((highlight, index) => (
            <div 
              key={index} 
              style={{ 
                display: 'flex', 
                gap: 'var(--space-6)', 
                padding: 'var(--space-6) 0',
                borderBottom: index !== legacyHighlights.length - 1 ? '1px solid var(--color-border)' : 'none'
              }}
            >
              <div 
                className="text-serif" 
                style={{ 
                  color: 'var(--color-text-tertiary)', 
                  fontSize: '18px', 
                  minWidth: '32px' 
                }}
              >
                {String(index + 1).padStart(2, '0')}
              </div>
              <div style={{ flex: 1 }}>
                <h4 
                  className="text-sans" 
                  style={{ 
                    fontSize: '16px', 
                    fontWeight: 500, 
                    margin: 0,
                    color: 'var(--color-text-primary)'
                  }}
                >
                  {highlight}
                </h4>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
