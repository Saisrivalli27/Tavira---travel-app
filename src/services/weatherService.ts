export interface WeatherData {
  temperature: number;
  condition: 'Sunny' | 'Cloudy' | 'Rainy' | 'Clear' | 'Snow' | 'Partly Cloudy';
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  localTime: string;
}

export const weatherService = {
  async getWeatherByCoordinates(lat: number, lng: number): Promise<WeatherData> {
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Generate deterministic mock weather based on lat/lng so it stays consistent per destination
    const tempBase = Math.abs(lat) < 30 ? 28 : Math.abs(lat) > 50 ? 8 : 18;
    const modifier = Math.floor((Math.abs(lng) % 10)); // Just to add some pseudo-randomness
    
    const conditions = ['Sunny', 'Cloudy', 'Rainy', 'Clear', 'Partly Cloudy'];
    const condition = conditions[modifier % conditions.length] as WeatherData['condition'];

    const temperature = tempBase + (modifier % 5);
    
    return {
      temperature,
      condition: tempBase < 10 && condition === 'Rainy' ? 'Snow' : condition,
      feelsLike: temperature + (modifier % 3) - 1,
      humidity: 40 + (modifier * 5),
      windSpeed: 5 + modifier,
      localTime: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
    };
  }
};
