import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { Heart, Phone, ShieldAlert, Eye, User, Lock, Award, Briefcase, GraduationCap, MapPin, ExternalLink, Calendar, Users, Building, Trash2 } from 'lucide-react';
import { JobCard } from './JobCard';
import { motion } from 'framer-motion';

export const Dashboard = ({ onOpenLogin, onOpenRegister }) => {
  const { 
    currentUser, 
    profiles, 
    favorites, 
    unlockedContacts,
    setSelectedProfileId,
    toggleFavorite 
  } = useContext(AppContext);

  const [activeTab, setActiveTab] = useState('saved'); // saved, unlocked, myprofile, views
  const [unlockLogs, setUnlockLogs] = useState([]);

  // Load unlock logs
  useEffect(() => {
    const logs = JSON.parse(localStorage.getItem('careermatch_unlock_logs') || '[]');
    setUnlockLogs(logs);

    // Default tab settings
    if (currentUser) {
      if (currentUser.accountType === 'seeker') {
        setActiveTab('myprofile');
      } else {
        setActiveTab('saved');
      }
    } else {
      setActiveTab('saved');
    }
  }, [currentUser, unlockedContacts]);

  // Filters for bookmarked profiles
  const bookmarkedProfiles = profiles.filter(p => favorites.includes(p.id));

  // Filters for unlocked profiles
  const unlockedProfiles = profiles.filter(p => unlockedContacts.includes(p.id));

  // Filter logs for who unlocked the logged-in candidate's profile
  const myProfileViews = currentUser && currentUser.accountType === 'seeker'
    ? unlockLogs.filter(log => log.unlockedProfileId === currentUser.id)
    : [];

  // Simulated recruiter views to seed the list if it's empty (making the UI look amazing)
  const getSeededViews = () => {
    if (!currentUser || currentUser.accountType !== 'seeker') return [];
    
    // Seed initial mock view logs
    const seedViews = [
      {
        id: 'seed-1',
        unlockedBy: 'Alex Rivera (Google Recruiting)',
        unlockedByMobile: '+1 (555) 304-2091',
        timestamp: '2 hours ago'
      },
      {
        id: 'seed-2',
        unlockedBy: 'Sarah Connor (Cyberdyne Systems)',
        unlockedByMobile: '+1 (555) 901-8840',
        timestamp: '1 day ago'
      }
    ];

    // Merge actual views with seed views
    const mappedActual = myProfileViews.map(v => ({
      id: v.id,
      unlockedBy: `${v.unlockedBy} (Verified Recruiter)`,
      unlockedByMobile: v.unlockedByMobile,
      timestamp: v.timestamp
    }));

    return [...mappedActual, ...seedViews];
  };

  const seededViews = getSeededViews();

  // Find current user's profile if seeker
  const myProfile = currentUser && currentUser.accountType === 'seeker'
    ? profiles.find(p => p.id === currentUser.id)
    : null;

  return (
    <div className="container" style={{ padding: '40px 24px', minHeight: '80vh' }}>
      
      {/* Dashboard Welcome Header */}
      <div className="glass" style={{
        padding: '30px',
        borderRadius: 'var(--radius-md)',
        marginBottom: '30px',
        border: '1px solid var(--border-color)',
        background: 'linear-gradient(135deg, rgba(15, 22, 36, 0.9), rgba(99, 102, 241, 0.05))',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', marginBottom: '8px' }}>
            <Award size={18} />
            <span style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              User Workspace
            </span>
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '6px' }}>
            {currentUser 
              ? `Hello, ${currentUser.name}!` 
              : 'Guest Dashboard'}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: 0 }}>
            {currentUser 
              ? (currentUser.accountType === 'employer' 
                  ? `Recruiting for ${currentUser.organization || 'Independent Recruitment'}. Manage matches and unlocked contacts.`
                  : `Role: ${currentUser.role || 'Job Seeker'}. Track who unlocks your contact card.`)
              : 'Log in to unlock custom workspaces, track connections, and configure job matrimony parameters.'}
          </p>
        </div>

        {!currentUser && (
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={onOpenLogin} className="btn btn-secondary btn-sm">Log In</button>
            <button onClick={onOpenRegister} className="btn btn-primary btn-sm">Register</button>
          </div>
        )}
      </div>

      {/* Main Grid Panel */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '30px' }} className="dashboard-grid">
        
        {/* Navigation Sidebar/Tabs */}
        <div style={{ flexShrink: 0 }}>
          <div className="glass" style={{
            padding: '8px',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '4px',
            border: '1px solid var(--border-color)'
          }}>
            {/* 1. Favorites Tab (Available to all) */}
            <button
              onClick={() => setActiveTab('saved')}
              className={`btn btn-sm ${activeTab === 'saved' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ flexGrow: 1, border: 'none' }}
            >
              <Heart size={14} fill={activeTab === 'saved' ? '#fff' : 'transparent'} />
              <span>Bookmarked ({favorites.length})</span>
            </button>

            {/* 2. Recruiter Special: Unlocked Contacts Tab */}
            {currentUser && currentUser.accountType === 'employer' && (
              <button
                onClick={() => setActiveTab('unlocked')}
                className={`btn btn-sm ${activeTab === 'unlocked' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ flexGrow: 1, border: 'none' }}
              >
                <Phone size={14} />
                <span>Unlocked Contacts ({unlockedContacts.length})</span>
              </button>
            )}

            {/* 3. Seeker Special: My Profile Tab */}
            {currentUser && currentUser.accountType === 'seeker' && (
              <>
                <button
                  onClick={() => setActiveTab('myprofile')}
                  className={`btn btn-sm ${activeTab === 'myprofile' ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ flexGrow: 1, border: 'none' }}
                >
                  <User size={14} />
                  <span>My Profile Details</span>
                </button>

                {/* 4. Seeker Special: Who Viewed Contact Tab */}
                <button
                  onClick={() => setActiveTab('views')}
                  className={`btn btn-sm ${activeTab === 'views' ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ flexGrow: 1, border: 'none' }}
                >
                  <Eye size={14} />
                  <span>Who Viewed Me ({seededViews.length})</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Tab Content Panel */}
        <div style={{ flexGrow: 1 }}>
          
          {/* TAB 1: BOOKMARKED PROFILES */}
          {activeTab === 'saved' && (
            <div>
              <h3 style={{ fontSize: '20px', marginBottom: '20px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Heart size={18} style={{ color: 'var(--secondary)' }} />
                Your Bookmarked Candidates
              </h3>

              {bookmarkedProfiles.length === 0 ? (
                <div className="glass" style={{
                  padding: '40px',
                  borderRadius: 'var(--radius-sm)',
                  textAlign: 'center',
                  color: 'var(--text-muted)'
                }}>
                  <Heart size={32} style={{ color: 'var(--text-light)', marginBottom: '12px' }} />
                  <p>You haven't bookmarked any profiles yet.</p>
                  <p style={{ fontSize: '13px', marginTop: '6px' }}>Go back to the registry page and click the heart icon on any card to save it here.</p>
                </div>
              ) : (
                <div className="grid-cols-dynamic">
                  {bookmarkedProfiles.map(profile => (
                    <JobCard key={profile.id} profile={profile} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: RECRUITER UNLOCKED CONTACTS */}
          {activeTab === 'unlocked' && currentUser && currentUser.accountType === 'employer' && (
            <div>
              <h3 style={{ fontSize: '20px', marginBottom: '20px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={18} style={{ color: 'var(--success)' }} />
                Unlocked Talent Directory
              </h3>

              {unlockedProfiles.length === 0 ? (
                <div className="glass" style={{
                  padding: '40px',
                  borderRadius: 'var(--radius-sm)',
                  textAlign: 'center',
                  color: 'var(--text-muted)'
                }}>
                  <Lock size={32} style={{ color: 'var(--text-light)', marginBottom: '12px' }} />
                  <p>No contact details unlocked yet.</p>
                  <p style={{ fontSize: '13px', marginTop: '6px' }}>Browse job seeker cards, view details, and click "Unlock Contact Details".</p>
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
                  {unlockedProfiles.map(profile => (
                    <div 
                      key={profile.id}
                      className="glass"
                      style={{
                        padding: '20px',
                        borderRadius: 'var(--radius-sm)',
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '16px',
                        border: '1px solid var(--border-color)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        {profile.image ? (
                          <img 
                            src={profile.image} 
                            alt={profile.name} 
                            style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} 
                          />
                        ) : (
                          <div style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '50%',
                            backgroundColor: 'var(--primary-light)',
                            color: 'var(--primary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                            fontSize: '15px'
                          }}>
                            {profile.name.charAt(0)}
                          </div>
                        )}
                        <div>
                          <h4 style={{ fontSize: '16px', color: 'var(--text-main)', margin: 0 }}>{profile.name}</h4>
                          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{profile.role} • {profile.location}</span>
                        </div>
                      </div>

                      {/* Contact Info revealed */}
                      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ fontSize: '10px', color: 'var(--text-light)', fontWeight: 700 }}>MOBILE</span>
                          <a href={`tel:${profile.mobile}`} style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--text-main)' }}>
                            {profile.mobile}
                          </a>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ fontSize: '10px', color: 'var(--text-light)', fontWeight: 700 }}>EMAIL</span>
                          <a href={`mailto:${profile.email}`} style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--text-muted)' }}>
                            {profile.email}
                          </a>
                        </div>
                      </div>

                      {/* Direct Click */}
                      <button 
                        onClick={() => setSelectedProfileId(profile.id)}
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '6px 12px' }}
                      >
                        Open Details
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: CANDIDATE MY PROFILE */}
          {activeTab === 'myprofile' && currentUser && currentUser.accountType === 'seeker' && myProfile && (
            <div>
              <h3 style={{ fontSize: '20px', marginBottom: '20px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <User size={18} style={{ color: 'var(--primary)' }} />
                Your Job Matrimony Profile
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
                {/* Profile detail card */}
                <div className="glass" style={{
                  padding: '30px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-color)'
                }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'center', marginBottom: '24px' }}>
                    <div style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--primary)',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '28px',
                      fontWeight: 800
                    }}>
                      {myProfile.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h4 style={{ fontSize: '22px', color: 'var(--text-main)', margin: '0 0 4px 0' }}>{myProfile.name}</h4>
                      <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: 0 }}>
                        {myProfile.role} • <span style={{ textTransform: 'capitalize' }}>{myProfile.category}</span>
                      </p>
                    </div>
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                    gap: '20px',
                    marginBottom: '24px'
                  }}>
                    <div>
                      <span style={{ display: 'block', fontSize: '11px', color: 'var(--text-light)', fontWeight: 700, textTransform: 'uppercase' }}>Mobile (Verified Login)</span>
                      <span style={{ fontSize: '15px', color: 'var(--text-main)', fontWeight: 'bold' }}>{myProfile.mobile}</span>
                    </div>
                    <div>
                      <span style={{ display: 'block', fontSize: '11px', color: 'var(--text-light)', fontWeight: 700, textTransform: 'uppercase' }}>Email</span>
                      <span style={{ fontSize: '15px', color: 'var(--text-main)', fontWeight: 'bold' }}>{myProfile.email || 'None'}</span>
                    </div>
                    <div>
                      <span style={{ display: 'block', fontSize: '11px', color: 'var(--text-light)', fontWeight: 700, textTransform: 'uppercase' }}>Age & Gender</span>
                      <span style={{ fontSize: '15px', color: 'var(--text-main)', fontWeight: 'bold' }}>{myProfile.age} Years old / {myProfile.gender}</span>
                    </div>
                    <div>
                      <span style={{ display: 'block', fontSize: '11px', color: 'var(--text-light)', fontWeight: 700, textTransform: 'uppercase' }}>Experience</span>
                      <span style={{ fontSize: '15px', color: 'var(--text-main)', fontWeight: 'bold' }}>{myProfile.experience} Years</span>
                    </div>
                    <div>
                      <span style={{ display: 'block', fontSize: '11px', color: 'var(--text-light)', fontWeight: 700, textTransform: 'uppercase' }}>Expected Salary</span>
                      <span style={{ fontSize: '15px', color: 'var(--text-main)', fontWeight: 'bold' }}>{myProfile.salary}</span>
                    </div>
                    <div>
                      <span style={{ display: 'block', fontSize: '11px', color: 'var(--text-light)', fontWeight: 700, textTransform: 'uppercase' }}>Location</span>
                      <span style={{ fontSize: '15px', color: 'var(--text-main)', fontWeight: 'bold' }}>{myProfile.location}</span>
                    </div>
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <span style={{ display: 'block', fontSize: '11px', color: 'var(--text-light)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>Skills</span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {myProfile.skills.map((skill, index) => (
                        <span key={index} className="badge badge-primary">{skill}</span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span style={{ display: 'block', fontSize: '11px', color: 'var(--text-light)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>Professional Biography</span>
                    <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: 0, lineHeight: 1.6 }}>{myProfile.bio}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: WHO VIEWED MY CONTACT */}
          {activeTab === 'views' && currentUser && currentUser.accountType === 'seeker' && (
            <div>
              <h3 style={{ fontSize: '20px', marginBottom: '6px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Eye size={18} style={{ color: 'var(--primary)' }} />
                Who Unlocked Your Contact Details
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px' }}>
                Matrimonial logs. These recruiters have unlocked your phone number and email to match you for jobs.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {seededViews.map(view => (
                  <div 
                    key={view.id}
                    className="glass"
                    style={{
                      padding: '16px 20px',
                      borderRadius: 'var(--radius-sm)',
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '12px',
                      border: '1px solid var(--border-color)',
                      borderLeft: '4px solid var(--primary)'
                    }}
                  >
                    <div>
                      <h4 style={{ fontSize: '15px', color: 'var(--text-main)', margin: '0 0 2px 0' }}>{view.unlockedBy}</h4>
                      <span style={{ fontSize: '12px', color: 'var(--text-light)' }}>
                        Mobile Contact ID: <strong style={{ color: 'var(--text-muted)' }}>{view.unlockedByMobile}</strong>
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '12px', color: 'var(--text-light)' }}>{view.timestamp}</span>
                      <a href={`tel:${view.unlockedByMobile}`} className="btn btn-secondary btn-icon" style={{ padding: '6px' }} title="Call Recruiter Back">
                        <Phone size={12} style={{ color: 'var(--success)' }} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

      <style>{`
        @media (min-width: 992px) {
          .dashboard-grid {
            grid-template-columns: 260px 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
