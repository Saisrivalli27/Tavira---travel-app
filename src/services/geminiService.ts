import { type DestinationContext, type AssistantResponse, SYSTEM_INSTRUCTION } from './assistantService';
import type { ItineraryRequest, ItineraryResult, ItineraryDay, ItineraryItem } from './itineraryService';

// Active Gemini model priority list
const ACTIVE_MODELS = [
  'gemini-3.5-flash',
  'gemini-3.7-flash',
  'gemini-3.5-flash-lite',
  'gemini-flash-latest'
];

/**
 * Validates and sanitizes a raw JSON object returned by Gemini into a guaranteed valid ItineraryResult.
 */
function validateAndSanitizeItinerary(raw: any, request: ItineraryRequest): ItineraryResult | null {
  if (!raw || typeof raw !== 'object') return null;

  const rawDays = Array.isArray(raw.days) ? raw.days : [];
  if (rawDays.length === 0) return null;

  const validDays: ItineraryDay[] = rawDays.map((d: any, idx: number) => {
    const dayNumber = typeof d.day === 'number' ? d.day : idx + 1;
    const theme = typeof d.theme === 'string' && d.theme ? d.theme : `Day 0${dayNumber} Exploration`;
    const narrative = typeof d.narrative === 'string' && d.narrative ? d.narrative : `Discovering the texture and atmosphere of ${request.destinationName}.`;

    // Handle either "items" or "activities" from LLM output
    const rawItems = Array.isArray(d.items) ? d.items : Array.isArray(d.activities) ? d.activities : [];

    const items: ItineraryItem[] = rawItems.map((item: any, itemIdx: number) => {
      const time = typeof item.time === 'string' ? item.time : '10:00';
      const timeOfDay = ['Morning', 'Afternoon', 'Evening', 'Night'].includes(item.timeOfDay)
        ? item.timeOfDay
        : parseInt(time.split(':')[0], 10) < 12 ? 'Morning' : parseInt(time.split(':')[0], 10) < 17 ? 'Afternoon' : 'Evening';
      
      const activity = typeof item.activity === 'string' ? item.activity : typeof item.title === 'string' ? item.title : 'Curated Atelier Visit';
      const place = typeof item.place === 'string' ? item.place : request.destinationName;
      const category = ['Culture', 'Gastronomy', 'Architecture', 'Nature', 'Leisure', 'Wellness', 'Sunset'].includes(item.category)
        ? item.category
        : 'Culture';
      const description = typeof item.description === 'string' ? item.description : 'An unhurried encounter with local character and historic spaces.';
      const duration = typeof item.duration === 'string' ? item.duration : '2 hours';
      const insiderTip = typeof item.insiderTip === 'string' ? item.insiderTip : undefined;

      return {
        id: item.id || `day-${dayNumber}-item-${itemIdx + 1}`,
        time,
        timeOfDay,
        activity,
        place,
        category,
        description,
        duration,
        insiderTip
      };
    });

    return {
      day: dayNumber,
      theme,
      narrative,
      items: items.length > 0 ? items : [
        {
          id: `day-${dayNumber}-item-default`,
          time: '09:00',
          timeOfDay: 'Morning',
          activity: `Morning Sanctuary Walk in ${request.destinationName}`,
          place: request.destinationName,
          category: 'Architecture',
          description: 'Begin the day in unhurried contemplation as the early morning light strikes stone facades.',
          duration: '2 hours',
          insiderTip: 'Early hours offer the calmest acoustic experience.'
        }
      ]
    };
  });

  return {
    destination: request.destinationName,
    totalDays: request.days,
    travelStyle: request.travelStyle,
    themeOverview: typeof raw.themeOverview === 'string' ? raw.themeOverview : `A calibrated ${request.days}-day journey through ${request.destinationName}.`,
    days: validDays,
    source: 'gemini'
  };
}

export const geminiService = {
  /**
   * Generates conversational travel guidance via Google Gemini API.
   * Gracefully falls back if key is missing or request fails.
   */
  async generateTravelResponse(
    prompt: string,
    context?: DestinationContext,
    conversationHistory: Array<{ role: 'user' | 'assistant'; text: string }> = []
  ): Promise<AssistantResponse | null> {
    const trimmedPrompt = (prompt || '').trim();
    if (!trimmedPrompt) {
      return {
        text: "Please share a destination, seasonal inquiry, or itinerary requirement to begin.",
        source: 'curated-fallback'
      };
    }

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey || apiKey === 'your_gemini_api_key_here' || apiKey.trim() === '') {
      return null;
    }

    const destContextStr = context
      ? `Destination Context:
- Name: ${context.name}, ${context.country} (${context.region || ''})
- Tagline: "${context.tagline || ''}"
- Description: ${context.description || ''}
- Best Season / Light: ${context.bestSeason || ''}
- Highlights / Signature: ${(context.signatureExperiences || []).join(', ')}
- Notable Places: ${(context.places || []).map(p => p.name).join(', ')}
${context.currentWeather ? `- Current Live Weather: ${context.currentWeather.temperature}°C, ${context.currentWeather.condition}` : ''}`
      : `General luxury travel exploration context.`;

    const contents = [
      {
        role: 'user',
        parts: [{ text: `${SYSTEM_INSTRUCTION}\n\n${destContextStr}\n\nPlease keep your tone discerning, understated, and architectural.` }]
      },
      {
        role: 'model',
        parts: [{ text: `Understood. I am ARIA, ready to advise with quiet precision on ${context ? context.name : "the world's finest journeys"}.` }]
      }
    ];

    // Append recent dialogue turns
    conversationHistory.slice(-4).forEach(turn => {
      contents.push({
        role: turn.role === 'user' ? 'user' : 'model',
        parts: [{ text: turn.text }]
      });
    });

    // Append current user prompt
    contents.push({
      role: 'user',
      parts: [{ text: trimmedPrompt }]
    });

    for (const modelName of ACTIVE_MODELS) {
      try {
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey.trim()}`;
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents,
            generationConfig: {
              temperature: 0.65,
              topK: 40,
              topP: 0.9,
              maxOutputTokens: 2048,
              thinkingConfig: {
                thinkingBudget: 0
              }
            }
          })
        });

        if (response.ok) {
          const data = await response.json();
          const parts = data.candidates?.[0]?.content?.parts || [];
          const answer = parts.find((p: any) => p.text && !p.thought)?.text || parts[0]?.text;
          if (answer && answer.trim()) {
            return { text: answer.trim(), source: 'gemini' };
          }
        }
      } catch {
        // Continue to next candidate model
      }
    }

    return null;
  },

  /**
   * Generates a fully structured bespoke itinerary via Google Gemini API.
   * Returns a validated ItineraryResult, or null to trigger deterministic fallback.
   */
  async generateItinerary(request: ItineraryRequest): Promise<ItineraryResult | null> {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey || apiKey === 'your_gemini_api_key_here' || apiKey.trim() === '') {
      return null;
    }

    const prompt = `You are a discerning luxury travel planner for Travira.
Generate a bespoke travel itinerary for "${request.destinationName}" for ${request.days} days with travel style "${request.travelStyle}".

Return ONLY a valid JSON object matching this exact schema (NO markdown formatting, NO backticks):
{
  "themeOverview": "A 1-2 sentence evocative overview of the itinerary journey.",
  "days": [
    {
      "day": 1,
      "theme": "Evocative title for Day 1",
      "narrative": "One sentence setting the atmospheric tone for this day.",
      "items": [
        {
          "id": "d1-item1",
          "time": "08:30",
          "timeOfDay": "Morning",
          "activity": "Name of the curated activity",
          "place": "Exact venue, neighborhood, or landmark",
          "category": "Culture",
          "description": "2-3 sentences of rich editorial storytelling explaining why this moment is exceptional.",
          "duration": "2 hours",
          "insiderTip": "A discreet, practical tip from a local expert."
        }
      ]
    }
  ]
}

Include exactly ${request.days} days. Each day must contain 3 thoughtfully timed items (Morning, Afternoon, Evening).`;

    for (const modelName of ACTIVE_MODELS) {
      try {
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey.trim()}`;
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.6,
              maxOutputTokens: 8192,
              thinkingConfig: {
                thinkingBudget: 0
              }
            }
          })
        });

        if (response.ok) {
          const data = await response.json();
          const parts = data.candidates?.[0]?.content?.parts || [];
          const rawText = parts.find((p: any) => p.text && !p.thought)?.text || parts[0]?.text;
          if (rawText) {
            const cleaned = rawText
              .replace(/^```json\s*/im, '')
              .replace(/^```\s*/im, '')
              .replace(/```$/m, '')
              .trim();

            const parsed = JSON.parse(cleaned);
            const validated = validateAndSanitizeItinerary(parsed, request);
            if (validated) {
              return validated;
            }
          }
        }
      } catch {
        // Fall through to next candidate model
      }
    }

    return null;
  }
};
