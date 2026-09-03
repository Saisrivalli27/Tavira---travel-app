export interface WeatherData {
  temperature: number;
  condition: 'Sunny' | 'Clear' | 'Partly Cloudy' | 'Cloudy' | 'Rainy' | 'Thunderstorm' | 'Snow' | 'Misty';
  conditionDescription: string;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  localTime: string;
  tempMin?: number;
  tempMax?: number;
  isLive: boolean;
  source: 'OpenWeather' | 'Open-Meteo' | 'Fallback';
}

const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes cache
const weatherCache = new Map<string, { data: WeatherData; timestamp: number }>();
const inFlightRequests = new Map<string, Promise<WeatherData>>();

// Comprehensive city coordinates map (All required test cities + all 21 project destinations)
const KNOWN_COORDINATES: Record<string, { lat: number; lng: number }> = {
  // Required test cities
  paris: { lat: 48.8566, lng: 2.3522 },
  london: { lat: 51.5074, lng: -0.1278 },
  'new york': { lat: 40.7128, lng: -74.0060 },
  tokyo: { lat: 35.6762, lng: 139.6503 },
  dubai: { lat: 25.2048, lng: 55.2708 },
  mumbai: { lat: 19.0760, lng: 72.8777 },
  sydney: { lat: -33.8688, lng: 151.2093 },
  rome: { lat: 41.9028, lng: 12.4964 },
  singapore: { lat: 1.3521, lng: 103.8198 },
  cairo: { lat: 30.0444, lng: 31.2357 },

  // Project destinations
  udaipur: { lat: 24.5854, lng: 73.7125 },
  jaipur: { lat: 26.9124, lng: 75.7873 },
  varanasi: { lat: 25.3176, lng: 82.9739 },
  kochi: { lat: 9.9312, lng: 76.2673 },
  munnar: { lat: 10.0889, lng: 77.0595 },
  ladakh: { lat: 34.1526, lng: 77.5771 },
  hampi: { lat: 15.3350, lng: 76.4600 },
  pondicherry: { lat: 11.9416, lng: 79.8083 },
  kyoto: { lat: 35.0116, lng: 135.7681 },
  lisbon: { lat: 38.7223, lng: -9.1393 },
  marrakech: { lat: 31.6295, lng: -7.9811 },
  reykjavik: { lat: 64.1466, lng: -21.9426 },
  'reykjavík': { lat: 64.1466, lng: -21.9426 },
  'amalfi coast': { lat: 40.6333, lng: 14.6029 },
  copenhagen: { lat: 55.6761, lng: 12.5683 },
  oaxaca: { lat: 17.0732, lng: -96.7266 },
  'cape town': { lat: -33.9249, lng: 18.4241 },
  'hoi an': { lat: 15.8801, lng: 108.3380 },
  istanbul: { lat: 41.0082, lng: 28.9784 },
  santorini: { lat: 36.3932, lng: 25.4615 },
  queenstown: { lat: -45.0312, lng: 168.6626 },
  cappadocia: { lat: 38.6431, lng: 34.8289 },
  banff: { lat: 51.1784, lng: -115.5708 },
  bengaluru: { lat: 12.9716, lng: 77.5946 }
};

const WMO_CODE_MAP: Record<number, { condition: WeatherData['condition']; description: string }> = {
  0: { condition: 'Clear', description: 'Clear skies' },
  1: { condition: 'Sunny', description: 'Mainly clear' },
  2: { condition: 'Partly Cloudy', description: 'Partly cloudy' },
  3: { condition: 'Cloudy', description: 'Overcast' },
  45: { condition: 'Misty', description: 'Foggy conditions' },
  48: { condition: 'Misty', description: 'Depositing rime fog' },
  51: { condition: 'Rainy', description: 'Light drizzle' },
  53: { condition: 'Rainy', description: 'Moderate drizzle' },
  55: { condition: 'Rainy', description: 'Dense drizzle' },
  61: { condition: 'Rainy', description: 'Slight rain' },
  63: { condition: 'Rainy', description: 'Moderate rain' },
  65: { condition: 'Rainy', description: 'Heavy rainfall' },
  71: { condition: 'Snow', description: 'Slight snowfall' },
  73: { condition: 'Snow', description: 'Moderate snow' },
  75: { condition: 'Snow', description: 'Heavy snow' },
  80: { condition: 'Rainy', description: 'Passing rain showers' },
  81: { condition: 'Rainy', description: 'Moderate showers' },
  82: { condition: 'Rainy', description: 'Violent rain showers' },
  95: { condition: 'Thunderstorm', description: 'Thunderstorm' },
  96: { condition: 'Thunderstorm', description: 'Thunderstorm with slight hail' },
  99: { condition: 'Thunderstorm', description: 'Thunderstorm with heavy hail' }
};

export const weatherService = {
  /**
   * Universal weather fetcher accepting either coordinates or location name.
   * Prefers coordinates when available to minimize extra network hops.
   */
  async getCurrentWeather(location: string | { lat: number; lng: number }): Promise<WeatherData> {
    // 1. If coordinates object is provided, prefer coordinates
    if (typeof location === 'object' && location !== null && 'lat' in location && 'lng' in location) {
      return this.getWeatherByCoordinates(location.lat, location.lng);
    }

    const locName = String(location || '').trim();
    if (!locName) {
      throw new Error('Weather location is required.');
    }

    const cleanKey = locName.toLowerCase();

    // 2. Check cache by city name
    const cacheKey = `city_${cleanKey}`;
    const cached = weatherCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
      return cached.data;
    }

    // 3. If city exists in known coordinates map, use coordinates
    if (KNOWN_COORDINATES[cleanKey]) {
      const coords = KNOWN_COORDINATES[cleanKey];
      const data = await this.getWeatherByCoordinates(coords.lat, coords.lng);
      weatherCache.set(cacheKey, { data, timestamp: Date.now() });
      return data;
    }

    // 4. Try OpenWeather API direct city query: https://api.openweathermap.org/data/2.5/weather?q={CITY}&appid={API_KEY}&units=metric
    const openWeatherKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
    if (openWeatherKey && openWeatherKey !== 'your_openweather_api_key_here' && openWeatherKey.trim() !== '') {
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(locName)}&units=metric&appid=${openWeatherKey.trim()}`;
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          const parsed = this.parseOpenWeatherData(data);
          weatherCache.set(cacheKey, { data: parsed, timestamp: Date.now() });
          return parsed;
        } else if (res.status === 404) {
          // Explicit invalid location from OpenWeather
          throw new Error(`Weather unavailable for "${locName}". Location not found.`);
        }
      } catch (err: any) {
        if (err?.message?.includes('Location not found')) {
          throw err;
        }
        // If it was a network error or key error, proceed to geocode validation
      }
    }

    // 5. Check if the city exists via Open-Meteo Geocoding before attempting fallback
    try {
      const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(locName)}&count=1&language=en&format=json`;
      const geoRes = await fetch(geoUrl);
      if (geoRes.ok) {
        const geoData = await geoRes.json();
        const match = geoData.results?.[0];
        if (match && typeof match.latitude === 'number' && typeof match.longitude === 'number') {
          const data = await this.getWeatherByCoordinates(match.latitude, match.longitude);
          weatherCache.set(cacheKey, { data, timestamp: Date.now() });
          return data;
        }
      }
    } catch {
      // Failed geocode
    }

    // 6. Invalid location: do NOT fall back to Paris! Throw an explicit user-friendly error.
    throw new Error(`Weather unavailable for "${locName}". Please verify the destination name.`);
  },

  /**
   * Coordinate-based weather fetcher:
   * Uses: https://api.openweathermap.org/data/2.5/weather?lat={LAT}&lon={LON}&appid={API_KEY}&units=metric
   * With in-memory caching and request deduplication.
   */
  async getWeatherByCoordinates(lat: number, lng: number): Promise<WeatherData> {
    if (typeof lat !== 'number' || typeof lng !== 'number' || isNaN(lat) || isNaN(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      throw new Error('Invalid coordinates provided for weather lookup.');
    }

    const roundedLat = Math.round(lat * 100) / 100;
    const roundedLng = Math.round(lng * 100) / 100;
    const cacheKey = `coord_${roundedLat}_${roundedLng}`;

    // 1. In-memory cache check (10-minute TTL)
    const cached = weatherCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
      return cached.data;
    }

    // 2. Prevent duplicate concurrent in-flight requests
    if (inFlightRequests.has(cacheKey)) {
      return inFlightRequests.get(cacheKey)!;
    }

    const fetchPromise = (async (): Promise<WeatherData> => {
      const openWeatherKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

      // 3. Primary: OpenWeather API (Metric units = Celsius)
      if (openWeatherKey && openWeatherKey !== 'your_openweather_api_key_here' && openWeatherKey.trim() !== '') {
        try {
          const endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${roundedLat}&lon=${roundedLng}&units=metric&appid=${openWeatherKey.trim()}`;
          const res = await fetch(endpoint);
          if (res.ok) {
            const data = await res.json();
            const result = this.parseOpenWeatherData(data);
            weatherCache.set(cacheKey, { data: result, timestamp: Date.now() });
            return result;
          }
        } catch {
          // Continue to Open-Meteo fallback
        }
      }

      // 4. Secondary: Open-Meteo Free Live Real-time API (reliable live global forecast)
      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${roundedLat}&longitude=${roundedLng}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          const current = data.current;
          const weatherInfo = WMO_CODE_MAP[current.weather_code] || { condition: 'Clear', description: 'Clear skies' };
          
          const timePart = current.time ? current.time.split('T')[1]?.slice(0, 5) : '';
          const localTimeFormatted = timePart ? `${timePart} local` : new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

          const result: WeatherData = {
            temperature: Math.round(current.temperature_2m),
            condition: weatherInfo.condition,
            conditionDescription: weatherInfo.description,
            feelsLike: Math.round(current.apparent_temperature),
            humidity: Math.round(current.relative_humidity_2m),
            windSpeed: Math.round(current.wind_speed_10m),
            tempMin: data.daily?.temperature_2m_min?.[0] ? Math.round(data.daily.temperature_2m_min[0]) : undefined,
            tempMax: data.daily?.temperature_2m_max?.[0] ? Math.round(data.daily.temperature_2m_max[0]) : undefined,
            localTime: localTimeFormatted,
            isLive: true,
            source: 'Open-Meteo'
          };

          weatherCache.set(cacheKey, { data: result, timestamp: Date.now() });
          return result;
        }
      } catch {
        // Continue to resilient fallback
      }

      // 5. Deterministic fallback for disconnected environments
      const tempBase = Math.abs(lat) < 25 ? 26 : Math.abs(lat) > 50 ? 12 : 20;
      const fallbackResult: WeatherData = {
        temperature: tempBase,
        condition: 'Clear',
        conditionDescription: 'Clear, gentle light',
        feelsLike: tempBase + 1,
        humidity: 55,
        windSpeed: 14,
        localTime: '12:00 local',
        isLive: false,
        source: 'Fallback'
      };

      weatherCache.set(cacheKey, { data: fallbackResult, timestamp: Date.now() });
      return fallbackResult;
    })().finally(() => {
      inFlightRequests.delete(cacheKey);
    });

    inFlightRequests.set(cacheKey, fetchPromise);
    return fetchPromise;
  },

  /**
   * Helper to normalize OpenWeather API JSON into WeatherData
   */
  parseOpenWeatherData(data: any): WeatherData {
    const mainCondition = (data.weather?.[0]?.main || 'Clear') as string;
    
    let condition: WeatherData['condition'] = 'Clear';
    if (mainCondition === 'Rain' || mainCondition === 'Drizzle') condition = 'Rainy';
    else if (mainCondition === 'Clouds') condition = 'Cloudy';
    else if (mainCondition === 'Snow') condition = 'Snow';
    else if (mainCondition === 'Thunderstorm') condition = 'Thunderstorm';
    else if (mainCondition === 'Mist' || mainCondition === 'Fog' || mainCondition === 'Haze') condition = 'Misty';
    else if (mainCondition === 'Clear') condition = 'Clear';

    const localTimestamp = (Math.floor(Date.now() / 1000) + (data.timezone || 0)) * 1000;
    const localTime = new Date(localTimestamp).toUTCString().slice(17, 22);

    return {
      temperature: Math.round(data.main.temp),
      condition,
      conditionDescription: data.weather?.[0]?.description ? (data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1)) : 'Pleasant weather',
      feelsLike: Math.round(data.main.feels_like),
      humidity: Math.round(data.main.humidity),
      windSpeed: Math.round((data.wind?.speed || 0) * 3.6), // convert m/s to km/h
      tempMin: data.main.temp_min ? Math.round(data.main.temp_min) : undefined,
      tempMax: data.main.temp_max ? Math.round(data.main.temp_max) : undefined,
      localTime: `${localTime} local`,
      isLive: true,
      source: 'OpenWeather'
    };
  },

  /**
   * Clears the in-memory weather cache (useful for testing or manual refresh)
   */
  clearCache(): void {
    weatherCache.clear();
  }
};
