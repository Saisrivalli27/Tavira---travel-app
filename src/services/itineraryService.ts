export interface ItineraryItem {
  id: string;
  timeOfDay: 'Morning' | 'Afternoon' | 'Evening';
  activity: string;
  place?: string;
  note: string;
  duration: string;
}

export interface ItineraryDay {
  day: number;
  items: ItineraryItem[];
}

export interface ItineraryRequest {
  destinationSlug: string;
  days: number;
  travelStyle: string;
}

export const itineraryService = {
  async generateItinerary(request: ItineraryRequest): Promise<ItineraryDay[]> {
    await new Promise((resolve) => setTimeout(resolve, 2500)); // Simulate generation time

    const itinerary: ItineraryDay[] = [];
    
    for (let i = 1; i <= request.days; i++) {
      itinerary.push({
        day: i,
        items: [
          {
            id: `day-${i}-morning`,
            timeOfDay: 'Morning',
            activity: 'Quiet Exploration',
            place: 'Historic Center',
            note: 'Begin before the crowds arrive. The morning light offers the best atmosphere for photography.',
            duration: '3 hours'
          },
          {
            id: `day-${i}-afternoon`,
            timeOfDay: 'Afternoon',
            activity: request.travelStyle === 'Relaxed' ? 'Leisurely Lunch & Rest' : 'Cultural Immersion',
            place: 'Local District',
            note: request.travelStyle === 'Relaxed' 
              ? 'Find a shaded cafe and enjoy a slow meal reflecting local flavours.'
              : 'Visit the primary museums or galleries, focusing on one specific era or movement.',
            duration: '4 hours'
          },
          {
            id: `day-${i}-evening`,
            timeOfDay: 'Evening',
            activity: 'Atmospheric Dining',
            note: 'Experience the transition as the city illuminates. Seek out intimate dining spaces favoured by residents.',
            duration: '2-3 hours'
          }
        ]
      });
    }

    return itinerary;
  }
};
