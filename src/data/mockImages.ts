export interface ImageMetadata {
  id: string;
  url: string;
  alt: string;
  credit?: string;
  objectPosition?: string;
}

// Meticulously curated, 100% unique imagery for TAVIRA
export const MOCK_IMAGES: Record<string, ImageMetadata> = {
  // === PARIS ===
  'paris-hero': {
    id: 'paris-hero',
    url: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=85&w=2400&auto=format&fit=crop',
    alt: 'Paris rooftops and Eiffel Tower in golden evening light',
  },
  'paris-eiffel': {
    id: 'paris-eiffel',
    url: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=85&w=1600&auto=format&fit=crop',
    alt: 'Eiffel Tower soaring into calm Parisian skies',
  },
  'paris-louvre': {
    id: 'paris-louvre',
    url: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=85&w=1600&auto=format&fit=crop',
    alt: 'Louvre Museum courtyard and historic palace facade',
  },
  'paris-montmartre': {
    id: 'paris-montmartre',
    url: 'https://images.unsplash.com/photo-1520939817895-060bdef4dc1b?q=85&w=1600&auto=format&fit=crop',
    alt: 'Cobblestone streets and bohemian cafés of Montmartre',
  },
  'paris-seine': {
    id: 'paris-seine',
    url: 'https://images.unsplash.com/photo-1509439581779-6298f75bf6e5?q=85&w=1600&auto=format&fit=crop',
    alt: 'Quiet dusk reflections along the River Seine',
  },

  // === CAPPADOCIA ===
  'cappadocia-hero': {
    id: 'cappadocia-hero',
    url: 'https://images.unsplash.com/photo-1609137144822-261559c5d013?q=85&w=2400&auto=format&fit=crop',
    alt: 'Hot air balloons floating above Cappadocia fairy chimneys at sunrise'
  },
  'cappadocia-place-1': {
    id: 'cappadocia-place-1',
    url: 'https://images.unsplash.com/photo-1570939274717-7eda259b50ed?q=85&w=1600&auto=format&fit=crop',
    alt: 'Göreme rock churches and scenic valley caves'
  },
  'cappadocia-place-2': {
    id: 'cappadocia-place-2',
    url: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?q=85&w=1600&auto=format&fit=crop',
    alt: 'Uchisar Castle standing proudly over the Anatolian plateau'
  },
  'cappadocia-place-3': {
    id: 'cappadocia-place-3',
    url: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=85&w=1600&auto=format&fit=crop',
    alt: 'Love Valley rock formations under morning glow'
  },

  // === BANFF ===
  'banff-hero': {
    id: 'banff-hero',
    url: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=85&w=2400&auto=format&fit=crop',
    alt: 'Turquoise waters of Lake Louise framed by majestic Canadian Rockies'
  },
  'banff-place-1': {
    id: 'banff-place-1',
    url: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=85&w=1600&auto=format&fit=crop',
    alt: 'Glacial calm of Lake Louise and Victoria Glacier'
  },
  'banff-place-2': {
    id: 'banff-place-2',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=85&w=1600&auto=format&fit=crop',
    alt: 'Moraine Lake azure waters and alpine pine trees'
  },
  'banff-place-3': {
    id: 'banff-place-3',
    url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=85&w=1600&auto=format&fit=crop',
    alt: 'Johnston Canyon deep limestone gorge and waterfalls'
  },

  // === HOME & MOODS ===
  'home-hero': {
    id: 'home-hero',
    url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2800&auto=format&fit=crop',
    alt: 'Cinematic mountain landscape shrouded in mist',
  },
  'home-story-1': {
    id: 'home-story-1',
    url: 'https://images.unsplash.com/photo-1498307833015-e7b400441eb8?q=80&w=1500&auto=format&fit=crop',
    alt: 'Traveller gazing across an endless horizon',
  },
  'mood-slow-mornings': {
    id: 'mood-slow-mornings',
    url: 'https://images.unsplash.com/photo-1518733057094-95b53143d2a7?q=80&w=1500&auto=format&fit=crop', // Coffee by window
    alt: 'Quiet coffee by a sunlit window',
  },
  'mood-sacred': {
    id: 'mood-sacred',
    url: 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1500&auto=format&fit=crop', 
    alt: 'Light streaming into an ancient sacred space',
  },
  'mood-mountain': {
    id: 'mood-mountain',
    url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1500&auto=format&fit=crop', // Crisp mountain peaks
    alt: 'Crisp air over dramatic mountain peaks',
  },
  'mood-coastal': {
    id: 'mood-coastal',
    url: 'https://images.unsplash.com/photo-1468581264429-2548ef9eb732?q=80&w=1500&auto=format&fit=crop', // Coastal water
    alt: 'Soft coastal light hitting the sea',
  },
  'mood-craft': {
    id: 'mood-craft',
    url: 'https://images.unsplash.com/photo-1522079085876-0f9488a03ca2?q=80&w=1500&auto=format&fit=crop', // Hands working or textiles
    alt: 'Hands shaping traditional local crafts',
  },
  'mood-design': {
    id: 'mood-design',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1500&auto=format&fit=crop', // Modern architecture
    alt: 'Striking modern architectural details',
  },

  // === INDIA ===
  
  // 1. Udaipur
  'udaipur-hero': {
    id: 'udaipur-hero',
    url: 'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?q=80&w=2000&auto=format&fit=crop',
    alt: 'Udaipur City Palace glowing at sunset',
  },
  'udaipur-place-1': {
    id: 'udaipur-place-1',
    url: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=1500&auto=format&fit=crop',
    alt: 'Taj Lake Palace floating on Lake Pichola',
  },
  'udaipur-place-2': {
    id: 'udaipur-place-2',
    url: 'https://images.unsplash.com/photo-1598442006155-2766324b94f0?q=80&w=1500&auto=format&fit=crop',
    alt: 'Intricate marble carvings of Jag Mandir',
  },

  // 2. Jaipur
  'jaipur-hero': {
    id: 'jaipur-hero',
    url: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=2000&auto=format&fit=crop',
    alt: 'Hawa Mahal intricate pink sandstone facade',
  },
  'jaipur-place-1': {
    id: 'jaipur-place-1',
    url: 'https://images.unsplash.com/photo-1584285427503-4f275e77dbad?q=80&w=1500&auto=format&fit=crop',
    alt: 'Amber Fort sprawling across the Aravalli hills',
  },
  'jaipur-place-2': {
    id: 'jaipur-place-2',
    url: 'https://images.unsplash.com/photo-1621251346067-17eb48b9ef73?q=80&w=1500&auto=format&fit=crop',
    alt: 'Symmetrical doorways in the City Palace',
  },

  // 3. Varanasi
  'varanasi-hero': {
    id: 'varanasi-hero',
    url: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=2000&auto=format&fit=crop',
    alt: 'Ghats of Varanasi at golden hour',
  },
  'varanasi-place-1': {
    id: 'varanasi-place-1',
    url: 'https://images.unsplash.com/photo-1601633519830-73f1dcbff8bf?q=80&w=1500&auto=format&fit=crop',
    alt: 'Evening Ganga Aarti ceremony illuminated by fire',
  },
  'varanasi-place-2': {
    id: 'varanasi-place-2',
    url: 'https://images.unsplash.com/photo-1623832793135-23c21a4f00bb?q=80&w=1500&auto=format&fit=crop',
    alt: 'A quiet, ancient alleyway deep in the old city',
  },

  // 4. Kochi
  'kochi-hero': {
    id: 'kochi-hero',
    url: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=2000&auto=format&fit=crop',
    alt: 'Chinese fishing nets silhouetted against a Kochi sunset',
  },
  'kochi-place-1': {
    id: 'kochi-place-1',
    url: 'https://images.unsplash.com/photo-1643209867041-ffcbab203361?q=80&w=1500&auto=format&fit=crop',
    alt: 'Vibrant Kathakali dancer in traditional makeup',
  },
  'kochi-place-2': {
    id: 'kochi-place-2',
    url: 'https://images.unsplash.com/photo-1632766324263-228cc29d18b6?q=80&w=1500&auto=format&fit=crop',
    alt: 'Heritage colonial architecture in Fort Kochi',
  },

  // 5. Munnar
  'munnar-hero': {
    id: 'munnar-hero',
    url: 'https://images.unsplash.com/photo-1593693411515-c20261bcad6e?q=80&w=2000&auto=format&fit=crop',
    alt: 'Endless rolling tea plantations covered in mist',
  },
  'munnar-place-1': {
    id: 'munnar-place-1',
    url: 'https://images.unsplash.com/photo-1582293041079-7814c2f12063?q=80&w=1500&auto=format&fit=crop',
    alt: 'Eravikulam National Park green valleys',
  },
  'munnar-place-2': {
    id: 'munnar-place-2',
    url: 'https://images.unsplash.com/photo-1610214643603-9bd538561ec4?q=80&w=1500&auto=format&fit=crop',
    alt: 'Tea leaves ready for harvest up close',
  },

  // 6. Ladakh
  'ladakh-hero': {
    id: 'ladakh-hero',
    url: 'https://images.unsplash.com/photo-1596706037042-49340f1a666e?q=80&w=2000&auto=format&fit=crop',
    alt: 'Barren mountainous landscape of Ladakh with prayer flags',
  },
  'ladakh-place-1': {
    id: 'ladakh-place-1',
    url: 'https://images.unsplash.com/photo-1612440331006-2184a441e8c7?q=80&w=1500&auto=format&fit=crop',
    alt: 'The brilliant blue expanse of Pangong Tso lake',
  },
  'ladakh-place-2': {
    id: 'ladakh-place-2',
    url: 'https://images.unsplash.com/photo-1627885408715-db1a9b19e27c?q=80&w=1500&auto=format&fit=crop',
    alt: 'Thiksey Monastery perched on a rocky hill',
  },

  // 7. Hampi
  'hampi-hero': {
    id: 'hampi-hero',
    url: 'https://images.unsplash.com/photo-1620766165457-a8025baa82e0?q=80&w=2000&auto=format&fit=crop',
    alt: 'Ancient stone ruins surrounded by massive boulders in Hampi',
  },
  'hampi-place-1': {
    id: 'hampi-place-1',
    url: 'https://images.unsplash.com/photo-1634563870381-80517865f3f4?q=80&w=1500&auto=format&fit=crop',
    alt: 'Virupaksha Temple towering over the Tungabhadra river',
  },
  'hampi-place-2': {
    id: 'hampi-place-2',
    url: 'https://images.unsplash.com/photo-1615822360581-9b190f845a72?q=80&w=1500&auto=format&fit=crop',
    alt: 'The iconic Stone Chariot in the Vittala Temple complex',
  },

  // 8. Pondicherry
  'pondicherry-hero': {
    id: 'pondicherry-hero',
    url: 'https://images.unsplash.com/photo-1662991083984-b0a3dbf29cf8?q=80&w=2000&auto=format&fit=crop',
    alt: 'Mustard yellow French colonial architecture with bougainvillea',
  },
  'pondicherry-place-1': {
    id: 'pondicherry-place-1',
    url: 'https://images.unsplash.com/photo-1591873136224-8fa710aefb4f?q=80&w=1500&auto=format&fit=crop',
    alt: 'The golden sphere of the Matrimandir in Auroville',
  },
  'pondicherry-place-2': {
    id: 'pondicherry-place-2',
    url: 'https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?q=80&w=1500&auto=format&fit=crop',
    alt: 'Quiet tree-lined streets of the White Town',
  },

  // === INTERNATIONAL ===

  // 9. Kyoto
  'kyoto-hero': {
    id: 'kyoto-hero',
    url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2000&auto=format&fit=crop',
    alt: 'Traditional wooden architecture and cherry blossoms',
  },
  'kyoto-place-1': {
    id: 'kyoto-place-1',
    url: 'https://images.unsplash.com/photo-1624253321171-1be53e12f5f4?q=80&w=1500&auto=format&fit=crop',
    alt: 'Fushimi Inari Shrine vibrant orange torii gates',
  },
  'kyoto-place-2': {
    id: 'kyoto-place-2',
    url: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=1500&auto=format&fit=crop',
    alt: 'Arashiyama Bamboo Grove pathway',
  },

  // 10. Lisbon
  'lisbon-hero': {
    id: 'lisbon-hero',
    url: 'https://images.unsplash.com/photo-1585211969224-3e9929861590?q=80&w=2000&auto=format&fit=crop',
    alt: 'Historic yellow tram navigating narrow Lisbon streets',
  },
  'lisbon-place-1': {
    id: 'lisbon-place-1',
    url: 'https://images.unsplash.com/photo-1536663815808-535e2280d2c2?q=80&w=1500&auto=format&fit=crop',
    alt: 'Belém Tower on the Tagus river at sunset',
  },
  'lisbon-place-2': {
    id: 'lisbon-place-2',
    url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1500&auto=format&fit=crop',
    alt: 'Alfama district overlooking red rooftops',
  },

  // 11. Marrakech
  'marrakech-hero': {
    id: 'marrakech-hero',
    url: 'https://images.unsplash.com/photo-1597211684565-dca64d72bdfe?q=80&w=2000&auto=format&fit=crop',
    alt: 'Intricate Moroccan tilework and archways',
  },
  'marrakech-place-1': {
    id: 'marrakech-place-1',
    url: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?q=80&w=1500&auto=format&fit=crop',
    alt: 'Jardin Majorelle cobalt blue villa and cacti',
  },
  'marrakech-place-2': {
    id: 'marrakech-place-2',
    url: 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1500&auto=format&fit=crop',
    alt: 'Spices and woven goods in the bustling Medina souk',
  },

  // 12. Reykjavík
  'reykjavik-hero': {
    id: 'reykjavik-hero',
    url: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?q=80&w=2000&auto=format&fit=crop',
    alt: 'Aerial view of Reykjavík colourful houses',
  },
  'reykjavik-place-1': {
    id: 'reykjavik-place-1',
    url: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?q=80&w=1500&auto=format&fit=crop',
    alt: 'Vast volcanic landscape and moss-covered lava fields',
  },
  'reykjavik-place-2': {
    id: 'reykjavik-place-2',
    url: 'https://images.unsplash.com/photo-1504829857797-ddff29c27927?q=80&w=1500&auto=format&fit=crop',
    alt: 'Steaming geothermal pools of the Blue Lagoon',
  },

  // 13. Amalfi Coast
  'amalfi-hero': {
    id: 'amalfi-hero',
    url: 'https://images.unsplash.com/photo-1533676802871-eca1ae998cd5?q=80&w=2000&auto=format&fit=crop',
    alt: 'Positano village cascading down the cliffside to the sea',
  },
  'amalfi-place-1': {
    id: 'amalfi-place-1',
    url: 'https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?q=80&w=1500&auto=format&fit=crop',
    alt: 'Villa Rufolo gardens overlooking the Mediterranean',
  },
  'amalfi-place-2': {
    id: 'amalfi-place-2',
    url: 'https://images.unsplash.com/photo-1601004351336-7c08a55428a8?q=80&w=1500&auto=format&fit=crop',
    alt: 'Boats bobbing in the clear azure waters of Capri',
  },

  // 14. Copenhagen
  'copenhagen-hero': {
    id: 'copenhagen-hero',
    url: 'https://images.unsplash.com/photo-1513622470522-26c311566431?q=80&w=2000&auto=format&fit=crop',
    alt: 'Nyhavn waterfront with colourful townhouses',
  },
  'copenhagen-place-1': {
    id: 'copenhagen-place-1',
    url: 'https://images.unsplash.com/photo-1563812154131-4171279a5ee0?q=80&w=1500&auto=format&fit=crop',
    alt: 'Tivoli Gardens illuminated at dusk',
  },
  'copenhagen-place-2': {
    id: 'copenhagen-place-2',
    url: 'https://images.unsplash.com/photo-1589824783837-6169889fd20c?q=80&w=1500&auto=format&fit=crop',
    alt: 'Modern Danish architecture along the canals',
  },

  // 15. Oaxaca
  'oaxaca-hero': {
    id: 'oaxaca-hero',
    url: 'https://images.unsplash.com/photo-1658428469376-7977eb28eb99?q=80&w=2000&auto=format&fit=crop',
    alt: 'Colorful colonial streets and textiles',
  },
  'oaxaca-place-1': {
    id: 'oaxaca-place-1',
    url: 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?q=80&w=1500&auto=format&fit=crop',
    alt: 'Hierve el Agua petrified waterfalls',
  },
  'oaxaca-place-2': {
    id: 'oaxaca-place-2',
    url: 'https://images.unsplash.com/photo-1589136777351-fdc9c9cb1669?q=80&w=1500&auto=format&fit=crop',
    alt: 'Ancient Zapotec ruins of Monte Albán',
  },

  // 16. Cape Town
  'capetown-hero': {
    id: 'capetown-hero',
    url: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?q=80&w=2000&auto=format&fit=crop',
    alt: 'Table Mountain towering over the city bowl',
  },
  'capetown-place-1': {
    id: 'capetown-place-1',
    url: 'https://images.unsplash.com/photo-1577971132997-c10be9382570?q=80&w=1500&auto=format&fit=crop',
    alt: 'Boulders Beach African penguin colony',
  },
  'capetown-place-2': {
    id: 'capetown-place-2',
    url: 'https://images.unsplash.com/photo-1596766442657-19d2a210f9d9?q=80&w=1500&auto=format&fit=crop',
    alt: 'Kirstenbosch National Botanical Garden',
  },

  // 17. Hoi An
  'hoian-hero': {
    id: 'hoian-hero',
    url: 'https://images.unsplash.com/photo-1559592413-7ceec1907cb5?q=80&w=2000&auto=format&fit=crop',
    alt: 'Hundreds of colourful silk lanterns glowing at night',
  },
  'hoian-place-1': {
    id: 'hoian-place-1',
    url: 'https://images.unsplash.com/photo-1600018042456-11f8b423851b?q=80&w=1500&auto=format&fit=crop',
    alt: 'The historic Japanese Covered Bridge',
  },
  'hoian-place-2': {
    id: 'hoian-place-2',
    url: 'https://images.unsplash.com/photo-1549488344-c71c4c1a9386?q=80&w=1500&auto=format&fit=crop',
    alt: 'Yellow heritage buildings lining the Thu Bon River',
  },

  // 18. Istanbul
  'istanbul-hero': {
    id: 'istanbul-hero',
    url: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=2000&auto=format&fit=crop',
    alt: 'Hagia Sophia silhouette at sunset over the Bosphorus',
  },
  'istanbul-place-1': {
    id: 'istanbul-place-1',
    url: 'https://images.unsplash.com/photo-1541426062085-78d1fb5258c7?q=80&w=1500&auto=format&fit=crop',
    alt: 'Spices piled high in the Grand Bazaar',
  },
  'istanbul-place-2': {
    id: 'istanbul-place-2',
    url: 'https://images.unsplash.com/photo-1527838832700-5059252407fa?q=80&w=1500&auto=format&fit=crop',
    alt: 'The Blue Mosque towering interior tiles',
  },

  // 19. Santorini
  'santorini-hero': {
    id: 'santorini-hero',
    url: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?q=80&w=2000&auto=format&fit=crop',
    alt: 'Whitewashed houses and blue domes over the Aegean caldera',
  },
  'santorini-place-1': {
    id: 'santorini-place-1',
    url: 'https://images.unsplash.com/photo-1628100570397-bd42f9b1c73a?q=80&w=1500&auto=format&fit=crop',
    alt: 'Oia village cascading down the cliff at golden hour',
  },
  'santorini-place-2': {
    id: 'santorini-place-2',
    url: 'https://images.unsplash.com/photo-1571406085520-2b28c0350d18?q=80&w=1500&auto=format&fit=crop',
    alt: 'Black volcanic sand of Perissa beach',
  },

  // 20. Queenstown
  'queenstown-hero': {
    id: 'queenstown-hero',
    url: 'https://images.unsplash.com/photo-1600100397608-f010f43bd5ab?q=80&w=2000&auto=format&fit=crop',
    alt: 'Lake Wakatipu and the Remarkables mountain range',
  },
  'queenstown-place-1': {
    id: 'queenstown-place-1',
    url: 'https://images.unsplash.com/photo-1563853549079-66c3c5ed9601?q=80&w=1500&auto=format&fit=crop',
    alt: 'Milford Sound dramatic fiords and waterfalls',
  },
  'queenstown-place-2': {
    id: 'queenstown-place-2',
    url: 'https://images.unsplash.com/photo-1579782522718-49811fa17ec3?q=80&w=1500&auto=format&fit=crop',
    alt: 'Lush green vineyards in the Central Otago wine region',
  },

  // === JOURNAL STORIES ===
  'journal-kyoto': {
    id: 'journal-kyoto',
    url: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=80&w=2000&auto=format&fit=crop',
    alt: 'Matcha tea preparation in a quiet Kyoto room',
  },
  'journal-varanasi': {
    id: 'journal-varanasi',
    url: 'https://images.unsplash.com/photo-1571536802807-3cab21815fb5?q=80&w=2000&auto=format&fit=crop',
    alt: 'Golden hour mist over the river Ganges',
  },
  'journal-lisbon': {
    id: 'journal-lisbon',
    url: 'https://images.unsplash.com/photo-1588612501064-00ee9e0e5a68?q=80&w=2000&auto=format&fit=crop',
    alt: 'A weathered Portuguese azulejo tile wall',
  },
  'journal-copenhagen': {
    id: 'journal-copenhagen',
    url: 'https://images.unsplash.com/photo-1605891487823-74b88fdb80e9?q=80&w=2000&auto=format&fit=crop',
    alt: 'Minimalist Danish interior with warm lighting',
  },
  'journal-udaipur': {
    id: 'journal-udaipur',
    url: 'https://images.unsplash.com/photo-1626027177726-2a4bce8111de?q=80&w=2000&auto=format&fit=crop',
    alt: 'Reflection of a marble pavilion in calm water',
  },
  'journal-marrakech': {
    id: 'journal-marrakech',
    url: 'https://images.unsplash.com/photo-1549429446-c2ba6873528b?q=80&w=2000&auto=format&fit=crop',
    alt: 'A courtyard riad filled with shadow and light',
  },

  // === MEGA MENU ===
  'menu-wild': {
    id: 'menu-wild',
    url: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=1500&auto=format&fit=crop',
    alt: 'Vast wild waterfall landscape',
  },
  'menu-cultural': {
    id: 'menu-cultural',
    url: 'https://images.unsplash.com/photo-1533104618751-28564a51e605?q=80&w=1500&auto=format&fit=crop',
    alt: 'Ancient architectural ruins',
  }
};
