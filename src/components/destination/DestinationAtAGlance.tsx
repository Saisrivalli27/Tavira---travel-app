import { type Destination } from '../../data/mockDestinations';
import { MapPin } from 'lucide-react';

interface DestinationFactProps {
  label: string;
  value: React.ReactNode;
  support?: string;
  isLast?: boolean;
}

const DestinationFact = ({ label, value, support, isLast }: DestinationFactProps) => (
  <div style={{ 
    padding: 'var(--space-6) 0',
    borderBottom: isLast ? 'none' : '1px solid rgba(42, 36, 33, 0.08)'
  }}>
    <h4 
      className="text-sans uppercase" 
      style={{ 
        fontSize: '10px', 
        letterSpacing: '0.14em', 
        color: 'var(--color-text-secondary)',
        marginBottom: 'var(--space-2)',
        fontWeight: 600
      }}
    >
      {label}
    </h4>
    <div 
      className="text-sans" 
      style={{ 
        fontSize: '15px', 
        fontWeight: 500,
        color: 'var(--color-text-primary)',
        marginBottom: support ? '4px' : '0'
      }}
    >
      {value}
    </div>
    {support && (
      <p 
        className="text-serif" 
        style={{ 
          fontSize: '14px', 
          color: 'var(--color-text-tertiary)', 
          margin: 0,
          lineHeight: 1.4
        }}
      >
        {support}
      </p>
    )}
  </div>
);

interface DestinationAtAGlanceProps {
  destination: Destination;
}

export const DestinationAtAGlance = ({ destination }: DestinationAtAGlanceProps) => {
  const { details, bestSeason, moods } = destination;
  
  return (
    <div 
      className="at-a-glance-card"
      style={{
        backgroundColor: '#F7F4F0', // Soft warm ivory, slightly different from page background
        border: '1px solid rgba(42, 36, 33, 0.08)',
        borderRadius: '2px',
        padding: 'var(--space-8)',
        position: 'sticky',
        top: 'calc(var(--header-height) + var(--space-8))',
        borderTop: '2px solid var(--color-accent-primary)' // Optional top accent
      }}
    >
      <div style={{ marginBottom: 'var(--space-8)' }}>
        <h3 className="text-serif" style={{ fontSize: '22px', marginBottom: '4px', color: 'var(--color-text-primary)' }}>
          At a glance
        </h3>
        <p className="text-sans" style={{ fontSize: '13px', color: 'var(--color-text-secondary)', margin: 0 }}>
          Everything to know before you go.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        
        <DestinationFact 
          label="Best Time to Visit" 
          value={bestSeason} 
          support={details?.bestTimeDescription} 
        />
        
        {details?.idealStay && (
          <DestinationFact 
            label="Ideal Stay" 
            value={details.idealStay} 
          />
        )}
        
        <DestinationFact 
          label="Travel Rhythm" 
          value={
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
              {moods.map((mood, idx) => (
                <span key={mood} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>{mood}</span>
                  {idx !== moods.length - 1 && <span style={{ width: '3px', height: '3px', borderRadius: '50%', backgroundColor: 'var(--color-text-tertiary)' }} />}
                </span>
              ))}
            </div>
          }
        />
        
        {details?.signatureExperiences && (
          <DestinationFact 
            label="Don't Miss" 
            value={
              <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                {details.signatureExperiences.map((exp, idx) => (
                  <li key={idx} style={{ position: 'relative', paddingLeft: '12px', marginBottom: '4px' }}>
                    <span style={{ position: 'absolute', left: 0, top: '8px', width: '3px', height: '3px', borderRadius: '50%', backgroundColor: 'var(--color-accent-primary)' }} />
                    {exp}
                  </li>
                ))}
              </ul>
            } 
          />
        )}

        <DestinationFact 
          label="Location" 
          value={
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MapPin size={14} style={{ color: 'var(--color-text-tertiary)' }} />
              {details?.locationLabel || `${destination.region}, ${destination.country}`}
            </div>
          }
          support={destination.coordinates ? `${destination.coordinates.lat}°N, ${destination.coordinates.lng}°E` : undefined}
        />

        {details?.localNote && (
          <DestinationFact 
            label="Local Note" 
            value={<span style={{ fontStyle: 'italic', fontWeight: 400 }}>"{details.localNote}"</span>} 
            isLast={true}
          />
        )}

      </div>
    </div>
  );
};
