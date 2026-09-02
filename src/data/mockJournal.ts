export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: 'Food & culture' | 'City notes' | 'Slow travel' | 'Nature' | 'Travel advice';
  author: string;
  date: string;
  readTime: string;
  imageId: string;
  content: string; // HTML or Markdown string for the mock
}

export const MOCK_JOURNAL: JournalArticle[] = [
  {
    id: 'j1',
    slug: 'a-slower-way-through-kyoto',
    title: 'A slower way through Kyoto',
    excerpt: 'Beyond the crowded temples lies a city of quiet tea houses, hidden gardens, and craftsmen who have spent generations perfecting single gestures.',
    category: 'Slow travel',
    author: 'Elena Rostova',
    date: 'October 12, 2026',
    readTime: '6 min read',
    imageId: 'journal-kyoto',
    content: `
      <p>There is a specific quality of silence in Kyoto that you only begin to notice after the third or fourth day. It is not the absence of sound—the city is, after all, home to nearly a million and a half people—but rather a profound intentionality in how sound is made.</p>
      <p>I found this silence most acutely in a small, unmarked tea house in the Nakagyo ward. The proprietor, a man in his seventies, spent ten minutes preparing a single bowl of matcha. Every movement was necessary; no movement was rushed. To watch him was to understand that speed is often just a substitute for attention.</p>
      <br/>
      <h3 class="text-serif text-2xl mb-4">The Architecture of Attention</h3>
      <p>We are conditioned to consume cities rapidly. We collect landmarks like merit badges, rushing from the Golden Pavilion to the Bamboo Grove, exhausted but victorious. But Kyoto resists this kind of tourism. Its most profound spaces—the moss gardens of Saiho-ji, the ancient wooden machiya townhouses—demand that you slow down simply to perceive them.</p>
      <p>To travel thoughtfully here means waking before dawn, not to beat the crowds, but to watch the morning light change the color of the Kamo River. It means spending an hour watching a potter glaze a single cup, realizing that what you are witnessing is not labor, but a meditation made visible.</p>
    `
  },
  {
    id: 'j2',
    slug: 'dawn-on-the-ghats-of-varanasi',
    title: 'Dawn on the ghats of Varanasi',
    excerpt: 'In one of the world\'s oldest continuously inhabited cities, the morning light reveals a complex choreography of faith, life, and transition.',
    category: 'City notes',
    author: 'Samir Desai',
    date: 'September 28, 2026',
    readTime: '8 min read',
    imageId: 'journal-varanasi',
    content: `
      <p>To understand Varanasi, you must understand the river. The Ganges here is not merely a body of water; it is a living deity, a witness, and the ultimate destination for millions of believers.</p>
      <p>I arrived at Dasaswamedh Ghat at 5:00 AM. The air was thick with mist, woodsmoke, and the scent of marigolds. In the pre-dawn darkness, the silhouettes of wooden boats bobbed gently against the ancient stone steps. As the sky turned a bruised purple, and then a brilliant, searing gold, the city woke up all at once.</p>
      <br/>
      <h3 class="text-serif text-2xl mb-4">The Rhythm of the River</h3>
      <p>What strikes you about the ghats is the absolute lack of separation between the sacred and the mundane. Priests chant ancient Sanskrit mantras while, ten feet away, a dhobi (washerman) rhythmically beats laundry against a stone slab. A pilgrim takes a holy dip while a group of children play cricket on a wider stretch of the steps.</p>
      <p>There is a profound comfort in this chaos. It suggests that the sacred is not something locked away in a quiet room, but something that exists in the very center of the noise of living.</p>
    `
  },
  {
    id: 'j3',
    slug: 'the-small-rituals-of-lisbon',
    title: 'The small rituals of Lisbon',
    excerpt: 'Finding the soul of the Portuguese capital in its neighborhood pastelarias, faded azulejos, and the steep, winding alleys of Alfama.',
    category: 'Food & culture',
    author: 'Maria Santos',
    date: 'September 15, 2026',
    readTime: '5 min read',
    imageId: 'journal-lisbon',
    content: `
      <p>Lisbon is a city constructed entirely of hills and light. The light here has a specific, golden quality, reflecting off the Tagus river and bouncing against the pastel facades of the buildings. But the true rhythm of the city is found not in its grand plazas, but in its smallest daily rituals.</p>
      <p>Every morning begins with a <em>bica</em>—a strong, short shot of espresso—and a <em>pastel de nata</em>, preferably consumed standing at a stainless steel counter in a neighborhood pastelaria. There is a specific choreography to this: the clinking of the tiny spoon, the dusting of cinnamon, the rapid exchange of morning pleasantries with the barista.</p>
    `
  },
  {
    id: 'j4',
    slug: 'a-design-walk-through-copenhagen',
    title: 'A design walk through Copenhagen',
    excerpt: 'How Danish functionalism created a city where aesthetics and utility are completely indistinguishable from one another.',
    category: 'City notes',
    author: 'Anders Jensen',
    date: 'August 30, 2026',
    readTime: '7 min read',
    imageId: 'journal-copenhagen',
    content: `
      <p>In Copenhagen, good design is not a luxury; it is a civic right. You see it in the way the bicycle lanes are integrated into the urban flow, in the typography of the street signs, and in the warm, ambient lighting that glows from apartment windows during the long, dark winters.</p>
      <p>The Danish concept of <em>hygge</em> is often reduced to candles and blankets, but architecturally, it is about creating spaces that foster intimacy and comfort. It is an acknowledgment that our environment deeply affects our psychological well-being.</p>
    `
  },
  {
    id: 'j5',
    slug: 'lake-light-in-udaipur',
    title: 'Lake light in Udaipur',
    excerpt: 'Navigating the intricate marble palaces and shimmering waters of Rajasthan\'s most romantic city at the edge of the desert.',
    category: 'Slow travel',
    author: 'Priya Sharma',
    date: 'August 12, 2026',
    readTime: '6 min read',
    imageId: 'journal-udaipur',
    content: `
      <p>There is a mirage-like quality to Udaipur. Approaching through the arid, dusty hills of the Aravalli range, the sudden appearance of Lake Pichola—a vast, shimmering expanse of water reflecting stark white marble palaces—feels like a hallucination.</p>
      <p>The city demands a different pace than the rest of Rajasthan. While Jaipur hums with chaotic commerce and Jodhpur vibrates with intense color, Udaipur is a study in quiet reflections. To sit on the ghats at sunset and watch the Lake Palace turn from blinding white to soft gold, and finally to deep indigo, is to understand why this place has captured the imagination of artists for centuries.</p>
    `
  },
  {
    id: 'j6',
    slug: 'three-days-in-marrakech-unhurried',
    title: 'Three days in Marrakech, unhurried',
    excerpt: 'Escaping the frenzy of the souks to discover the quiet, shadowed courtyards and ancient gardens hidden behind unassuming walls.',
    category: 'Travel advice',
    author: 'Tariq Al-Fayed',
    date: 'July 22, 2026',
    readTime: '5 min read',
    imageId: 'journal-marrakech',
    content: `
      <p>The first mistake visitors make in Marrakech is trying to see it all. The Medina is a labyrinth designed to confuse outsiders; to fight it is exhausting. The secret to Marrakech is surrender.</p>
      <p>Behind the anonymous, dusty red walls of the medina lie the riads—traditional courtyard houses that serve as ultimate sanctuaries. Stepping from the chaotic, sensory overload of the souks into a riad courtyard, where the only sound is water trickling into a mosaic fountain and the scent of orange blossoms hangs heavy in the air, is one of travel's most profound contrasts.</p>
    `
  }
];
