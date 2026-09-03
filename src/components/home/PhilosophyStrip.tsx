import React from 'react';
import { Compass, Leaf, ShieldCheck, Heart } from 'lucide-react';

export const PhilosophyStrip: React.FC = () => {
  const pillars = [
    {
      icon: <Compass size={18} strokeWidth={1.75} />,
      title: 'Curated with care',
      description: 'Only the most worthwhile places.'
    },
    {
      icon: <Leaf size={18} strokeWidth={1.75} />,
      title: 'Sustainable travel',
      description: 'Experiences that respect the planet.'
    },
    {
      icon: <ShieldCheck size={18} strokeWidth={1.75} />,
      title: 'Trusted & safe',
      description: 'Verified stays and reliable guidance.'
    },
    {
      icon: <Heart size={18} strokeWidth={1.75} />,
      title: 'Made for you',
      description: 'Journeys tailored to your pace and style.'
    }
  ];

  return (
    <section className="philosophy-strip-section" id="philosophy-strip" aria-label="Travel Philosophy">
      <div className="container">
        <div className="philosophy-card-strip">
          {pillars.map((pillar, idx) => (
            <div key={idx} className="philosophy-pillar-item">
              <div className="pillar-icon-badge">
                {pillar.icon}
              </div>
              <div className="pillar-text-wrap">
                <h4 className="pillar-title">{pillar.title}</h4>
                <p className="pillar-desc">{pillar.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .philosophy-strip-section {
          padding: 20px 0 64px;
          background-color: var(--color-bg-primary);
        }

        .philosophy-card-strip {
          background-color: #FFFFFF;
          border: 1px solid var(--color-border);
          border-radius: 16px;
          padding: 24px 32px;
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 24px;
          box-shadow: 0 4px 20px rgba(36, 35, 31, 0.04);
        }

        @media (min-width: 640px) {
          .philosophy-card-strip {
            grid-template-columns: repeat(2, 1fr);
            gap: 28px;
          }
        }

        @media (min-width: 1024px) {
          .philosophy-card-strip {
            grid-template-columns: repeat(4, 1fr);
            gap: 24px;
            padding: 28px 36px;
          }
        }

        .philosophy-pillar-item {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .pillar-icon-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background-color: #FAF8F4;
          border: 1px solid var(--color-border);
          color: var(--color-accent-primary);
          flex-shrink: 0;
          transition: transform 0.25s ease, color 0.25s ease;
        }

        .philosophy-pillar-item:hover .pillar-icon-badge {
          transform: scale(1.05);
          color: var(--color-accent-gold);
        }

        .pillar-text-wrap {
          display: flex;
          flex-direction: column;
        }

        .pillar-title {
          font-family: var(--font-sans);
          font-size: 14.5px;
          font-weight: 600;
          color: var(--color-text-primary);
          letter-spacing: -0.01em;
          margin-bottom: 3px;
        }

        .pillar-desc {
          font-family: var(--font-sans);
          font-size: 13px;
          color: var(--color-text-secondary);
          line-height: 1.4;
        }
      `}</style>
    </section>
  );
};
