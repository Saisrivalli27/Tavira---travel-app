export type LocationState = 'prompt' | 'requesting' | 'granted' | 'denied' | 'unavailable' | 'unsupported';

export const locationService = {
  // Simulate checking current permission state
  async checkPermissionStatus(): Promise<LocationState> {
    if (!('geolocation' in navigator)) {
      return 'unsupported';
    }
    // Return prompt initially. In a real app we'd use navigator.permissions.query
    return 'prompt';
  },

  // Simulate requesting location
  async requestLocation(): Promise<{ state: LocationState; coordinates?: { lat: number; lng: number } }> {
    return new Promise((resolve) => {
      // Simulate prompt UI delay
      setTimeout(() => {
        // Randomly succeed or fail for demo purposes, leaning towards success
        const success = Math.random() > 0.3;
        if (success) {
          // Return rough coordinates (e.g., somewhere in Europe)
          resolve({ state: 'granted', coordinates: { lat: 48.8566, lng: 2.3522 } });
        } else {
          resolve({ state: 'denied' });
        }
      }, 1500);
    });
  }
};
