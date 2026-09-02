import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Wind, Droplets, Thermometer, Clock, Sparkles } from 'lucide-react';
import { destinationService } from '../services/destinationService';
import { weatherService, type WeatherData } from '../services/weatherService';
import { assistantService } from '../services/assistantService';
import { itineraryService, type ItineraryDay } from '../services/itineraryService';
import { imageService } from '../services/imageService';
import { DestinationOverview } from '../components/destination/DestinationOverview';
import type { Destination } from '../data/mockDestinations';
import { Button } from '../components/ui/Button';

export const DestinationDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [destination, setDestination] = useState<Destination | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [related, setRelated] = useState<Destination[]>([]);

  // Assistant State
  const [assistantMsg, setAssistantMsg] = useState('');
  const [conversation, setConversation] = useState<{role: 'user'|'assistant', text: string}[]>([]);
  const [assistantLoading, setAssistantLoading] = useState(false);

  // Itinerary State
  const [itinDays, setItinDays] = useState('3');
  const [itinStyle, setItinStyle] = useState('Balanced');
  const [itinerary, setItinerary] = useState<ItineraryDay[] | null>(null);
  const [itinLoading, setItinLoading] = useState(false);

  useEffect(() => {
    if (!slug) return;
    
    setLoading(true);
    setConversation([]);
    setItinerary(null);
    window.scrollTo(0, 0);

    destinationService.getDestinationBySlug(slug).then((dest) => {
      if (dest) {
        setDestination(dest);
        
        weatherService.getWeatherByCoordinates(dest.coordinates.lat, dest.coordinates.lng)
          .then(setWeather);

        destinationService.searchAndFilter({ region: dest.region }).then(res => {
          setRelated(res.filter(r => r.id !== dest.id).slice(0, 3));
        });
      }
      setLoading(false);
    });
  }, [slug]);

  const handleAssistantSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!assistantMsg.trim() || !destination) return;

    const userText = assistantMsg.trim();
    setConversation(prev => [...prev, { role: 'user', text: userText }]);
    setAssistantMsg('');
    setAssistantLoading(true);

    try {
      const response = await assistantService.askQuestion(destination.name, userText);
      setConversation(prev => [...prev, { role: 'assistant', text: response }]);
    } finally {
      setAssistantLoading(false);
    }
  };

  const handleQuickQuestion = (q: string) => {
    setAssistantMsg(q);
    setTimeout(() => {
      const form = document.getElementById('assistant-form') as HTMLFormElement;
      if (form) form.requestSubmit();
    }, 100);
  };

  const handleGenerateItinerary = async () => {
    if (!destination) return;
    setItinLoading(true);
    setItinerary(null);

    try {
      const result = await itineraryService.generateItinerary({
        destinationSlug: destination.slug,
        days: parseInt(itinDays),
        travelStyle: itinStyle
      });
      setItinerary(result);
    } finally {
      setItinLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p className="text-secondary text-lg">Preparing destination...</p>
      </div>
    );
  }

  if (!destination) {
    return (
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-6)' }}>
        <h1 className="text-serif text-4xl">Destination not found</h1>
        <Button to="/explore" variant="secondary">Return to Explore</Button>
      </div>
    );
  }

  const heroImg = imageService.getImage(destination.heroImageId);

  return (
    <div className="animate-fade-in">
      {/* 1. Immersive Hero */}
      <section style={{ height: '90vh', minHeight: '600px', position: 'relative', overflow: 'hidden' }}>
        <img 
          src={heroImg.url} 
          alt={heroImg.alt} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(17,20,26,0.8) 0%, rgba(17,20,26,0.1) 100%)' }} />
        <div className="container" style={{ 
          position: 'absolute', inset: 0, 
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
          paddingBottom: 'var(--space-24)', color: 'var(--color-white)'
        }}>
          <p className="text-sm uppercase animate-slide-up" style={{ letterSpacing: '0.1em', marginBottom: 'var(--space-4)', fontWeight: 500, color: 'rgba(255,255,255,0.8)' }}>
            {destination.country} &mdash; {destination.region}
          </p>
          <h1 className="text-serif animate-slide-up" style={{ fontSize: 'clamp(4rem, 10vw, 7rem)', lineHeight: 1, marginBottom: 'var(--space-4)', animationDelay: '100ms', color: 'var(--color-white)' }}>
            {destination.name}
          </h1>
          <p className="text-2xl animate-slide-up" style={{ maxWidth: '800px', fontWeight: 300, animationDelay: '200ms', color: 'rgba(255,255,255,0.9)' }}>
            {destination.tagline}
          </p>
        </div>
      </section>

      {/* Sticky Sub-Navigation */}
      <nav style={{ 
        position: 'sticky', 
        top: 'var(--header-height)', 
        zIndex: 40, 
        backgroundColor: 'rgba(250, 249, 246, 0.95)',
        borderBottom: '1px solid var(--color-border)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)'
      }}>
        <div className="container">
          <ul style={{ 
            display: 'flex', 
            gap: 'var(--space-8)', 
            overflowX: 'auto', 
            padding: 'var(--space-4) 0',
            whiteSpace: 'nowrap',
            scrollbarWidth: 'none', // Firefox
            msOverflowStyle: 'none' // IE/Edge
          }} className="sub-nav-list">
            <li><a href="#overview" className="text-sm uppercase hover:text-accent font-medium transition-colors" style={{ letterSpacing: '0.05em' }}>Overview</a></li>
            <li><a href="#places" className="text-sm uppercase hover:text-accent font-medium transition-colors" style={{ letterSpacing: '0.05em' }}>Places</a></li>
            <li><a href="#weather" className="text-sm uppercase hover:text-accent font-medium transition-colors" style={{ letterSpacing: '0.05em' }}>Weather</a></li>
            <li><a href="#ask-tavira" className="text-sm uppercase hover:text-accent font-medium transition-colors" style={{ letterSpacing: '0.05em' }}>Ask Tavira</a></li>
            <li><a href="#itinerary-planner" className="text-sm uppercase hover:text-accent font-medium transition-colors" style={{ letterSpacing: '0.05em' }}>Itinerary</a></li>
          </ul>
        </div>
      </nav>

      {/* 2 & 3. Editorial Intro & At a Glance */}
      <DestinationOverview destination={destination} />

      {/* 4. Current Weather */}
      <section id="weather" style={{ backgroundColor: 'var(--color-text-primary)', color: 'var(--color-bg-primary)', padding: 'var(--space-16) 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-8)' }}>
            <div>
              <p className="text-xs uppercase" style={{ letterSpacing: '0.1em', marginBottom: 'var(--space-2)', color: 'rgba(255,255,255,0.5)' }}>Live Conditions</p>
              <h2 className="text-serif text-3xl">Current Climate</h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: 'var(--space-2)' }}>Local time: {weather?.localTime || '...'}</p>
            </div>
            
            {weather ? (
              <div style={{ display: 'flex', gap: 'var(--space-12)', flexWrap: 'wrap', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                  <Thermometer size={40} className="text-accent" strokeWidth={1} />
                  <div>
                    <p className="text-4xl" style={{ fontWeight: 300, lineHeight: 1 }}>{weather.temperature}°C</p>
                    <p className="text-sm uppercase" style={{ letterSpacing: '0.05em', marginTop: 'var(--space-1)', color: 'rgba(255,255,255,0.7)' }}>{weather.condition}</p>
                  </div>
                </div>
                
                <div style={{ width: '1px', height: '40px', backgroundColor: 'rgba(255,255,255,0.2)' }} className="hidden md-block" />
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', color: 'rgba(255,255,255,0.8)' }}>
                  <p className="text-sm flex items-center gap-3"><Wind size={16} opacity={0.6}/> Wind {weather.windSpeed} km/h</p>
                  <p className="text-sm flex items-center gap-3"><Droplets size={16} opacity={0.6}/> Humidity {weather.humidity}%</p>
                </div>
              </div>
            ) : (
              <div style={{ color: 'rgba(255,255,255,0.5)' }}>Syncing local meteorological data...</div>
            )}
          </div>
        </div>
      </section>

      {/* 5. Famous Places */}
      <section id="places" className="container" style={{ padding: 'var(--space-32) 0' }}>
        <h2 className="text-serif text-center" style={{ fontSize: 'var(--text-4xl)', marginBottom: 'var(--space-24)' }}>Notable Places</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-32)' }}>
          {destination.places.map((place, index) => {
            const pImg = imageService.getImage(place.imageId);
            const isEven = index % 2 === 0;
            return (
              <div key={place.id} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-16)', alignItems: 'center' }} className="place-grid">
                <div style={{ order: isEven ? 1 : 2 }}>
                  <img src={pImg.url} alt={pImg.alt} style={{ width: '100%', height: '500px', objectFit: 'cover' }} loading="lazy" />
                </div>
                <div style={{ order: isEven ? 2 : 1, padding: isEven ? '0 var(--space-8) 0 0' : '0 0 0 var(--space-8)' }} className="place-content">
                  <p className="text-xs uppercase text-accent" style={{ letterSpacing: '0.1em', marginBottom: 'var(--space-4)', fontWeight: 600 }}>0{index + 1}</p>
                  <h3 className="text-serif text-4xl" style={{ marginBottom: 'var(--space-6)', lineHeight: 1.2 }}>{place.name}</h3>
                  <p className="text-secondary text-lg" style={{ marginBottom: 'var(--space-8)', lineHeight: 1.8 }}>{place.description}</p>
                  
                  <div style={{ display: 'flex', gap: 'var(--space-8)', borderTop: '1px solid var(--color-border)', paddingTop: 'var(--space-6)' }}>
                    <div>
                      <p className="text-xs text-secondary uppercase" style={{ letterSpacing: '0.05em', marginBottom: '8px' }}>Duration</p>
                      <p className="text-sm flex items-center gap-2 font-medium"><Clock size={14} className="text-secondary" />{place.duration}</p>
                    </div>
                    <div>
                      <p className="text-xs text-secondary uppercase" style={{ letterSpacing: '0.05em', marginBottom: '8px' }}>Best Time</p>
                      <p className="text-sm font-medium">{place.bestTime}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. Ask Tavira */}
      <section id="ask-tavira" style={{ backgroundColor: 'var(--color-bg-secondary)', padding: 'var(--space-32) 0' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
            <Sparkles className="text-accent mx-auto" size={24} style={{ marginBottom: 'var(--space-4)' }} />
            <h2 className="text-serif" style={{ fontSize: 'var(--text-4xl)', marginBottom: 'var(--space-4)' }}>Ask Tavira</h2>
            <p className="text-secondary text-lg">Your intelligent, context-aware companion for {destination.name}.</p>
          </div>

          <div style={{ 
            backgroundColor: 'var(--color-bg-primary)', 
            border: '1px solid var(--color-border)',
            display: 'flex',
            flexDirection: 'column',
            height: '450px',
            boxShadow: 'var(--shadow-md)'
          }}>
            <div style={{ flex: 1, overflowY: 'auto', padding: 'var(--space-8)', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
              {conversation.length === 0 ? (
                <div style={{ margin: 'auto', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
                  <p style={{ marginBottom: 'var(--space-8)', fontSize: 'var(--text-lg)' }}>Curious about something specific?</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', justifyContent: 'center' }}>
                    <button onClick={() => handleQuickQuestion("What's the best local food to try?")} className="badge" style={{ cursor: 'pointer', border: '1px solid var(--color-border)', padding: 'var(--space-2) var(--space-4)', fontSize: 'var(--text-sm)' }}>Local Dining</button>
                    <button onClick={() => handleQuickQuestion("How should I pack for the weather?")} className="badge" style={{ cursor: 'pointer', border: '1px solid var(--color-border)', padding: 'var(--space-2) var(--space-4)', fontSize: 'var(--text-sm)' }}>Packing Guide</button>
                    <button onClick={() => handleQuickQuestion("Is it easy to get around on foot?")} className="badge" style={{ cursor: 'pointer', border: '1px solid var(--color-border)', padding: 'var(--space-2) var(--space-4)', fontSize: 'var(--text-sm)' }}>Transportation</button>
                  </div>
                </div>
              ) : (
                conversation.map((msg, idx) => (
                  <div key={idx} style={{ 
                    alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                    backgroundColor: msg.role === 'user' ? 'var(--color-bg-secondary)' : 'transparent',
                    padding: msg.role === 'user' ? 'var(--space-4)' : 'var(--space-2) 0',
                    maxWidth: '85%',
                    lineHeight: 1.7,
                    borderLeft: msg.role === 'assistant' ? '2px solid var(--color-accent-primary)' : 'none',
                    paddingLeft: msg.role === 'assistant' ? 'var(--space-4)' : (msg.role === 'user' ? 'var(--space-4)' : '0')
                  }}>
                    {msg.role === 'assistant' && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '11px', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>
                        Tavira Assistant
                      </div>
                    )}
                    <p style={{ color: msg.role === 'user' ? 'var(--color-text-primary)' : 'var(--color-text-secondary)' }}>{msg.text}</p>
                  </div>
                ))
              )}
              {assistantLoading && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--color-text-secondary)', paddingLeft: 'var(--space-4)', borderLeft: '2px solid var(--color-border)' }}>
                  <div className="typing-dot" /> <div className="typing-dot" style={{ animationDelay: '0.2s' }} /> <div className="typing-dot" style={{ animationDelay: '0.4s' }} />
                </div>
              )}
            </div>
            
            <form id="assistant-form" onSubmit={handleAssistantSubmit} style={{ 
              borderTop: '1px solid var(--color-border)',
              padding: 'var(--space-4)',
              display: 'flex',
              gap: 'var(--space-4)',
              backgroundColor: 'var(--color-bg-primary)'
            }}>
              <input 
                type="text" 
                value={assistantMsg}
                onChange={(e) => setAssistantMsg(e.target.value)}
                placeholder={`Ask about ${destination.name}...`}
                style={{ flex: 1, border: 'none', outline: 'none', padding: 'var(--space-2)', background: 'transparent', fontFamily: 'var(--font-sans)', fontSize: 'var(--text-base)' }}
              />
              <Button type="submit" variant="primary" disabled={!assistantMsg.trim() || assistantLoading}>
                Ask
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* 7 & 8. Itinerary Planner */}
      <section id="itinerary-planner" className="container" style={{ padding: 'var(--space-32) 0' }}>
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto var(--space-16)' }}>
          <p className="text-xs uppercase text-accent" style={{ letterSpacing: '0.1em', marginBottom: 'var(--space-4)', fontWeight: 600 }}>Plan a journey</p>
          <h2 className="text-serif" style={{ fontSize: 'var(--text-4xl)', marginBottom: 'var(--space-4)' }}>Structure your days</h2>
          <p className="text-secondary text-lg">Generate a thoughtful, balanced itinerary tailored to the rhythm of {destination.name}.</p>
        </div>

        <div style={{ 
          display: 'flex', gap: 'var(--space-6)', justifyContent: 'center', flexWrap: 'wrap', marginBottom: 'var(--space-16)',
          padding: 'var(--space-8)', border: '1px solid var(--color-border)'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label className="text-xs uppercase text-secondary" style={{ letterSpacing: '0.05em' }}>Duration</label>
            <select value={itinDays} onChange={(e) => setItinDays(e.target.value)} className="input" style={{ minWidth: '150px' }}>
              <option value="1">1 Day</option>
              <option value="2">2 Days</option>
              <option value="3">3 Days</option>
              <option value="5">5 Days</option>
            </select>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label className="text-xs uppercase text-secondary" style={{ letterSpacing: '0.05em' }}>Travel Style</label>
            <select value={itinStyle} onChange={(e) => setItinStyle(e.target.value)} className="input" style={{ minWidth: '200px' }}>
              <option value="Balanced">Balanced</option>
              <option value="Slow">Relaxed & Slow</option>
              <option value="Culture-heavy">Culture Heavy</option>
              <option value="Outdoors">Outdoors & Nature</option>
            </select>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <Button onClick={handleGenerateItinerary} disabled={itinLoading} variant="primary" style={{ height: '42px', padding: '0 var(--space-8)' }}>
              {itinLoading ? 'Curating...' : 'Generate'}
            </Button>
          </div>
        </div>

        {/* Itinerary Result (Timeline Layout) */}
        {itinLoading ? (
          <div style={{ textAlign: 'center', padding: 'var(--space-12) 0', color: 'var(--color-text-secondary)' }}>
            <div className="spinner" style={{ margin: '0 auto var(--space-4)' }} />
            Designing your days...
          </div>
        ) : itinerary ? (
          <div style={{ maxWidth: '800px', margin: '0 auto' }} className="animate-slide-up">
            {itinerary.map((day) => (
              <div key={day.day} style={{ marginBottom: 'var(--space-16)' }}>
                <h3 className="text-serif" style={{ fontSize: 'var(--text-3xl)', borderBottom: '1px solid var(--color-text-primary)', paddingBottom: 'var(--space-2)', marginBottom: 'var(--space-8)' }}>
                  Day 0{day.day}
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                  {day.items.map((item, i) => (
                    <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 'var(--space-8)', position: 'relative', paddingBottom: i !== day.items.length - 1 ? 'var(--space-8)' : '0' }} className="itinerary-item">
                      
                      {/* Timeline rule */}
                      {i !== day.items.length - 1 && (
                        <div style={{ position: 'absolute', left: '120px', top: '24px', bottom: 0, width: '1px', backgroundColor: 'var(--color-border)' }} className="timeline-rule" />
                      )}

                      <div className="text-xs uppercase text-secondary" style={{ paddingTop: '4px', letterSpacing: '0.1em', fontWeight: 500 }}>
                        {item.timeOfDay}
                      </div>
                      
                      <div style={{ paddingLeft: 'var(--space-6)', position: 'relative' }}>
                        {/* Timeline dot */}
                        <div style={{ position: 'absolute', left: '-4px', top: '8px', width: '9px', height: '9px', backgroundColor: 'var(--color-bg-primary)', border: '2px solid var(--color-accent-primary)', borderRadius: '50%' }} className="timeline-dot" />
                        
                        <h4 className="text-xl text-serif" style={{ marginBottom: 'var(--space-1)' }}>{item.activity}</h4>
                        {item.place && <p className="text-sm uppercase text-secondary" style={{ letterSpacing: '0.05em', marginBottom: 'var(--space-4)' }}>{item.place}</p>}
                        <p className="text-secondary" style={{ lineHeight: 1.6, marginBottom: 'var(--space-4)' }}>{item.note}</p>
                        <p className="text-xs text-secondary flex items-center gap-2"><Clock size={12}/> {item.duration}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </section>

      {/* 9. Related Destinations */}
      {related.length > 0 && (
        <section style={{ backgroundColor: 'var(--color-bg-secondary)', padding: 'var(--space-24) 0' }}>
          <div className="container">
            <h2 className="text-serif" style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-12)', textAlign: 'center' }}>Continue exploring</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-8)' }}>
              {related.map(dest => {
                const img = imageService.getImage(dest.heroImageId);
                return (
                  <Link to={`/destinations/${dest.slug}`} key={dest.id} className="group" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                    <div style={{ height: '300px', overflow: 'hidden', marginBottom: 'var(--space-4)' }}>
                      <img src={img.url} alt={img.alt} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform var(--transition-slow)' }} className="related-img" loading="lazy" />
                    </div>
                    <div>
                      <h3 className="text-serif text-2xl" style={{ marginBottom: 'var(--space-1)' }}>{dest.name}</h3>
                      <p className="text-sm uppercase text-secondary" style={{ letterSpacing: '0.05em' }}>{dest.country}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Internal CSS for page specific animations/layout fixes */}
      <style>{`
        @media (max-width: 768px) {
          .detail-grid { grid-template-columns: 1fr !important; gap: var(--space-12) !important; }
          .place-grid { grid-template-columns: 1fr !important; gap: var(--space-8) !important; }
          .place-grid > div { order: 0 !important; }
          .place-content { padding: 0 !important; }
          .itinerary-item { grid-template-columns: 1fr !important; gap: var(--space-2) !important; }
          .timeline-rule { display: none; }
          .timeline-dot { display: none; }
          .itinerary-item > div:last-child { padding-left: 0 !important; }
        }
        .sub-nav-list::-webkit-scrollbar { display: none; }
        .typing-dot { width: 6px; height: 6px; background-color: var(--color-text-secondary); border-radius: 50%; animation: typePulse 1.4s infinite ease-in-out; }
        @keyframes typePulse { 0%, 100% { transform: scale(0.8); opacity: 0.5; } 50% { transform: scale(1.2); opacity: 1; } }
        .spinner { width: 30px; height: 30px; border: 2px solid var(--color-border); border-top-color: var(--color-text-primary); border-radius: 50%; animation: spin 1s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .group:hover .related-img { transform: scale(1.05); }
      `}</style>
    </div>
  );
};
