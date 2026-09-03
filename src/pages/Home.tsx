import React from 'react';
import { EditorialHero } from '../components/home/EditorialHero';
import { PhilosophyStrip } from '../components/home/PhilosophyStrip';
import { DestinationAccordion } from '../components/home/DestinationAccordion';
import { ConciergePreview } from '../components/home/ConciergePreview';
import { JourneyCTA } from '../components/home/JourneyCTA';
import { ItineraryPlanner } from '../components/itinerary/ItineraryPlanner';

export const Home: React.FC = () => {
  const scrollToDestinations = () => {
    const el = document.getElementById('explore-destinations');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToPhilosophy = () => {
    const el = document.getElementById('philosophy-strip');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToPlanner = () => {
    const el = document.getElementById('tavira-planner');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="home-editorial-page animate-fade-in">
      
      {/* 1. Image-Led Editorial Hero Composition */}
      <EditorialHero 
        onExploreClick={scrollToDestinations}
        onHowItWorksClick={scrollToPhilosophy}
      />

      {/* 2. Travel Philosophy Strip (4 Floating Pillars) */}
      <PhilosophyStrip />

      {/* 3. Vertical Destination Accordion Explorer */}
      <DestinationAccordion />

      {/* 4. AI Concierge Editorial Preview */}
      <ConciergePreview />

      {/* 5. Refined Journey CTA */}
      <JourneyCTA onPlanTripClick={scrollToPlanner} />

      {/* 6. Structured Day-by-Day Itinerary Planner */}
      <ItineraryPlanner id="tavira-planner" />

      <style>{`
        .home-editorial-page {
          background-color: var(--color-bg-primary);
          color: var(--color-text-primary);
          min-height: 100vh;
        }
      `}</style>
    </div>
  );
};
