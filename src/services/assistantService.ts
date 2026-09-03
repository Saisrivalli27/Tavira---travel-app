export interface DestinationContext {
  name: string;
  country: string;
  region?: string;
  tagline?: string;
  description?: string;
  bestSeason?: string;
  signatureExperiences?: string[];
  places?: Array<{ name: string; description: string }>;
  currentWeather?: {
    temperature: number;
    condition: string;
  };
}

export interface AssistantResponse {
  text: string;
  source: 'gemini' | 'curated-fallback';
}

export const SYSTEM_INSTRUCTION = `You are ARIA, the intelligent travel companion and senior editorial curator for TAVIRA, an ultra-luxury, design-led travel publication and bespoke journey atelier.

Tone & Persona:
- Cultivated, poetic yet practical, discerning, and understated.
- Avoid enthusiastic marketing clichés ("breathtaking", "unforgettable", "must-see", "bucket-list", "bustling").
- Speak like an architectural historian, seasoned travel essayist, and thoughtful local insider.
- Keep answers structured with elegant brevity: 2 to 4 concise, evocative paragraphs or bullet points.
- Highlight light, atmosphere, rituals, architectural details, seasonality, and quiet corners away from crowd corridors.
- Always tailor your advice specifically to the destination context provided.`;

import { geminiService } from './geminiService';

export const assistantService = {
  async askQuestion(
    question: string,
    context?: DestinationContext,
    conversationHistory: Array<{ role: 'user' | 'assistant'; text: string }> = []
  ): Promise<AssistantResponse> {
    // 1. Try Gemini API via centralized service abstraction
    const geminiResult = await geminiService.generateTravelResponse(question, context, conversationHistory);
    if (geminiResult) {
      return geminiResult;
    }

    // 2. Intelligent, nuanced curated travel editorial fallback engine
    await new Promise((r) => setTimeout(r, 700 + Math.random() * 500));
    const destName = context?.name || 'this destination';
    const lowerQ = question.toLowerCase();

    let text = '';
    if (lowerQ.includes('food') || lowerQ.includes('eat') || lowerQ.includes('restaurant') || lowerQ.includes('dinner') || lowerQ.includes('culinary')) {
      text = `In **${destName}**, the culinary soul lives far from the gilded dining rooms of the main squares.

Seek out intimate, multi-generational counters where the menu is governed strictly by the day's market. Look for seasonal ingredients prepared with minimal intervention—here, subtlety is favored over spectacle. 

*ARIA's Note:* Reserve dinner reservations after twilight when the pace softens. Ask for seats near the open courtyard or kitchen counter for a genuine sensory dialogue with the chefs.`;
    } else if (lowerQ.includes('day') || lowerQ.includes('long') || lowerQ.includes('how many') || lowerQ.includes('time to spend')) {
      text = `To experience **${destName}** without haste, plan for **3 to 4 days**. 

The first day should be reserved entirely for unscripted wandering—allowing the topography and acoustics of the streets to settle into your memory. Dedicate day two to early-morning architectural sites before the light turns harsh, and day three to contemplative artisan workshops or surrounding natural landscapes.

*ARIA's Note:* Resist the temptation to compress this place into a hurried weekend; it reveals its character exclusively in unhurried moments.`;
    } else if (lowerQ.includes('avoid') || lowerQ.includes('mistake') || lowerQ.includes('don\'t') || lowerQ.includes('trap')) {
      text = `When navigating **${destName}**, the most common mistake is rigid timekeeping.

1. **Midday Clutter:** Avoid the marquee landmarks between 11:00 and 15:30. The ambient heat and tour groups obscure the architectural serenity.
2. **Tourist Mainstreets:** Never take meals on the primary pedestrian arterials. Turn two alleyways inward to find spaces curated for residents.
3. **Over-Packing the Day:** Limit yourself to two anchor experiences daily. Allow the spaces between to breathe.`;
    } else if (lowerQ.includes('see') || lowerQ.includes('visit') || lowerQ.includes('must') || lowerQ.includes('highlight')) {
      const placesList = context?.places?.map(p => `* **${p.name}:** ${p.description}`).slice(0, 3).join('\n') || `* **Historic Center:** Wander at dawn as the stone facades absorb the morning glow.\n* **Artisan Quarter:** Discover independent ateliers preserving ancient craft.`;

      text = `For an authentic sense of **${destName}**, focus on places that express the dialogue between landscape and heritage:

${placesList}

*ARIA's Note:* Seek out elevated vantage points at dusk when the town lights illuminate the horizon with quiet majesty.`;
    } else if (lowerQ.includes('family') || lowerQ.includes('children') || lowerQ.includes('kids')) {
      text = `**${destName}** accommodates families with warmth, though the key is calibrating pace. 

Select accommodations with calm garden courtyards rather than dense business hotels. Choose morning outdoor walks through open gardens and lakeside or seaside promenades, followed by tactile artisan demonstrations—pottery, paper-making, or bread crafting—which engage curious younger minds far better than silent gallery halls.`;
    } else {
      text = `Travel in **${destName}** is fundamentally about attunement to rhythm.

${context?.description || 'This destination rewards travelers who leave room for chance encounters.'}

The morning light between 06:30 and 08:30 offers the most luminous atmosphere for walking and observation. Walk slowly, observe the transitions in architecture, and converse with local craftspeople. If you have a specific focus—such as architecture, culinary history, or quiet retreats—tell me, and I will shape a personalized perspective for you.`;
    }

    return { text, source: 'curated-fallback' };
  }
};
