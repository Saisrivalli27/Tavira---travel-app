import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus, ArrowRight, Sun, Cloud, CloudRain, CloudSnow, CloudLightning, CloudFog, MapPin } from 'lucide-react';
import { MOCK_DESTINATIONS, type Destination } from '../../data/mockDestinations';
import { imageService } from '../../services/imageService';
import { weatherService, type WeatherData } from '../../services/weatherService';

// The 5 curated premier destinations matching the editorial showcase
const ACCORDION_SLUGS = ['cappadocia', 'kyoto', 'amalfi-coast', 'banff', 'santorini'];

export const DestinationAccordion: React.FC = () => {
  // Cappadocia is expanded initially (or null if all closed)
  const [expandedSlug, setExpandedSlug] = useState<string | null>('cappadocia');
  const [destImages, setDestImages] = useState<Record<string, string>>({});
  const [weatherData, setWeatherData] = useState<Record<string, WeatherData>>({});
  const [loadingWeather, setLoadingWeather] = useState<Record<string, boolean>>({});

  const destinations: Destination[] = ACCORDION_SLUGS
    .map(slug => MOCK_DESTINATIONS.find(d => d.slug === slug))
    .filter((d): d is Destination => Boolean(d));

  // Pre-resolve Pexels images for destination hero visuals
  useEffect(() => {
    destinations.forEach(dest => {
      imageService.fetchDestinationImage(dest.name, dest.heroImageId).then(img => {
        if (img?.url) {
          setDestImages(prev => ({ ...prev, [dest.slug]: img.url }));
        }
      });
    });
  }, []);

  // Fetch live weather when a destination expands
  useEffect(() => {
    if (!expandedSlug) return;
    const dest = destinations.find(d => d.slug === expandedSlug);
    if (!dest || weatherData[expandedSlug]) return;

    setLoadingWeather(prev => ({ ...prev, [expandedSlug]: true }));
    weatherService.getWeatherByCoordinates(dest.coordinates.lat, dest.coordinates.lng)
      .then(data => {
        setWeatherData(prev => ({ ...prev, [expandedSlug]: data }));
      })
      .catch(() => {
        // Fallback handled in UI
      })
      .finally(() => {
        setLoadingWeather(prev => ({ ...prev, [expandedSlug]: false }));
      });
  }, [expandedSlug]);

  const toggleAccordion = (slug: string) => {
    setExpandedSlug(prev => prev === slug ? null : slug);
  };

  const getWeatherIcon = (condition?: WeatherData['condition']) => {
    switch (condition) {
      case 'Sunny':
      case 'Clear':
        return <Sun size={15} className="weather-icon-sun" />;
      case 'Cloudy':
      case 'Partly Cloudy':
        return <Cloud size={15} className="weather-icon-cloud" />;
      case 'Rainy':
        return <CloudRain size={15} className="weather-icon-rain" />;
      case 'Snow':
        return <CloudSnow size={15} className="weather-icon-snow" />;
      case 'Thunderstorm':
        return <CloudLightning size={15} className="weather-icon-thunder" />;
      case 'Misty':
        return <CloudFog size={15} className="weather-icon-fog" />;
      default:
        return <Sun size={15} className="weather-icon-sun" />;
    }
  };

  return (
    <section className="destination-accordion-section" id="explore-destinations" aria-label="Explore Destinations">
      <div className="container">
        
        {/* Section Header */}
        <div className="accordion-section-header">
          <div>
            <h2 className="accordion-main-title">Explore Destinations</h2>
            <p className="accordion-sub-title">
              <span className="wave-motif" aria-hidden="true">≋</span> Every place has a story. Find yours.
            </p>
          </div>
          <Link to="/explore" className="accordion-view-all-link">
            <span>View all</span>
            <div className="view-all-arrow-circle">
              <ArrowRight size={13} />
            </div>
          </Link>
        </div>

        {/* Vertical Destination List */}
        <div className="accordion-destinations-list" role="region">
          {destinations.map((dest, index) => {
            const isExpanded = expandedSlug === dest.slug;
            const heroUrl = destImages[dest.slug] || imageService.getImage(dest.heroImageId).url;
            const weather = weatherData[dest.slug];
            const isWeatherLoading = loadingWeather[dest.slug];

            return (
              <div 
                key={dest.id} 
                className={`destination-accordion-item ${isExpanded ? 'item-expanded' : ''}`}
              >
                {/* Collapsed Bar / Trigger Header */}
                <button
                  onClick={() => toggleAccordion(dest.slug)}
                  className="accordion-item-trigger"
                  aria-expanded={isExpanded}
                  aria-controls={`dest-content-${dest.slug}`}
                >
                  <div className="trigger-left-content">
                    {/* Small Thumbnail */}
                    <div className="accordion-item-thumb">
                      <img 
                        src={heroUrl} 
                        alt={dest.name} 
                        loading="lazy" 
                        className="thumb-img" 
                      />
                    </div>

                    {/* Destination Title & Tagline */}
                    <div className="accordion-item-meta">
                      <div className="item-title-row">
                        <span className="item-index">0{index + 1}</span>
                        <h3 className="item-destination-name">
                          {dest.name}, <span className="item-country-name">{dest.country}</span>
                        </h3>
                        {index === 0 && (
                          <span className="item-popular-badge">Popular</span>
                        )}
                      </div>
                      <p className="item-destination-tagline">{dest.tagline}</p>
                    </div>
                  </div>

                  {/* Toggle Circular Plus / Minus Button */}
                  <div className="accordion-toggle-circle" aria-label={isExpanded ? 'Collapse' : 'Expand'}>
                    {isExpanded ? <Minus size={15} strokeWidth={2} /> : <Plus size={15} strokeWidth={2} />}
                  </div>
                </button>

                {/* Expanded Content Reveal */}
                {isExpanded && (
                  <div 
                    id={`dest-content-${dest.slug}`} 
                    className="accordion-expanded-panel animate-fade-in"
                  >
                    {/* Large Editorial Destination Photography */}
                    <div className="expanded-image-wrapper">
                      <img 
                        src={heroUrl} 
                        alt={`${dest.name} landscape photograph`} 
                        className="expanded-dest-hero-img"
                      />
                      <div className="expanded-image-overlay" />
                      
                      {/* Location Badge on Image */}
                      <div className="expanded-location-tag">
                        <MapPin size={12} className="text-accent-gold" />
                        <span>{dest.region} · {dest.country}</span>
                      </div>
                    </div>

                    {/* Narrative & Weather Row */}
                    <div className="expanded-details-grid">
                      <div className="expanded-desc-col">
                        <p className="expanded-description-text">
                          {dest.description}
                        </p>

                        {/* Live Weather Pill from OpenWeather */}
                        <div className="expanded-weather-strip">
                          <span className="weather-pill-label">CURRENT WEATHER</span>
                          <div className="weather-pill-body">
                            {isWeatherLoading ? (
                              <span className="weather-loading-txt">Connecting to live weather...</span>
                            ) : weather ? (
                              <div className="flex items-center gap-2">
                                {getWeatherIcon(weather.condition)}
                                <span className="weather-degrees font-semibold">{weather.temperature}°C</span>
                                <span className="weather-dot">·</span>
                                <span className="weather-condition-txt">{weather.conditionDescription || weather.condition}</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <Sun size={15} className="weather-icon-sun" />
                                <span className="weather-degrees font-semibold">20°C</span>
                                <span className="weather-dot">·</span>
                                <span className="weather-condition-txt">Pleasant light</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Famous Places Editorial List */}
                      <div className="expanded-places-col">
                        <span className="places-list-eyebrow">FAMOUS PLACES</span>
                        <div className="famous-places-list">
                          {dest.places.slice(0, 3).map((place, pIdx) => (
                            <div key={place.id} className="famous-place-item">
                              <span className="place-number">0{pIdx + 1}</span>
                              <div className="place-details">
                                <span className="place-name">{place.name}</span>
                                <span className="place-sub">{place.bestTime} · {place.duration}</span>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Action CTA Link */}
                        <Link 
                          to={`/destinations/${dest.slug}`}
                          className="accordion-explore-dest-cta"
                        >
                          <span>Explore {dest.name}</span>
                          <ArrowRight size={14} className="cta-arrow" />
                        </Link>
                      </div>
                    </div>

                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>

      <style>{`
        .destination-accordion-section {
          padding: 32px 0 80px;
          background-color: var(--color-bg-primary);
        }

        .accordion-section-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 32px;
          gap: 20px;
        }

        .accordion-main-title {
          font-family: var(--font-serif);
          font-size: clamp(2rem, 3.8vw, 2.75rem);
          font-weight: 400;
          color: var(--color-text-primary);
          line-height: 1.15;
          margin-bottom: 6px;
        }

        .accordion-sub-title {
          font-family: var(--font-sans);
          font-size: 14px;
          color: var(--color-text-secondary);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .wave-motif {
          color: var(--color-accent-gold);
          font-weight: 600;
        }

        .accordion-view-all-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-sans);
          font-size: 13.5px;
          font-weight: 500;
          color: var(--color-text-primary);
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .accordion-view-all-link:hover {
          color: var(--color-accent-primary);
        }

        .view-all-arrow-circle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 1px solid var(--color-border);
          background-color: #FFFFFF;
          transition: transform 0.2s ease, border-color 0.2s ease;
        }

        .accordion-view-all-link:hover .view-all-arrow-circle {
          transform: translateX(3px);
          border-color: var(--color-accent-primary);
        }

        .accordion-destinations-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .destination-accordion-item {
          background-color: #FFFFFF;
          border: 1px solid var(--color-border);
          border-radius: 18px;
          overflow: hidden;
          transition: box-shadow 300ms ease, border-color 300ms ease, transform 300ms ease;
          box-shadow: 0 2px 10px rgba(36, 35, 31, 0.03);
        }

        .destination-accordion-item:hover {
          border-color: #DCD6C7;
          box-shadow: 0 6px 24px rgba(36, 35, 31, 0.05);
        }

        .destination-accordion-item.item-expanded {
          border-color: #D5CFBF;
          box-shadow: 0 12px 36px rgba(36, 35, 31, 0.07);
        }

        .accordion-item-trigger {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          gap: 16px;
        }

        @media (min-width: 640px) {
          .accordion-item-trigger {
            padding: 18px 24px;
          }
        }

        .trigger-left-content {
          display: flex;
          align-items: center;
          gap: 20px;
          flex: 1;
        }

        .accordion-item-thumb {
          width: 120px;
          height: 76px;
          border-radius: 12px;
          overflow: hidden;
          flex-shrink: 0;
          background-color: #EFECE4;
        }

        @media (min-width: 640px) {
          .accordion-item-thumb {
            width: 140px;
            height: 88px;
          }
        }

        .thumb-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .destination-accordion-item:hover .thumb-img {
          transform: scale(1.05);
        }

        .accordion-item-meta {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .item-title-row {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .item-index {
          font-family: var(--font-sans);
          font-size: 13px;
          font-weight: 500;
          color: var(--color-accent-gold);
          letter-spacing: 0.04em;
        }

        .item-destination-name {
          font-family: var(--font-serif);
          font-size: clamp(1.2rem, 1.8vw, 1.45rem);
          font-weight: 500;
          color: var(--color-text-primary);
          letter-spacing: -0.01em;
        }

        .item-country-name {
          font-weight: 400;
          color: var(--color-text-secondary);
        }

        .item-popular-badge {
          display: inline-flex;
          padding: 3px 10px;
          border-radius: 9999px;
          background-color: #F6EDE4;
          color: #94583E;
          font-family: var(--font-sans);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.02em;
        }

        .item-destination-tagline {
          font-family: var(--font-sans);
          font-size: 13px;
          color: var(--color-text-secondary);
          line-height: 1.45;
        }

        .accordion-toggle-circle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 1px solid var(--color-border);
          background-color: #FAF8F5;
          color: var(--color-text-primary);
          flex-shrink: 0;
          transition: all 0.25s ease;
        }

        .destination-accordion-item:hover .accordion-toggle-circle {
          border-color: var(--color-accent-primary);
          color: var(--color-accent-primary);
          background-color: #FFFFFF;
        }

        .item-expanded .accordion-toggle-circle {
          background-color: var(--color-accent-primary);
          border-color: var(--color-accent-primary);
          color: #FFFFFF;
        }

        /* Expanded Reveal Container */
        .accordion-expanded-panel {
          padding: 0 20px 24px;
          border-top: 1px solid #F1EDE5;
        }

        @media (min-width: 640px) {
          .accordion-expanded-panel {
            padding: 0 24px 28px;
          }
        }

        .expanded-image-wrapper {
          position: relative;
          width: 100%;
          height: 280px;
          border-radius: 14px;
          overflow: hidden;
          margin-top: 20px;
          background-color: #EFECE4;
          box-shadow: 0 6px 20px rgba(36, 35, 31, 0.06);
        }

        @media (min-width: 768px) {
          .expanded-image-wrapper {
            height: 340px;
          }
        }

        .expanded-dest-hero-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .expanded-image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(36, 35, 31, 0.45) 0%, transparent 50%);
          pointer-events: none;
        }

        .expanded-location-tag {
          position: absolute;
          bottom: 16px;
          left: 18px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          border-radius: 9999px;
          background-color: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(8px);
          font-family: var(--font-sans);
          font-size: 12px;
          font-weight: 500;
          color: var(--color-text-primary);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        /* Expanded Details Grid */
        .expanded-details-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 28px;
          margin-top: 24px;
        }

        @media (min-width: 840px) {
          .expanded-details-grid {
            grid-template-columns: 1.2fr 1fr;
            gap: 40px;
          }
        }

        .expanded-description-text {
          font-family: var(--font-sans);
          font-size: 14.5px;
          line-height: 1.7;
          color: var(--color-text-secondary);
          margin-bottom: 24px;
        }

        .expanded-weather-strip {
          padding: 14px 18px;
          border-radius: 12px;
          background-color: #FAF8F4;
          border: 1px solid var(--color-border);
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .weather-pill-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-accent-gold);
        }

        .weather-pill-body {
          font-family: var(--font-sans);
          font-size: 13.5px;
          color: var(--color-text-primary);
        }

        .weather-icon-sun { color: #D48B38; }
        .weather-icon-cloud { color: #738290; }
        .weather-icon-rain { color: #4F7CAC; }
        .weather-icon-snow { color: #88A2AA; }
        .weather-icon-thunder { color: #B28B84; }
        .weather-icon-fog { color: #9A9B94; }

        .weather-dot {
          color: var(--color-border-hover);
        }

        /* Famous Places Editorial Column */
        .expanded-places-col {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .places-list-eyebrow {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-text-muted);
          margin-bottom: 12px;
          display: block;
        }

        .famous-places-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 24px;
        }

        .famous-place-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 8px 12px;
          border-radius: 8px;
          background-color: #FAF8F5;
          border: 1px solid #F1ECE3;
        }

        .place-number {
          font-family: var(--font-sans);
          font-size: 11.5px;
          font-weight: 600;
          color: var(--color-accent-primary);
        }

        .place-details {
          display: flex;
          flex-direction: column;
        }

        .place-name {
          font-family: var(--font-sans);
          font-size: 13.5px;
          font-weight: 600;
          color: var(--color-text-primary);
        }

        .place-sub {
          font-size: 12px;
          color: var(--color-text-secondary);
        }

        .accordion-explore-dest-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px 24px;
          border-radius: 9999px;
          background-color: var(--color-accent-primary);
          color: #FFFFFF;
          font-family: var(--font-sans);
          font-size: 13.5px;
          font-weight: 500;
          text-decoration: none;
          box-shadow: 0 2px 10px rgba(62, 74, 61, 0.2);
          transition: all 0.25s ease;
          align-self: flex-start;
        }

        .accordion-explore-dest-cta:hover {
          background-color: var(--color-accent-hover);
          transform: translateY(-1px);
          box-shadow: 0 4px 14px rgba(62, 74, 61, 0.28);
        }

        .accordion-explore-dest-cta .cta-arrow {
          transition: transform 0.2s ease;
        }

        .accordion-explore-dest-cta:hover .cta-arrow {
          transform: translateX(3px);
        }
      `}</style>
    </section>
  );
};
