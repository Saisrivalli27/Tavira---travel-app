import React, { useEffect, useState } from 'react';
import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning, CloudFog, Wind, Droplets, Thermometer, RefreshCw, AlertCircle } from 'lucide-react';
import { weatherService, type WeatherData } from '../../services/weatherService';

interface WeatherWidgetProps {
  lat?: number;
  lng?: number;
  locationName: string;
  country?: string;
  className?: string;
  compact?: boolean;
}

export const WeatherWidget: React.FC<WeatherWidgetProps> = ({
  lat,
  lng,
  locationName,
  country,
  className = '',
  compact = false
}) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    try {
      let data: WeatherData;
      if (typeof lat === 'number' && typeof lng === 'number' && !isNaN(lat) && !isNaN(lng)) {
        data = await weatherService.getWeatherByCoordinates(lat, lng);
      } else {
        data = await weatherService.getCurrentWeather(locationName);
      }
      setWeather(data);
    } catch (err: any) {
      setError(err?.message || 'Weather information is temporarily unavailable.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isCancelled = false;
    setLoading(true);
    setError(null);

    const loadWeather = async () => {
      try {
        let data: WeatherData;
        if (typeof lat === 'number' && typeof lng === 'number' && !isNaN(lat) && !isNaN(lng)) {
          data = await weatherService.getWeatherByCoordinates(lat, lng);
        } else {
          data = await weatherService.getCurrentWeather(locationName);
        }
        if (!isCancelled) {
          setWeather(data);
          setError(null);
        }
      } catch (err: any) {
        if (!isCancelled) {
          setError(err?.message || 'Weather information is temporarily unavailable.');
          setWeather(null);
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    loadWeather();

    return () => {
      isCancelled = true;
    };
  }, [lat, lng, locationName]);

  const getWeatherIcon = (condition: WeatherData['condition']) => {
    const size = compact ? 22 : 36;
    const strokeWidth = 1.25;

    switch (condition) {
      case 'Sunny':
      case 'Clear':
        return <Sun size={size} strokeWidth={strokeWidth} className="weather-icon-sun" />;
      case 'Partly Cloudy':
      case 'Cloudy':
        return <Cloud size={size} strokeWidth={strokeWidth} className="weather-icon-cloud" />;
      case 'Rainy':
        return <CloudRain size={size} strokeWidth={strokeWidth} className="weather-icon-rain" />;
      case 'Thunderstorm':
        return <CloudLightning size={size} strokeWidth={strokeWidth} className="weather-icon-lightning" />;
      case 'Snow':
        return <CloudSnow size={size} strokeWidth={strokeWidth} className="weather-icon-snow" />;
      case 'Misty':
        return <CloudFog size={size} strokeWidth={strokeWidth} className="weather-icon-fog" />;
      default:
        return <Sun size={size} strokeWidth={strokeWidth} className="weather-icon-sun" />;
    }
  };

  // Loading Skeleton State
  if (loading) {
    return (
      <div className={`weather-card weather-card-loading ${className}`} aria-busy="true" aria-live="polite">
        <div className="weather-skeleton-header">
          <div className="skeleton-box skeleton-title" />
          <div className="skeleton-box skeleton-badge" />
        </div>
        <div className="weather-skeleton-body">
          <div className="skeleton-box skeleton-temp" />
          <div className="skeleton-box skeleton-desc" />
        </div>
        <div className="weather-skeleton-footer">
          <div className="skeleton-box skeleton-metric" />
          <div className="skeleton-box skeleton-metric" />
        </div>
        <style>{`
          .weather-card-loading {
            min-height: ${compact ? '120px' : '180px'};
            padding: 24px;
            background-color: var(--color-bg-secondary);
            border: 1px solid var(--color-border);
            border-radius: 2px;
          }
          .weather-skeleton-header, .weather-skeleton-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .skeleton-box {
            background: linear-gradient(90deg, rgba(23, 23, 22, 0.05) 25%, rgba(23, 23, 22, 0.12) 50%, rgba(23, 23, 22, 0.05) 75%);
            background-size: 200% 100%;
            animation: skeleton-shimmer 1.5s infinite;
            border-radius: 2px;
          }
          .skeleton-title { width: 110px; height: 14px; }
          .skeleton-badge { width: 60px; height: 14px; }
          .skeleton-temp { width: 90px; height: 48px; margin: 16px 0 8px; }
          .skeleton-desc { width: 140px; height: 16px; margin-bottom: 16px; }
          .skeleton-metric { width: 80px; height: 14px; }
          @keyframes skeleton-shimmer {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
        `}</style>
      </div>
    );
  }

  // Error State with Retry
  if (error || !weather) {
    return (
      <div className={`weather-card weather-card-error ${className}`} role="alert">
        <div className="flex items-center gap-3 mb-3">
          <AlertCircle size={20} className="text-secondary" />
          <span className="text-xs uppercase font-semibold text-secondary" style={{ letterSpacing: '0.1em' }}>
            Live Weather
          </span>
        </div>
        <p className="text-sm text-secondary mb-4">
          {error || 'Weather data unavailable for this location.'}
        </p>
        <button 
          onClick={fetchWeather}
          className="btn-retry"
          aria-label="Retry loading weather"
        >
          <RefreshCw size={14} /> Retry
        </button>
        <style>{`
          .weather-card-error {
            padding: 24px;
            background-color: var(--color-bg-secondary);
            border: 1px solid var(--color-border);
            border-radius: 2px;
          }
          .btn-retry {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            font-weight: 600;
            padding: 6px 14px;
            border: 1px solid var(--color-border);
            border-radius: 2px;
            background: transparent;
            cursor: pointer;
            transition: all 0.2s;
          }
          .btn-retry:hover {
            background: var(--color-bg-primary);
          }
        `}</style>
      </div>
    );
  }

  // Compact Mode (for cards or badges)
  if (compact) {
    return (
      <div className={`weather-compact ${className}`}>
        <div className="weather-compact-left">
          {getWeatherIcon(weather.condition)}
          <span className="weather-compact-temp">{weather.temperature}°C</span>
        </div>
        <div className="weather-compact-right">
          <span className="weather-compact-desc">{weather.condition}</span>
          <span className="weather-compact-local">{weather.localTime}</span>
        </div>
        <style>{`
          .weather-compact {
            display: inline-flex;
            align-items: center;
            gap: 12px;
            padding: 6px 14px;
            background-color: rgba(245, 242, 236, 0.9);
            backdrop-filter: blur(8px);
            border: 1px solid var(--color-border);
            border-radius: 2px;
            font-family: var(--font-sans);
          }
          .weather-compact-left {
            display: flex;
            align-items: center;
            gap: 6px;
          }
          .weather-compact-temp {
            font-family: var(--font-serif);
            font-size: 1.15rem;
            font-weight: 500;
            color: var(--color-text-primary);
          }
          .weather-compact-right {
            display: flex;
            flex-direction: column;
            line-height: 1.2;
          }
          .weather-compact-desc {
            font-size: 11px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: var(--color-text-primary);
          }
          .weather-compact-local {
            font-size: 10px;
            color: var(--color-text-secondary);
          }
        `}</style>
      </div>
    );
  }

  // Full Editorial Weather Display
  return (
    <div className={`weather-editorial-card ${className}`}>
      {/* Header Eyebrow */}
      <div className="weather-header">
        <span className="weather-eyebrow">CURRENT CONDITIONS</span>
        <div className="weather-live-indicator">
          <span className="live-dot" />
          <span className="live-label">{weather.source} Live</span>
        </div>
      </div>

      {/* Main Temperature & Condition */}
      <div className="weather-main">
        <div className="weather-temp-wrap">
          <span className="weather-temp-num">{weather.temperature}°</span>
          <div className="weather-icon-large">
            {getWeatherIcon(weather.condition)}
          </div>
        </div>

        <div className="weather-condition-wrap">
          <h4 className="weather-condition-text">{weather.conditionDescription}</h4>
          <p className="weather-feels">
            Feels like {weather.feelsLike}° · {locationName}{country ? `, ${country}` : ''}
          </p>
        </div>
      </div>

      {/* Atmospheric Metrics Bar */}
      <div className="weather-metrics-grid">
        <div className="weather-metric-item">
          <span className="metric-label">
            <Droplets size={13} className="metric-icon" /> Humidity
          </span>
          <span className="metric-value">{weather.humidity}%</span>
        </div>

        <div className="weather-metric-item">
          <span className="metric-label">
            <Wind size={13} className="metric-icon" /> Wind
          </span>
          <span className="metric-value">{weather.windSpeed} km/h</span>
        </div>

        <div className="weather-metric-item">
          <span className="metric-label">
            <Thermometer size={13} className="metric-icon" /> Local Time
          </span>
          <span className="metric-value">{weather.localTime}</span>
        </div>
      </div>

      <style>{`
        .weather-editorial-card {
          background-color: var(--color-bg-secondary);
          border: 1px solid var(--color-border);
          border-radius: 2px;
          padding: 32px 28px;
          font-family: var(--font-sans);
          transition: border-color 0.3s ease;
        }

        .weather-editorial-card:hover {
          border-color: rgba(23, 23, 22, 0.25);
        }

        .weather-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--color-border);
        }

        .weather-eyebrow {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          font-weight: 600;
          color: var(--color-text-secondary);
        }

        .weather-live-indicator {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #4A6B53;
          font-weight: 600;
        }

        .live-dot {
          width: 6px;
          height: 6px;
          background-color: #4A6B53;
          border-radius: 50%;
          animation: live-pulse 2s infinite;
        }

        @keyframes live-pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.4); opacity: 0.5; }
          100% { transform: scale(1); opacity: 1; }
        }

        .weather-main {
          margin-bottom: 24px;
        }

        .weather-temp-wrap {
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }

        .weather-temp-num {
          font-family: var(--font-serif);
          font-size: clamp(3.25rem, 5vw, 4.5rem);
          line-height: 1;
          font-weight: 400;
          color: var(--color-text-primary);
          letter-spacing: -0.02em;
        }

        .weather-icon-large {
          padding-top: 4px;
          color: var(--color-accent-primary);
        }

        .weather-condition-wrap {
          margin-top: 8px;
        }

        .weather-condition-text {
          font-family: var(--font-serif);
          font-size: 1.5rem;
          font-weight: 400;
          color: var(--color-text-primary);
          text-transform: capitalize;
          margin-bottom: 4px;
        }

        .weather-feels {
          font-size: 13px;
          color: var(--color-text-secondary);
          line-height: 1.4;
        }

        .weather-metrics-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          padding-top: 20px;
          border-top: 1px solid var(--color-border);
        }

        .weather-metric-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .metric-label {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--color-text-secondary);
        }

        .metric-icon {
          color: var(--color-accent-primary);
        }

        .metric-value {
          font-size: 15px;
          font-weight: 600;
          color: var(--color-text-primary);
        }

        @media (max-width: 480px) {
          .weather-metrics-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>
    </div>
  );
};
