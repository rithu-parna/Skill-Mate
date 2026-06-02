import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { X, Phone, Mail, MapPin, Briefcase, Award, GraduationCap, Lock, Heart, ExternalLink, Calendar, Sparkles, AlertTriangle, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ProfileDetailModal = ({ onOpenLogin }) => {
  const { 
    selectedProfileId, 
    setSelectedProfileId, 
    profiles, 
    currentUser, 
    favorites, 
    toggleFavorite, 
    unlockContact, 
    isContactUnlocked 
  } = useContext(AppContext);

  const [messageSent, setMessageSent] = useState(false);
  const [typedMessage, setTypedMessage] = useState('');

  const profile = profiles.find(p => p.id === selectedProfileId);
  if (!profile) return null;

  const isFavorited = favorites.includes(profile.id);
  const isUnlocked = isContactUnlocked(profile.id);

  const handleUnlockClick = () => {
    if (!currentUser) {
      // Prompt login
      onOpenLogin();
      return;
    }
    unlockContact(profile.id);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!typedMessage.trim()) return;
    setMessageSent(true);
    setTypedMessage('');
    setTimeout(() => setMessageSent(false), 3000);
  };

  // Generate random compatibility factors for the matrimony feel
  const matchPercentage = Math.floor(75 + (profile.name.length * 3) % 21);
  const matchReasons = [
    "Skills match current market demand",
    "Verified professional credentials",
    `Located in ${profile.location.split(',')[0]} (Matches regional criteria)`
  ];

  const getGradient = (name) => {
    const colors = [
      'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
      'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)',
      'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
      'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    ];
    let sum = 0;
    for (let i = 0; i < name.length; i++) {
      sum += name.charCodeAt(i);
    }
    return colors[sum % colors.length];
  };

  return (
    <AnimatePresence>
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(5, 7, 12, 0.9)',
        backdropFilter: 'blur(10px)',
        zIndex: 90,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }} onClick={() => setSelectedProfileId(null)}>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          className="glass"
          style={{
            width: '100%',
            maxWidth: '680px',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-lg)',
            border: '1px solid var(--border-color)',
            overflow: 'hidden',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Banner Background */}
          <div style={{
            height: '120px',
            background: getGradient(profile.name),
            position: 'relative',
            flexShrink: 0
          }}>
            {/* Close Button */}
            <button
              onClick={() => setSelectedProfileId(null)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s',
                zIndex: 10
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'}
            >
              <X size={18} />
            </button>

            {/* Favorite toggle */}
            <button
              onClick={() => toggleFavorite(profile.id)}
              style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: isFavorited ? 'var(--secondary)' : '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10
              }}
            >
              <Heart size={18} fill={isFavorited ? 'var(--secondary)' : 'transparent'} />
            </button>
          </div>

          {/* Profile Picture Overlay */}
          <div style={{
            position: 'relative',
            padding: '0 24px',
            marginTop: '-50px',
            display: 'flex',
            alignItems: 'flex-end',
            gap: '20px',
            flexWrap: 'wrap',
            flexShrink: 0
          }}>
            {profile.image ? (
              <img
                src={profile.image}
                alt={profile.name}
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: 'var(--radius-md)',
                  objectFit: 'cover',
                  border: '4px solid var(--bg-surface)',
                  boxShadow: 'var(--shadow-md)',
                  backgroundColor: 'var(--bg-surface)'
                }}
              />
            ) : (
              <div style={{
                width: '100px',
                height: '100px',
                borderRadius: 'var(--radius-md)',
                background: getGradient(profile.name),
                border: '4px solid var(--bg-surface)',
                boxShadow: 'var(--shadow-md)',
                color: '#fff',
                fontWeight: 800,
                fontSize: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-display)'
              }}>
                {profile.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
              </div>
            )}

            <div style={{ flex: 1, minWidth: '240px', paddingBottom: '8px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                {profile.name}
                <span className="badge badge-primary" style={{ fontSize: '10px' }}>
                  {profile.category}
                </span>
              </h2>
              <p style={{ color: 'var(--text-muted)', fontWeight: 500, margin: 0, fontSize: '15px' }}>
                {profile.role}
              </p>
            </div>
          </div>

          {/* Modal body scrollable content */}
          <div style={{ padding: '24px', overflowY: 'auto', flexGrow: 1 }}>
            
            {/* Grid details (Matrimony style parameters) */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
              gap: '12px',
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              padding: '16px',
              marginBottom: '24px'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '10px', color: 'var(--text-light)', fontWeight: 700, textTransform: 'uppercase' }}>Experience</span>
                <span style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Award size={14} style={{ color: 'var(--primary)' }} />
                  {profile.experience} Years
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '10px', color: 'var(--text-light)', fontWeight: 700, textTransform: 'uppercase' }}>Expected Salary</span>
                <span style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Briefcase size={14} style={{ color: 'var(--secondary)' }} />
                  {profile.salary}
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '10px', color: 'var(--text-light)', fontWeight: 700, textTransform: 'uppercase' }}>Age & Sex</span>
                <span style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--text-main)' }}>
                  {profile.age} Yrs / {profile.gender}
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '10px', color: 'var(--text-light)', fontWeight: 700, textTransform: 'uppercase' }}>Location</span>
                <span style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={14} style={{ color: 'var(--accent)' }} />
                  {profile.location.split(',')[0]}
                </span>
              </div>
            </div>

            {/* About / Bio section */}
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ fontSize: '16px', color: 'var(--text-main)', marginBottom: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '6px' }}>
                About Professional
              </h4>
              <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--text-muted)' }}>
                {profile.bio}
              </p>
            </div>

            {/* Education & Portfolio */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px', marginBottom: '24px' }}>
              <div>
                <h4 style={{ fontSize: '16px', color: 'var(--text-main)', marginBottom: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '6px' }}>
                  Qualifications & Education
                </h4>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <GraduationCap size={16} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                  {profile.education}
                </p>
              </div>
              {profile.portfolioUrl && (
                <div>
                  <h4 style={{ fontSize: '16px', color: 'var(--text-main)', marginBottom: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '6px' }}>
                    Portfolio / Profiles
                  </h4>
                  <a 
                    href={profile.portfolioUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="btn btn-secondary btn-sm"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}
                  >
                    <span>View Work Portfolio</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              )}
            </div>

            {/* Skills & Tools */}
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ fontSize: '16px', color: 'var(--text-main)', marginBottom: '12px', borderBottom: '1px solid var(--border-color)', paddingBottom: '6px' }}>
                Skills & Specializations
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {profile.skills.map((skill, index) => (
                  <span key={index} style={{
                    fontSize: '12px',
                    backgroundColor: 'var(--primary-light)',
                    color: 'var(--primary)',
                    padding: '6px 12px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid rgba(99,102,241,0.2)',
                    fontWeight: 600
                  }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Matchmaking compatibility section */}
            <div className="glass" style={{
              padding: '16px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid rgba(236,72,153,0.2)',
              background: 'radial-gradient(ellipse at top, rgba(236,72,153,0.06), transparent)',
              marginBottom: '28px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <h4 style={{ fontSize: '15px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={16} style={{ color: 'var(--secondary)' }} />
                  Matrimony Career Match Compatibility
                </h4>
                <span style={{ 
                  color: 'var(--secondary)', 
                  fontWeight: 800, 
                  fontSize: '15px',
                  backgroundColor: 'rgba(236,72,153,0.1)',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-full)'
                }}>
                  {matchPercentage}% Match
                </span>
              </div>
              <ul style={{ paddingLeft: '18px', fontSize: '13px', color: 'var(--text-muted)' }}>
                {matchReasons.map((reason, index) => (
                  <li key={index} style={{ marginBottom: '4px' }}>{reason}</li>
                ))}
              </ul>
            </div>

            {/* CONTACT DETAILS PANEL (THE CORE LOCK LOGIC) */}
            <div style={{ position: 'relative' }}>
              <h4 style={{ fontSize: '16px', color: 'var(--text-main)', marginBottom: '12px', borderBottom: '1px solid var(--border-color)', paddingBottom: '6px' }}>
                Contact Verification & Details
              </h4>

              {isUnlocked ? (
                /* UNLOCKED STATE */
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    backgroundColor: 'rgba(34, 197, 94, 0.04)',
                    border: '1px dashed var(--success)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '20px'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    color: 'var(--success)',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    marginBottom: '16px'
                  }}>
                    <Phone size={18} />
                    <span>Contact Details Unlocked Successfully</span>
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '16px',
                    marginBottom: '20px'
                  }}>
                    <div>
                      <span style={{ display: 'block', fontSize: '11px', color: 'var(--text-light)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '2px' }}>
                        Mobile Phone Number
                      </span>
                      <a href={`tel:${profile.mobile}`} style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {profile.mobile}
                      </a>
                    </div>
                    <div>
                      <span style={{ display: 'block', fontSize: '11px', color: 'var(--text-light)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '2px' }}>
                        Verified Email Address
                      </span>
                      <a href={`mailto:${profile.email}`} style={{ fontSize: '15px', fontWeight: 'bold', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Mail size={14} style={{ color: 'var(--text-light)' }} />
                        {profile.email}
                      </a>
                    </div>
                  </div>

                  {/* Direct Contact Triggers */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    <a 
                      href={`tel:${profile.mobile}`} 
                      className="btn btn-primary btn-sm"
                      style={{ flex: 1, minWidth: '130px', justifyContent: 'center' }}
                    >
                      <Phone size={14} />
                      <span>Call Direct</span>
                    </a>
                    <a 
                      href={`https://wa.me/${profile.mobile.replace(/[^0-9]/g, '')}`} 
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-sm"
                      style={{ 
                        flex: 1, 
                        minWidth: '130px', 
                        justifyContent: 'center',
                        backgroundColor: '#25D366',
                        color: '#fff'
                      }}
                    >
                      <MessageSquareIcon size={14} />
                      <span>WhatsApp Chat</span>
                    </a>
                    <a 
                      href={`mailto:${profile.email}`} 
                      className="btn btn-secondary btn-sm"
                      style={{ flex: 1, minWidth: '130px', justifyContent: 'center' }}
                    >
                      <Mail size={14} />
                      <span>Send Email</span>
                    </a>
                  </div>

                  {/* Simulated Instant Messenger Form inside Drawer */}
                  <form onSubmit={handleSendMessage} style={{ marginTop: '24px', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
                    <label style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Send simulated connection message:</label>
                    <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                      <input 
                        type="text" 
                        placeholder="Hi, I am interested in matching with your profile..." 
                        value={typedMessage}
                        onChange={(e) => setTypedMessage(e.target.value)}
                        style={{ flexGrow: 1 }}
                      />
                      <button type="submit" className="btn btn-primary btn-icon" style={{ padding: '12px' }}>
                        <Send size={16} />
                      </button>
                    </div>
                    {messageSent && (
                      <span style={{ fontSize: '11px', color: 'var(--success)', marginTop: '4px', display: 'block', fontWeight: 600 }}>
                        ✓ Connection message sent successfully to {profile.name}!
                      </span>
                    )}
                  </form>
                </motion.div>
              ) : (
                /* LOCKED STATE */
                <div style={{
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  {/* Blurred layout */}
                  <div style={{
                    padding: '24px',
                    filter: 'blur(5px)',
                    userSelect: 'none',
                    pointerEvents: 'none'
                  }}>
                    <div>
                      <span style={{ display: 'block', fontSize: '10px', color: 'var(--text-light)', fontWeight: 700 }}>Mobile Phone Number</span>
                      <span style={{ fontSize: '16px', fontWeight: 'bold' }}>+1 (555) 000-0000</span>
                    </div>
                    <div style={{ marginTop: '12px' }}>
                      <span style={{ display: 'block', fontSize: '10px', color: 'var(--text-light)', fontWeight: 700 }}>Verified Email Address</span>
                      <span style={{ fontSize: '15px', fontWeight: 'bold' }}>placeholder@careermatch.com</span>
                    </div>
                  </div>

                  {/* Mask Glass Overlay */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(15, 22, 36, 0.85)',
                    backdropFilter: 'blur(3px)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px',
                    textAlign: 'center',
                    zIndex: 2
                  }}>
                    <Lock size={22} style={{ color: 'var(--secondary)', marginBottom: '8px' }} />
                    <span style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--text-main)', display: 'block', maxWidth: '300px', lineHeight: 1.4 }}>
                      Contact details are locked.
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginBottom: '14px', maxWidth: '340px' }}>
                      {currentUser 
                        ? "Unlock this contact to reveal details."
                        : "Only registered and logged-in users can view candidate phone numbers."}
                    </span>

                    <button 
                      onClick={handleUnlockClick}
                      className="btn btn-accent btn-sm"
                      style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                    >
                      {currentUser ? (
                        <>
                          <Lock size={12} />
                          <span>Unlock Contact Details</span>
                        </>
                      ) : (
                        <>
                          <Lock size={12} />
                          <span>Log In to Unlock</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

// Local component mapping for MessageSquare due to Lucide imports
const MessageSquareIcon = ({ size, style }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    style={style}
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
);
