import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Search, ChevronRight } from 'lucide-react';
import { placeRhythms } from '../data/mockDestinations';
import { imageService } from '../services/imageService';
import { itineraryService, type ItineraryDay } from '../services/itineraryService';
import { Button } from '../components/ui/Button';
import { SearchOverlay } from '../components/layout/SearchOverlay';

const RhythmOfAPlace: React.FC = () => {
  const [activeDestinationIndex, setActiveDestinationIndex] = useState(0);
  const [activeMomentIndex, setActiveMomentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();

  const destination = placeRhythms[activeDestinationIndex];
  const activeMoment = destination.moments[activeMomentIndex];

  const handleDestinationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setActiveDestinationIndex(Number(e.target.value));
    setActiveMomentIndex(0); // Reset to Dawn on destination change
  };

  const handleMomentChange = (index: number) => {
    if (index === activeMomentIndex || isTransitioning) return;
    setIsTransitioning(true);
    setActiveMomentIndex(index);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 50); // Small delay to force re-render for CSS animation restart
  };

  return (
    <section className="section-spacing rhythm-section">
      <div className="container">
        <div className="rhythm-grid">
          {/* Left Column: Image */}
          <div style={{ gridColumn: '1 / 8' }}>
            <div className="rhythm-img-wrapper">
              {destination.moments.map((moment, idx) => {
                const isActive = idx === activeMomentIndex;
                const img = imageService.getImage(moment.imageId);
                return (
                  <img
                    key={`${destination.slug}-${moment.label}`}
                    src={img.url}
                    alt={`${moment.label} in ${destination.destination}`}
                    className={`rhythm-img ${isActive ? 'rhythm-img-active' : 'rhythm-img-inactive'}`}
                    style={{ objectPosition: 'center', pointerEvents: isActive ? 'auto' : 'none' }}
                  />
                );
              })}
            </div>
          </div>

          {/* Right Column: Content */}
          <div style={{ gridColumn: '8 / 13', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span className="text-xs uppercase" style={{ letterSpacing: '0.15em', fontWeight: 600, color: 'var(--color-accent-primary)', marginBottom: 'var(--space-2)' }}>
              THE TAVIRA FIELD NOTE
            </span>
            
            <div className="rhythm-selector-wrapper">
              <select className="rhythm-selector" value={activeDestinationIndex} onChange={handleDestinationChange} aria-label="Select destination">
                {placeRhythms.map((place, idx) => (
                  <option key={place.slug} value={idx}>{place.destination}, {place.country}</option>
                ))}
              </select>
            </div>

            <h2 className="text-5xl text-serif mb-4" style={{ lineHeight: 1.1 }}>The rhythm of a place.</h2>
            <p className="text-lg text-secondary mb-2" style={{ lineHeight: 1.6 }}>
              The best journeys are not only about where you go, but when you arrive.
            </p>

            {/* Time Tabs */}
            <div className="rhythm-tabs" role="tablist">
              {destination.moments.map((moment, idx) => {
                const isActive = idx === activeMomentIndex;
                return (
                  <button
                    key={moment.label}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => handleMomentChange(idx)}
                    className="rhythm-tab"
                  >
                    {moment.label}
                  </button>
                );
              })}
            </div>

            {/* Dynamic Content */}
            <div key={`${destination.slug}-${activeMomentIndex}`} className="rhythm-content-enter">
              <span className="text-xs font-semibold uppercase text-secondary mb-2" style={{ letterSpacing: '0.1em', display: 'block' }}>
                {activeMoment.time} — {activeMoment.place}
              </span>
              <p className="text-lg text-primary mb-6" style={{ lineHeight: 1.6 }}>
                "{activeMoment.description}"
              </p>
              
              <div style={{ backgroundColor: 'var(--color-bg-secondary)', padding: 'var(--space-4)', borderLeft: '2px solid var(--color-accent-primary)', marginBottom: 'var(--space-8)' }}>
                <span className="text-sm text-secondary font-medium">{activeMoment.practicalNote}</span>
              </div>

              <Button 
                variant="ghost" 
                onClick={() => navigate(`/destinations/${destination.slug}`)}
                style={{ padding: 0, height: 'auto', textTransform: 'uppercase', fontSize: 'var(--text-xs)', letterSpacing: '0.1em', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)' }}
              >
                Explore {destination.destination} <ArrowRight size={14} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const PlannerSection: React.FC = () => {
  const [destination, setDestination] = useState('');
  const [duration, setDuration] = useState('3');
  const [travelPace, setTravelPace] = useState('Balanced');
  const [coreInterest, setCoreInterest] = useState('');
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [itinerary, setItinerary] = useState<ItineraryDay[] | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!destination.trim()) newErrors.destination = 'Please choose a destination.';
    if (!coreInterest) newErrors.coreInterest = 'Please select a core interest.';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setErrors({});
    setIsSubmitting(true);
    setItinerary(null);
    
    try {
      const result = await itineraryService.generateItinerary({
        destinationSlug: destination.toLowerCase().replace(/\s+/g, '-'),
        days: parseInt(duration),
        travelStyle: travelPace
      });
      setItinerary(result);
    } finally {
      setIsSubmitting(false);
    }
  };

  const paceOptions = ['Slow & deliberate', 'Balanced', 'Full days'];
  const interestOptions = ['Culture', 'Food', 'Nature', 'Design', 'Wellness'];
  
  const plannerImage = imageService.getImage('hero');

  return (
    <section className="planner-section">
      <div className="planner-container">
        <div className="planner-grid">
          
          {/* Left Side: Planner Introduction */}
          <div className="planner-intro">
            <span className="planner-eyebrow">Plan with Tavira</span>
            <h2 className="planner-heading">Turn a place into a plan.</h2>
            <p className="planner-supporting">Tell Tavira where you are going, how long you have, and what matters most. We will shape the days around your rhythm.</p>
            
            <div className="planner-steps">
              <div className="planner-step">
                <span className="planner-step-num">01 &mdash;</span>
                <span className="planner-step-label">Choose a place</span>
              </div>
              <div className="planner-step">
                <span className="planner-step-num">02 &mdash;</span>
                <span className="planner-step-label">Set your pace</span>
              </div>
              <div className="planner-step">
                <span className="planner-step-num">03 &mdash;</span>
                <span className="planner-step-label">Receive your itinerary</span>
              </div>
            </div>
            
            <div className="planner-image-wrapper hidden md-block">
              <img src={plannerImage.url} alt="Travel planning" className="planner-image" loading="lazy" />
            </div>
          </div>
          
          {/* Right Side: Travel Brief Panel */}
          <div className="planner-panel">
            <div className="planner-panel-header">
              <h3 className="planner-panel-title">Your travel brief</h3>
              <p className="planner-panel-subtitle">A few details are enough to begin.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="planner-form" noValidate>
              <div className="planner-form-grid">
                
                <div className="planner-field">
                  <label htmlFor="planner-destination" className="planner-label">Destination</label>
                  <input 
                    id="planner-destination"
                    type="text" 
                    value={destination}
                    onChange={(e) => { setDestination(e.target.value); if (errors.destination) setErrors(prev => ({...prev, destination: ''})); }}
                    placeholder="Choose a destination"
                    className="planner-input"
                    aria-invalid={!!errors.destination}
                  />
                  {errors.destination && <span className="planner-error-msg">{errors.destination}</span>}
                </div>
                
                <div className="planner-field">
                  <label htmlFor="planner-duration" className="planner-label">Days Away</label>
                  <div className="planner-select-wrapper">
                    <select 
                      id="planner-duration"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="planner-input"
                    >
                      <option value="1">1 day</option>
                      <option value="2">2 days</option>
                      <option value="3">3 days</option>
                      <option value="5">5 days</option>
                      <option value="7">7 days</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <fieldset className="planner-fieldset mt-8">
                <legend className="planner-label">Travel Pace</legend>
                <div className="planner-segmented-control" role="radiogroup">
                  {paceOptions.map(option => (
                    <button
                      key={option}
                      type="button"
                      role="radio"
                      aria-checked={travelPace === option}
                      onClick={() => setTravelPace(option)}
                      className={`planner-segment-btn ${travelPace === option ? 'active' : ''}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </fieldset>
              
              <fieldset className="planner-fieldset mt-8">
                <legend className="planner-label">What matters most</legend>
                <div className="planner-interest-grid" role="radiogroup" aria-invalid={!!errors.coreInterest}>
                  {interestOptions.map(option => (
                    <button
                      key={option}
                      type="button"
                      role="radio"
                      aria-checked={coreInterest === option}
                      onClick={() => { setCoreInterest(option); if (errors.coreInterest) setErrors(prev => ({...prev, coreInterest: ''})); }}
                      className={`planner-interest-btn ${coreInterest === option ? 'active' : ''}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                {errors.coreInterest && <span className="planner-error-msg">{errors.coreInterest}</span>}
              </fieldset>
              
              <div className="planner-submit-wrapper">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="planner-submit-btn"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2 justify-center">
                      <span className="planner-spinner"></span> Curating your journey...
                    </span>
                  ) : 'Create my itinerary'}
                </button>
                <p className="planner-submit-note">Your itinerary will be arranged day by day.</p>
              </div>
            </form>
            
            {itinerary && (
              <div className="planner-preview">
                {itinerary.map(day => (
                  <div key={day.day} className="planner-preview-day">
                    <h4 className="planner-preview-day-title">Day 0{day.day}</h4>
                    {day.items.map(item => (
                      <div key={item.id} className="planner-preview-item">
                        <span className="planner-preview-time">{item.timeOfDay}</span>
                        <span className="planner-preview-activity">{item.activity}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <style>{`
        .planner-section {
          background-color: #171816;
          padding: 120px 0;
          width: 100%;
        }
        .planner-container {
          max-width: 1360px;
          margin: 0 auto;
          padding: 0 24px;
        }
        .planner-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 64px;
        }
        @media (min-width: 1024px) {
          .planner-section {
            padding: 150px 0;
          }
          .planner-grid {
            grid-template-columns: repeat(12, 1fr);
            gap: 0;
          }
          .planner-intro {
            grid-column: 1 / 6;
          }
          .planner-panel {
            grid-column: 7 / 13;
          }
        }
        .planner-eyebrow {
          display: block;
          text-transform: uppercase;
          font-size: 11px;
          letter-spacing: 0.14em;
          color: rgba(245, 242, 236, 0.6);
          font-weight: 600;
          margin-bottom: 24px;
        }
        .planner-heading {
          font-family: var(--font-serif);
          font-size: clamp(40px, 5vw, 72px);
          line-height: 1;
          color: #F5F2EC;
          max-width: 520px;
          margin-bottom: 32px;
          font-weight: 400;
        }
        .planner-supporting {
          font-size: 18px;
          line-height: 1.6;
          color: rgba(245, 242, 236, 0.85);
          max-width: 500px;
          margin-bottom: 64px;
          font-weight: 300;
        }
        .planner-steps {
          display: flex;
          flex-direction: column;
          gap: 24px;
          margin-bottom: 64px;
          max-width: 400px;
        }
        .planner-step {
          display: flex;
          align-items: center;
          gap: 16px;
          padding-bottom: 24px;
          border-bottom: 1px solid rgba(245, 242, 236, 0.15);
        }
        .planner-step-num {
          font-size: 11px;
          color: rgba(245, 242, 236, 0.5);
          letter-spacing: 0.1em;
        }
        .planner-step-label {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #F5F2EC;
          font-weight: 500;
        }
        .planner-image-wrapper {
          width: 100%;
          max-width: 380px;
          aspect-ratio: 3/4;
          overflow: hidden;
        }
        .planner-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .planner-panel {
          background-color: #F4F1EA;
          border: 1px solid #D8D1C7;
          border-radius: 2px;
          padding: 32px 24px;
          color: #181817;
        }
        @media (min-width: 768px) {
          .planner-panel {
            padding: 48px;
          }
        }
        .planner-panel-header {
          margin-bottom: 40px;
        }
        .planner-panel-title {
          font-family: var(--font-serif);
          font-size: 34px;
          margin-bottom: 8px;
          font-weight: 400;
          color: #181817;
        }
        .planner-panel-subtitle {
          font-size: 15px;
          color: #6B6862;
        }
        .planner-form-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }
        @media (min-width: 640px) {
          .planner-form-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        .planner-fieldset {
          border: none;
          padding: 0;
          margin: 0;
        }
        .planner-label {
          display: block;
          font-size: 11px;
          text-transform: uppercase;
          font-weight: 600;
          letter-spacing: 0.12em;
          color: #181817;
          margin-bottom: 12px;
        }
        .planner-input {
          width: 100%;
          height: 56px;
          font-size: 16px;
          font-family: var(--font-sans);
          padding: 0 16px;
          background-color: transparent;
          border: 1px solid #D8D1C7;
          border-radius: 2px;
          color: #181817;
          transition: border-color 0.2s, box-shadow 0.2s;
          appearance: none;
        }
        .planner-input::placeholder {
          color: #8C877D;
        }
        .planner-input:focus {
          outline: none;
          border-color: #181817;
          box-shadow: 0 0 0 1px #181817;
        }
        .planner-input[aria-invalid="true"] {
          border-color: #D32F2F;
        }
        .planner-input[aria-invalid="true"]:focus {
          box-shadow: 0 0 0 1px #D32F2F;
        }
        .planner-select-wrapper {
          position: relative;
        }
        .planner-select-wrapper::after {
          content: "";
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          width: 10px;
          height: 6px;
          background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2210%22%20height%3D%226%22%20viewBox%3D%220%200%2010%206%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M1%201L5%205L9%201%22%20stroke%3D%22%23181817%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E");
          background-repeat: no-repeat;
          pointer-events: none;
        }
        .planner-segmented-control {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .planner-segment-btn {
          flex: 1;
          min-width: max-content;
          height: 54px;
          padding: 0 20px;
          background-color: transparent;
          border: 1px solid #D8D1C7;
          color: #181817;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          border-radius: 2px;
        }
        .planner-segment-btn:focus-visible {
          outline: 2px solid #181817;
          outline-offset: 2px;
        }
        .planner-segment-btn.active {
          background-color: #181817;
          color: #F4F1EA;
          border-color: #181817;
        }
        .planner-interest-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }
        .planner-interest-btn {
          height: 54px;
          padding: 0 24px;
          background-color: transparent;
          border: 1px solid #D8D1C7;
          color: #181817;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          border-radius: 2px;
        }
        .planner-interest-btn:focus-visible {
          outline: 2px solid #181817;
          outline-offset: 2px;
        }
        .planner-interest-btn.active {
          background-color: #181817;
          color: #F4F1EA;
          border-color: #181817;
        }
        .planner-error-msg {
          display: block;
          color: #D32F2F;
          font-size: 12px;
          margin-top: 6px;
        }
        .planner-submit-wrapper {
          margin-top: 48px;
        }
        .planner-submit-btn {
          width: 100%;
          height: 56px;
          background-color: #181817;
          color: #F4F1EA;
          border: none;
          border-radius: 2px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: transform 0.2s, background-color 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .planner-submit-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          background-color: #262725;
        }
        .planner-submit-btn:disabled {
          opacity: 0.8;
          cursor: not-allowed;
        }
        .planner-submit-note {
          text-align: center;
          font-size: 13px;
          color: #8C877D;
          margin-top: 16px;
        }
        .planner-spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(244, 241, 234, 0.3);
          border-top-color: #F4F1EA;
          border-radius: 50%;
          animation: planner-spin 0.8s linear infinite;
        }
        @keyframes planner-spin {
          to { transform: rotate(360deg); }
        }
        .planner-preview {
          margin-top: 48px;
          padding-top: 32px;
          border-top: 1px solid #D8D1C7;
          animation: planner-fade-in 0.6s ease-out;
        }
        @keyframes planner-fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .planner-preview-day {
          margin-bottom: 24px;
        }
        .planner-preview-day:last-child {
          margin-bottom: 0;
        }
        .planner-preview-day-title {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          font-weight: 600;
          color: #6B6862;
          margin-bottom: 12px;
        }
        .planner-preview-item {
          margin-bottom: 16px;
          color: #181817;
        }
        .planner-preview-item:last-child {
          margin-bottom: 0;
        }
        .planner-preview-time {
          display: block;
          font-weight: 600;
          font-size: 14px;
          margin-bottom: 4px;
        }
        .planner-preview-activity {
          display: block;
          font-size: 15px;
          line-height: 1.5;
          opacity: 0.85;
        }
      `}</style>
    </section>
  );
};


export const Home: React.FC = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();

  const heroImage = imageService.getImage('hero');

  const moods = [
    { name: 'Slow mornings', img: 'mood-slow-mornings' },
    { name: 'Wild landscapes', img: 'mood-mountain' },
    { name: 'City energy', img: 'mood-design' },
    { name: 'Ancient places', img: 'mood-sacred' },
    { name: 'Coastal escapes', img: 'mood-coastal' }
  ];

  return (
    <div className="animate-fade-in">
      {/* 1. Immersive Hero */}
      <section 
        className="home-hero"
        style={{ 
          position: 'relative', 
          height: '100vh', 
          minHeight: '700px', 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          backgroundColor: 'var(--color-bg-dark)',
          paddingTop: 'var(--header-height)'
        }}
      >
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
          <img 
            src={heroImage.url} 
            alt={heroImage.alt} 
            className="animate-cinematic"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(42, 36, 33, 0.2) 0%, rgba(42, 36, 33, 0.7) 100%)' }} />
        </div>
        
        <div className="container relative z-10 hero-content" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ maxWidth: '800px', color: 'var(--color-white)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <p className="text-xs uppercase animate-slide-up" style={{ letterSpacing: '0.15em', marginBottom: 'var(--space-6)', opacity: 0.9, fontWeight: 600, color: 'inherit' }}>
              Travel, thoughtfully.
            </p>
            <h1 className="animate-slide-up" style={{ fontSize: 'var(--text-7xl)', marginBottom: 'var(--space-6)', lineHeight: 1.05, animationDelay: '100ms', color: 'inherit' }}>
              Go somewhere worth remembering.
            </h1>
            <p className="animate-slide-up text-lg" style={{ maxWidth: '560px', marginBottom: 'var(--space-12)', opacity: 0.9, animationDelay: '200ms', lineHeight: 1.6, color: 'inherit' }}>
              Discover places where time moves differently. A curated collection of the world's most quietly spectacular destinations.
            </p>
            <div className="animate-slide-up" style={{ animationDelay: '300ms' }}>
              <Button 
                variant="secondary" 
                onClick={() => navigate('/explore')} 
                style={{ color: 'var(--color-white)', borderColor: 'rgba(255,255,255,0.4)', padding: 'var(--space-4) var(--space-8)' }}
                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-bg-primary)'; e.currentTarget.style.color = 'var(--color-bg-dark)'; e.currentTarget.style.borderColor = 'transparent'; }}
                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--color-white)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; }}
              >
                Explore destinations
              </Button>
            </div>
          </div>
        </div>

        <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      </section>

      {/* 2. Destination Atelier */}
      <section className="section-spacing container" style={{ paddingBottom: 'var(--space-12)' }}>
        <div className="atelier-grid">
          {/* Left Column: Search & Links */}
          <div style={{ gridColumn: '1 / 6', paddingRight: 'var(--space-6)' }}>
            <span className="text-xs uppercase" style={{ letterSpacing: '0.15em', fontWeight: 600, color: 'var(--color-accent-primary)', marginBottom: 'var(--space-4)', display: 'block' }}>
              Discover your next chapter
            </span>
            <h2 className="text-5xl text-serif mb-4" style={{ lineHeight: 1.1, color: 'var(--color-text-primary)' }}>
              Where will curiosity take you?
            </h2>
            
            <div className="atelier-search-wrapper" onClick={() => setSearchOpen(true)}>
              <Search className="atelier-search-icon" size={20} />
              <input 
                type="text" 
                placeholder="Search destinations, regions, or moods..." 
                className="atelier-input cursor-pointer" 
                readOnly
              />
            </div>
            
            <div className="flex flex-wrap gap-4 mt-6">
              {['Japan', 'Rajasthan', 'Coastal light', 'Wild landscapes', 'Slow mornings'].map(tag => (
                <span key={tag} className="atelier-link" onClick={() => setSearchOpen(true)}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          {/* Right Column: Editorial Collage */}
          <div style={{ gridColumn: '6 / 13' }}>
            <div className="atelier-collage">
              {/* Large Vertical */}
              <div 
                className="atelier-img-container atelier-img-large" 
                onClick={() => navigate('/destinations/udaipur')}
              >
                <img 
                  src={imageService.getImage('udaipur-hero').url} 
                  alt="Udaipur, India" 
                  className="atelier-img" 
                  loading="lazy" 
                />
                <div className="atelier-img-overlay" />
                <div className="atelier-label">
                  <span className="text-xs uppercase" style={{ letterSpacing: '0.1em', fontWeight: 600, display: 'block', marginBottom: '4px', opacity: 0.9 }}>Udaipur, India</span>
                  <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem' }}>Lake light and marble evenings</span>
                </div>
              </div>
              
              {/* Top Landscape */}
              <div 
                className="atelier-img-container atelier-img-landscape" 
                onClick={() => navigate('/destinations/lisbon')}
              >
                <img 
                  src={imageService.getImage('lisbon-place-2').url} 
                  alt="Lisbon, Portugal" 
                  className="atelier-img" 
                  loading="lazy" 
                />
                <div className="atelier-img-overlay" />
                <div className="atelier-label">
                  <span className="text-xs uppercase" style={{ letterSpacing: '0.1em', fontWeight: 600, display: 'block', marginBottom: '2px', opacity: 0.9 }}>Lisbon</span>
                </div>
              </div>
              
              {/* Bottom Portrait */}
              <div 
                className="atelier-img-container atelier-img-portrait" 
                onClick={() => navigate('/destinations/kyoto')}
              >
                <img 
                  src={imageService.getImage('kyoto-place-1').url} 
                  alt="Kyoto, Japan" 
                  className="atelier-img" 
                  loading="lazy" 
                />
                <div className="atelier-img-overlay" />
                <div className="atelier-label">
                  <span className="text-xs uppercase" style={{ letterSpacing: '0.1em', fontWeight: 600, display: 'block', marginBottom: '2px', opacity: 0.9 }}>Kyoto</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* 4. Discover by Mood */}
      <section className="section-spacing" style={{ backgroundColor: 'var(--color-bg-secondary)', paddingTop: 0 }}>
        <div className="container mb-12 text-center" style={{ maxWidth: '800px' }}>
          <h2 className="text-5xl text-serif mb-4" style={{ lineHeight: 1.1 }}>Travel according to your mood.</h2>
          <p className="text-lg text-secondary">A curated collection of places selected for the exact feeling you are seeking.</p>
        </div>
        
        {/* Full bleed scroll container with container padding on the inside */}
        <div style={{ width: '100%', overflowX: 'auto', scrollSnapType: 'x mandatory', paddingBottom: 'var(--space-8)' }} className="hide-scrollbar">
          <div style={{ display: 'flex', gap: 'var(--space-6)', padding: '0 clamp(1.5rem, 5vw, 4rem)', minWidth: 'min-content' }}>
            {moods.map((mood) => {
              const img = imageService.getImage(mood.img);
              return (
                <Link 
                  key={mood.name} 
                  to={`/explore?mood=${encodeURIComponent(mood.name)}`}
                  className="editorial-card"
                  style={{ flex: '0 0 320px', height: '420px', scrollSnapAlign: 'start' }}
                >
                <div className="editorial-card__img-wrapper">
                  <img 
                    src={img.url} 
                    alt={mood.name}
                    className="editorial-card__img" 
                    loading="lazy" 
                  />
                  <div className="editorial-card__overlay" />
                </div>
                <div className="editorial-card__content">
                  <h3 className="editorial-card__title" style={{ fontSize: 'var(--text-2xl)' }}>{mood.name}</h3>
                  <span className="editorial-card__explore">View destinations <ArrowRight size={14} /></span>
                </div>
              </Link>
            );
          })}
          </div>
        </div>

        <div className="container mt-8 flex justify-center">
          <Link to="/explore?mood=all" className="btn btn-ghost inline-flex items-center gap-2" style={{ textTransform: 'uppercase', fontSize: 'var(--text-xs)', letterSpacing: '0.1em', fontWeight: 600 }}>
            See all moods <ChevronRight size={14} />
          </Link>
        </div>
      </section>

      {/* 5. Rhythm of a Place (Editorial Feature) */}
      <RhythmOfAPlace />

      {/* 6. Plan it with Tavira (Premium Planner) */}
      <PlannerSection />

      {/* 8. Inspiration / Journal Preview */}
      <section className="section-spacing container">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-4xl text-serif">From the journal</h2>
          <Link to="/journal" className="text-sm uppercase font-semibold text-accent-primary transition-opacity hover:opacity-80" style={{ letterSpacing: '0.1em' }}>
            Read all
          </Link>
        </div>
        <div className="grid gap-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          {[
            { img: 'journal-1', title: 'Dawn on the ghats of Varanasi', category: 'Culture', time: '5 min read' },
            { img: 'journal-2', title: 'A slower way through Kyoto', category: 'Guide', time: '8 min read' },
            { img: 'journal-3', title: 'The small rituals of Lisbon', category: 'Observation', time: '4 min read' }
          ].map(story => (
            <Link to="/journal" key={story.title} style={{ display: 'block', textDecoration: 'none' }} className="journal-preview-card">
              <div style={{ overflow: 'hidden', marginBottom: 'var(--space-4)', aspectRatio: '4/5' }}>
                <img 
                  src={imageService.getImage(story.img).url} 
                  alt={story.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 700ms cubic-bezier(0.16, 1, 0.3, 1)' }} 
                  className="journal-img" 
                  loading="lazy" 
                />
              </div>
              <div className="flex justify-between text-xs text-secondary uppercase mb-3" style={{ letterSpacing: '0.05em', fontWeight: 600 }}>
                <span>{story.category}</span>
                <span>{story.time}</span>
              </div>
              <h3 className="text-2xl text-serif journal-title transition-colors">{story.title}</h3>
            </Link>
          ))}
        </div>
        <style>{`
          .journal-preview-card:hover .journal-img { transform: scale(1.05); }
          .journal-preview-card:hover .journal-title { color: var(--color-accent-secondary); }
        `}</style>
      </section>

      {/* 9. Final CTA */}
      <section className="section-spacing" style={{ backgroundColor: 'var(--color-bg-dark)', color: 'var(--color-text-light)', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2 className="text-5xl text-serif mb-12" style={{ color: 'var(--color-text-light)' }}>Where will you make time for next?</h2>
          <Button 
            variant="primary" 
            style={{ backgroundColor: 'var(--color-white)', color: 'var(--color-bg-dark)' }} 
            onClick={() => navigate('/explore')}
          >
            Explore destinations
          </Button>
        </div>
      </section>

      {/* 10. Footer */}
      <footer style={{ borderTop: '1px solid var(--color-border)', padding: 'var(--space-12) 0 var(--space-6)', backgroundColor: 'var(--color-bg-primary)' }}>
        <div className="container grid gap-12 mb-16" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
          <div style={{ gridColumn: '1 / -1' }} className="footer-brand">
            <Link to="/" className="text-serif text-2xl mb-4" style={{ display: 'block', textDecoration: 'none' }}>TAVIRA</Link>
            <p className="text-secondary" style={{ maxWidth: '400px', lineHeight: 1.6 }}>A curated collection of the world's most quietly spectacular destinations. Travel, thoughtfully.</p>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase mb-6 text-secondary" style={{ letterSpacing: '0.1em' }}>Explore</h4>
            <ul className="flex-col gap-4" style={{ display: 'flex' }}>
              <li><Link to="/explore" className="text-sm font-medium hover:text-accent-primary transition-colors">Destinations</Link></li>
              <li><Link to="/explore?mood=all" className="text-sm font-medium hover:text-accent-primary transition-colors">Travel Moods</Link></li>
              <li><Link to="/journal" className="text-sm font-medium hover:text-accent-primary transition-colors">The Journal</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase mb-6 text-secondary" style={{ letterSpacing: '0.1em' }}>Company</h4>
            <ul className="flex-col gap-4" style={{ display: 'flex' }}>
              <li><Link to="/journal" className="text-sm font-medium hover:text-accent-primary transition-colors">About</Link></li>
              <li><Link to="/journal" className="text-sm font-medium hover:text-accent-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="container flex justify-between items-center pt-6 flex-wrap gap-4" style={{ borderTop: '1px solid var(--color-border)' }}>
          <span className="text-xs text-secondary font-medium">© {new Date().getFullYear()} Tavira. All rights reserved.</span>
          <div className="flex gap-6">
            <span className="text-xs text-secondary font-medium cursor-pointer hover:text-accent-primary">Terms</span>
            <span className="text-xs text-secondary font-medium cursor-pointer hover:text-accent-primary">Privacy</span>
          </div>
        </div>
        <style>{`
          @media (min-width: 768px) {
            .footer-brand { grid-column: span 2 !important; }
          }
        `}</style>
      </footer>
    </div>
  );
};
