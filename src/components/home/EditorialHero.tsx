import React, { useState, useEffect } from 'react';
import { Compass, Play, ArrowRight, MapPin } from 'lucide-react';
import { pexelsService } from '../../services/pexelsService';

interface EditorialHeroProps {
  onExploreClick: () => void;
  onHowItWorksClick: () => void;
}

const DEFAULT_HERO_IMAGE = 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=85&w=2400&auto=format&fit=crop';

export const EditorialHero: React.FC<EditorialHeroProps> = ({
  onExploreClick,
  onHowItWorksClick
}) => {
  const [heroImage, setHeroImage] = useState<string>(DEFAULT_HERO_IMAGE);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    let active = true;
    pexelsService.searchDestinationImage('mountain wanderer valley sunrise landscape').then(img => {
      if (active && img?.url) {
        setHeroImage(img.url);
      }
    });
    return () => { active = false; };
  }, []);

  return (
    <section className="editorial-hero-section" aria-label="Introduction">
      <div className="container editorial-hero-grid">
        
        {/* Left Column: Brand Typography & Action CTAs */}
        <div className="hero-content-col">
          
          <h1 className="hero-main-title">
            <span className="hero-title-line">Plan thoughtfully,</span>
            <span className="hero-title-accent">travel accordingly.</span>
          </h1>

          <p className="hero-editorial-subtext">
            Handpicked destinations, meaningful experiences, and journeys designed around the way you want to travel.
          </p>

          <div className="hero-cta-group">
            {/* Primary Action Button */}
            <button 
              onClick={onExploreClick}
              className="hero-btn-primary"
              aria-label="Explore Destinations"
            >
              <Compass size={17} strokeWidth={1.75} className="cta-icon" />
              <span>Explore Destinations</span>
              <ArrowRight size={15} className="cta-arrow" />
            </button>

            {/* Secondary Action Button */}
            <button 
              onClick={onHowItWorksClick}
              className="hero-btn-secondary"
              aria-label="How it works"
            >
              <div className="play-icon-circle">
                <Play size={11} fill="currentColor" />
              </div>
              <span>How it works</span>
            </button>
          </div>

        </div>

        {/* Right Column: Editorial Travel Visual & Dotted Trail Motif */}
        <div className="hero-visual-col">
          
          {/* Subtle Decorative Dotted Route Trail SVG */}
          <svg 
            className="hero-route-trail" 
            viewBox="0 0 320 180" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path 
              d="M10 160 C 80 130, 120 70, 200 60 C 250 50, 280 25, 305 15" 
              stroke="#C5A880" 
              strokeWidth="2" 
              strokeDasharray="5 7" 
              strokeLinecap="round"
              opacity="0.65"
            />
          </svg>

          {/* Location Pin Marker on Trail */}
          <div className="hero-pin-marker" title="Alps Ridgeline">
            <MapPin size={16} fill="#FAF8F5" stroke="#3E4A3D" strokeWidth={2} />
          </div>

          {/* Large Editorial Photograph Container */}
          <div className="hero-image-frame">
            <img 
              src={heroImage} 
              alt="Traveler standing above misty mountain valleys at golden dawn"
              className={`hero-travel-img ${imageLoaded ? 'img-loaded' : ''}`}
              onLoad={() => setImageLoaded(true)}
            />
            {/* Subtle soft gradient fade into ivory background */}
            <div className="hero-img-edge-glow" />
          </div>

        </div>

      </div>

      <style>{`
        .editorial-hero-section {
          position: relative;
          min-height: calc(82vh - 76px);
          padding-top: calc(76px + 40px);
          padding-bottom: 48px;
          display: flex;
          align-items: center;
          background-color: var(--color-bg-primary);
          overflow: hidden;
        }

        .editorial-hero-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
          align-items: center;
        }

        @media (min-width: 960px) {
          .editorial-hero-grid {
            grid-template-columns: 1.05fr 1fr;
            gap: 64px;
          }
        }

        .hero-content-col {
          max-width: 580px;
          z-index: 2;
        }

        .hero-main-title {
          font-family: var(--font-serif);
          font-size: clamp(3rem, 5.8vw, 4.75rem);
          font-weight: 400;
          line-height: 1.08;
          color: var(--color-text-primary);
          letter-spacing: -0.015em;
          margin-bottom: 24px;
        }

        .hero-title-line {
          display: block;
        }

        .hero-title-accent {
          display: block;
          font-style: italic;
          color: var(--color-accent-primary);
          font-weight: 350;
        }

        .hero-editorial-subtext {
          font-family: var(--font-sans);
          font-size: clamp(1rem, 1.25vw, 1.15rem);
          line-height: 1.65;
          color: var(--color-text-secondary);
          margin-bottom: 36px;
          max-width: 480px;
        }

        .hero-cta-group {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .hero-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 13px 28px;
          border-radius: 9999px;
          background-color: var(--color-accent-primary);
          color: #FFFFFF;
          font-family: var(--font-sans);
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.01em;
          border: 1px solid var(--color-accent-primary);
          box-shadow: 0 4px 16px rgba(62, 74, 61, 0.22);
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .hero-btn-primary:hover {
          background-color: var(--color-accent-hover);
          border-color: var(--color-accent-hover);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(62, 74, 61, 0.28);
        }

        .hero-btn-primary .cta-arrow {
          transition: transform 0.2s ease;
        }

        .hero-btn-primary:hover .cta-arrow {
          transform: translateX(3px);
        }

        .hero-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 24px;
          border-radius: 9999px;
          background-color: #FFFFFF;
          color: var(--color-text-primary);
          font-family: var(--font-sans);
          font-size: 14px;
          font-weight: 500;
          border: 1px solid var(--color-border);
          box-shadow: var(--shadow-sm);
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .hero-btn-secondary:hover {
          background-color: #FAF8F5;
          border-color: var(--color-border-hover);
          transform: translateY(-1px);
          box-shadow: var(--shadow-md);
        }

        .play-icon-circle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          border: 1.5px solid currentColor;
          color: var(--color-text-secondary);
        }

        .hero-visual-col {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-route-trail {
          position: absolute;
          top: -24px;
          left: -40px;
          width: 280px;
          height: 160px;
          pointer-events: none;
          z-index: 3;
        }

        @media (max-width: 959px) {
          .hero-route-trail {
            display: none;
          }
        }

        .hero-pin-marker {
          position: absolute;
          top: -16px;
          left: 175px;
          z-index: 4;
          filter: drop-shadow(0 2px 6px rgba(36, 35, 31, 0.15));
          animation: floatPin 3s ease-in-out infinite alternate;
        }

        @keyframes floatPin {
          0% { transform: translateY(0); }
          100% { transform: translateY(-4px); }
        }

        .hero-image-frame {
          position: relative;
          width: 100%;
          max-width: 580px;
          aspect-ratio: 4 / 3.2;
          border-radius: 20px;
          overflow: hidden;
          background-color: #EFECE4;
          box-shadow: 0 16px 48px rgba(36, 35, 31, 0.09);
        }

        .hero-travel-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0;
          transition: opacity 600ms ease, transform 1200ms cubic-bezier(0.16, 1, 0.3, 1);
          transform: scale(1.03);
        }

        .hero-travel-img.img-loaded {
          opacity: 1;
          transform: scale(1);
        }

        .hero-img-edge-glow {
          position: absolute;
          inset: 0;
          pointer-events: none;
          box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.25);
          border-radius: 20px;
        }
      `}</style>
    </section>
  );
};
