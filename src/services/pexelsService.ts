import { MOCK_IMAGES, type ImageMetadata } from '../data/mockImages';

const pexelsCache = new Map<string, ImageMetadata>();
const inFlightRequests = new Map<string, Promise<ImageMetadata>>();

const DEFAULT_FALLBACK_URL = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=85&w=2073&auto=format&fit=crop';

/**
 * Pexels API Service
 * Securely and efficiently queries high-resolution travel photography
 * with in-memory caching and graceful local mock fallbacks.
 */
export const pexelsService = {
  /**
   * Search for a destination hero photo via Pexels API
   */
  async searchDestinationImage(destinationName: string, fallbackId?: string): Promise<ImageMetadata> {
    const query = `${destinationName} travel landscape`;
    return this.fetchPhoto(query, fallbackId);
  },

  /**
   * Search for a specific place/landmark photo via Pexels API
   */
  async searchPlaceImage(placeName: string, destinationName?: string, fallbackId?: string): Promise<ImageMetadata> {
    const query = destinationName ? `${placeName} ${destinationName}` : `${placeName} architecture landmark`;
    return this.fetchPhoto(query, fallbackId);
  },

  /**
   * Core Pexels photo search with in-memory caching and request deduplication
   */
  async fetchPhoto(query: string, fallbackId?: string): Promise<ImageMetadata> {
    const normalizedKey = query.trim().toLowerCase();

    // 1. Check in-memory cache
    if (pexelsCache.has(normalizedKey)) {
      return pexelsCache.get(normalizedKey)!;
    }

    // 2. Prevent duplicate in-flight requests for the same query
    if (inFlightRequests.has(normalizedKey)) {
      return inFlightRequests.get(normalizedKey)!;
    }

    const fetchPromise = (async (): Promise<ImageMetadata> => {
      const apiKey = import.meta.env.VITE_PEXELS_API_KEY;

      // 3. If API key is available, call Pexels API
      if (apiKey && apiKey !== 'your_pexels_api_key_here' && apiKey.trim() !== '') {
        try {
          const endpoint = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`;
          const res = await fetch(endpoint, {
            headers: {
              Authorization: apiKey.trim()
            }
          });

          if (res.ok) {
            const data = await res.json();
            const photo = data.photos?.[0];
            if (photo) {
              const photoUrl = photo.src?.large2x || photo.src?.large || photo.src?.landscape || photo.src?.original;
              if (photoUrl) {
                const metadata: ImageMetadata = {
                  id: `pexels-${photo.id}`,
                  url: photoUrl,
                  alt: photo.alt || `${query} photography`,
                  credit: `Photo by ${photo.photographer} on Pexels`
                };
                pexelsCache.set(normalizedKey, metadata);
                return metadata;
              }
            }
          }
        } catch {
          // Gracefully continue to fallback on any network or API error
        }
      }

      // 4. Graceful fallback to local curated mock assets
      let fallbackImage: ImageMetadata | undefined;
      if (fallbackId && MOCK_IMAGES[fallbackId]) {
        fallbackImage = MOCK_IMAGES[fallbackId];
      }

      const result: ImageMetadata = fallbackImage || {
        id: `fallback-${normalizedKey}`,
        url: DEFAULT_FALLBACK_URL,
        alt: `${query} landscape view`
      };

      pexelsCache.set(normalizedKey, result);
      return result;
    })().finally(() => {
      inFlightRequests.delete(normalizedKey);
    });

    inFlightRequests.set(normalizedKey, fetchPromise);
    return fetchPromise;
  },

  /**
   * Check if an image is already cached in memory
   */
  hasCached(query: string): boolean {
    return pexelsCache.has(query.trim().toLowerCase());
  },

  /**
   * Direct cache peek
   */
  getCached(query: string): ImageMetadata | undefined {
    return pexelsCache.get(query.trim().toLowerCase());
  }
};
