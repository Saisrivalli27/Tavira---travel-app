import { MOCK_IMAGES, type ImageMetadata } from '../data/mockImages';
import { pexelsService } from './pexelsService';

export { pexelsService };

const imageCache = new Map<string, ImageMetadata>();

export const imageService = {
  // Get image by ID with reliable fallback
  getImage(id: string): ImageMetadata {
    if (imageCache.has(id)) {
      return imageCache.get(id)!;
    }

    const image = MOCK_IMAGES[id];
    if (image) {
      imageCache.set(id, image);
      return image;
    }

    // Graceful fallback if image ID is not found in mock catalog
    const fallbackImage: ImageMetadata = {
      id,
      url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop',
      alt: 'Luxury travel destination'
    };
    return fallbackImage;
  },

  // Dynamic remote image search via Pexels API with caching & fallback
  async fetchDestinationImage(destinationName: string, fallbackId?: string): Promise<ImageMetadata> {
    return pexelsService.searchDestinationImage(destinationName, fallbackId);
  },

  async fetchPlaceImage(placeName: string, destinationName?: string, fallbackId?: string): Promise<ImageMetadata> {
    return pexelsService.searchPlaceImage(placeName, destinationName, fallbackId);
  },

  // Build responsive image URL with width & quality
  getOptimizedUrl(url: string, width: number = 1600, quality: number = 80): string {
    if (!url.includes('images.unsplash.com') && !url.includes('images.pexels.com')) return url;
    try {
      const urlObj = new URL(url);
      if (url.includes('images.unsplash.com')) {
        urlObj.searchParams.set('w', width.toString());
        urlObj.searchParams.set('q', quality.toString());
        urlObj.searchParams.set('auto', 'format');
        urlObj.searchParams.set('fit', 'crop');
      } else if (url.includes('images.pexels.com')) {
        urlObj.searchParams.set('auto', 'compress');
        urlObj.searchParams.set('cs', 'tinysrgb');
        urlObj.searchParams.set('w', width.toString());
      }
      return urlObj.toString();
    } catch {
      return url;
    }
  }
};
