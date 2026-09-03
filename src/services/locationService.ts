export type LocationState = 'prompt' | 'requesting' | 'granted' | 'denied' | 'unavailable' | 'unsupported';

export interface UserLocation {
  city: string;
  country: string;
  state?: string;
  lat: number;
  lng: number;
  label: string;
}

export interface GeocodedPlace {
  id: string;
  name: string;
  country: string;
  admin1?: string;
  lat: number;
  lng: number;
  formatted: string;
}

export const locationService = {
  // Check if Geolocation is available
  hasGeolocationSupport(): boolean {
    return typeof navigator !== 'undefined' && 'geolocation' in navigator;
  },

  // Real browser geolocation request
  async requestCurrentLocation(): Promise<{ state: LocationState; location?: UserLocation; errorMsg?: string }> {
    if (!this.hasGeolocationSupport()) {
      return { state: 'unsupported', errorMsg: "Geolocation is not supported by your browser." };
    }

    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          try {
            // Reverse geocode to city name using free OpenStreetMap Nominatim reverse API
            const reverseUrl = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&zoom=10&addressdetails=1`;
            const response = await fetch(reverseUrl, {
              headers: {
                'Accept-Language': 'en'
              }
            });

            if (response.ok) {
              const data = await response.json();
              const addr = data.address || {};
              const city = addr.city || addr.town || addr.municipality || addr.village || addr.county || 'Your Area';
              const country = addr.country || '';
              const state = addr.state || '';

              const userLoc: UserLocation = {
                city,
                country,
                state,
                lat,
                lng,
                label: country ? `${city}, ${country}` : city
              };

              // Save to localStorage for instant recall
              try {
                localStorage.setItem('tavira_user_location', JSON.stringify(userLoc));
              } catch (_) {}

              resolve({ state: 'granted', location: userLoc });
              return;
            }
          } catch (e) {
            console.warn('Reverse geocoding failed, falling back to coordinates:', e);
          }

          // Fallback if reverse geocode fails
          const fallbackLoc: UserLocation = {
            city: 'Current Location',
            country: '',
            lat,
            lng,
            label: `${lat.toFixed(2)}°, ${lng.toFixed(2)}°`
          };
          resolve({ state: 'granted', location: fallbackLoc });
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            resolve({
              state: 'denied',
              errorMsg: "Location access isn't available. Search for a destination instead."
            });
          } else {
            resolve({
              state: 'unavailable',
              errorMsg: "Unable to detect your current position. Please search manually."
            });
          }
        },
        { timeout: 10000, enableHighAccuracy: false }
      );
    });
  },

  // Get stored location if already set or detected
  getStoredLocation(): UserLocation | null {
    try {
      const stored = localStorage.getItem('tavira_user_location');
      if (stored) return JSON.parse(stored);
    } catch (_) {}
    return null;
  },

  setStoredLocation(location: UserLocation): void {
    try {
      localStorage.setItem('tavira_user_location', JSON.stringify(location));
    } catch (_) {}
  },

  // Search cities/locations globally with Open-Meteo Geocoding API (Fast, Free, No API key required)
  async searchLocations(query: string): Promise<GeocodedPlace[]> {
    if (!query || query.trim().length < 2) return [];

    try {
      const encoded = encodeURIComponent(query.trim());
      const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encoded}&count=6&language=en&format=json`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        if (data.results && Array.isArray(data.results)) {
          return data.results.map((item: any) => {
            const parts = [item.name];
            if (item.admin1 && item.admin1 !== item.name) parts.push(item.admin1);
            if (item.country) parts.push(item.country);

            return {
              id: `${item.id}`,
              name: item.name,
              country: item.country || '',
              admin1: item.admin1,
              lat: item.latitude,
              lng: item.longitude,
              formatted: parts.join(', ')
            };
          });
        }
      }
    } catch (e) {
      console.warn('Geocoding search failed:', e);
    }

    return [];
  }
};
