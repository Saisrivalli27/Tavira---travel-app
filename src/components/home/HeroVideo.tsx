import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronDown, Compass, Search, MapPin } from 'lucide-react';
import { Button } from '../ui/Button';
import { useTravel } from '../../context/TravelContext';

interface HeroVideoProps {
  onPlanTripClick?: () => void;
}

export const HeroVideo: React.FC<HeroVideoProps> = ({ onPlanTripClick }) => {
  const navigate = useNavigate();
  const { activeLocation, openLocationModal } = useTravel();
  const [videoError, setVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Reliable remote travel video streams
  const videoSources = [
    'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-waves-coming-to-the-beach-5016-large.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
  ];

  // High-resolution fallback image
  const fallbackImage = 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=85&w=2400&auto=format&fit=crop';

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.playsInline = true;
    video.autoplay = true;
    video.loop = true;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setVideoLoaded(true);
        })
        .catch(() => {
          setVideoError(true);
        });
    }
  }, []);

  const handlePlanJourney = () => {
    if (onPlanTripClick) {
      onPlanTripClick();
    } else {
      const planner = document.getElementById('itinerary-planner') || document.getElementById('tavira-planner');
      if (planner) {
        planner.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/explore');
      }
    }
  };

  const handleScrollDown = () => {
    const nextSection = document.getElementById('curated-destinations') || document.getElementById('location-strip') || document.getElementById('explore-preview');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-cinematic" aria-label="Cinematic Destination Hero">
      {/* Video & Image Background Layer */}
      <div className="hero-media-wrapper">
        <img
          src={fallbackImage}
          alt="Cinematic world landscape"
          className={`hero-fallback-image ${videoLoaded && !videoError ? 'faded' : 'loaded'}`}
        />

        {!videoError && (
          <video
            ref={videoRef}
            className={`hero-video ${videoLoaded ? 'active' : ''}`}
            autoPlay
            muted
            loop
            playsInline
            poster={fallbackImage}
            onError={() => setVideoError(true)}
            onLoadedData={() => setVideoLoaded(true)}
          >
            {videoSources.map((src, index) => (
              <source key={index} src={src} type="video/mp4" />
            ))}
          </video>
        )}

        {/* Deep Charcoal Cinematic Gradient Overlay */}
        <div className="hero-editorial-overlay" />
      </div>

      {/* Hero Editorial Composition */}
      <div className="container hero-container">
        <div className="hero-text-content">
          
          {/* Eyebrow */}
          <div className="hero-eyebrow-wrap">
            <span className="hero-eyebrow-badge">
              <Compass size={12} className="hero-eyebrow-icon" />
              THE WORLD, CURATED FOR YOU
            </span>
          </div>

          {/* Large Editorial Headline */}
          <h1 className="hero-headline">
            Discover the world's<br />
            <span className="hero-headline-italics">hidden masterpieces.</span>
          </h1>

          {/* Supporting Copy */}
          <p className="hero-supporting">
            Curated journeys for the intentional traveler. Unhurried discovery, architectural beauty, and quiet moments.
          </p>

          {/* Integrated Luxury Destination Search & Location Pill */}
          <div className="hero-search-wrapper" onClick={() => navigate('/explore')}>
            <Search size={18} className="hero-search-icon" />
            <span className="hero-search-placeholder">Search destinations, countries, or moods...</span>
            <button
              type="button"
              className="hero-location-btn"
              onClick={(e) => {
                e.stopPropagation();
                openLocationModal();
              }}
              title="Use my location"
            >
              <MapPin size={13} className="text-accent" />
              <span>{activeLocation ? activeLocation.city : 'Use location'}</span>
            </button>
            <span className="hero-search-action">
              Explore <ArrowRight size={13} />
            </span>
          </div>

          {/* CTAs */}
          <div className="hero-actions">
            <Button 
              variant="primary"
              onClick={() => navigate('/explore')}
              className="hero-btn-primary"
            >
              <span>Explore destinations</span>
              <ArrowRight size={16} className="hero-btn-arrow" />
            </Button>

            <button 
              onClick={handlePlanJourney}
              className="hero-btn-secondary"
            >
              <span>Plan a journey</span>
            </button>
          </div>

        </div>

        {/* Subtle Scroll Indicator */}
        <div className="hero-scroll-indicator" onClick={handleScrollDown} role="button" tabIndex={0} aria-label="Scroll to discover">
          <span className="hero-scroll-label">DISCOVER</span>
          <div className="hero-scroll-line">
            <div className="hero-scroll-dot" />
          </div>
          <ChevronDown size={14} className="hero-scroll-chevron" />
        </div>
      </div>

      <style>{`
        .hero-cinematic {
          position: relative;
          width: 100%;
          height: 100vh;
          min-height: 700px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background-color: #121211;
          color: #F7F4EE;
        }

        .hero-media-wrapper {
          position: absolute;
          inset: 0;
          z-index: 0;
          overflow: hidden;
        }

        .hero-fallback-image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(1.04);
          transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 12s ease-out;
        }

        .hero-fallback-image.loaded {
          opacity: 0.95;
        }

        .hero-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0;
          transition: opacity 1.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .hero-video.active {
          opacity: 1;
        }

        .hero-editorial-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(18, 18, 17, 0.45) 0%,
            rgba(18, 18, 17, 0.35) 40%,
            rgba(18, 18, 17, 0.75) 85%,
            rgba(18, 18, 17, 0.95) 100%
          );
          pointer-events: none;
        }

        .hero-container {
          position: relative;
          z-index: 10;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding-top: calc(var(--header-height) + 20px);
          padding-bottom: 60px;
        }

        .hero-text-content {
          max-width: 860px;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: auto 0;
        }

        .hero-eyebrow-wrap {
          margin-bottom: 24px;
        }

        .hero-eyebrow-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-sans);
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          font-weight: 600;
          color: rgba(247, 244, 238, 0.9);
          padding: 8px 18px;
          border-radius: 9999px;
          background-color: rgba(247, 244, 238, 0.08);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(247, 244, 238, 0.2);
        }

        .hero-eyebrow-icon {
          color: #D4AF37;
        }

        .hero-headline {
          font-family: var(--font-serif);
          font-size: clamp(2.75rem, 7.5vw, 6.25rem);
          line-height: 1.05;
          font-weight: 400;
          color: #F7F4EE;
          margin-bottom: 24px;
          letter-spacing: -0.01em;
          text-shadow: 0 2px 24px rgba(0, 0, 0, 0.35);
        }

        .hero-headline-italics {
          font-style: italic;
          color: #F0EAD6;
          font-weight: 300;
        }

        .hero-supporting {
          font-family: var(--font-sans);
          font-size: clamp(1rem, 2vw, 1.25rem);
          line-height: 1.65;
          color: rgba(247, 244, 238, 0.88);
          max-width: 620px;
          margin-bottom: 32px;
          font-weight: 300;
          text-shadow: 0 1px 12px rgba(0, 0, 0, 0.4);
        }

        .hero-search-wrapper {
          width: 100%;
          max-width: 580px;
          height: 56px;
          margin: 0 auto 36px;
          padding: 0 8px 0 20px;
          background: rgba(20, 20, 19, 0.75);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 9999px;
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 12px 36px rgba(0, 0, 0, 0.45);
        }

        .hero-search-wrapper:hover {
          border-color: rgba(197, 168, 128, 0.5);
          background: rgba(26, 26, 25, 0.88);
          transform: translateY(-2px);
          box-shadow: 0 16px 44px rgba(0, 0, 0, 0.55);
        }

        .hero-search-icon {
          color: var(--color-accent-primary);
          flex-shrink: 0;
        }

        .hero-search-placeholder {
          flex: 1;
          font-family: var(--font-sans);
          font-size: 14px;
          color: rgba(245, 242, 235, 0.7);
          text-align: left;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .hero-location-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          background: rgba(255, 255, 255, 0.07);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 9999px;
          font-family: var(--font-sans);
          font-size: 11.5px;
          color: var(--color-text-primary);
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
        }

        .hero-location-btn:hover {
          background: rgba(255, 255, 255, 0.14);
          border-color: var(--color-accent-primary);
        }

        .hero-search-action {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 18px;
          background: var(--color-accent-primary);
          color: #0D0D0C;
          border-radius: 9999px;
          font-family: var(--font-sans);
          font-size: 11.5px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          transition: background-color 0.2s;
          white-space: nowrap;
        }

        .hero-search-wrapper:hover .hero-search-action {
          background-color: var(--color-accent-hover);
        }

        .hero-actions {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap;
        }

        .hero-btn-primary {
          background-color: #F7F4EE !important;
          color: #141413 !important;
          border: 1px solid #F7F4EE !important;
          padding: 16px 36px !important;
          font-size: 13px !important;
          letter-spacing: 0.12em !important;
          text-transform: uppercase !important;
          font-weight: 600 !important;
          border-radius: 2px !important;
          display: inline-flex !important;
          align-items: center !important;
          gap: 12px !important;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }

        .hero-btn-primary:hover {
          background-color: #E8E2D5 !important;
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        }

        .hero-btn-primary:hover .hero-btn-arrow {
          transform: translateX(4px);
        }

        .hero-btn-arrow {
          transition: transform 0.25s ease;
        }

        .hero-btn-secondary {
          background-color: transparent;
          color: #F7F4EE;
          border: 1px solid rgba(247, 244, 238, 0.45);
          padding: 16px 36px;
          font-size: 13px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-weight: 600;
          border-radius: 2px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          backdrop-filter: blur(4px);
        }

        .hero-btn-secondary:hover {
          background-color: rgba(247, 244, 238, 0.12);
          border-color: #F7F4EE;
          transform: translateY(-2px);
        }

        .hero-scroll-indicator {
          position: absolute;
          bottom: 28px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          opacity: 0.75;
          transition: opacity 0.3s, transform 0.3s;
        }

        .hero-scroll-indicator:hover {
          opacity: 1;
          transform: translateY(2px);
        }

        .hero-scroll-label {
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          font-weight: 600;
          color: rgba(247, 244, 238, 0.7);
        }

        .hero-scroll-line {
          width: 1px;
          height: 36px;
          background: linear-gradient(to bottom, rgba(247, 244, 238, 0.8), rgba(247, 244, 238, 0.1));
          position: relative;
          overflow: hidden;
        }

        .hero-scroll-dot {
          width: 3px;
          height: 6px;
          background-color: #F7F4EE;
          border-radius: 2px;
          position: absolute;
          left: -1px;
          top: 0;
          animation: scrollDown 2s cubic-bezier(0.65, 0, 0.35, 1) infinite;
        }

        .hero-scroll-chevron {
          color: rgba(247, 244, 238, 0.6);
          animation: bounceChevron 2s ease-in-out infinite;
        }

        @keyframes scrollDown {
          0% { top: 0; opacity: 0; }
          40% { opacity: 1; }
          100% { top: 32px; opacity: 0; }
        }

        @keyframes bounceChevron {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(4px); }
        }

        @media (max-width: 640px) {
          .hero-headline {
            font-size: 2.75rem;
          }
          .hero-supporting {
            font-size: 1rem;
            padding: 0 12px;
          }
          .hero-actions {
            flex-direction: column;
            width: 100%;
            padding: 0 20px;
          }
          .hero-btn-primary, .hero-btn-secondary {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
};
