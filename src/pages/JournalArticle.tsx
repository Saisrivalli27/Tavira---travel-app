import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';
import { MOCK_JOURNAL, type JournalArticle as ArticleType } from '../data/mockJournal';
import { imageService } from '../services/imageService';

export const JournalArticle: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<ArticleType | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (slug) {
      const found = MOCK_JOURNAL.find(a => a.slug === slug);
      setArticle(found || null);
    }
  }, [slug]);

  if (!article) {
    return (
      <div style={{ height: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h1 className="text-serif text-3xl mb-4">Story not found</h1>
        <Link to="/journal" className="text-accent hover:underline">Return to The Journal</Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-in" style={{ paddingBottom: 'var(--space-32)' }}>
      {/* Hero Image */}
      <div style={{ height: '65vh', minHeight: '400px', width: '100%', position: 'relative' }}>
        <img 
          src={imageService.getImage(article.imageId).url} 
          alt={article.title} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(17, 20, 26, 0.3)' }} />
        
        {/* Back Button */}
        <Link 
          to="/journal" 
          style={{ 
            position: 'absolute', 
            top: 'calc(var(--header-height) + var(--space-6))', 
            left: 'var(--space-6)',
            display: 'flex', 
            alignItems: 'center', 
            gap: 'var(--space-2)',
            color: 'var(--color-white)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            fontSize: 'var(--text-xs)',
            fontWeight: 600,
            textDecoration: 'none',
            zIndex: 10
          }}
          className="hover:text-accent transition-colors hidden md-flex"
        >
          <ArrowLeft size={16} /> Back to Journal
        </Link>
      </div>

      {/* Article Header */}
      <div className="container" style={{ marginTop: '-80px', position: 'relative', zIndex: 10 }}>
        <div style={{ 
          backgroundColor: 'var(--color-bg-primary)', 
          padding: 'var(--space-12) var(--space-8)', 
          maxWidth: '800px', 
          margin: '0 auto',
          textAlign: 'center',
          boxShadow: 'var(--shadow-md)',
          border: '1px solid var(--color-border)'
        }}>
          <p className="text-xs uppercase text-accent mb-4" style={{ letterSpacing: '0.1em', fontWeight: 600 }}>{article.category}</p>
          <h1 className="text-serif" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: 'var(--space-6)', lineHeight: 1.1 }}>
            {article.title}
          </h1>
          <p className="text-secondary text-xl" style={{ marginBottom: 'var(--space-8)', fontStyle: 'italic' }}>
            {article.excerpt}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-6)', color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' }}>
            <span>By <strong>{article.author}</strong></span>
            <span>&middot;</span>
            <span>{article.date}</span>
            <span>&middot;</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={14} /> {article.readTime}</span>
          </div>
        </div>
      </div>

      {/* Article Body */}
      <div className="container" style={{ paddingTop: 'var(--space-16)' }}>
        <div 
          className="article-content"
          style={{ 
            maxWidth: '680px', 
            margin: '0 auto', 
            fontSize: 'var(--text-lg)', 
            lineHeight: 1.8,
            color: 'var(--color-text-primary)'
          }}
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </div>

      {/* Next Story / Footer */}
      <div className="container" style={{ marginTop: 'var(--space-32)', borderTop: '1px solid var(--color-border)', paddingTop: 'var(--space-16)' }}>
        <div style={{ textAlign: 'center' }}>
          <p className="text-sm uppercase text-secondary mb-6" style={{ letterSpacing: '0.1em' }}>Share this story</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-4)' }}>
            <button className="btn-secondary" style={{ padding: 'var(--space-2) var(--space-6)', borderRadius: '100px' }}>Copy Link</button>
          </div>
        </div>
      </div>

      <style>{`
        .article-content p {
          margin-bottom: var(--space-6);
        }
        .article-content h2, .article-content h3 {
          margin-top: var(--space-12);
          margin-bottom: var(--space-4);
          font-family: var(--font-serif);
          color: var(--color-text-primary);
        }
        .article-content em {
          font-family: var(--font-serif);
          font-size: 1.1em;
        }
        .article-content blockquote {
          border-left: 2px solid var(--color-accent-primary);
          padding-left: var(--space-6);
          margin: var(--space-8) 0;
          font-family: var(--font-serif);
          font-size: 1.5rem;
          font-style: italic;
          color: var(--color-text-secondary);
        }
      `}</style>
    </div>
  );
};
