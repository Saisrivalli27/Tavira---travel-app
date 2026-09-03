import React, { useState } from 'react';
import { Sparkles, Clock, MapPin, Printer, RotateCcw, Compass, ArrowRight, CheckCircle2 } from 'lucide-react';
import { itineraryService, type ItineraryResult, type ItineraryDay, type ItineraryItem } from '../../services/itineraryService';

interface ItineraryPlannerProps {
  initialDestination?: string;
  initialCountry?: string;
  className?: string;
  id?: string;
}

export const ItineraryPlanner: React.FC<ItineraryPlannerProps> = ({
  initialDestination = 'Kyoto',
  initialCountry = 'Japan',
  className = '',
  id = 'tavira-planner'
}) => {
  const [destination, setDestination] = useState(initialDestination);
  const [daysCount, setDaysCount] = useState<number>(3);
  const [travelPace, setTravelPace] = useState<'Relaxed' | 'Balanced' | 'Fast-paced'>('Balanced');
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['Culture', 'Gastronomy']);
  const [budgetLevel, setBudgetLevel] = useState<'Boutique' | 'Luxury' | 'Ultra-Luxe'>('Luxury');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState('');
  const [result, setResult] = useState<ItineraryResult | null>(null);
  const [activeDayIndex, setActiveDayIndex] = useState(0);

  const interestOptions = [
    'Culture & Heritage',
    'Gastronomy',
    'Architecture',
    'Quiet Nature',
    'Artisan Craft',
    'Wellness & Baths',
    'Sunset Vistas'
  ];

  const paceOptions: Array<'Relaxed' | 'Balanced' | 'Fast-paced'> = ['Relaxed', 'Balanced', 'Fast-paced'];

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev: string[]) =>
      prev.includes(interest)
        ? prev.filter((i: string) => i !== interest)
        : [...prev, interest]
    );
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination.trim() || isGenerating) return;

    setIsGenerating(true);
    setGenerationStep('Analyzing destination geography and sunrise light...');

    setTimeout(() => {
      setGenerationStep('Balancing morning sanctuary walks and market tables...');
    }, 600);

    setTimeout(() => {
      setGenerationStep('Calibrating travel pace and architectural transitions...');
    }, 1200);

    try {
      const generated = await itineraryService.generateItinerary({
        destinationName: destination.trim(),
        country: initialCountry,
        days: daysCount,
        travelStyle: travelPace,
        interests: selectedInterests,
        budgetLevel
      });

      setResult(generated);
      setActiveDayIndex(0);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    setResult(null);
  };

  return (
    <section id={id} className={`itinerary-section ${className}`}>
      <div className="container">
        
        {/* Section Header */}
        <div className="itinerary-header">
          <span className="itinerary-eyebrow">
            <Compass size={14} className="text-accent" /> THE TAVIRA ITINERARY ENGINE
          </span>
          <h2 className="itinerary-heading">Turn curiosity into an unhurried plan.</h2>
          <p className="itinerary-supporting">
            State your destination and chosen cadence. Our intelligence shapes a calibrated day-by-day travel narrative.
          </p>
        </div>

        {!result ? (
          /* Planner Form Panel */
          <div className="planner-card">
            <form onSubmit={handleGenerate} className="planner-form">
              
              {/* Top Row: Destination & Days */}
              <div className="planner-row-two">
                <div className="planner-field">
                  <label htmlFor="planner-dest-input" className="planner-field-label">
                    Target Destination
                  </label>
                  <div className="planner-input-wrap">
                    <MapPin size={18} className="planner-input-icon" />
                    <input
                      id="planner-dest-input"
                      type="text"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      placeholder="e.g. Kyoto, Lisbon, Udaipur, Zurich..."
                      required
                      className="planner-input"
                    />
                  </div>
                </div>

                <div className="planner-field">
                  <label className="planner-field-label">
                    Duration of Journey
                  </label>
                  <div className="days-selector-bar">
                    {[1, 2, 3, 5, 7].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setDaysCount(num)}
                        className={`days-pill ${daysCount === num ? 'active' : ''}`}
                      >
                        {num} {num === 1 ? 'Day' : 'Days'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Middle Row: Travel Pace & Budget */}
              <div className="planner-row-two mt-8">
                <div className="planner-field">
                  <label className="planner-field-label">
                    Travel Pace & Cadence
                  </label>
                  <div className="pace-selector-bar">
                    {paceOptions.map((pace) => (
                      <button
                        key={pace}
                        type="button"
                        onClick={() => setTravelPace(pace)}
                        className={`pace-pill ${travelPace === pace ? 'active' : ''}`}
                      >
                        {pace}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="planner-field">
                  <label className="planner-field-label">
                    Hospitality Tier
                  </label>
                  <div className="pace-selector-bar">
                    {(['Boutique', 'Luxury', 'Ultra-Luxe'] as const).map((tier) => (
                      <button
                        key={tier}
                        type="button"
                        onClick={() => setBudgetLevel(tier)}
                        className={`pace-pill ${budgetLevel === tier ? 'active' : ''}`}
                      >
                        {tier}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Row: Key Interests */}
              <div className="planner-field mt-8">
                <label className="planner-field-label">
                  What Matters Most (Select All Applicable)
                </label>
                <div className="interests-grid">
                  {interestOptions.map((interest) => {
                    const isSelected = selectedInterests.includes(interest);
                    return (
                      <button
                        key={interest}
                        type="button"
                        onClick={() => toggleInterest(interest)}
                        className={`interest-tag ${isSelected ? 'active' : ''}`}
                      >
                        {isSelected && <CheckCircle2 size={14} className="interest-check-icon" />}
                        <span>{interest}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submit Button & Progress */}
              <div className="planner-submit-zone">
                <button
                  type="submit"
                  disabled={isGenerating || !destination.trim()}
                  className="planner-generate-btn"
                >
                  {isGenerating ? (
                    <span className="flex items-center gap-3">
                      <span className="planner-spinner" />
                      <span>{generationStep}</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-3">
                      <Sparkles size={16} />
                      <span>Generate {daysCount}-Day Bespoke Itinerary</span>
                      <ArrowRight size={16} />
                    </span>
                  )}
                </button>
                <p className="planner-guarantee">
                  Crafted by ARIA with real-world geographical routes and morning light timing.
                </p>
              </div>

            </form>
          </div>
        ) : (
          /* Rendered Day-by-Day Travel Magazine Itinerary */
          <div className="itinerary-result-wrap animate-fade-in">
            
            {/* Itinerary Banner & Actions */}
            <div className="itinerary-result-banner">
              <div>
                <span className="result-eyebrow">
                  YOUR CURATED JOURNEY · {result.totalDays} {result.totalDays === 1 ? 'DAY' : 'DAYS'}
                </span>
                <h3 className="result-title">
                  {result.destination}
                  <span className="result-pace-tag">({result.travelStyle} Pace)</span>
                </h3>
                <p className="result-overview">{result.themeOverview}</p>
              </div>

              <div className="result-actions-bar">
                <button onClick={handlePrint} className="result-btn-secondary" title="Print itinerary">
                  <Printer size={15} /> Print / Save PDF
                </button>
                <button onClick={handleReset} className="result-btn-secondary">
                  <RotateCcw size={15} /> Modify Details
                </button>
              </div>
            </div>

            {/* Day Selector Tabs Navigation */}
            <div className="day-tabs-scroll-bar">
              {result.days.map((d: ItineraryDay, idx: number) => (
                <button
                  key={d.day}
                  onClick={() => setActiveDayIndex(idx)}
                  className={`day-tab-btn ${activeDayIndex === idx ? 'active' : ''}`}
                >
                  <span className="day-tab-number">DAY 0{d.day}</span>
                  <span className="day-tab-theme">{d.theme.split('—')[1] || d.theme}</span>
                </button>
              ))}
            </div>

            {/* Active Day Narrative */}
            {result.days[activeDayIndex] && (
              <div className="active-day-narrative-bar">
                <span className="narrative-day-label">
                  Day 0{result.days[activeDayIndex].day} Focus:
                </span>
                <span className="narrative-text">
                  "{result.days[activeDayIndex].narrative}"
                </span>
              </div>
            )}

            {/* Day Timeline View */}
            {result.days[activeDayIndex] && (
              <div className="day-timeline">
                {result.days[activeDayIndex].items.map((item: ItineraryItem, itemIdx: number) => (
                  <div key={item.id || itemIdx} className="timeline-slot">
                    
                    {/* Time Pillar */}
                    <div className="timeline-time-pillar">
                      <span className="slot-time">{item.time}</span>
                      <span className="slot-time-period">{item.timeOfDay}</span>
                      <div className="timeline-vertical-line" />
                    </div>

                    {/* Content Card */}
                    <div className="timeline-card">
                      <div className="timeline-card-header">
                        <span className="timeline-cat-badge">{item.category}</span>
                        <span className="timeline-duration">
                          <Clock size={12} /> {item.duration}
                        </span>
                      </div>

                      <h4 className="timeline-activity-title">{item.activity}</h4>

                      <div className="timeline-location-row">
                        <MapPin size={13} className="text-accent" />
                        <span>{item.place}</span>
                      </div>

                      <p className="timeline-description">{item.description}</p>

                      {item.insiderTip && (
                        <div className="timeline-insider-tip">
                          <strong>Local Insider Note:</strong> {item.insiderTip}
                        </div>
                      )}
                    </div>

                  </div>
                ))}
              </div>
            )}

            {/* Day Pagination Footer */}
            <div className="day-pagination-footer">
              <button
                disabled={activeDayIndex === 0}
                onClick={() => setActiveDayIndex((prev: number) => Math.max(0, prev - 1))}
                className="day-nav-prev"
              >
                ← Previous Day
              </button>

              <span className="day-nav-count">
                Day {activeDayIndex + 1} of {result.days.length}
              </span>

              <button
                disabled={activeDayIndex === result.days.length - 1}
                onClick={() => setActiveDayIndex((prev: number) => Math.min(result.days.length - 1, prev + 1))}
                className="day-nav-next"
              >
                Next Day →
              </button>
            </div>

          </div>
        )}

      </div>

      <style>{`
        .itinerary-section {
          background-color: #171816;
          color: #F7F4EE;
          padding: clamp(80px, 10vw, 150px) 0;
          font-family: var(--font-sans);
        }

        .itinerary-header {
          text-align: center;
          max-width: 780px;
          margin: 0 auto clamp(40px, 6vw, 70px);
        }

        .itinerary-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          font-weight: 600;
          color: rgba(247, 244, 238, 0.7);
          margin-bottom: 16px;
        }

        .itinerary-heading {
          font-family: var(--font-serif);
          font-size: clamp(2.5rem, 5vw, 4.25rem);
          line-height: 1.1;
          color: #F7F4EE;
          font-weight: 400;
          margin-bottom: 20px;
        }

        .itinerary-supporting {
          font-size: clamp(1rem, 1.5vw, 1.2rem);
          line-height: 1.6;
          color: rgba(247, 244, 238, 0.8);
          font-weight: 300;
        }

        .planner-card {
          background-color: #141413;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 2px;
          padding: clamp(24px, 5vw, 48px);
          color: #F5F2EB;
          max-width: 960px;
          margin: 0 auto;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.5);
        }

        .planner-row-two {
          display: grid;
          grid-template-columns: 1fr;
          gap: 28px;
        }

        @media (min-width: 768px) {
          .planner-row-two {
            grid-template-columns: 1fr 1fr;
          }
        }

        .planner-field-label {
          display: block;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          font-weight: 600;
          color: var(--color-accent-primary);
          margin-bottom: 12px;
        }

        .planner-input-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }

        .planner-input-icon {
          position: absolute;
          left: 16px;
          color: var(--color-accent-primary);
        }

        .planner-input {
          width: 100%;
          height: 54px;
          padding: 0 16px 0 46px;
          background-color: #1A1A19;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 2px;
          font-size: 15px;
          color: #F5F2EB;
          outline: none;
          transition: border-color 0.2s;
        }

        .planner-input:focus {
          border-color: var(--color-accent-primary);
        }

        .days-selector-bar, .pace-selector-bar {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .days-pill, .pace-pill {
          flex: 1;
          height: 54px;
          background: #1A1A19;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 2px;
          font-size: 13.5px;
          font-weight: 600;
          color: #9E9A91;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .days-pill.active, .pace-pill.active {
          background-color: var(--color-accent-primary);
          color: #0D0D0C;
          border-color: var(--color-accent-primary);
        }

        .interests-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .interest-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 10px 20px;
          white-space: nowrap;
          background: #1A1A19;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 9999px;
          font-size: 13px;
          font-weight: 500;
          color: #F5F2EB;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .interest-tag:hover {
          border-color: var(--color-accent-primary);
          transform: translateY(-1px);
        }

        .interest-tag.active {
          background-color: rgba(197, 168, 128, 0.16);
          color: #FFFFFF;
          border-color: var(--color-accent-primary);
          box-shadow: 0 4px 14px rgba(197, 168, 128, 0.2);
        }

        .interest-check-icon {
          color: var(--color-accent-primary);
        }

        .planner-submit-zone {
          margin-top: 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .planner-generate-btn {
          width: 100%;
          height: 58px;
          background-color: var(--color-accent-primary);
          color: #0D0D0C;
          border: none;
          border-radius: 2px;
          font-size: 14px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .planner-generate-btn:hover:not(:disabled) {
          background-color: var(--color-accent-hover);
          transform: translateY(-1px);
        }

        .planner-generate-btn:disabled {
          opacity: 0.7;
          cursor: wait;
        }

        .planner-spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(13, 13, 12, 0.3);
          border-top-color: #0D0D0C;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .planner-guarantee {
          font-size: 12px;
          color: #9E9A91;
          margin-top: 14px;
          text-align: center;
        }

        /* Result View Styles */
        .itinerary-result-wrap {
          max-width: 1080px;
          margin: 0 auto;
          background-color: #141413;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 2px;
          padding: clamp(24px, 5vw, 56px);
          color: #F5F2EB;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5);
        }

        .itinerary-result-banner {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 24px;
          padding-bottom: 28px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          margin-bottom: 32px;
        }

        .result-eyebrow {
          font-size: 11px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          font-weight: 600;
          color: var(--color-accent-primary);
          display: block;
          margin-bottom: 6px;
        }

        .result-title {
          font-family: var(--font-serif);
          font-size: clamp(2rem, 4vw, 3.25rem);
          line-height: 1.1;
          margin: 0 0 10px 0;
          color: #F5F2EB;
        }

        .result-pace-tag {
          font-family: var(--font-sans);
          font-size: 14px;
          font-weight: 400;
          color: #9E9A91;
          margin-left: 12px;
        }

        .result-overview {
          font-size: 15px;
          line-height: 1.6;
          color: #9E9A91;
          max-width: 680px;
        }

        .result-actions-bar {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .result-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 18px;
          background: #1A1A19;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 2px;
          font-size: 11.5px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          font-weight: 600;
          color: #F5F2EB;
          cursor: pointer;
          transition: all 0.2s;
        }

        .result-btn-secondary:hover {
          background-color: #21201F;
          border-color: var(--color-accent-primary);
        }

        .day-tabs-scroll-bar {
          display: flex;
          gap: 12px;
          overflow-x: auto;
          padding-bottom: 12px;
          margin-bottom: 24px;
          scrollbar-width: thin;
        }

        .day-tab-btn {
          flex: 1;
          min-width: 140px;
          padding: 14px 18px;
          text-align: left;
          background: #1A1A19;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 2px;
          color: #9E9A91;
          cursor: pointer;
          transition: all 0.2s;
        }

        .day-tab-btn.active {
          background-color: #21201F;
          color: #F5F2EB;
          border-color: var(--color-accent-primary);
        }

        .day-tab-number {
          display: block;
          font-size: 10px;
          letter-spacing: 0.14em;
          font-weight: 600;
          color: var(--color-accent-primary);
          margin-bottom: 4px;
        }

        .day-tab-theme {
          display: block;
          font-size: 13px;
          font-weight: 600;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .active-day-narrative-bar {
          background-color: #1A1A19;
          border-left: 3px solid var(--color-accent-primary);
          padding: 14px 20px;
          margin-bottom: 32px;
          font-size: 14px;
          color: #F5F2EB;
        }

        .narrative-day-label {
          font-weight: 600;
          color: var(--color-accent-primary);
          margin-right: 8px;
        }

        .narrative-text {
          font-style: italic;
          color: #D6D0C7;
        }

        .day-timeline {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .timeline-slot {
          display: grid;
          grid-template-columns: 80px 1fr;
          gap: 24px;
        }

        @media (max-width: 600px) {
          .timeline-slot {
            grid-template-columns: 60px 1fr;
            gap: 14px;
          }
        }

        .timeline-time-pillar {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
        }

        .slot-time {
          font-family: var(--font-serif);
          font-size: 20px;
          font-weight: 500;
          color: #F5F2EB;
        }

        .slot-time-period {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #9E9A91;
          font-weight: 600;
        }

        .timeline-vertical-line {
          width: 1px;
          flex: 1;
          background: linear-gradient(to bottom, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.02));
          margin-top: 10px;
        }

        .timeline-card {
          background-color: #1A1A19;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 2px;
          padding: 24px 28px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .timeline-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
          border-color: rgba(197, 168, 128, 0.3);
        }

        .timeline-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .timeline-cat-badge {
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          font-weight: 600;
          color: var(--color-accent-primary);
        }

        .timeline-duration {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          color: #9E9A91;
        }

        .timeline-activity-title {
          font-family: var(--font-serif);
          font-size: 22px;
          font-weight: 400;
          color: #F5F2EB;
          margin: 0 0 8px 0;
        }

        .timeline-location-row {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: #C5A880;
          margin-bottom: 12px;
        }

        .timeline-description {
          font-size: 13.5px;
          line-height: 1.6;
          color: #9E9A91;
          margin-bottom: 16px;
        }

        .timeline-insider-tip {
          background-color: #21201F;
          border-left: 2px solid var(--color-accent-primary);
          padding: 10px 14px;
          font-size: 12px;
          color: #D6D0C7;
          border-radius: 0 2px 2px 0;
        }

        .day-pagination-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 40px;
          padding-top: 24px;
          border-top: 1px solid #D8D1C7;
        }

        .day-nav-prev, .day-nav-next {
          padding: 10px 20px;
          background: #FFFFFF;
          border: 1px solid #D8D1C7;
          border-radius: 2px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s;
        }

        .day-nav-prev:hover:not(:disabled), .day-nav-next:hover:not(:disabled) {
          background-color: #181817;
          color: #F7F4EE;
        }

        .day-nav-prev:disabled, .day-nav-next:disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }

        .day-nav-count {
          font-size: 13px;
          font-weight: 500;
          color: #6E6A62;
        }

        @media print {
          body {
            background-color: #FFFFFF !important;
            color: #000000 !important;
          }
          .hero-cinematic, header, footer, .result-actions-bar, .day-pagination-footer {
            display: none !important;
          }
          .itinerary-section {
            background: none !important;
            padding: 0 !important;
          }
          .itinerary-result-wrap {
            border: none !important;
            box-shadow: none !important;
            padding: 0 !important;
          }
        }
      `}</style>
    </section>
  );
};
