import React, { useState, useContext } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { JobCard } from './components/JobCard';
import { LoginModal } from './components/LoginModal';
import { RegisterModal } from './components/RegisterModal';
import { ProfileDetailModal } from './components/ProfileDetailModal';
import { Dashboard } from './components/Dashboard';
import { AppContext } from './context/AppContext';
import { categories } from './data/mockProfiles';
import { Filter, Sparkles, Star, ChevronDown, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const { profiles, filters, setFilters, selectedProfileId } = useContext(AppContext);
  
  // Modal open states
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  
  // Dashboard view toggle
  const [showDashboard, setShowDashboard] = useState(false);

  // Experience options
  const experienceOptions = [
    { value: 'all', label: 'All Experience Levels' },
    { value: 'entry', label: 'Entry Level (< 2 Years)' },
    { value: 'mid', label: 'Mid Level (2 - 5 Years)' },
    { value: 'senior', label: 'Senior Level (5+ Years)' }
  ];

  // Filtering Logic
  const filteredProfiles = profiles.filter(p => {
    // 1. Search Query (matches name, role, skills)
    const matchesSearch = !filters.search || 
      p.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      p.role.toLowerCase().includes(filters.search.toLowerCase()) ||
      p.skills.some(s => s.toLowerCase().includes(filters.search.toLowerCase()));

    // 2. Category Filter
    const matchesCategory = filters.category === 'all' || p.category === filters.category;

    // 3. Location Filter
    const matchesLocation = !filters.location || 
      p.location.toLowerCase().includes(filters.location.toLowerCase());

    // 4. Experience Filter
    let matchesExperience = true;
    if (filters.experience !== 'all') {
      if (filters.experience === 'entry') matchesExperience = p.experience < 2;
      else if (filters.experience === 'mid') matchesExperience = p.experience >= 2 && p.experience <= 5;
      else if (filters.experience === 'senior') matchesExperience = p.experience > 5;
    }

    return matchesSearch && matchesCategory && matchesLocation && matchesExperience;
  });

  const handleCategorySelect = (catId) => {
    setFilters(prev => ({ ...prev, category: catId }));
  };

  const handleExperienceChange = (e) => {
    setFilters(prev => ({ ...prev, experience: e.target.value }));
  };

  const resetAllFilters = () => {
    setFilters({
      search: '',
      category: 'all',
      experience: 'all',
      type: 'all',
      location: ''
    });
  };

  return (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Navigation header */}
      <Navbar 
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenRegister={() => setIsRegisterOpen(true)}
        onShowDashboard={setShowDashboard}
        showDashboard={showDashboard}
      />

      <main style={{ flexGrow: 1 }}>
        {showDashboard ? (
          /* WORKSPACE DASHBOARD VIEW */
          <Dashboard 
            onOpenLogin={() => setIsLoginOpen(true)}
            onOpenRegister={() => setIsRegisterOpen(true)}
          />
        ) : (
          /* MAIN DIRECTORY SEARCH PAGE */
          <>
            {/* Hero search section */}
            <HeroSection />

            {/* Content Filters & Directory list */}
            <section style={{ padding: '50px 0 80px 0' }}>
              <div className="container">
                
                {/* Filters Panel Header */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '16px',
                  marginBottom: '32px'
                }}>
                  {/* Category Pills Navigation */}
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px',
                    overflowX: 'auto',
                    paddingBottom: '4px'
                  }}>
                    {categories.map(cat => {
                      // Calculate active counts dynamically
                      const currentCount = cat.id === 'all' 
                        ? profiles.length 
                        : profiles.filter(p => p.category === cat.id).length;

                      const isActive = filters.category === cat.id;

                      return (
                        <button
                          key={cat.id}
                          onClick={() => handleCategorySelect(cat.id)}
                          className={`btn btn-sm ${isActive ? 'btn-primary' : 'btn-secondary'}`}
                          style={{
                            borderRadius: 'var(--radius-full)',
                            padding: '8px 18px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            border: isActive ? '1px solid transparent' : '1px solid var(--border-color)',
                            fontSize: '13px'
                          }}
                        >
                          <span>{cat.name}</span>
                          <span style={{
                            backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : 'var(--bg-surface-hover)',
                            color: isActive ? '#fff' : 'var(--text-muted)',
                            padding: '2px 6px',
                            borderRadius: '10px',
                            fontSize: '10px',
                            fontWeight: 'bold'
                          }}>
                            {currentCount}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Dropdown Filters (Experience) */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Filter size={16} style={{ color: 'var(--text-light)' }} />
                    <select
                      value={filters.experience}
                      onChange={handleExperienceChange}
                      style={{
                        padding: '8px 32px 8px 16px',
                        borderRadius: 'var(--radius-sm)',
                        width: '200px',
                        fontSize: '13px',
                        cursor: 'pointer'
                      }}
                    >
                      {experienceOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Directory Count Title */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '20px'
                }}>
                  <span style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 500 }}>
                    Showing <strong>{filteredProfiles.length}</strong> matching candidate profiles
                  </span>
                  {(filters.search || filters.category !== 'all' || filters.location || filters.experience !== 'all') && (
                    <button 
                      onClick={resetAllFilters} 
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--primary)',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                      }}
                    >
                      Clear Filters
                    </button>
                  )}
                </div>

                {/* Job Seekers Grid */}
                <AnimatePresence mode="popLayout">
                  {filteredProfiles.length === 0 ? (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="glass"
                      style={{
                        padding: '60px 20px',
                        borderRadius: 'var(--radius-md)',
                        textAlign: 'center',
                        color: 'var(--text-muted)'
                      }}
                    >
                      <Filter size={48} style={{ color: 'var(--text-light)', marginBottom: '16px' }} />
                      <h4 style={{ fontSize: '20px', color: 'var(--text-main)', marginBottom: '8px' }}>
                        No Matches Found
                      </h4>
                      <p style={{ maxWidth: '460px', margin: '0 auto 20px auto', fontSize: '14px' }}>
                        We couldn't find any job or creative profiles matching your current filters. 
                        Try adjusting your keywords, selecting a different category, or resetting your search.
                      </p>
                      <button onClick={resetAllFilters} className="btn btn-primary btn-sm">
                        Reset All Filters
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div 
                      layout
                      className="grid-cols-dynamic"
                    >
                      {filteredProfiles.map(profile => (
                        <JobCard key={profile.id} profile={profile} />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </section>
          </>
        )}
      </main>

      {/* Footer banner */}
      <footer className="glass" style={{
        borderTop: '1px solid var(--border-color)',
        padding: '40px 0',
        backgroundColor: 'rgba(15, 22, 36, 0.4)',
        fontSize: '13px',
        color: 'var(--text-muted)',
        textAlign: 'center'
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '20px'
          }}>
            <div style={{ textAlign: 'left' }}>
              <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-main)', display: 'block' }}>
                CareerMatch
              </span>
              <span>Matrimonial Matching for Professional Endeavors.</span>
            </div>
            <div style={{ display: 'flex', gap: '20px' }}>
              <a href="#" onClick={(e) => { e.preventDefault(); resetAllFilters(); setShowDashboard(false); }}>Talent Registry</a>
              <a href="#" onClick={(e) => { e.preventDefault(); setShowDashboard(true); }}>Favorites Portal</a>
              <a href="#" onClick={(e) => { e.preventDefault(); setIsRegisterOpen(true); }}>Register Seeker</a>
            </div>
          </div>
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '20px', fontSize: '11px', color: 'var(--text-light)' }}>
            © {new Date().getFullYear()} CareerMatch Inc. All rights reserved. Registered candidates details are protected. Logged-in verification required for contact discovery.
          </div>
        </div>
      </footer>

      {/* TRANSACTION OVERLAY MODALS */}
      <LoginModal 
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSwitchToRegister={() => {
          setIsLoginOpen(false);
          setIsRegisterOpen(true);
        }}
      />

      <RegisterModal 
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onSwitchToLogin={() => {
          setIsRegisterOpen(false);
          setIsLoginOpen(true);
        }}
      />

      <ProfileDetailModal 
        onOpenLogin={() => {
          setIsLoginOpen(true);
        }}
      />

    </div>
  );
}

export default App;
