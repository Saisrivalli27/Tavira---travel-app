# TAVIRA — Luxury Travel & Editorial Journey Atelier

[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.2-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Google Gemini](https://img.shields.io/badge/Google%20Gemini-AI%20Assistant-8E75B2?logo=google&logoColor=white)](https://aistudio.google.com/)
[![Open-Meteo](https://img.shields.io/badge/Open--Meteo-Live%20Weather-4A6B53)](https://open-meteo.com/)

> *"Go somewhere worth remembering."*

**TAVIRA** is a production-quality, luxury editorial travel discovery web application built with React, TypeScript, and Vite. Designed as an Awwwards-caliber digital travel publication (inspired by *Aman, Condé Nast Traveler, Kinfolk, and Prior World*), Tavira balances cinematic imagery, live real-world weather, geolocation awareness, an intelligent Google Gemini travel companion (**ARIA**), and an interactive day-by-day itinerary engine.

---

## Key Features

### 1. Cinematic Hero Viewport
- **Looping Remote Video Background:** Fullscreen ambient travel cinematography with smooth playback, muted audio, autoplay, and inline streaming.
- **Graceful Fallback:** High-resolution photography fallback if network is constrained or video autoplay is restricted.
- **Editorial Typography:** High-contrast serif headlines paired with understated micro-badges and an animated discover scroll indicator.

### 2. Destination Explorer & Dynamic Filtering
- **Working Search:** Real-time search across destinations, countries, and categories.
- **Interactive Filter Pills:** Filter instantly across regions (*Europe, Asia, Americas, Africa, Oceania*) and moods (*Culture, Nature, Beach, Adventure, Slow Mornings*).
- **Asymmetric Editorial Cards:** Dynamic image scaling, hover zoom micro-animations, region tags, and weather/season teasers.

### 3. Live Real-Time Weather Integration
- **Dual API Architecture:** Integrates with **OpenWeatherMap API** when `VITE_OPENWEATHER_API_KEY` is provided, and automatically falls back to **Open-Meteo's** free global live weather forecast API with zero configuration required.
- **Atmospheric Metrics:** Displays live temperature (°C), weather condition, feels-like, humidity percentage, wind speed (km/h), and local destination time.
- **Robust States:** Designed skeleton loaders, API failure handling, and retry buttons.

### 4. Location Awareness & Global City Search
- **Browser Geolocation:** Resolves user coordinates via `navigator.geolocation` and reverse-geocodes to the exact city and country via OpenStreetMap Nominatim.
- **Graceful Denied State:** If permission is denied, the application shows a polite fallback without breaking and invites manual search.
- **Global City Autocomplete:** Search any city worldwide using the Open-Meteo Geocoding API with real-time auto-suggestions.

### 5. Numbered Famous Places Storytelling
- **Not a Boring List:** Features numbered editorial compositions (`01`, `02`, `03`...) with alternating layout compositions.
- **Rich Place Details:** High-resolution dynamic photography, location tags, architectural/cultural quotes, estimated visit duration, optimal arrival times, and modal deep-dives.

### 6. ARIA — Intelligent AI Travel Companion
- **Powered by Google Gemini:** Integrates with the Google Gemini API (`gemini-1.5-flash`) via `VITE_GEMINI_API_KEY`.
- **Destination Context Awareness:** Automatically feeds active destination name, country, weather, and signature highlights into ARIA's prompt context.
- **Curated Travel Intelligence:** Built-in editorial knowledge engine that provides architectural and culinary insights even if an API key is not yet set.
- **Conversational UI:** Slide-over luxury companion drawer with typing indicator, markdown formatting, and suggested inquiry pills.

### 7. Interactive Day-by-Day Itinerary Planner
- **Customized Inputs:** Destination, Duration (1, 2, 3, 5, 7 days), Travel Pace (*Relaxed, Balanced, Fast-paced*), Core Interests, and Hospitality Tier.
- **Structured Plan Generation:** Generates real daily schedules with time stamps (Morning, Afternoon, Evening, Night), activity titles, location coordinates, durations, and local insider tips.
- **Interactive UI:** Day tabs switcher, vertical timeline, previous/next day navigation, and print/PDF export.

---

## Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Core Framework** | React 19 + TypeScript | Component architecture & strict type safety |
| **Build & Bundler** | Vite 8 | Instant HMR and sub-second production builds |
| **Routing** | React Router 7 | Client-side routing with URL filter synchronization |
| **Styling** | Vanilla CSS (CSS Variables) | Tailored luxury design tokens, zero generic UI libraries |
| **Icons** | Lucide React | Uniform, minimalist line iconography |
| **AI / LLM** | Google Gemini API (`gemini-1.5-flash`) | Context-aware travel companion & itinerary engine |
| **Weather APIs** | OpenWeatherMap + Open-Meteo | Live real-time temperature and weather metrics |
| **Geocoding** | OpenStreetMap Nominatim + Open-Meteo | GPS reverse-geocoding & city search autocomplete |
| **Imagery** | Unsplash API + Curated CDN | Dynamic high-resolution travel photography |

---

## External APIs & Zero-Configuration Fallbacks

To ensure an exceptional review experience, all external services feature zero-downtime live fallbacks:

1. **Google Gemini API (`VITE_GEMINI_API_KEY`)**:
   - Calls the live Gemini endpoint for ARIA conversations and day-by-day itinerary generation.
   - *Fallback:* Curated luxury travel intelligence engine calibrated to provide architectural and culinary recommendations without throwing unhandled API errors.

2. **OpenWeatherMap API (`VITE_OPENWEATHER_API_KEY`)**:
   - Fetches live weather for selected coordinates.
   - *Fallback:* Automatically calls Open-Meteo's free, keyless global weather API for live temperature and conditions.

3. **Unsplash API (`VITE_UNSPLASH_ACCESS_KEY`)**:
   - Fetches remote destination photography dynamically.
   - *Fallback:* Resolves high-resolution curated direct CDN photography streams.

---

## Environment Configuration

Create a `.env` file in the root directory (refer to `.env.example`):

```bash
# Google Gemini API Key (for ARIA Assistant & Itinerary Planner)
VITE_GEMINI_API_KEY=your_gemini_api_key_here

# OpenWeatherMap API Key (optional — Open-Meteo live fallback is active)
VITE_OPENWEATHER_API_KEY=your_openweather_api_key_here

# Unsplash API Access Key (optional — Curated high-res CDN fallback is active)
VITE_UNSPLASH_ACCESS_KEY=your_unsplash_access_key_here
```

> **Security Note:** `.env` is included in `.gitignore` to prevent credential exposure. Never commit live secret keys to version control.

---

## Local Setup & Development

### Prerequisites
- Node.js 18+ (tested on Node v22.14.0)
- npm 9+ (or pnpm / yarn)

### Quick Start
```bash
# 1. Clone the repository
git clone https://github.com/Saisrivalli27/Tavira---travel-app.git
cd Tavira---travel-app

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Build for production
npm run build

# 5. Preview production build
npm run preview
```

---

## Project Architecture

```
src/
├── components/
│   ├── ai/
│   │   └── AriaAssistantModal.tsx      # ARIA conversational companion drawer
│   ├── destination/
│   │   ├── DestinationAtAGlance.tsx
│   │   ├── DestinationHighlights.tsx
│   │   └── DestinationOverview.tsx
│   ├── explore/
│   │   ├── ExploreFilterBar.tsx        # Region, Country, Mood, Season filters
│   │   └── ExploreHero.tsx             # Large search input & category pills
│   ├── home/
│   │   └── HeroVideo.tsx               # Looping remote video cinematic hero
│   ├── itinerary/
│   │   └── ItineraryPlanner.tsx        # Day-by-day interactive travel planner
│   ├── layout/
│   │   ├── Footer.tsx                  # Editorial magazine footer
│   │   ├── Header.tsx                  # Adaptive transparent-to-solid nav
│   │   ├── Layout.tsx                  # Global app shell & context wrapper
│   │   ├── LocationSearchModal.tsx     # GPS & global city search modal
│   │   ├── MobileMenu.tsx              # Full-fidelity mobile drawer
│   │   └── SearchOverlay.tsx           # Global search command palette
│   ├── ui/
│   │   ├── Button.tsx                  # Tactile luxury button primitive
│   │   └── Input.tsx
│   └── weather/
│       └── WeatherWidget.tsx           # Live conditions, humidity & wind
├── context/
│   └── TravelContext.tsx               # Location, ARIA & destination state
├── data/
│   ├── mockDestinations.ts             # Curated global destination catalog
│   ├── mockImages.ts                   # Curated Unsplash photography index
│   └── mockJournal.ts                  # Editorial essays & travel dispatches
├── pages/
│   ├── DestinationDetail.tsx           # Immersive guide with weather & places
│   ├── Explore.tsx                     # Destination explorer with search/filter
│   ├── Home.tsx                        # Cinematic landing page
│   ├── Journal.tsx                     # Editorial articles
│   ├── JournalArticle.tsx              # Article reader
│   └── NotFound.tsx                    # 404 screen
├── services/
│   ├── assistantService.ts             # Gemini API integration & fallback
│   ├── destinationService.ts           # Filtering & query engine
│   ├── imageService.ts                 # Dynamic Unsplash remote image service
│   ├── itineraryService.ts             # Gemini structured JSON itinerary engine
│   ├── locationService.ts              # Browser geolocation & geocoding API
│   ├── searchService.ts                # Global fuzzy search
│   └── weatherService.ts               # OpenWeather & Open-Meteo live API
└── styles/
    ├── components.css                  # Reusable luxury UI components
    └── index.css                       # Centralized design tokens & typography
```

---

## Deployment Guide

### Deploy to Vercel
1. Push this repository to GitHub.
2. Import the project in the [Vercel Dashboard](https://vercel.com/new).
3. Under **Environment Variables**, add `VITE_GEMINI_API_KEY`, `VITE_OPENWEATHER_API_KEY`, and `VITE_UNSPLASH_ACCESS_KEY`.
4. Click **Deploy**.

### Deploy to Netlify
1. Connect your repository in [Netlify](https://app.netlify.com/).
2. Set Build command to `npm run build` and Publish directory to `dist`.
3. Add your environment variables in Site settings > Environment variables.
4. Deploy site.

---

## License

Crafted for the Tavira Travel Web Application. All rights reserved.
