import { Search } from 'lucide-react';
import { MOCK_IMAGES } from '../../data/mockImages';

interface ExploreHeroProps {
  localQuery: string;
  setLocalQuery: (val: string) => void;
  handleSearchSubmit: (e: React.FormEvent) => void;
  updateFilter: (key: string, value: string) => void;
}

export const ExploreHero = ({ localQuery, setLocalQuery, handleSearchSubmit, updateFilter }: ExploreHeroProps) => {
  const quickLinks = [
    { label: 'JAPAN', filter: 'country', value: 'Japan' },
    { label: 'RAJASTHAN', filter: 'region', value: 'Asia' }, // simplified mapping
    { label: 'COASTAL LIGHT', filter: 'mood', value: 'Coastal light' },
    { label: 'WILD LANDSCAPES', filter: 'mood', value: 'Wild horizons' },
    { label: 'SLOW MORNINGS', filter: 'mood', value: 'Slow mornings' },
  ];

  return (
    <div style={{ backgroundColor: 'var(--color-bg-primary)', borderBottom: '1px solid var(--color-border)' }}>
      <div className="container" style={{ paddingTop: 'calc(var(--header-height) + var(--space-8))', paddingBottom: 'var(--space-16)' }}>
        <div className="hero-grid">
          
          {/* Left Column: Copy & Search */}
          <div className="hero-left" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingRight: 'var(--space-12)' }}>
            <p 
              className="text-sans uppercase" 
              style={{ 
                fontSize: '11px', 
                letterSpacing: '0.14em', 
                color: '#C07C5F', // Muted terracotta/bronze
                marginBottom: 'var(--space-6)',
                fontWeight: 600
              }}
            >
              Discover your next chapter
            </p>
            
            <h1 
              className="text-serif" 
              style={{ 
                fontSize: 'clamp(42px, 5vw, 64px)', 
                lineHeight: 1.1, 
                color: 'var(--color-text-primary)',
                marginBottom: 'var(--space-12)',
                maxWidth: '600px'
              }}
            >
              Where will curiosity take you?
            </h1>

            <form onSubmit={handleSearchSubmit} style={{ position: 'relative', marginBottom: 'var(--space-8)', maxWidth: '500px' }}>
              <Search 
                size={20} 
                style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-tertiary)' }} 
              />
              <input 
                type="text" 
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                placeholder="Search destinations, regions, or moods..."
                style={{
                  width: '100%',
                  padding: '20px 20px 20px 48px',
                  fontSize: '16px',
                  fontFamily: 'var(--font-sans)',
                  color: 'var(--color-text-primary)',
                  backgroundColor: '#FFFFFF',
                  border: 'none',
                  outline: 'none',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                  borderRadius: '2px'
                }}
              />
            </form>

            <div style={{ display: 'flex', gap: 'var(--space-6)', flexWrap: 'wrap', maxWidth: '500px' }}>
              {quickLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => updateFilter(link.filter, link.value)}
                  className="text-sans uppercase hover-underline"
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    fontSize: '11px',
                    letterSpacing: '0.12em',
                    color: 'var(--color-text-secondary)',
                    fontWeight: 600,
                    textAlign: 'left'
                  }}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Image Collage */}
          <div className="hero-right collage-grid">
            
            {/* Main Image */}
            <div className="collage-main" style={{ position: 'relative', overflow: 'hidden' }}>
              <img src={MOCK_IMAGES['udaipur-hero'].url} alt="Udaipur" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 40%)' }} />
              <div style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px' }}>
                <p className="text-sans uppercase" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '10px', letterSpacing: '0.14em', marginBottom: '4px', fontWeight: 600 }}>
                  Udaipur, India
                </p>
                <h3 className="text-serif" style={{ color: '#FFF', fontSize: '22px', margin: 0, lineHeight: 1.2 }}>
                  Lake light and marble evenings
                </h3>
              </div>
            </div>

            {/* Top Right Image */}
            <div className="collage-top" style={{ position: 'relative', overflow: 'hidden' }}>
              <img src="https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=80&w=1500&auto=format&fit=crop" alt="Lisbon" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 60%)' }} />
              <div style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px' }}>
                <p className="text-sans uppercase" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '10px', letterSpacing: '0.14em', marginBottom: '4px', fontWeight: 600 }}>
                  Lisbon, Portugal
                </p>
                <h3 className="text-serif" style={{ color: '#FFF', fontSize: '18px', margin: 0, lineHeight: 1.2 }}>
                  Golden light and Fado echoes
                </h3>
              </div>
            </div>

            {/* Bottom Right Image */}
            <div className="collage-bottom" style={{ position: 'relative', overflow: 'hidden' }}>
              <img src={MOCK_IMAGES['kyoto-hero'].url} alt="Kyoto" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 60%)' }} />
              <div style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px' }}>
                <p className="text-sans uppercase" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '10px', letterSpacing: '0.14em', marginBottom: '4px', fontWeight: 600 }}>
                  Kyoto, Japan
                </p>
                <h3 className="text-serif" style={{ color: '#FFF', fontSize: '18px', margin: 0, lineHeight: 1.2 }}>
                  Zen gardens and quiet shrines
                </h3>
              </div>
            </div>

          </div>
        </div>
      </div>

      <style>{`
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-12);
        }
        .collage-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr 1fr;
          gap: 12px;
          height: 600px;
        }
        .collage-main {
          grid-column: 1 / 2;
          grid-row: 1 / 3;
        }
        .collage-top {
          grid-column: 2 / 3;
          grid-row: 1 / 2;
        }
        .collage-bottom {
          grid-column: 2 / 3;
          grid-row: 2 / 3;
        }

        @media (min-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1fr 1fr;
            align-items: center;
          }
          .collage-grid {
            height: 550px;
          }
        }

        .hover-underline {
          position: relative;
        }
        .hover-underline::after {
          content: '';
          position: absolute;
          width: 0;
          height: 1px;
          bottom: -2px;
          left: 0;
          background-color: currentColor;
          transition: width 0.3s ease;
        }
        .hover-underline:hover::after {
          width: 100%;
        }
      `}</style>
    </div>
  );
};
