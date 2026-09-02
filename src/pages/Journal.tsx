import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_JOURNAL } from '../data/mockJournal';
import { imageService } from '../services/imageService';
import { Clock } from 'lucide-react';

export const Journal: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  const categories = ['All', 'Food & culture', 'City notes', 'Slow travel', 'Nature', 'Travel advice'];
  
  const filteredArticles = activeCategory === 'All' 
    ? MOCK_JOURNAL 
    : MOCK_JOURNAL.filter(a => a.category === activeCategory);

  const heroArticle = filteredArticles[0];
  const gridArticles = filteredArticles.slice(1);

  return (
    <div className="animate-fade-in" style={{ paddingTop: 'calc(var(--header-height) + var(--space-16))', paddingBottom: 'var(--space-32)' }}>
      <div className="container">
        
        <header style={{ marginBottom: 'var(--space-16)', textAlign: 'center' }}>
          <p className="text-sm uppercase text-accent mb-4" style={{ letterSpacing: '0.1em', fontWeight: 600 }}>Tavira Editorial</p>
          <h1 className="text-serif" style={{ fontSize: 'clamp(3rem, 8vw, 5.5rem)', marginBottom: 'var(--space-6)', lineHeight: 1.1 }}>
            The Journal
          </h1>
          <p className="text-secondary text-xl" style={{ maxWidth: '600px', margin: '0 auto', fontWeight: 300 }}>
            Dispatches, essays, and field notes from those who travel thoughtfully.
          </p>
        </header>

        {/* Category Filters */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: 'var(--space-6)', 
          flexWrap: 'wrap',
          marginBottom: 'var(--space-16)',
          borderBottom: '1px solid var(--color-border)',
          paddingBottom: 'var(--space-6)'
        }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-sm uppercase ${activeCategory === cat ? 'text-primary' : 'text-secondary'}`}
              style={{ 
                letterSpacing: '0.05em',
                fontWeight: activeCategory === cat ? 600 : 400,
                borderBottom: activeCategory === cat ? '1px solid var(--color-text-primary)' : '1px solid transparent',
                paddingBottom: 'var(--space-2)'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {heroArticle && (
          <div style={{ marginBottom: 'var(--space-24)' }}>
            <Link to={`/journal/${heroArticle.slug}`} className="group" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-8)', textDecoration: 'none', color: 'inherit' }}>
              <div style={{ height: '60vh', minHeight: '400px', overflow: 'hidden' }}>
                <img 
                  src={imageService.getImage(heroArticle.imageId).url} 
                  alt={heroArticle.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform var(--transition-slow)' }}
                  className="group-hover:scale-105"
                />
              </div>
              <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                <p className="text-xs uppercase text-accent mb-4" style={{ letterSpacing: '0.1em' }}>{heroArticle.category}</p>
                <h2 className="text-serif group-hover:text-accent transition-colors" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: 'var(--space-4)' }}>
                  {heroArticle.title}
                </h2>
                <p className="text-secondary text-lg mb-6" style={{ lineHeight: 1.6 }}>
                  {heroArticle.excerpt}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-6)', color: 'var(--color-text-tertiary)', fontSize: 'var(--text-sm)' }}>
                  <span>{heroArticle.author}</span>
                  <span>&middot;</span>
                  <span>{heroArticle.date}</span>
                  <span>&middot;</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={14} /> {heroArticle.readTime}</span>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Grid Articles */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
          gap: 'var(--space-16) var(--space-8)'
        }}>
          {gridArticles.map(article => (
            <Link key={article.id} to={`/journal/${article.slug}`} className="group" style={{ display: 'flex', flexDirection: 'column', textDecoration: 'none', color: 'inherit' }}>
              <div style={{ height: '240px', overflow: 'hidden', marginBottom: 'var(--space-6)' }}>
                <img 
                  src={imageService.getImage(article.imageId).url} 
                  alt={article.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform var(--transition-slow)' }}
                  className="group-hover:scale-105"
                />
              </div>
              <p className="text-xs uppercase text-accent mb-3" style={{ letterSpacing: '0.1em' }}>{article.category}</p>
              <h3 className="text-serif text-2xl group-hover:text-accent transition-colors mb-3" style={{ lineHeight: 1.2 }}>
                {article.title}
              </h3>
              <p className="text-secondary mb-4" style={{ flex: 1 }}>
                {article.excerpt}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--color-border)', paddingTop: 'var(--space-4)' }}>
                <span className="text-sm text-secondary">{article.author}</span>
                <span className="text-xs text-tertiary flex items-center gap-1"><Clock size={12}/> {article.readTime}</span>
              </div>
            </Link>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div style={{ textAlign: 'center', padding: 'var(--space-24) 0', color: 'var(--color-text-secondary)' }}>
            No stories found in this category.
          </div>
        )}

      </div>
      <style>{`
        .group-hover\\:scale-105:hover { transform: scale(1.05); }
        .group-hover\\:text-accent:hover { color: var(--color-accent-primary); }
      `}</style>
    </div>
  );
};
