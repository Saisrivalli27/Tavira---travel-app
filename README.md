# TAVIRA — Travel, thoughtfully.

TAVIRA is a premium, editorial travel product built with React and Vite. It serves as a high-fidelity frontend assessment designed to showcase sophisticated UI/UX engineering, robust architectural patterns, and a highly polished, image-led design aesthetic.

## Product Overview

TAVIRA helps independent travellers discover destinations with an emphasis on slowing down and understanding a place. The application features:

- **Immersive Discovery:** A cinematic landing experience and a robust exploration interface with functional URL-synced filtering.
- **Destination Details:** Deep-dive pages featuring curated photography, essential information, and mocked dynamic components.
- **Tavira Assistant:** A destination-aware mock conversational agent providing contextual advice on packing, food, and transport.
- **Itinerary Generator:** A structured, multi-day itinerary planner tailored to the user's travel style.
- **Location Awareness:** A respectful browser location permission flow simulating nearby destination discovery.

## Technology Stack

- **Framework:** React 18
- **Build Tool:** Vite
- **Language:** TypeScript
- **Routing:** React Router v6
- **Styling:** Vanilla CSS (CSS Variables for the design system)
- **Icons:** Lucide React
- **Utilities:** `clsx` for dynamic class names

## Setup Instructions

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```

## Architecture

The application is structured to enforce clear boundaries between data, services, and the presentation layer:

- `/src/styles/` - Centralized design system tokens (`index.css`) and reusable component styles (`components.css`).
- `/src/components/ui/` - Foundational, reusable UI primitives (Buttons, Inputs).
- `/src/components/layout/` - Structural components like Header, Footer, and the App Layout shell.
- `/src/pages/` - Top-level route components that compose features and layouts.
- `/src/services/` - Abstraction layer for all data fetching and mock API logic.
- `/src/data/` - Static mock data, including a centralized, curated Unsplash image catalog to ensure zero duplication and consistent visual quality.

## Mock Services & Future API Integration

To fulfill the requirements of a frontend-only assessment, all external data is currently mocked behind robust service boundaries. When transitioning to real APIs, only the service files need to be updated; the UI components will remain unchanged.

- **`destinationService`**: Currently returns static data with simulated network delays. **Future:** Replace with a Headless CMS (e.g., Sanity, Contentful) or a custom backend REST/GraphQL API.
- **`weatherService`**: Currently generates deterministic mock weather based on coordinates. **Future:** Integrate with OpenWeather API or similar.
- **`assistantService`**: Currently returns rule-based mock responses. **Future:** Connect to an LLM provider (e.g., OpenAI, Gemini) passing the destination context in the system prompt.
- **`itineraryService`**: Currently generates a static structured timeline. **Future:** Use an LLM structured output endpoint to generate truly dynamic day-by-day plans.
- **`locationService`**: Simulates the browser's Geolocation API flow. **Future:** Hook directly into `navigator.geolocation` and a reverse-geocoding API (e.g., Mapbox, Google Maps).
- **`imageService`**: Resolves local image IDs to high-quality Unsplash URLs. **Future:** Serve optimized, responsive images via an image CDN (e.g., Cloudinary, Imgix).

## Screenshots

*(Placeholder for future screenshots)*

- **Home Page Hero**
- **Explore Grid & Filters**
- **Destination Detail - Weather & Assistant**
- **Structured Itinerary Result**
