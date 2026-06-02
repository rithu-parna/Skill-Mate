import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Search, MapPin, Sparkles, Briefcase, Compass, Users } from 'lucide-react';

export const HeroSection = () => {
  const { filters, setFilters, profiles } = useContext(AppContext);

  const handleSearchChange = (e) => {
    setFilters(prev => ({ ...prev, search: e.target.value }));
  };

  const handleLocationChange = (e) => {
    setFilters(prev => ({ ...prev, location: e.target.value }));
  };

  // Count profiles per type
  const seekerCount = profiles.length;
  const corporateCount = profiles.filter(p => p.category === 'corporate').length;
  const creativeCount = profiles.filter(p => p.category === 'creative').length;
  const techCount = profiles.filter(p => p.category === 'technical').length;
  const tradeCount = profiles.filter(p => p.category === 'trades').length;

  return (
    <section style={{
      position: 'relative',
      padding: '80px 0 50px 0',
      background: 'radial-gradient(circle at 80% 20%, rgba(99, 102, 241, 0.1) 0%, transparent 50%), radial-gradient(circle at 10% 80%, rgba(236, 72, 153, 0.08) 0%, transparent 50%)',
      borderBottom: '1px solid var(--border-color)',
      overflow: 'hidden'
    }}>
      {/* Background glowing shapes */}
      <div style={{
        position: 'absolute',
        top: '-150px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '600px',
        height: '300px',
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(236, 72, 153, 0.2))',
        filter: 'blur(100px)',
        borderRadius: '50%',
        zIndex: 0,
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        
        {/* Glow pill */}
        <div className="glow-animation" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 16px',
          background: 'rgba(99, 102, 241, 0.1)',
          border: '1px solid rgba(99, 102, 241, 0.3)',
          borderRadius: 'var(--radius-full)',
          marginBottom: '28px',
          color: 'var(--primary)',
          fontSize: '13px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          <Sparkles size={14} />
          <span>The Next Generation Talent Matchmaker</span>
        </div>

        {/* Hero Headlines */}
        <h1 style={{
          fontSize: 'clamp(32px, 5vw, 56px)',
          fontWeight: 800,
          maxWidth: '850px',
          margin: '0 auto 20px auto',
          lineHeight: 1.15,
          color: 'var(--text-main)'
        }}>
          Where Great <span style={{
            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>Talents</span> Meet the Perfect <span style={{
            background: 'linear-gradient(135deg, var(--secondary), var(--accent))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>Opportunities</span>
        </h1>

        <p style={{
          fontSize: 'clamp(15px, 2vw, 18px)',
          maxWidth: '650px',
          margin: '0 auto 40px auto',
          color: 'var(--text-muted)'
        }}>
          A premium, matrimony-style matchmaking registry for professionals, creatives, and skilled services. 
          View verified portfolios and unlock instant contact details.
        </p>

        {/* Search Panel */}
        <div className="glass" style={{
          maxWidth: '780px',
          margin: '0 auto 50px auto',
          padding: '8px',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: '8px',
          alignItems: 'center'
        }}>
          {/* Keyword Search */}
          <div style={{
            position: 'relative',
            flex: '1 1 240px',
            display: 'flex',
            alignItems: 'center'
          }}>
            <Search size={18} style={{
              position: 'absolute',
              left: '14px',
              color: 'var(--text-light)'
            }} />
            <input 
              type="text" 
              placeholder="Search by name, role, or skills (e.g. Figma, SQL)..." 
              value={filters.search}
              onChange={handleSearchChange}
              style={{
                paddingLeft: '44px',
                border: 'none',
                backgroundColor: 'transparent',
                fontSize: '14px'
              }}
            />
          </div>

          <div style={{
            width: '1px',
            height: '24px',
            backgroundColor: 'var(--border-color)',
            display: 'none'
          }} className="d-md-flex" />

          {/* Location Search */}
          <div style={{
            position: 'relative',
            flex: '1 1 180px',
            display: 'flex',
            alignItems: 'center'
          }}>
            <MapPin size={18} style={{
              position: 'absolute',
              left: '14px',
              color: 'var(--text-light)'
            }} />
            <input 
              type="text" 
              placeholder="City, State..." 
              value={filters.location}
              onChange={handleLocationChange}
              style={{
                paddingLeft: '44px',
                border: 'none',
                backgroundColor: 'transparent',
                fontSize: '14px'
              }}
            />
          </div>

          <button 
            className="btn btn-primary"
            style={{
              flex: '1 1 100%',
              padding: '12px 28px',
              justifyContent: 'center',
              borderRadius: 'var(--radius-sm)'
            }}
          >
            Find Matches
          </button>
        </div>

        {/* Mini stats counters */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '24px 48px',
          maxWidth: '800px',
          margin: '0 auto',
          padding: '20px',
          borderRadius: 'var(--radius-md)',
          borderTop: '1px solid var(--border-color)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Users size={20} style={{ color: 'var(--primary)' }} />
            <div style={{ textAlign: 'left' }}>
              <span style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-main)', display: 'block', lineHeight: 1.1 }}>
                {seekerCount}
              </span>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>Registered Talents</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Briefcase size={20} style={{ color: 'var(--secondary)' }} />
            <div style={{ textAlign: 'left' }}>
              <span style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-main)', display: 'block', lineHeight: 1.1 }}>
                {corporateCount + techCount}
              </span>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>Corp & Tech Pros</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Compass size={20} style={{ color: 'var(--accent)' }} />
            <div style={{ textAlign: 'left' }}>
              <span style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-main)', display: 'block', lineHeight: 1.1 }}>
                {creativeCount}
              </span>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>Creative Services</span>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @media (min-width: 768px) {
          .d-md-flex { display: flex !important; }
          div.glass button {
            flex: 0 0 auto !important;
            width: auto !important;
          }
        }
      `}</style>
    </section>
  );
};
