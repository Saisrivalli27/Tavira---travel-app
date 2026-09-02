import { MOCK_IMAGES, type ImageMetadata } from '../data/mockImages';

export const imageService = {
  getImage(id: string): ImageMetadata {
    const image = MOCK_IMAGES[id];
    if (image) {
      return image;
    }
    // Graceful fallback if image ID is not found
    return {
      id: 'fallback',
      url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop',
      alt: 'Beautiful travel destination'
    };
  }
};
