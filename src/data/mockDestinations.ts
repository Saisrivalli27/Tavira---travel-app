import { MOCK_IMAGES } from './mockImages';

export interface Place {
  id: string;
  name: string;
  description: string;
  imageId: string;
  duration: string;
  bestTime: string;
}

export interface Highlight {
  title: string;
  description: string;
}

export interface DestinationDetails {
  idealStay: string;
  bestTimeDescription: string;
  localNote: string;
  signatureExperiences: string[];
  locationLabel: string;
}

export interface Destination {
  id: string;
  slug: string;
  name: string;
  country: string;
  region: string;
  tagline: string;
  description: string;
  heroImageId: string;
  moods: string[];
  bestSeason: string;
  coordinates: { lat: number; lng: number };
  highlights: string[]; // Deprecated, transitioning to detailedHighlights
  detailedHighlights?: Highlight[];
  details?: DestinationDetails;
  places: Place[];
}

export const MOCK_DESTINATIONS: Destination[] = [
  // === FRANCE ===
  {
    id: 'dest-paris',
    slug: 'paris',
    name: 'Paris',
    country: 'France',
    region: 'Europe',
    tagline: 'Timeless streets, quiet cafés and art at every corner.',
    description: 'The city of timeless moments. From dawn light filtering across Haussmannian balconies to evening walks along the Seine, Paris is an unhurried masterclass in beauty, culinary tradition, and poetic discovery.',
    heroImageId: 'paris-hero',
    moods: ['Cultural depth', 'City energy', 'Slow mornings'],
    bestSeason: 'Spring & Autumn',
    coordinates: { lat: 48.8566, lng: 2.3522 },
    highlights: ['Haussmannian architecture', 'Artisan café culture', 'The Seine at dusk'],
    detailedHighlights: [
      { title: 'The morning light', description: 'Sunlight catches the zinc rooftops and stone bridges in luminous amber.' },
      { title: 'Café rituals', description: 'Watch the neighborhood wake from small sidewalk bistros in Saint-Germain.' }
    ],
    details: {
      idealStay: '4 to 5 days',
      bestTimeDescription: 'April to June and September to October provide mild temperatures and gentle light.',
      localNote: 'Walk the colonnades of Palais-Royal at dawn and seek out courtyard bistros tucked behind the boulevards.',
      signatureExperiences: [
        'Dawn stroll along the Seine quays',
        'Quiet morning at the Musée d’Orsay',
        'Artisan espresso in Saint-Germain-des-Prés',
        'Twilight view from the Pont des Arts'
      ],
      locationLabel: 'Île-de-France, France'
    },
    places: [
      {
        id: 'place-eiffel',
        name: 'Eiffel Tower',
        description: 'Iconic architectural ironwork soaring above the Champ de Mars, best admired as evening illuminates its lacework.',
        imageId: 'paris-eiffel',
        duration: '2 hours',
        bestTime: 'Golden hour or twilight'
      },
      {
        id: 'place-louvre',
        name: 'Louvre Museum',
        description: 'Centuries of world art, history, and royal architecture gathered beneath historic gilded ceilings and modern glass.',
        imageId: 'paris-louvre',
        duration: '3 hours',
        bestTime: 'Late afternoon on weekdays'
      },
      {
        id: 'place-montmartre',
        name: 'Montmartre',
        description: 'Bohemian hillside cobblestones, historic artist studios, and intimate terrace cafés looking out over all of Paris.',
        imageId: 'paris-montmartre',
        duration: '2.5 hours',
        bestTime: 'Morning before crowds gather'
      },
      {
        id: 'place-seine',
        name: 'The Seine Quays',
        description: 'Riverside cobblestones lined with historic bouquinistes bookstalls and tranquil reflection of ancient limestone bridges.',
        imageId: 'paris-seine',
        duration: '1.5 hours',
        bestTime: 'Sunset'
      }
    ]
  },

  // === INDIA (8) ===
  {
    id: 'dest-udaipur',
    slug: 'udaipur',
    name: 'Udaipur',
    country: 'India',
    region: 'Asia',
    tagline: 'A romantic mirage of white marble and mirror-still lakes.',
    description: 'Often called the Venice of the East, Udaipur is a city of royal grandeur. Elaborate palaces float on water, and narrow streets hide miniature painting workshops and rooftop cafes offering serene views of the Aravalli hills.',
    heroImageId: MOCK_IMAGES['udaipur-hero'].id,
    moods: ['Cultural depth', 'Slow mornings'],
    bestSeason: 'Winter',
    coordinates: { lat: 24.5854, lng: 73.7125 },
    highlights: ['Rajput architecture', 'Lake Pichola', 'Miniature art'],
    detailedHighlights: [
      { title: 'Lake light', description: 'Palaces and terraces take on a soft gold tone before sunset.' },
      { title: 'Royal craft', description: 'Discover miniature art, hand-block prints, and quiet workshops.' },
      { title: 'A slower city', description: 'Udaipur rewards unplanned walks, lakeside breakfasts, and long evenings.' }
    ],
    details: {
      idealStay: '2–3 days',
      bestTimeDescription: 'Cooler days, clear lake light.',
      localNote: 'Evenings begin slowly—save rooftop dinners for after sunset.',
      signatureExperiences: [
        'Sunset boat ride on Lake Pichola',
        'City Palace at golden hour',
        'Miniature-painting workshop'
      ],
      locationLabel: 'Rajasthan, India'
    },
    places: [
      {
        id: 'place-udaipur-1',
        name: 'Lake Pichola',
        description: 'An artificial fresh water lake created in 1362. A sunset boat ride reveals the sheer scale of the City Palace and the floating Taj Lake Palace.',
        imageId: MOCK_IMAGES['udaipur-place-1'].id,
        duration: '1.5 hours',
        bestTime: 'Sunset',
      },
      {
        id: 'place-udaipur-2',
        name: 'Jag Mandir',
        description: 'Also known as the Lake Garden Palace, built on an island in Lake Pichola. Its stunning marble elephant statues guard the entrance.',
        imageId: MOCK_IMAGES['udaipur-place-2'].id,
        duration: '2 hours',
        bestTime: 'Late afternoon',
      }
    ]
  },
  {
    id: 'dest-jaipur',
    slug: 'jaipur',
    name: 'Jaipur',
    country: 'India',
    region: 'Asia',
    tagline: 'The vibrant heart of Rajasthan, painted in terracotta pink.',
    description: 'A bustling capital that has preserved its regal past. Jaipur is a sensory overload of colorful textiles, intricate Rajput and Mughal architecture, and sprawling hilltop fortresses that tell tales of ancient valor.',
    heroImageId: MOCK_IMAGES['jaipur-hero'].id,
    moods: ['Cultural depth', 'Craft and culture'],
    bestSeason: 'Winter',
    coordinates: { lat: 26.9124, lng: 75.7873 },
    highlights: ['Hawa Mahal', 'Block printing', 'Gemstone markets'],
    places: [
      {
        id: 'place-jaipur-1',
        name: 'Amber Fort',
        description: 'A magnificent fortress built from pale yellow and pink sandstone, sprawling across a high ridge of the Aravalli hills.',
        imageId: MOCK_IMAGES['jaipur-place-1'].id,
        duration: '3 hours',
        bestTime: 'Early morning',
      },
      {
        id: 'place-jaipur-2',
        name: 'City Palace',
        description: 'A vast complex of courtyards, gardens, and buildings right in the center of the old city, showcasing a flawless blend of architectural styles.',
        imageId: MOCK_IMAGES['jaipur-place-2'].id,
        duration: '2 hours',
        bestTime: 'Mid-morning',
      }
    ]
  },
  {
    id: 'dest-varanasi',
    slug: 'varanasi',
    name: 'Varanasi',
    country: 'India',
    region: 'Asia',
    tagline: 'The spiritual epicenter where life and death meet the Ganges.',
    description: 'One of the oldest continuously inhabited cities in the world. Varanasi is intense, sacred, and profound. The rhythm of the city revolves around the ghats leading down to the holy river.',
    heroImageId: MOCK_IMAGES['varanasi-hero'].id,
    moods: ['Sacred journeys', 'Cultural depth'],
    bestSeason: 'Winter',
    coordinates: { lat: 25.3176, lng: 82.9739 },
    highlights: ['Ganges ghats', 'Spiritual rituals', 'Silk weaving'],
    places: [
      {
        id: 'place-varanasi-1',
        name: 'Dashashwamedh Ghat',
        description: 'The main and most spectacular ghat on the Ganges, famous for the daily evening Aarti ceremony performed by priests facing the river.',
        imageId: MOCK_IMAGES['varanasi-place-1'].id,
        duration: '2 hours',
        bestTime: 'Evening for Aarti',
      },
      {
        id: 'place-varanasi-2',
        name: 'The Old Alleys',
        description: 'A labyrinth of narrow, ancient streets filled with ashrams, tiny shops selling silk, and wandering sadhus. Getting lost is part of the experience.',
        imageId: MOCK_IMAGES['varanasi-place-2'].id,
        duration: 'Half day',
        bestTime: 'Early morning',
      }
    ]
  },
  {
    id: 'dest-kochi',
    slug: 'kochi',
    name: 'Kochi',
    country: 'India',
    region: 'Asia',
    tagline: 'A laid-back tropical port woven with global histories.',
    description: 'Kochi (Cochin) is a fascinating blend of giant Chinese fishing nets, a 400-year-old synagogue, ancient mosques, and Portuguese houses, all grounded in the lush landscape of Kerala.',
    heroImageId: MOCK_IMAGES['kochi-hero'].id,
    moods: ['Coastal light', 'Slow mornings'],
    bestSeason: 'Winter',
    coordinates: { lat: 9.9312, lng: 76.2673 },
    highlights: ['Colonial heritage', 'Kathakali dance', 'Spice markets'],
    places: [
      {
        id: 'place-kochi-1',
        name: 'Kathakali Center',
        description: 'Experience the classical Indian dance-drama of Kerala, notable for the elaborate, colorful makeup and costumes of the performers.',
        imageId: MOCK_IMAGES['kochi-place-1'].id,
        duration: '3 hours',
        bestTime: 'Evening performance',
      },
      {
        id: 'place-kochi-2',
        name: 'Fort Kochi',
        description: 'Stroll through streets lined with heritage homes and art cafes, where the scent of cloves and pepper still hangs in the air.',
        imageId: MOCK_IMAGES['kochi-place-2'].id,
        duration: 'Half day',
        bestTime: 'Late afternoon',
      }
    ]
  },
  {
    id: 'dest-munnar',
    slug: 'munnar',
    name: 'Munnar',
    country: 'India',
    region: 'Asia',
    tagline: 'Endless emerald tea estates draped in mountain mist.',
    description: 'A former resort for the British Raj elite, Munnar is defined by its rolling hills carpeted in incredibly pristine, geometric tea plantations and dramatic mountain scenery.',
    heroImageId: MOCK_IMAGES['munnar-hero'].id,
    moods: ['Mountain air', 'Slow mornings'],
    bestSeason: 'Autumn',
    coordinates: { lat: 10.0889, lng: 77.0595 },
    highlights: ['Tea tasting', 'Cool climate', 'Western Ghats biodiversity'],
    places: [
      {
        id: 'place-munnar-1',
        name: 'Eravikulam National Park',
        description: 'A high-altitude sanctuary famous for the endangered Nilgiri Tahr and stunning sweeping views of the tea-covered valleys below.',
        imageId: MOCK_IMAGES['munnar-place-1'].id,
        duration: '3 hours',
        bestTime: 'Early morning',
      },
      {
        id: 'place-munnar-2',
        name: 'Kolukkumalai Tea Estate',
        description: 'Believed to be the highest tea estate in the world, accessible only by jeep. The rugged journey rewards with unparalleled panoramic views.',
        imageId: MOCK_IMAGES['munnar-place-2'].id,
        duration: 'Half day',
        bestTime: 'Sunrise',
      }
    ]
  },
  {
    id: 'dest-ladakh',
    slug: 'ladakh',
    name: 'Ladakh',
    country: 'India',
    region: 'Asia',
    tagline: 'A high-altitude desert kingdom of stark beauty and quiet faith.',
    description: 'Known as "Little Tibet," Ladakh is a land of jagged, arid mountains, whitewashed stupas, and ancient Buddhist monasteries perched precariously on rocky outcrops.',
    heroImageId: MOCK_IMAGES['ladakh-hero'].id,
    moods: ['Mountain air', 'Sacred journeys'],
    bestSeason: 'Summer',
    coordinates: { lat: 34.1526, lng: 77.5771 },
    highlights: ['Tibetan Buddhism', 'Stark landscapes', 'High passes'],
    places: [
      {
        id: 'place-ladakh-1',
        name: 'Pangong Tso',
        description: 'A breathtaking endorheic lake situated at 4,225 meters. Its waters famously change color from deep blue to light blue and green.',
        imageId: MOCK_IMAGES['ladakh-place-1'].id,
        duration: 'Full day trip',
        bestTime: 'Midday for best color',
      },
      {
        id: 'place-ladakh-2',
        name: 'Thiksey Monastery',
        description: 'A magnificent gompa resembling the Potala Palace in Lhasa, housing a 15-meter high statue of Maitreya Buddha.',
        imageId: MOCK_IMAGES['ladakh-place-2'].id,
        duration: '2 hours',
        bestTime: 'Early morning for prayers',
      }
    ]
  },
  {
    id: 'dest-hampi',
    slug: 'hampi',
    name: 'Hampi',
    country: 'India',
    region: 'Asia',
    tagline: 'A surreal landscape of monolithic boulders and forgotten empires.',
    description: 'The spectacular ruined capital of the Vijayanagara Empire. Hampi feels like stepping onto another planet, where impossibly balanced rocks surround incredibly detailed stone temples.',
    heroImageId: MOCK_IMAGES['hampi-hero'].id,
    moods: ['Sacred journeys', 'Cultural depth'],
    bestSeason: 'Winter',
    coordinates: { lat: 15.3350, lng: 76.4600 },
    highlights: ['UNESCO ruins', 'Bouldering', 'Mythological history'],
    places: [
      {
        id: 'place-hampi-1',
        name: 'Virupaksha Temple',
        description: 'The oldest active temple in Hampi, dedicated to Lord Shiva. Its towering gopuram dominates the skyline of the surrounding village.',
        imageId: MOCK_IMAGES['hampi-place-1'].id,
        duration: '2 hours',
        bestTime: 'Early morning',
      },
      {
        id: 'place-hampi-2',
        name: 'Vittala Temple Complex',
        description: 'The architectural pinnacle of Hampi, famous for its musical pillars and the iconic, intricately carved Stone Chariot.',
        imageId: MOCK_IMAGES['hampi-place-2'].id,
        duration: '3 hours',
        bestTime: 'Late afternoon for golden hour',
      }
    ]
  },
  {
    id: 'dest-pondicherry',
    slug: 'pondicherry',
    name: 'Pondicherry',
    country: 'India',
    region: 'Asia',
    tagline: 'A quiet slice of French Riviera charm on the Coromandel Coast.',
    description: 'Pondicherry (Puducherry) uniquely merges Tamil culture with French colonial heritage. The result is a slow-paced town of mustard-yellow villas, chic boutiques, and leafy boulevards.',
    heroImageId: MOCK_IMAGES['pondicherry-hero'].id,
    moods: ['Coastal light', 'Slow mornings'],
    bestSeason: 'Winter',
    coordinates: { lat: 11.9416, lng: 79.8083 },
    highlights: ['French Quarter', 'Aurobindo Ashram', 'Café culture'],
    places: [
      {
        id: 'place-pondicherry-1',
        name: 'Auroville & Matrimandir',
        description: 'An experimental international township dedicated to human unity, centered around the stunning golden sphere of the Matrimandir.',
        imageId: MOCK_IMAGES['pondicherry-place-1'].id,
        duration: 'Half day',
        bestTime: 'Morning (requires advance booking)',
      },
      {
        id: 'place-pondicherry-2',
        name: 'White Town',
        description: 'The old French quarter. Rent a bicycle and wander through streets with names like Rue Dumas, admiring the heritage architecture.',
        imageId: MOCK_IMAGES['pondicherry-place-2'].id,
        duration: '2-3 hours',
        bestTime: 'Late afternoon',
      }
    ]
  },

  // === INTERNATIONAL (12) ===
  {
    id: 'dest-kyoto',
    slug: 'kyoto',
    name: 'Kyoto',
    country: 'Japan',
    region: 'Asia',
    tagline: 'Where time slows down amidst ancient temples and silent gardens.',
    description: 'Kyoto remains the cultural heart of Japan, a place where the modern world falls away, leaving tranquil zen gardens, machiya townhouses, and the lingering scent of incense.',
    heroImageId: MOCK_IMAGES['kyoto-hero'].id,
    moods: ['Slow mornings', 'Sacred journeys'],
    bestSeason: 'Spring',
    coordinates: { lat: 35.0116, lng: 135.7681 },
    highlights: ['Zen Buddhism roots', 'Traditional Kaiseki dining', 'Centuries-old craft'],
    detailedHighlights: [
      { title: 'Zen aesthetics', description: 'Minimalist dry landscape gardens designed for deep contemplation.' },
      { title: 'Machiya life', description: 'Stay in traditional wooden townhouses lining narrow, lantern-lit streets.' },
      { title: 'Seasonal reverence', description: 'From cherry blossoms to autumn maples, the city changes color.' }
    ],
    details: {
      idealStay: '4–5 days',
      bestTimeDescription: 'Mild temperatures and vibrant seasonal foliage.',
      localNote: 'Wake up before 7am to experience popular shrines in complete silence.',
      signatureExperiences: [
        'Early morning walk in Arashiyama',
        'Matcha tea ceremony in a tatami room',
        'Exploring the philosopher\'s path'
      ],
      locationLabel: 'Kansai, Japan'
    },
    places: [
      {
        id: 'place-kyoto-1',
        name: 'Fushimi Inari Shrine',
        description: 'A mesmerizing pathway of thousands of vermilion torii gates winding up the sacred Mount Inari.',
        imageId: MOCK_IMAGES['kyoto-place-1'].id,
        duration: '2-3 hours',
        bestTime: 'Early morning',
      },
      {
        id: 'place-kyoto-2',
        name: 'Arashiyama Bamboo Grove',
        description: 'Stand amid soaring stalks of green bamboo. When the wind passes through, the wood groans and leaves rustle.',
        imageId: MOCK_IMAGES['kyoto-place-2'].id,
        duration: '1-2 hours',
        bestTime: 'Just after sunrise',
      }
    ]
  },
  {
    id: 'dest-lisbon',
    slug: 'lisbon',
    name: 'Lisbon',
    country: 'Portugal',
    region: 'Europe',
    tagline: 'A sun-drenched capital of pastel facades and melancholic fado.',
    description: 'Built on seven hills overlooking the Tagus River, Lisbon is a city of stunning viewpoints, cinematic light, and a palpable sense of nostalgia.',
    heroImageId: MOCK_IMAGES['lisbon-hero'].id,
    moods: ['Coastal light', 'Design cities'],
    bestSeason: 'Autumn',
    coordinates: { lat: 38.7223, lng: -9.1393 },
    highlights: ['Fado music', 'Pastéis de Nata', 'Historic tram network'],
    detailedHighlights: [
      { title: 'Cinematic light', description: 'The bright coastal sun reflects off the Tagus River onto pastel buildings.' },
      { title: 'Melancholic sound', description: 'Fado music echoes through the steep, narrow alleyways of Alfama at night.' },
      { title: 'Urban viewpoints', description: 'Miradouros offer stunning sunset vistas across the seven hills.' }
    ],
    details: {
      idealStay: '3–4 days',
      bestTimeDescription: 'Warm, golden light without the peak summer crowds.',
      localNote: 'Bring shoes with good grip; the beautiful calçada pavements can be extremely slippery.',
      signatureExperiences: [
        'Riding Tram 28 through Alfama',
        'Sunset at Miradouro da Senhora do Monte',
        'Eating fresh Pastéis de Belém'
      ],
      locationLabel: 'Lisbon District, Portugal'
    },
    places: [
      {
        id: 'place-lisbon-1',
        name: 'Belém Tower',
        description: 'An ornate 16th-century fortification standing proudly in the river, symbolizing the Age of Discovery.',
        imageId: MOCK_IMAGES['lisbon-place-1'].id,
        duration: '1 hour',
        bestTime: 'Late afternoon',
      },
      {
        id: 'place-lisbon-2',
        name: 'Alfama District',
        description: 'The oldest neighborhood in the city, characterized by a labyrinth of narrow alleys, steep staircases, and hidden squares.',
        imageId: MOCK_IMAGES['lisbon-place-2'].id,
        duration: 'Half day',
        bestTime: 'Late morning',
      }
    ]
  },
  {
    id: 'dest-marrakech',
    slug: 'marrakech',
    name: 'Marrakech',
    country: 'Morocco',
    region: 'Africa',
    tagline: 'An intoxicating maze of spice, shadow, and vivid colour.',
    description: 'The Red City is a sensory overload in the best possible way. From the frantic energy of the Medina to the quiet sanctuary of tiled riad courtyards.',
    heroImageId: MOCK_IMAGES['marrakech-hero'].id,
    moods: ['Craft and culture', 'Cultural depth'],
    bestSeason: 'Spring',
    coordinates: { lat: 31.6295, lng: -7.9811 },
    highlights: ['Bustling souks', 'Islamic geometry', 'Riad living'],
    places: [
      {
        id: 'place-marrakech-1',
        name: 'Jardin Majorelle',
        description: 'A stunning botanical garden created by Jacques Majorelle, later restored by Yves Saint Laurent.',
        imageId: MOCK_IMAGES['marrakech-place-1'].id,
        duration: '2 hours',
        bestTime: 'Early morning',
      },
      {
        id: 'place-marrakech-2',
        name: 'Medina Souks',
        description: 'A vast, winding marketplace where artisans sell everything from hand-woven rugs to fragrant mounds of saffron.',
        imageId: MOCK_IMAGES['marrakech-place-2'].id,
        duration: '3 hours',
        bestTime: 'Late afternoon',
      }
    ]
  },
  {
    id: 'dest-reykjavik',
    slug: 'reykjavik',
    name: 'Reykjavík',
    country: 'Iceland',
    region: 'Europe',
    tagline: 'The edge of the world, surrounded by fire and ice.',
    description: 'A tiny, colourful capital acting as the gateway to some of the most dramatic landscapes on Earth. It blends Nordic cool with untamed nature.',
    heroImageId: MOCK_IMAGES['reykjavik-hero'].id,
    moods: ['Mountain air', 'Design cities'],
    bestSeason: 'Summer',
    coordinates: { lat: 64.1466, lng: -21.9426 },
    highlights: ['Geothermal energy', 'Nordic cuisine', 'Dramatic landscapes'],
    places: [
      {
        id: 'place-reykjavik-1',
        name: 'Lava Fields',
        description: 'Vast, otherworldly expanses of hardened magma, covered in thick, spongy green moss.',
        imageId: MOCK_IMAGES['reykjavik-place-1'].id,
        duration: 'Half day',
        bestTime: 'Midday',
      },
      {
        id: 'place-reykjavik-2',
        name: 'Blue Lagoon',
        description: 'A geothermal spa located in a lava field, famous for its milky-blue, mineral-rich waters.',
        imageId: MOCK_IMAGES['reykjavik-place-2'].id,
        duration: '3 hours',
        bestTime: 'Late evening',
      }
    ]
  },
  {
    id: 'dest-amalfi',
    slug: 'amalfi-coast',
    name: 'Amalfi Coast',
    country: 'Italy',
    region: 'Europe',
    tagline: 'Vertical villages clinging to dramatic coastal cliffs.',
    description: 'A dazzling stretch of coastline where steep mountains plunge into the azure Mediterranean. It is synonymous with dolce far niente.',
    heroImageId: MOCK_IMAGES['amalfi-hero'].id,
    moods: ['Coastal light', 'Slow mornings'],
    bestSeason: 'Summer',
    coordinates: { lat: 40.6333, lng: 14.6029 },
    highlights: ['Cliffside lemons', 'Tyrrhenian Sea views', 'Majolica ceramics'],
    places: [
      {
        id: 'place-amalfi-1',
        name: 'Villa Rufolo, Ravello',
        description: 'A historic villa with cascading terraced gardens that inspired Richard Wagner.',
        imageId: MOCK_IMAGES['amalfi-place-1'].id,
        duration: '2 hours',
        bestTime: 'Morning',
      },
      {
        id: 'place-amalfi-2',
        name: 'Capri Coastline',
        description: 'View the towering Faraglioni rock formations and secluded coves of this glamorous island.',
        imageId: MOCK_IMAGES['amalfi-place-2'].id,
        duration: 'Full day',
        bestTime: 'Mid-morning departure',
      }
    ]
  },
  {
    id: 'dest-copenhagen',
    slug: 'copenhagen',
    name: 'Copenhagen',
    country: 'Denmark',
    region: 'Europe',
    tagline: 'Flawless design meets unpretentious livability.',
    description: 'A city built for bicycles and punctuated by spires. Copenhagen is the epicenter of New Nordic cuisine and effortless modern living.',
    heroImageId: MOCK_IMAGES['copenhagen-hero'].id,
    moods: ['Design cities', 'Slow mornings'],
    bestSeason: 'Summer',
    coordinates: { lat: 55.6761, lng: 12.5683 },
    highlights: ['New Nordic dining', 'Bicycle culture', 'Danish modernism'],
    places: [
      {
        id: 'place-copenhagen-1',
        name: 'Tivoli Gardens',
        description: 'An antique amusement park right in the city center. Magical when illuminated by night.',
        imageId: MOCK_IMAGES['copenhagen-place-1'].id,
        duration: 'Evening',
        bestTime: 'Dusk',
      },
      {
        id: 'place-copenhagen-2',
        name: 'Modern Canals',
        description: 'The city\'s waterways offer a striking contrast between 17th-century merchants\' houses and contemporary buildings.',
        imageId: MOCK_IMAGES['copenhagen-place-2'].id,
        duration: '2 hours',
        bestTime: 'Afternoon',
      }
    ]
  },
  {
    id: 'dest-oaxaca',
    slug: 'oaxaca',
    name: 'Oaxaca',
    country: 'Mexico',
    region: 'North America',
    tagline: 'The culinary and artisanal soul of southern Mexico.',
    description: 'A city vibrating with indigenous culture, colonial architecture, and the complex, smoky flavors of mezcal and mole.',
    heroImageId: MOCK_IMAGES['oaxaca-hero'].id,
    moods: ['Craft and culture', 'Cultural depth'],
    bestSeason: 'Autumn',
    coordinates: { lat: 17.0732, lng: -96.7266 },
    highlights: ['Seven moles', 'Zapotec history', 'Textile weaving'],
    places: [
      {
        id: 'place-oaxaca-1',
        name: 'Hierve el Agua',
        description: 'Stunning calcified waterfalls and natural infinity pools perched on a cliffside.',
        imageId: MOCK_IMAGES['oaxaca-place-1'].id,
        duration: 'Half day',
        bestTime: 'Early morning',
      },
      {
        id: 'place-oaxaca-2',
        name: 'Monte Albán',
        description: 'A vast pre-Columbian archaeological site situated on an artificially leveled ridge.',
        imageId: MOCK_IMAGES['oaxaca-place-2'].id,
        duration: '3 hours',
        bestTime: 'Morning',
      }
    ]
  },
  {
    id: 'dest-capetown',
    slug: 'cape-town',
    name: 'Cape Town',
    country: 'South Africa',
    region: 'Africa',
    tagline: 'Where untamed nature abruptly meets urban sophistication.',
    description: 'Framed by the iconic flat-topped Table Mountain and bordered by two oceans, Cape Town boasts incredible biodiversity and striking coastal roads.',
    heroImageId: MOCK_IMAGES['capetown-hero'].id,
    moods: ['Coastal light', 'Mountain air'],
    bestSeason: 'Summer',
    coordinates: { lat: -33.9249, lng: 18.4241 },
    highlights: ['Cape Winelands', 'Fynbos flora', 'Peninsula drives'],
    places: [
      {
        id: 'place-capetown-1',
        name: 'Boulders Beach',
        description: 'A sheltered cove of soft white sand and massive granite boulders, famous for wild African penguins.',
        imageId: MOCK_IMAGES['capetown-place-1'].id,
        duration: '2 hours',
        bestTime: 'Morning',
      },
      {
        id: 'place-capetown-2',
        name: 'Kirstenbosch Gardens',
        description: 'Acclaimed as one of the great botanic gardens of the world, set against the slopes of Table Mountain.',
        imageId: MOCK_IMAGES['capetown-place-2'].id,
        duration: '3 hours',
        bestTime: 'Afternoon',
      }
    ]
  },
  {
    id: 'dest-hoian',
    slug: 'hoi-an',
    name: 'Hoi An',
    country: 'Vietnam',
    region: 'Asia',
    tagline: 'A lantern-lit merchant town paused perfectly in time.',
    description: 'An exceptionally well-preserved example of a Southeast Asian trading port. Its streets are a blend of indigenous and foreign influences.',
    heroImageId: MOCK_IMAGES['hoian-hero'].id,
    moods: ['Slow mornings', 'Craft and culture'],
    bestSeason: 'Spring',
    coordinates: { lat: 15.8801, lng: 108.3380 },
    highlights: ['Tailoring', 'Street food', 'Lantern festival'],
    places: [
      {
        id: 'place-hoian-1',
        name: 'Japanese Covered Bridge',
        description: 'A beautiful 18th-century bridge spanning a small waterway, complete with a small temple inside.',
        imageId: MOCK_IMAGES['hoian-place-1'].id,
        duration: '1 hour',
        bestTime: 'Early morning',
      },
      {
        id: 'place-hoian-2',
        name: 'Thu Bon River',
        description: 'The lifeline of the ancient town. Hire a small wooden boat at dusk to release a paper lantern.',
        imageId: MOCK_IMAGES['hoian-place-2'].id,
        duration: '1-2 hours',
        bestTime: 'Sunset',
      }
    ]
  },
  {
    id: 'dest-istanbul',
    slug: 'istanbul',
    name: 'Istanbul',
    country: 'Türkiye',
    region: 'Europe',
    tagline: 'The magnificent crossroad where two continents embrace.',
    description: 'Straddling the Bosphorus strait, Istanbul is a mesmerizing collision of Byzantine splendor, Ottoman grandeur, and modern vitality.',
    heroImageId: MOCK_IMAGES['istanbul-hero'].id,
    moods: ['Cultural depth', 'Sacred journeys'],
    bestSeason: 'Spring',
    coordinates: { lat: 41.0082, lng: 28.9784 },
    highlights: ['Bosphorus strait', 'Byzantine history', 'Grand Bazaar'],
    places: [
      {
        id: 'place-istanbul-1',
        name: 'Grand Bazaar',
        description: 'One of the largest and oldest covered markets in the world, with 61 covered streets and over 4,000 shops.',
        imageId: MOCK_IMAGES['istanbul-place-1'].id,
        duration: '3 hours',
        bestTime: 'Mid-morning',
      },
      {
        id: 'place-istanbul-2',
        name: 'The Blue Mosque',
        description: 'Famous for its stunning blue Iznik tiles adorning the interior walls and its elegant cascades of domes.',
        imageId: MOCK_IMAGES['istanbul-place-2'].id,
        duration: '1.5 hours',
        bestTime: 'Between prayer times',
      }
    ]
  },
  {
    id: 'dest-santorini',
    slug: 'santorini',
    name: 'Santorini',
    country: 'Greece',
    region: 'Europe',
    tagline: 'Whitewashed cubism perched on the rim of an ancient volcano.',
    description: 'Born of a massive volcanic eruption, Santorini offers perhaps the most dramatic, iconic island landscape in the Mediterranean.',
    heroImageId: MOCK_IMAGES['santorini-hero'].id,
    moods: ['Coastal light', 'Slow mornings'],
    bestSeason: 'Summer',
    coordinates: { lat: 36.3932, lng: 25.4615 },
    highlights: ['Caldera sunsets', 'Volcanic wines', 'Aegean architecture'],
    places: [
      {
        id: 'place-santorini-1',
        name: 'Oia Village',
        description: 'Famous worldwide for its spectacular sunsets, blue-domed churches, and whitewashed houses carved into the cliff.',
        imageId: MOCK_IMAGES['santorini-place-1'].id,
        duration: 'Half day',
        bestTime: 'Golden hour',
      },
      {
        id: 'place-santorini-2',
        name: 'Perissa Beach',
        description: 'A striking stretch of unique black volcanic sand contrasting sharply with the deep blue Aegean sea.',
        imageId: MOCK_IMAGES['santorini-place-2'].id,
        duration: '3 hours',
        bestTime: 'Midday',
      }
    ]
  },
  {
    id: 'dest-queenstown',
    slug: 'queenstown',
    name: 'Queenstown',
    country: 'New Zealand',
    region: 'Oceania',
    tagline: 'A thrilling alpine enclave on the shores of Lake Wakatipu.',
    description: 'Renowned for its adventure sports, Queenstown is equally compelling for its majestic, razor-sharp mountain scenery and pristine glacial lakes.',
    heroImageId: MOCK_IMAGES['queenstown-hero'].id,
    moods: ['Mountain air', 'Wild horizons'],
    bestSeason: 'Autumn',
    coordinates: { lat: -45.0312, lng: 168.6626 },
    highlights: ['Alpine scenery', 'Adventure sports', 'Pinot Noir vineyards'],
    places: [
      {
        id: 'place-queenstown-1',
        name: 'Milford Sound',
        description: 'Though a drive away, this breathtaking fiord carved by glaciers is an essential, awe-inspiring day trip.',
        imageId: MOCK_IMAGES['queenstown-place-1'].id,
        duration: 'Full day trip',
        bestTime: 'Early morning departure',
      },
      {
        id: 'place-queenstown-2',
        name: 'Central Otago Wine Region',
        description: 'Some of the world’s most southerly vineyards, famous for producing exceptional, cool-climate Pinot Noir.',
        imageId: MOCK_IMAGES['queenstown-place-2'].id,
        duration: 'Half day',
        bestTime: 'Afternoon',
      }
    ]
  },
  // === TÜRKİYE ===
  {
    id: 'dest-cappadocia',
    slug: 'cappadocia',
    name: 'Cappadocia',
    country: 'Türkiye',
    region: 'Europe',
    tagline: 'Dreamy landscapes, ancient caves, and sunrises like nowhere else.',
    description: 'A surreal realm sculpted by wind, water, and ancient volcanic ash. From honeycombed cave dwellings and subterranean sanctuaries to hot air balloons drifting peacefully above fairy chimneys at sunrise, Cappadocia offers an unhurried, otherworldly journey.',
    heroImageId: 'cappadocia-hero',
    moods: ['Wild horizons', 'Slow mornings', 'Cultural depth'],
    bestSeason: 'April to June & September to November',
    coordinates: { lat: 38.6431, lng: 34.8289 },
    highlights: ['Sunrise hot air balloon ascent', 'Rock-carved Byzantine sanctuaries', 'Uchisar panoramic sunset'],
    detailedHighlights: [
      { title: 'The Dawn Ascent', description: 'Watching hundreds of colorful balloons lift into the crisp pink morning sky above fairy chimneys.' },
      { title: 'Troglodyte Dwellings', description: 'Intricate cave suites carved directly into soft tufa stone, offering quiet acoustic refuge.' }
    ],
    places: [
      {
        id: 'place-goreme',
        name: 'Göreme Valley',
        description: 'Centuries-old rock-cut churches and fairy chimneys glowing under soft morning light.',
        imageId: 'cappadocia-place-1',
        duration: '3 hours',
        bestTime: 'Sunrise'
      },
      {
        id: 'place-uchisar',
        name: 'Uchisar Castle',
        description: 'The highest volcanic peak in Cappadocia with sweeping vistas across Pigeon Valley.',
        imageId: 'cappadocia-place-2',
        duration: '2 hours',
        bestTime: 'Late afternoon'
      },
      {
        id: 'place-love-valley',
        name: 'Love Valley',
        description: 'Dramatic geological spires rising from golden sandstone, serene at first light.',
        imageId: 'cappadocia-place-3',
        duration: '2 hours',
        bestTime: 'Dawn'
      }
    ]
  },
  // === CANADA ===
  {
    id: 'dest-banff',
    slug: 'banff',
    name: 'Banff',
    country: 'Canada',
    region: 'Americas',
    tagline: 'Turquoise lakes, pine forests, and pure natural beauty.',
    description: 'Carved deep into the Canadian Rockies, Banff is a sanctuary of pristine glacial waters, towering limestone massifs, and quiet evergreen trails. A destination where scale inspires quiet contemplation and unhurried reconnection with nature.',
    heroImageId: 'banff-hero',
    moods: ['Wild horizons', 'Nature & serenity'],
    bestSeason: 'June to September & December to March',
    coordinates: { lat: 51.1784, lng: -115.5708 },
    highlights: ['Glacial waters of Lake Louise', 'Moraine Lake sunrise reflections', 'Quiet Johnston Canyon catwalks'],
    detailedHighlights: [
      { title: 'Glacial Calm', description: 'Early morning paddle across mirrored turquoise waters beneath Victoria Glacier.' },
      { title: 'Alpine Solitude', description: 'Crisp mountain air and silence broken only by wind through ancient pines.' }
    ],
    places: [
      {
        id: 'place-lake-louise',
        name: 'Lake Louise',
        description: 'Vivid turquoise waters reflecting snow-dusted peaks in breathless morning stillness.',
        imageId: 'banff-place-1',
        duration: '3 hours',
        bestTime: 'Morning'
      },
      {
        id: 'place-moraine-lake',
        name: 'Moraine Lake',
        description: 'A sapphire jewel cradled by the Valley of the Ten Peaks.',
        imageId: 'banff-place-2',
        duration: '2.5 hours',
        bestTime: 'Early morning'
      },
      {
        id: 'place-johnston-canyon',
        name: 'Johnston Canyon',
        description: 'Suspended catwalks hugging deep limestone gorge walls leading to waterfalls.',
        imageId: 'banff-place-3',
        duration: '2 hours',
        bestTime: 'Afternoon'
      }
    ]
  }
];

export interface RhythmMoment {
  label: 'Dawn' | 'Afternoon' | 'After dark';
  time: string;
  place: string;
  imageId: string;
  description: string;
  practicalNote: string;
}

export interface PlaceRhythm {
  destination: string;
  country: string;
  slug: string;
  moments: RhythmMoment[];
}

export const placeRhythms: PlaceRhythm[] = [
  {
    destination: "Kyoto",
    country: "Japan",
    slug: "kyoto",
    moments: [
      {
        label: "Dawn",
        time: "06:30",
        place: "Fushimi Inari Shrine",
        imageId: "kyoto-place-1",
        description: "Before the city begins to move, the vermilion gates belong to the quiet. Walking through them in the early mist is entirely different from the crowded afternoons.",
        practicalNote: "Best for: A peaceful walk before 8am"
      },
      {
        label: "Afternoon",
        time: "14:00",
        place: "Arashiyama Bamboo Grove",
        imageId: "kyoto-place-2",
        description: "Sunlight filters through towering bamboo stalks, casting sharp, moving shadows on the ancient pathways. A perfect time to get lost in the western hills.",
        practicalNote: "Best for: Casual wandering and forest light"
      },
      {
        label: "After dark",
        time: "19:30",
        place: "Gion District",
        imageId: "kyoto-hero",
        description: "Lantern light, narrow lanes, and the softer side of an old city. The wooden machiya houses glow faintly against the evening sky.",
        practicalNote: "Best for: An unhurried evening walk"
      }
    ]
  },
  {
    destination: "Udaipur",
    country: "India",
    slug: "udaipur",
    moments: [
      {
        label: "Dawn",
        time: "06:00",
        place: "Lake Pichola",
        imageId: "udaipur-place-1",
        description: "The water acts as a mirror for the waking city. The marble palaces take on a soft, pale gold hue as the first light touches the Aravalli hills.",
        practicalNote: "Best for: A silent boat ride before the heat"
      },
      {
        label: "Afternoon",
        time: "15:30",
        place: "Jag Mandir",
        imageId: "udaipur-place-2",
        description: "Intricate marble carvings provide cool shade. The island palace feels like a secluded stone sanctuary amidst the vast, shimmering lake.",
        practicalNote: "Best for: Escaping the midday sun"
      },
      {
        label: "After dark",
        time: "19:00",
        place: "City Palace",
        imageId: "udaipur-hero",
        description: "The palace complex is illuminated, casting dramatic silhouettes against the deep blue night. The rhythm slows to the sound of distant temple bells.",
        practicalNote: "Best for: Viewing the illuminated shoreline"
      }
    ]
  },
  {
    destination: "Lisbon",
    country: "Portugal",
    slug: "lisbon",
    moments: [
      {
        label: "Dawn",
        time: "07:00",
        place: "Belém Tower",
        imageId: "lisbon-place-1",
        description: "The Tagus river reflects the pastel morning light. The iconic fortress stands quietly, stripped of the day's maritime bustle.",
        practicalNote: "Best for: Crisp morning air by the water"
      },
      {
        label: "Afternoon",
        time: "14:30",
        place: "Alfama District",
        imageId: "lisbon-place-2",
        description: "The scent of grilled sardines and the echo of Fado music begin to weave through the steep, narrow alleys. Sunlight hits the red rooftops.",
        practicalNote: "Best for: Getting lost and long lunches"
      },
      {
        label: "After dark",
        time: "20:00",
        place: "Bairro Alto",
        imageId: "lisbon-hero",
        description: "The city transforms. Historic yellow trams navigate the shadows while the cobblestones glow under warm streetlamps.",
        practicalNote: "Best for: Evening strolls and lively terraces"
      }
    ]
  },
  {
    destination: "Marrakech",
    country: "Morocco",
    slug: "marrakech",
    moments: [
      {
        label: "Dawn",
        time: "06:30",
        place: "Medina Souks",
        imageId: "marrakech-place-2",
        description: "Before the frantic energy begins, the souks are quiet corridors of woven rugs, spices, and copper waiting for the day.",
        practicalNote: "Best for: Seeing the city wake up"
      },
      {
        label: "Afternoon",
        time: "15:00",
        place: "Jardin Majorelle",
        imageId: "marrakech-place-1",
        description: "Cobalt blue walls and sharp cactus shadows provide a striking, calm contrast to the intense North African sun outside the gates.",
        practicalNote: "Best for: A shaded, vivid retreat"
      },
      {
        label: "After dark",
        time: "20:00",
        place: "A Courtyard Riad",
        imageId: "marrakech-hero",
        description: "Intricate tilework and archways recede into shadow. The chaos of the city is replaced by the sound of trickling fountains and mint tea.",
        practicalNote: "Best for: Quiet, private dinners"
      }
    ]
  },
  {
    destination: "Cape Town",
    country: "South Africa",
    slug: "capetown",
    moments: [
      {
        label: "Dawn",
        time: "06:00",
        place: "Boulders Beach",
        imageId: "capetown-place-1",
        description: "The Atlantic breeze is crisp. African penguins navigate the giant granite boulders as the sun breaches the horizon.",
        practicalNote: "Best for: Solitude and early wildlife"
      },
      {
        label: "Afternoon",
        time: "14:00",
        place: "Kirstenbosch Gardens",
        imageId: "capetown-place-2",
        description: "Vast lawns and indigenous flora rest beneath the imposing shadow of the eastern slopes. The air is thick with the scent of fynbos.",
        practicalNote: "Best for: Slow, shaded picnics"
      },
      {
        label: "After dark",
        time: "19:00",
        place: "Table Mountain",
        imageId: "capetown-hero",
        description: "The 'tablecloth' of clouds rolls gently over the glowing city bowl below. A breathtaking, vast end to the day.",
        practicalNote: "Best for: Sweeping, dramatic twilight views"
      }
    ]
  }
];
