import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Briefcase, Heart, Sun, Moon, LogIn, LogOut, User, Sparkles } from 'lucide-react';

export const Navbar = ({ onOpenLogin, onOpenRegister, onShowDashboard, showDashboard }) => {
  const { currentUser, logoutUser, favorites, selectedProfileId } = useContext(AppContext);
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    document.body.classList.toggle('light-theme');
    setIsDark(!isDark);
  };

  return (
    <header className="glass" style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      borderBottom: '1px solid var(--border-color)',
      padding: '16px 0',
      transition: 'all 0.3s ease'
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* Logo */}
        <div
          onClick={() => onShowDashboard(false)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            userSelect: 'none'
          }}
        >
          <div style={{
            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
            borderRadius: '12px',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <Briefcase size={22} />
          </div>
          <div>
            <h2 style={{
              fontSize: '20px',
              fontWeight: 800,
              background: 'linear-gradient(135deg, var(--primary), var(--accent))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              SkillMate
              <Sparkles size={14} style={{ color: 'var(--secondary)' }} />
            </h2>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'block', marginTop: '-2px', fontWeight: 600 }}>
              JOB & CREATIVE MATRIMONY
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="btn btn-secondary btn-icon"
            title="Toggle Theme"
            style={{ borderRadius: 'var(--radius-full)', padding: '8px' }}
          >
            {isDark ? <Sun size={18} style={{ color: 'var(--warning)' }} /> : <Moon size={18} style={{ color: 'var(--primary)' }} />}
          </button>

          {/* Bookmarked Count (Static visual representation for matched interest) */}
          <div
            style={{
              position: 'relative',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              color: favorites.length > 0 ? 'var(--secondary)' : 'var(--text-muted)',
              padding: '8px',
              transition: 'color 0.2s'
            }}
            title={`${favorites.length} Saved Profiles`}
            onClick={() => onShowDashboard(true)}
          >
            <Heart size={20} fill={favorites.length > 0 ? 'var(--secondary)' : 'transparent'} />
            {favorites.length > 0 && (
              <span style={{
                position: 'absolute',
                top: '-2px',
                right: '-2px',
                background: 'var(--secondary)',
                color: '#fff',
                borderRadius: '50%',
                width: '16px',
                height: '16px',
                fontSize: '9px',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 5px rgba(236,72,153,0.5)'
              }}>
                {favorites.length}
              </span>
            )}
          </div>

          {/* Auth Controls */}
          {currentUser ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                onClick={() => onShowDashboard(!showDashboard)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--primary-light)',
                  border: '1px solid rgba(99, 102, 241, 0.2)',
                  transition: 'background-color 0.2s'
                }}
              >
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--primary)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  textTransform: 'uppercase'
                }}>
                  {currentUser.name.charAt(0)}
                </div>
                <div style={{ display: 'none', flexDirection: 'column', textAlign: 'left' }} className="d-md-flex">
                  <span style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--text-main)', lineHeight: '1' }}>
                    {currentUser.name}
                  </span>
                  <span style={{ fontSize: '9px', color: 'var(--primary)', fontWeight: 'bold', textTransform: 'capitalize' }}>
                    {currentUser.accountType === 'employer' ? 'Recruiter' : 'Candidate'}
                  </span>
                </div>
              </div>

              <button
                onClick={logoutUser}
                className="btn btn-secondary btn-sm"
                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <LogOut size={14} />
                <span className="d-none d-md-inline">Logout</span>
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                onClick={onOpenLogin}
                className="btn btn-secondary btn-sm"
                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <LogIn size={14} />
                <span>Log In</span>
              </button>
              <button
                onClick={onOpenRegister}
                className="btn btn-primary btn-sm"
                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <User size={14} />
                <span>Register</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Small CSS helper for responsive display */}
      <style>{`
        @media (min-width: 768px) {
          .d-md-flex { display: flex !important; }
          .d-none { display: none !important; }
        }
        @media (max-width: 767px) {
          .d-none { display: none !important; }
          .d-md-inline { display: none !important; }
        }
      `}</style>
    </header>
  );
};
