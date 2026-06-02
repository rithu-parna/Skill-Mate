import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { MapPin, Briefcase, Award, Eye, Phone, Lock, Heart, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

export const JobCard = ({ profile }) => {
  const { 
    favorites, 
    toggleFavorite, 
    setSelectedProfileId, 
    isContactUnlocked,
    currentUser 
  } = useContext(AppContext);

  const isFavorited = favorites.includes(profile.id);
  const isUnlocked = isContactUnlocked(profile.id);

  // Define badges styling based on category
  const categoryStyles = {
    corporate: { bg: 'badge-primary', label: 'Corporate' },
    creative: { bg: 'badge-secondary', label: 'Creative' },
    technical: { bg: 'badge-accent', label: 'Technical' },
    trades: { bg: 'badge-primary', label: 'Skilled Trade', customClass: 'badge-success-custom' }
  };

  const catStyle = categoryStyles[profile.category] || { bg: 'badge-primary', label: profile.category };

  // Initials generator for fallback SVG
  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  // Generate a distinct gradient based on name string code
  const getGradient = (name) => {
    const colors = [
      'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)', // Indigo to Purple
      'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)', // Pink to Rose
      'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)', // Cyan to Blue
      'linear-gradient(135deg, #10b981 0%, #059669 100%)', // Emerald to Green
      'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', // Amber to Orange
    ];
    let sum = 0;
    for (let i = 0; i < name.length; i++) {
      sum += name.charCodeAt(i);
    }
    return colors[sum % colors.length];
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="glass-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative colored glow bar at the top */}
      <div style={{
        height: '4px',
        width: '100%',
        background: profile.category === 'creative' 
          ? 'linear-gradient(90deg, var(--secondary), var(--accent))' 
          : profile.category === 'technical'
          ? 'linear-gradient(90deg, var(--accent), var(--primary))'
          : profile.category === 'trades'
          ? 'linear-gradient(90deg, var(--success), var(--accent))'
          : 'linear-gradient(90deg, var(--primary), var(--secondary))'
      }} />

      {/* Card Header & Avatar */}
      <div style={{ padding: '24px 24px 16px 24px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
        {profile.image ? (
          <img 
            src={profile.image} 
            alt={profile.name} 
            style={{
              width: '72px',
              height: '72px',
              borderRadius: 'var(--radius-md)',
              objectFit: 'cover',
              border: '2px solid rgba(255, 255, 255, 0.1)',
              boxShadow: 'var(--shadow-sm)'
            }}
          />
        ) : (
          <div style={{
            width: '72px',
            height: '72px',
            borderRadius: 'var(--radius-md)',
            background: getGradient(profile.name),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            fontWeight: 800,
            fontSize: '22px',
            fontFamily: 'var(--font-display)',
            border: '2px solid rgba(255, 255, 255, 0.1)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            {getInitials(profile.name)}
          </div>
        )}

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '4px' }}>
            <span className={`badge ${catStyle.bg}`} style={{
              backgroundColor: profile.category === 'trades' ? 'var(--primary-light)' : undefined,
              color: profile.category === 'trades' ? 'var(--accent)' : undefined,
            }}>
              {catStyle.label}
            </span>
            <span style={{ fontSize: '11px', color: 'var(--text-light)', fontWeight: 600 }}>
              {profile.joinedDate}
            </span>
          </div>

          <h3 style={{ 
            fontSize: '18px', 
            fontWeight: 700, 
            color: 'var(--text-main)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontFamily: 'var(--font-display)'
          }}>
            {profile.name}
          </h3>

          <span style={{ 
            fontSize: '13px', 
            color: 'var(--text-muted)', 
            fontWeight: 500,
            display: 'block',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {profile.role}
          </span>
        </div>
      </div>

      {/* Matrimony Details Section */}
      <div style={{
        padding: '0 24px 16px 24px',
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '8px 16px',
        borderBottom: '1px dashed var(--border-color)',
        margin: '0 0 16px 0'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px' }}>
          <Award size={14} style={{ color: 'var(--primary)', flexShrink: 0 }} />
          <span style={{ color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            <strong>Exp:</strong> {profile.experience} Yrs
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px' }}>
          <GraduationCap size={14} style={{ color: 'var(--secondary)', flexShrink: 0 }} />
          <span style={{ color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={profile.education}>
            {profile.education.split(',')[0]}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px' }}>
          <Briefcase size={14} style={{ color: 'var(--accent)', flexShrink: 0 }} />
          <span style={{ color: 'var(--text-muted)' }}>
            <strong>Salary:</strong> {profile.salary.split(' ')[0]}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px' }}>
          <span style={{ color: 'var(--text-light)', fontWeight: 600 }}>Age/Sex:</span>
          <span style={{ color: 'var(--text-muted)' }}>
            {profile.age} / {profile.gender.charAt(0)}
          </span>
        </div>
      </div>

      {/* Bio Snippet */}
      <div style={{ padding: '0 24px 16px 24px', flexGrow: 1 }}>
        <p style={{
          fontSize: '13px',
          color: 'var(--text-muted)',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          lineHeight: '1.5',
          margin: 0
        }}>
          {profile.bio}
        </p>
      </div>

      {/* Skills Pills */}
      <div style={{ 
        padding: '0 24px 20px 24px', 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: '6px',
        maxHeight: '68px',
        overflow: 'hidden'
      }}>
        {profile.skills.slice(0, 4).map((skill, index) => (
          <span key={index} style={{
            fontSize: '11px',
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
            color: 'var(--text-muted)',
            padding: '4px 8px',
            borderRadius: '4px',
            border: '1px solid var(--border-color)',
            fontWeight: 500
          }}>
            {skill}
          </span>
        ))}
        {profile.skills.length > 4 && (
          <span style={{
            fontSize: '10px',
            color: 'var(--primary)',
            padding: '4px 6px',
            fontWeight: 600,
            alignSelf: 'center'
          }}>
            +{profile.skills.length - 4} more
          </span>
        )}
      </div>

      {/* Card Footer (Actions & Location) */}
      <div style={{
        padding: '16px 24px',
        backgroundColor: 'rgba(15, 22, 36, 0.4)',
        borderTop: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px'
      }}>
        {/* Location */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', minWidth: 0 }}>
          <MapPin size={14} style={{ color: 'var(--text-light)', flexShrink: 0 }} />
          <span style={{ 
            color: 'var(--text-muted)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {profile.location.split(',')[0]}
          </span>
        </div>

        {/* Action Button */}
        <button 
          onClick={() => setSelectedProfileId(profile.id)}
          className={`btn btn-sm ${isUnlocked ? 'btn-secondary' : 'btn-accent'}`}
          style={{
            padding: '8px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          {isUnlocked ? (
            <>
              <Phone size={13} style={{ color: 'var(--success)' }} />
              <span>Contact Unlocked</span>
            </>
          ) : (
            <>
              <Lock size={12} />
              <span>Show Contact</span>
            </>
          )}
        </button>
      </div>

      {/* Floating Bookmark Button */}
      <button 
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(profile.id);
        }}
        style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          background: 'rgba(15, 22, 36, 0.6)',
          border: '1px solid var(--border-color)',
          borderRadius: '50%',
          width: '32px',
          height: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: isFavorited ? 'var(--secondary)' : 'var(--text-muted)',
          boxShadow: 'var(--shadow-sm)',
          transition: 'all 0.2s',
          zIndex: 5
        }}
        title={isFavorited ? "Remove Bookmark" : "Bookmark Profile"}
      >
        <Heart size={16} fill={isFavorited ? 'var(--secondary)' : 'transparent'} />
      </button>
    </motion.div>
  );
};
