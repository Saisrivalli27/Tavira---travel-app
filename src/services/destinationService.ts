import { MOCK_DESTINATIONS, type Destination } from '../data/mockDestinations';

export interface DestinationFilters {
  query?: string;
  region?: string;
  country?: string;
  mood?: string;
  season?: string;
}

export const destinationService = {
  async getAllDestinations(): Promise<Destination[]> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 600));
    return MOCK_DESTINATIONS;
  },

  async getFeaturedDestinations(): Promise<Destination[]> {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return MOCK_DESTINATIONS.slice(0, 4);
  },

  async getDestinationBySlug(slug: string): Promise<Destination | undefined> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return MOCK_DESTINATIONS.find((d) => d.slug === slug);
  },

  async searchAndFilter(filters: DestinationFilters): Promise<Destination[]> {
    await new Promise((resolve) => setTimeout(resolve, 700));
    
    return MOCK_DESTINATIONS.filter((dest) => {
      let matches = true;

      if (filters.query) {
        const query = filters.query.toLowerCase();
        const matchesQuery = 
          dest.name.toLowerCase().includes(query) || 
          dest.country.toLowerCase().includes(query) ||
          dest.region.toLowerCase().includes(query);
        if (!matchesQuery) matches = false;
      }

      if (filters.region && filters.region !== 'All') {
        if (dest.region !== filters.region) matches = false;
      }

      if (filters.country && filters.country !== 'All') {
        if (dest.country !== filters.country) matches = false;
      }

      if (filters.mood && filters.mood !== 'All') {
        if (!dest.moods.includes(filters.mood)) matches = false;
      }

      if (filters.season && filters.season !== 'All') {
        if (dest.bestSeason !== filters.season) matches = false;
      }

      return matches;
    });
  }
};
