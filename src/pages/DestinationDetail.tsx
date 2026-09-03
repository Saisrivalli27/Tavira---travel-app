import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Sparkles, Compass, ChevronRight, Eye } from 'lucide-react';
import { destinationService } from '../services/destinationService';
import { imageService } from '../services/imageService';
import { WeatherWidget } from '../components/weather/WeatherWidget';
import { ItineraryPlanner } from '../components/itinerary/ItineraryPlanner';
import { useTravel } from '../context/TravelContext';
import type { Destination, Place, Highlight } from '../data/mockDestinations';
import { Button } from '../components/ui/Button';

export const DestinationDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [destination, setDestination] = useState<Destination | null>(null);
  const [loading, setLoading] = useState(true);
  const [activePlaceModal, setActivePlaceModal] = useState<Place | null>(null);
  const [relatedDestinations, setRelatedDestinations] = useState<Destination[]>([]);
  const [dynamicHeroImg, setDynamicHeroImg] = useState<string | null>(null);
  const [dynamicPlaceImages, setDynamicPlaceImages] = useState<Record<string, string>>({});
  const [dynamicRelatedImages, setDynamicRelatedImages] = useState<Record<string, string>>({});

  const { openAria, setDestinationContext } = useTravel();

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setDynamicHeroImg(null);
    setDynamicPlaceImages({});
    setDynamicRelatedImages({});
    window.scrollTo(0, 0);

    destinationService.getDestinationBySlug(slug).then((dest) => {
      if (dest) {
        setDestination(dest);

        // Update TravelContext so ARIA knows this destination
        setDestinationContext({
          name: dest.name,
          country: dest.country,
          region: dest.region,
          tagline: dest.tagline,
          description: dest.description,
          bestSeason: dest.bestSeason,
          signatureExperiences: dest.details?.signatureExperiences || dest.highlights,
          places: dest.places.map(p => ({ name: p.name, description: p.description }))
        });

        // Asynchronously enhance with Pexels API (with immediate local fallback)
        imageService.fetchDestinationImage(dest.name, dest.heroImageId).then(img => {
          if (img?.url) setDynamicHeroImg(img.url);
        });

        dest.places.forEach(place => {
          imageService.fetchPlaceImage(place.name, dest.name, place.imageId).then(img => {
            if (img?.url) {
              setDynamicPlaceImages(prev => ({ ...prev, [place.id]: img.url }));
            }
          });
        });

        // Load related destinations
        destinationService.searchAndFilter({ region: dest.region }).then((res) => {
          const related = res.filter(r => r.id !== dest.id).slice(0, 3);
          setRelatedDestinations(related);
          related.forEach(rel => {
            imageService.fetchDestinationImage(rel.name, rel.heroImageId).then(img => {
              if (img?.url) {
                setDynamicRelatedImages(prev => ({ ...prev, [rel.id]: img.url }));
              }
            });
          });
        });
      }
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <div className="dest-loading-screen">
        <span className="dest-loading-spinner" />
        <p className="dest-loading-text">Preparing destination journal...</p>
        <style>{`
          .dest-loading-screen {
            height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 20px;
            background-color: var(--color-bg-primary);
          }
          .dest-loading-spinner {
            width: 32px;
            height: 32px;
            border: 2px solid var(--color-border);
            border-top-color: var(--color-text-primary);
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
          }
          .dest-loading-text {
            font-family: var(--font-serif);
            font-size: 1.25rem;
            color: var(--color-text-secondary);
          }
          @keyframes spin { to { transform: rotate(360deg); } }
        `}</style>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="dest-not-found-screen">
        <h1 className="text-serif text-5xl mb-4">Destination Unrecorded</h1>
        <p className="text-secondary text-lg mb-8 max-w-md text-center">
          The requested path does not exist in the Tavira archives. Explore our global collection to discover new horizons.
        </p>
        <Button to="/explore" variant="primary">Return to Explore</Button>
        <style>{`
          .dest-not-found-screen {
            height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 24px;
            background-color: var(--color-bg-primary);
          }
        `}</style>
      </div>
    );
  }

  const heroImg = imageService.getImage(destination.heroImageId);

  return (
    <div className="destination-page animate-fade-in">
      
      {/* 1. Cinematic Destination Hero */}
      <section className="dest-hero-section">
        <img
          src={dynamicHeroImg || heroImg.url}
          alt={heroImg.alt}
          className="dest-hero-img"
        />
        <div className="dest-hero-overlay" />

        <div className="container dest-hero-container">
          
          {/* Breadcrumbs */}
          <div className="dest-hero-breadcrumbs">
            <Link to="/explore" className="breadcrumb-back">
              <ArrowLeft size={14} /> Back to Destinations
            </Link>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">{destination.region}</span>
          </div>

          {/* Title Composition */}
          <div className="dest-hero-title-wrap">
            <span className="dest-hero-eyebrow">
              {destination.country.toUpperCase()} · {destination.region.toUpperCase()}
            </span>
            <h1 className="dest-hero-title">{destination.name}</h1>
            <p className="dest-hero-tagline">{destination.tagline}</p>
          </div>

          {/* Quick Stats Pill Strip */}
          <div className="dest-hero-stats-strip">
            <div className="hero-stat-pill">
              <Calendar size={14} className="stat-icon" />
              <span>Ideal Stay: <strong>{destination.details?.idealStay || '3–4 days'}</strong></span>
            </div>
            <div className="hero-stat-pill">
              <Compass size={14} className="stat-icon" />
              <span>Optimal Season: <strong>{destination.bestSeason}</strong></span>
            </div>
            <button 
              onClick={() => openAria()}
              className="hero-stat-pill hero-stat-btn"
            >
              <Sparkles size={14} className="stat-icon text-accent" />
              <span>Ask ARIA about {destination.name}</span>
            </button>
          </div>

        </div>
      </section>

      {/* 2. Destination Editorial Narrative & Live Weather Grid */}
      <section className="section-spacing container">
        <div className="dest-overview-grid">
          
          {/* Left: Deep Narrative Storytelling */}
          <div className="dest-narrative-col">
            <span className="dest-section-eyebrow">TAVIRA FIELD GUIDE</span>
            <h2 className="dest-section-title">The spirit of {destination.name}.</h2>
            <p className="dest-narrative-lead">{destination.description}</p>
            
            {destination.detailedHighlights && destination.detailedHighlights.length > 0 && (
              <div className="dest-highlights-list">
                {destination.detailedHighlights.map((hl: Highlight, hIdx: number) => (
                  <div key={hIdx} className="dest-highlight-item">
                    <span className="highlight-num">0{hIdx + 1}</span>
                    <div>
                      <h4 className="highlight-title">{hl.title}</h4>
                      <p className="highlight-desc">{hl.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Signature Experiences */}
            {destination.details?.signatureExperiences && (
              <div className="dest-signatures-box">
                <span className="signatures-title">Signature Moments</span>
                <ul className="signatures-list">
                  {destination.details.signatureExperiences.map((exp: string, eIdx: number) => (
                    <li key={eIdx}>
                      <ChevronRight size={14} className="text-accent" />
                      <span>{exp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right: Live Weather & Practical Notes */}
          <div className="dest-sidebar-col">
            <WeatherWidget
              lat={destination.coordinates.lat}
              lng={destination.coordinates.lng}
              locationName={destination.name}
              country={destination.country}
            />

            {/* Local Note Box */}
            {destination.details?.localNote && (
              <div className="dest-local-note-card">
                <span className="local-note-eyebrow">INSIDER DISPATCH</span>
                <p className="local-note-quote">"{destination.details.localNote}"</p>
                <div className="local-note-footer">
                  <span>Tavira Editorial Desk</span>
                </div>
              </div>
            )}

            {/* Interactive ARIA Companion Card */}
            <div className="dest-aria-card">
              <div className="flex items-center gap-3 mb-3">
                <Sparkles size={20} className="text-accent" />
                <h4 className="aria-card-title">ARIA Travel Companion</h4>
              </div>
              <p className="aria-card-desc">
                Have specific curiosities about {destination.name}? ARIA is ready with custom culinary routes and seasonal advice.
              </p>
              <button onClick={() => openAria()} className="aria-card-btn">
                <span>Start Conversation</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Famous Places: Editorial Numbered Storytelling (Section 12 Master Prompt) */}
      <section className="places-section">
        <div className="container">
          
          <div className="places-section-header">
            <span className="dest-section-eyebrow">CURATED EXPLORATION</span>
            <h2 className="places-heading">Places worth experiencing.</h2>
            <p className="places-supporting">
              Remarkable sanctuaries, architectural wonders, and quiet corners selected for depth and character.
            </p>
          </div>

          <div className="places-editorial-stream">
            {destination.places.map((place: Place, idx: number) => {
              const placeImg = imageService.getImage(place.imageId);
              const isEven = idx % 2 === 1;

              return (
                <article key={place.id} className={`place-story-row ${isEven ? 'row-reversed' : ''}`}>
                  
                  {/* Media Column */}
                  <div className="place-story-media" onClick={() => setActivePlaceModal(place)}>
                    <img
                      src={dynamicPlaceImages[place.id] || placeImg.url}
                      alt={place.name}
                      className="place-story-img"
                      loading="lazy"
                    />
                    <div className="place-story-img-overlay">
                      <span className="view-place-pill">
                        <Eye size={14} /> View Details
                      </span>
                    </div>
                  </div>

                  {/* Editorial Narrative Column */}
                  <div className="place-story-content">
                    <span className="place-story-index">
                      0{idx + 1}
                    </span>

                    <span className="place-story-location">
                      {destination.name}, {destination.country}
                    </span>

                    <h3 className="place-story-title">{place.name}</h3>

                    <p className="place-story-desc">"{place.description}"</p>

                    <div className="place-story-meta">
                      {place.duration && (
                        <div className="place-meta-item">
                          <Clock size={13} className="text-accent" />
                          <span>Visit: {place.duration}</span>
                        </div>
                      )}
                      {place.bestTime && (
                        <div className="place-meta-item">
                          <Compass size={13} className="text-accent" />
                          <span>Recommended: {place.bestTime}</span>
                        </div>
                      )}
                    </div>

                    <button 
                      onClick={() => setActivePlaceModal(place)}
                      className="place-story-cta"
                    >
                      <span>Explore this place</span>
                      <ArrowLeft size={16} className="cta-arrow-rotate" />
                    </button>
                  </div>

                </article>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. Day-by-Day Interactive Itinerary Planner (Pre-filled for this destination) */}
      <ItineraryPlanner
        id="itinerary-planner"
        initialDestination={destination.name}
        initialCountry={destination.country}
      />

      {/* 5. Related Destinations */}
      {relatedDestinations.length > 0 && (
        <section className="section-spacing container">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="dest-section-eyebrow">CONTINUE EXPLORING</span>
              <h2 className="text-4xl text-serif">More from {destination.region}.</h2>
            </div>
            <Link to="/explore" className="btn-see-all">
              All Destinations <ChevronRight size={14} />
            </Link>
          </div>

          <div className="related-dest-grid">
            {relatedDestinations.map((rel: Destination) => {
              const relImg = imageService.getImage(rel.heroImageId);
              return (
                <Link to={`/destinations/${rel.slug}`} key={rel.id} className="related-card">
                  <div className="related-img-wrap">
                    <img src={dynamicRelatedImages[rel.id] || relImg.url} alt={rel.name} className="related-img" loading="lazy" />
                  </div>
                  <span className="related-country">{rel.country}</span>
                  <h3 className="related-name">{rel.name}</h3>
                  <p className="related-tagline">{rel.tagline}</p>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Place Detail Modal */}
      {activePlaceModal && (
        <div className="place-modal-backdrop" onClick={() => setActivePlaceModal(null)}>
          <div className="place-modal-panel" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setActivePlaceModal(null)} className="place-modal-close">
              ×
            </button>
            <div className="place-modal-img-wrap">
              <img
                src={imageService.getImage(activePlaceModal.imageId).url}
                alt={activePlaceModal.name}
                className="place-modal-img"
              />
            </div>
            <div className="place-modal-body">
              <span className="place-modal-location">{destination.name}, {destination.country}</span>
              <h3 className="place-modal-title">{activePlaceModal.name}</h3>
              <p className="place-modal-desc">{activePlaceModal.description}</p>
              
              <div className="place-modal-meta-grid">
                <div>
                  <strong>Recommended Duration</strong>
                  <span>{activePlaceModal.duration || '1.5 – 2 hours'}</span>
                </div>
                <div>
                  <strong>Ideal Arrival Time</strong>
                  <span>{activePlaceModal.bestTime || 'Morning golden hour'}</span>
                </div>
              </div>

              <div className="mt-8 flex gap-4">
                <Button 
                  onClick={() => {
                    setActivePlaceModal(null);
                    openAria({
                      name: destination.name,
                      country: destination.country,
                      places: [{ name: activePlaceModal.name, description: activePlaceModal.description }]
                    });
                  }} 
                  variant="primary"
                >
                  <Sparkles size={15} /> Ask ARIA about {activePlaceModal.name}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .dest-hero-section {
          position: relative;
          height: 85vh;
          min-height: 600px;
          display: flex;
          align-items: flex-end;
          overflow: hidden;
          background-color: #181817;
          color: #F7F4EE;
        }

        .dest-hero-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(1.03);
          transition: transform 10s ease-out;
        }

        .dest-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(20, 20, 19, 0.3) 0%,
            rgba(20, 20, 19, 0.45) 45%,
            rgba(20, 20, 19, 0.88) 100%
          );
        }

        .dest-hero-container {
          position: relative;
          z-index: 10;
          padding-bottom: clamp(40px, 6vw, 80px);
          width: 100%;
        }

        .dest-hero-breadcrumbs {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: rgba(247, 244, 238, 0.75);
          margin-bottom: 24px;
        }

        .breadcrumb-back {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: inherit;
          text-decoration: none;
          transition: color 0.2s;
        }

        .breadcrumb-back:hover {
          color: #F7F4EE;
        }

        .breadcrumb-separator {
          opacity: 0.4;
        }

        .dest-hero-eyebrow {
          display: block;
          font-size: 12px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          font-weight: 600;
          color: var(--color-accent-primary);
          margin-bottom: 12px;
        }

        .dest-hero-title {
          font-family: var(--font-serif);
          font-size: clamp(3.5rem, 9vw, 7.5rem);
          line-height: 0.95;
          font-weight: 400;
          color: #F7F4EE;
          margin: 0 0 16px 0;
          letter-spacing: -0.02em;
        }

        .dest-hero-tagline {
          font-size: clamp(1.1rem, 2vw, 1.5rem);
          line-height: 1.5;
          color: rgba(247, 244, 238, 0.9);
          max-width: 680px;
          font-weight: 300;
          margin-bottom: 32px;
        }

        .dest-hero-stats-strip {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }

        .hero-stat-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 18px;
          border-radius: 9999px;
          background-color: rgba(247, 244, 238, 0.12);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(247, 244, 238, 0.25);
          font-size: 12px;
          color: #F7F4EE;
        }

        .hero-stat-btn {
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .hero-stat-btn:hover {
          background-color: rgba(247, 244, 238, 0.25);
        }

        .dest-overview-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 60px;
        }

        @media (min-width: 1024px) {
          .dest-overview-grid {
            grid-template-columns: 1.3fr 1fr;
            gap: 80px;
          }
        }

        .dest-section-eyebrow {
          display: block;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          font-weight: 600;
          color: var(--color-accent-primary);
          margin-bottom: 12px;
        }

        .dest-section-title {
          font-family: var(--font-serif);
          font-size: clamp(2.5rem, 4vw, 3.5rem);
          line-height: 1.1;
          margin: 0 0 24px 0;
          color: var(--color-text-primary);
        }

        .dest-narrative-lead {
          font-size: 1.2rem;
          line-height: 1.7;
          color: var(--color-text-secondary);
          margin-bottom: 40px;
        }

        .dest-highlights-list {
          display: flex;
          flex-direction: column;
          gap: 24px;
          margin-bottom: 40px;
        }

        .dest-highlight-item {
          display: flex;
          gap: 20px;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--color-border);
        }

        .highlight-num {
          font-family: var(--font-serif);
          font-size: 1.5rem;
          color: var(--color-accent-primary);
          line-height: 1;
        }

        .highlight-title {
          font-family: var(--font-serif);
          font-size: 1.25rem;
          margin: 0 0 6px 0;
          color: var(--color-text-primary);
        }

        .highlight-desc {
          font-size: 14.5px;
          color: var(--color-text-secondary);
          line-height: 1.6;
          margin: 0;
        }

        .dest-signatures-box {
          background-color: var(--color-bg-secondary);
          border: 1px solid var(--color-border);
          padding: 28px;
          border-radius: 2px;
        }

        .signatures-title {
          display: block;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          font-weight: 600;
          color: var(--color-text-primary);
          margin-bottom: 16px;
        }

        .signatures-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .signatures-list li {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14.5px;
          color: var(--color-text-secondary);
        }

        .dest-sidebar-col {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .dest-local-note-card {
          background-color: #141413;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-left: 3px solid var(--color-accent-primary);
          padding: 24px 28px;
          border-radius: 2px;
        }

        .local-note-eyebrow {
          display: block;
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          font-weight: 600;
          color: var(--color-accent-primary);
          margin-bottom: 12px;
        }

        .local-note-quote {
          font-family: var(--font-serif);
          font-size: 1.2rem;
          line-height: 1.5;
          font-style: italic;
          color: #F5F2EB;
          margin: 0 0 12px 0;
        }

        .local-note-footer {
          font-size: 11px;
          color: #9E9A91;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .dest-aria-card {
          background-color: #141413;
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #F5F2EB;
          padding: 28px;
          border-radius: 2px;
        }

        .aria-card-title {
          font-family: var(--font-serif);
          font-size: 1.25rem;
          font-weight: 400;
          margin: 0;
          color: #F5F2EB;
        }

        .aria-card-desc {
          font-size: 13.5px;
          line-height: 1.6;
          color: #9E9A91;
          margin: 0 0 20px 0;
        }

        .aria-card-btn {
          width: 100%;
          height: 46px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background-color: var(--color-accent-primary);
          color: #0D0D0C;
          border: none;
          border-radius: 2px;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .aria-card-btn:hover {
          background-color: var(--color-accent-hover);
        }

        .aria-card-btn:hover {
          background-color: #E8E2D5;
        }

        /* Places Section Styling */
        .places-section {
          background-color: var(--color-bg-secondary);
          padding: clamp(80px, 10vw, 140px) 0;
        }

        .places-section-header {
          text-align: center;
          max-width: 680px;
          margin: 0 auto clamp(40px, 6vw, 70px);
        }

        .places-heading {
          font-family: var(--font-serif);
          font-size: clamp(2.5rem, 5vw, 4rem);
          margin: 0 0 16px 0;
          color: var(--color-text-primary);
        }

        .places-supporting {
          font-size: 17px;
          line-height: 1.6;
          color: var(--color-text-secondary);
        }

        .places-editorial-stream {
          display: flex;
          flex-direction: column;
          gap: clamp(60px, 8vw, 110px);
        }

        .place-story-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
          align-items: center;
        }

        @media (min-width: 900px) {
          .place-story-row {
            grid-template-columns: 1.1fr 1fr;
            gap: 64px;
          }
          .place-story-row.row-reversed {
            grid-template-columns: 1fr 1.1fr;
          }
          .place-story-row.row-reversed .place-story-media {
            order: 2;
          }
          .place-story-row.row-reversed .place-story-content {
            order: 1;
          }
        }

        .place-story-media {
          position: relative;
          aspect-ratio: 16/10;
          overflow: hidden;
          cursor: pointer;
          border-radius: 2px;
        }

        .place-story-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .place-story-media:hover .place-story-img {
          transform: scale(1.05);
        }

        .place-story-img-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .place-story-media:hover .place-story-img-overlay {
          opacity: 1;
        }

        .view-place-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 10px 20px;
          background-color: #F7F4EE;
          color: #181817;
          border-radius: 9999px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .place-story-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .place-story-index {
          font-family: var(--font-serif);
          font-size: clamp(2rem, 3.5vw, 3rem);
          line-height: 1;
          color: var(--color-accent-primary);
          margin-bottom: 12px;
        }

        .place-story-location {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          color: var(--color-text-secondary);
          font-weight: 600;
          margin-bottom: 8px;
        }

        .place-story-title {
          font-family: var(--font-serif);
          font-size: clamp(2rem, 3.5vw, 2.75rem);
          line-height: 1.1;
          color: var(--color-text-primary);
          margin: 0 0 16px 0;
        }

        .place-story-desc {
          font-size: 17px;
          line-height: 1.65;
          color: var(--color-text-secondary);
          margin: 0 0 24px 0;
        }

        .place-story-meta {
          display: flex;
          gap: 20px;
          margin-bottom: 28px;
          flex-wrap: wrap;
        }

        .place-meta-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 500;
          color: var(--color-text-primary);
        }

        .place-story-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          font-weight: 600;
          color: var(--color-text-primary);
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          border-bottom: 1px solid currentColor;
          padding-bottom: 4px;
          transition: gap 0.2s;
        }

        .place-story-cta:hover {
          gap: 14px;
        }

        .cta-arrow-rotate {
          transform: rotate(135deg);
        }

        .btn-see-all {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-weight: 600;
          color: var(--color-accent-primary);
        }

        .related-dest-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 32px;
        }

        .related-card {
          text-decoration: none;
          color: inherit;
        }

        .related-img-wrap {
          aspect-ratio: 4/5;
          overflow: hidden;
          margin-bottom: 16px;
        }

        .related-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .related-card:hover .related-img {
          transform: scale(1.05);
        }

        .related-country {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--color-text-secondary);
          display: block;
          margin-bottom: 4px;
        }

        .related-name {
          font-family: var(--font-serif);
          font-size: 1.5rem;
          margin: 0 0 6px 0;
        }

        .related-tagline {
          font-size: 14px;
          color: var(--color-text-secondary);
          line-height: 1.5;
        }

        /* Modal Styles */
        .place-modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 150;
          background-color: rgba(18, 18, 17, 0.7);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }

        .place-modal-panel {
          position: relative;
          width: 100%;
          max-width: 680px;
          background-color: #F7F4EE;
          border-radius: 2px;
          overflow: hidden;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.35);
        }

        .place-modal-close {
          position: absolute;
          top: 16px;
          right: 16px;
          z-index: 10;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background-color: rgba(247, 244, 238, 0.9);
          border: none;
          font-size: 24px;
          line-height: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .place-modal-img-wrap {
          width: 100%;
          height: 320px;
        }

        .place-modal-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .place-modal-body {
          padding: 32px;
        }

        .place-modal-location {
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-accent-primary);
          font-weight: 600;
          display: block;
          margin-bottom: 6px;
        }

        .place-modal-title {
          font-family: var(--font-serif);
          font-size: 2rem;
          margin: 0 0 16px 0;
        }

        .place-modal-desc {
          font-size: 16px;
          line-height: 1.6;
          color: #4A4742;
          margin-bottom: 24px;
        }

        .place-modal-meta-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          padding: 16px 0;
          border-top: 1px solid var(--color-border);
          border-bottom: 1px solid var(--color-border);
          font-size: 13px;
        }

        .place-modal-meta-grid strong {
          display: block;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #6E6A62;
          margin-bottom: 4px;
        }
      `}</style>
    </div>
  );
};
