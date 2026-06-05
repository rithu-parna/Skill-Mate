import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { 
  Typography, 
  Button, 
  IconButton, 
  Box, 
  Avatar, 
  Tooltip,
  Divider,
  useTheme
} from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SearchIcon from '@mui/icons-material/Search';

export const Navbar = ({ onOpenLogin, onOpenRegister, onShowDashboard, showDashboard }) => {
  const { currentUser, logoutUser, favorites, isDarkMode, toggleTheme, filters, setFilters } = useContext(AppContext);
  const theme = useTheme();

  return (
    <Box 
      className="navbar-island"
      sx={{
        position: 'sticky',
        top: '20px',
        zIndex: 1100,
        mb: 4
      }}
    >
      <Box sx={{ p: { xs: 2, md: 2.5 } }}>
        {/* ROW 1: Logo, Search Bar, Controls */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: { xs: 'wrap', md: 'nowrap' },
          gap: 2
        }}>
          
          {/* Logo Section */}
          <Box 
            onClick={() => onShowDashboard(false)} 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1.5, 
              cursor: 'pointer',
              userSelect: 'none'
            }}
          >
            <Box sx={{
              backgroundColor: theme.palette.primary.main,
              borderRadius: '10px',
              width: '38px',
              height: '38px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
            }}>
              <WorkIcon sx={{ fontSize: 20 }} />
            </Box>
            <Box>
              <Typography 
                variant="h6" 
                component="h1"
                sx={{ 
                  fontSize: '18px', 
                  fontWeight: 800, 
                  lineHeight: 1.1,
                  color: theme.palette.text.primary,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontFamily: 'var(--font-display)'
                }}
              >
                Skill<span style={{ color: theme.palette.primary.main }}>Mate</span>
                <AutoAwesomeIcon sx={{ color: '#f59e0b', fontSize: 15 }} />
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ 
                  fontSize: '9px', 
                  color: theme.palette.text.secondary, 
                  display: 'block', 
                  marginTop: '1px',
                  fontWeight: 700,
                  letterSpacing: '0.05em'
                }}
              >
                JOB & CREATIVE MATRIMONY
              </Typography>
            </Box>
          </Box>

          {/* Center Search Pill */}
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.25)' : 'rgba(0, 0, 0, 0.04)',
            border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'}`,
            borderRadius: '9999px',
            px: 2,
            py: 0.5,
            width: '100%',
            maxWidth: { xs: '100%', md: '380px' },
            mx: { md: 2 },
            order: { xs: 3, md: 2 }
          }}>
            <SearchIcon sx={{ color: isDarkMode ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)', fontSize: 18 }} />
            <input
              type="text"
              placeholder="Search Talent by name, skill or role..."
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              style={{
                background: 'none',
                border: 'none',
                outline: 'none',
                color: theme.palette.text.primary,
                fontSize: '12px',
                width: '100%',
                padding: '6px 0',
                fontFamily: 'var(--font-sans)',
              }}
            />
            <Box className="kbd-badge" sx={{ display: { xs: 'none', sm: 'block' } }}>
              ⌘ K
            </Box>
          </Box>

          {/* Right Actions */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1.5,
            order: { xs: 2, md: 3 },
            ml: 'auto'
          }}>
            
            {/* Saved Bookmarks Button */}
            <Tooltip title={`${favorites.length} Saved Profiles`}>
              <IconButton 
                onClick={() => onShowDashboard(true)}
                sx={{ 
                  border: `1px solid ${favorites.length > 0 ? theme.palette.primary.main : (isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)')}`,
                  borderRadius: '50%',
                  color: favorites.length > 0 ? theme.palette.primary.main : theme.palette.text.primary,
                  p: '8px',
                  backgroundColor: favorites.length > 0 ? 'rgba(20, 168, 0, 0.05)' : 'transparent',
                  '&:hover': {
                    backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)'
                  }
                }}
              >
                <FavoriteIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </Tooltip>

            {/* Theme Toggle Button */}
            <Tooltip title="Toggle Theme">
              <IconButton 
                onClick={toggleTheme} 
                sx={{ 
                  border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`, 
                  borderRadius: '50%',
                  color: theme.palette.text.primary,
                  p: '8px',
                  '&:hover': {
                    backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)'
                  }
                }}
              >
                {isDarkMode ? <LightModeIcon sx={{ fontSize: 18, color: '#f59e0b' }} /> : <DarkModeIcon sx={{ fontSize: 18, color: 'inherit' }} />}
              </IconButton>
            </Tooltip>

            <Divider orientation="vertical" flexItem sx={{ borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)', mx: 0.5, display: { xs: 'none', sm: 'block' } }} />

            {/* Authentication Buttons */}
            {currentUser ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box 
                  onClick={() => onShowDashboard(!showDashboard)}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    cursor: 'pointer',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(20, 168, 0, 0.1)',
                    border: '1px solid rgba(20, 168, 0, 0.2)',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(20, 168, 0, 0.18)'
                    }
                  }}
                >
                  <Avatar sx={{
                    width: 24,
                    height: 24,
                    backgroundColor: theme.palette.primary.main,
                    color: '#fff',
                    fontSize: '11px',
                    fontWeight: 'bold',
                    textTransform: 'uppercase'
                  }}>
                    {currentUser.name.charAt(0)}
                  </Avatar>
                  <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' }, fontSize: '12px', fontWeight: 700, color: theme.palette.text.primary }}>
                    {currentUser.name.split(' ')[0]}
                  </Typography>
                </Box>
                <Button 
                  onClick={logoutUser}
                  variant="outlined"
                  size="small"
                  sx={{ 
                    borderColor: isDarkMode ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)',
                    color: theme.palette.text.primary,
                    borderRadius: '8px',
                    fontSize: '12px',
                    textTransform: 'none',
                    fontWeight: 600,
                    fontFamily: 'var(--font-display)',
                    py: '6px',
                    px: '12px',
                    '&:hover': {
                      borderColor: theme.palette.primary.main,
                      color: theme.palette.primary.main,
                    }
                  }}
                >
                  Logout
                </Button>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Button 
                  onClick={onOpenLogin}
                  variant="text" 
                  sx={{ 
                    color: theme.palette.text.primary, 
                    textTransform: 'none', 
                    fontWeight: 600,
                    fontSize: '13px',
                    fontFamily: 'var(--font-display)',
                    px: 1.5,
                    '&:hover': { 
                      color: theme.palette.primary.main,
                      backgroundColor: 'transparent'
                    }
                  }}
                >
                  Login
                </Button>
                <Button 
                  onClick={onOpenRegister}
                  variant="contained" 
                  color="primary"
                  startIcon={<AutoAwesomeIcon sx={{ fontSize: 13 }} />}
                  sx={{ 
                    borderRadius: '10px',
                    px: 2.6,
                    py: 1,
                    fontSize: '12.5px',
                    fontWeight: 700,
                    textTransform: 'none',
                    fontFamily: 'var(--font-display)',
                    boxShadow: '0 0 15px rgba(20, 168, 0, 0.35)',
                    '&:hover': {
                      backgroundColor: theme.palette.primary.dark,
                      boxShadow: '0 0 20px rgba(20, 168, 0, 0.5)',
                    }
                  }}
                >
                  Join Now
                </Button>
              </Box>
            )}

          </Box>
        </Box>

        {/* ROW 2: Navigation Links */}
        <Box sx={{ 
          display: 'flex', 
          gap: 1, 
          mt: 2, 
          borderTop: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'}`,
          pt: 1.5
        }}>
          <span 
            className={`nav-link ${!showDashboard ? 'active' : ''}`} 
            onClick={() => onShowDashboard(false)}
          >
            Home
          </span>
          <span 
            className="nav-link" 
            onClick={() => {
              onShowDashboard(false);
              setTimeout(() => {
                const element = document.getElementById('category-filter-section');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }, 100);
            }}
          >
            Categories
          </span>
          <span className="nav-link">Success Stories</span>
          <span className="nav-link">Pricing</span>
          <span className="nav-link">About</span>
        </Box>
      </Box>
    </Box>
  );
};
