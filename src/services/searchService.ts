import { destinationService } from './destinationService';
import { MOCK_JOURNAL } from '../data/mockJournal';

export interface SearchResult {
  type: 'destination' | 'journal' | 'mood' | 'region' | 'country';
  id: string;
  title: string;
  subtitle: string;
  url: string;
  imageId?: string;
}

export const searchService = {
  async globalSearch(query: string): Promise<SearchResult[]> {
    if (!query || query.trim().length < 2) return [];
    
    const lowerQuery = query.toLowerCase().trim();
    const results: SearchResult[] = [];

    // 1. Search Destinations
    const allDestinations = await destinationService.getAllDestinations();
    
    allDestinations.forEach(dest => {
      if (
        dest.name.toLowerCase().includes(lowerQuery) ||
        dest.country.toLowerCase().includes(lowerQuery) ||
        dest.region.toLowerCase().includes(lowerQuery) ||
        dest.moods.some((t: string) => t.toLowerCase().includes(lowerQuery))
      ) {
        results.push({
          type: 'destination',
          id: `dest-${dest.id}`,
          title: dest.name,
          subtitle: dest.country,
          url: `/destinations/${dest.slug}`,
          imageId: dest.heroImageId
        });
      }
    });

    // 2. Search Journal
    MOCK_JOURNAL.forEach(article => {
      if (
        article.title.toLowerCase().includes(lowerQuery) ||
        article.category.toLowerCase().includes(lowerQuery) ||
        article.author.toLowerCase().includes(lowerQuery)
      ) {
        results.push({
          type: 'journal',
          id: `journal-${article.id}`,
          title: article.title,
          subtitle: `Journal · ${article.category}`,
          url: `/journal/${article.slug}`,
          imageId: article.imageId
        });
      }
    });

    // 3. Search Moods (Static)
    const moods = ['Slow mornings', 'Sacred journeys', 'Mountain air', 'Coastal light', 'Craft and culture', 'Design cities', 'Cultural depth', 'Wild horizons'];
    moods.forEach(mood => {
      if (mood.toLowerCase().includes(lowerQuery)) {
        results.push({
          type: 'mood',
          id: `mood-${mood}`,
          title: mood,
          subtitle: 'Travel Mood',
          url: `/explore?mood=${encodeURIComponent(mood)}`
        });
      }
    });

    return results.slice(0, 8); // Limit to 8 top results for command palette
  }
};
