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
import WorkIcon from '@mui/icons-material/BusinessCenter';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LogoutIcon from '@mui/icons-material/Logout';

export const Navbar = ({ onOpenLogin, onOpenRegister, onShowDashboard, showDashboard }) => {
  const { currentUser, logoutUser, favorites, isDarkMode, toggleTheme } = useContext(AppContext);
  const theme = useTheme();

  return (
    <Box 
      className="navbar-island"
      sx={{
        position: 'sticky',
        top: '20px',
        zIndex: 1100,
        mb: 4,
        px: { xs: 2, md: 3 },
        py: 1.5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'nowrap'
      }}
    >
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
          backgroundColor: '#14a800',
          borderRadius: '10px',
          width: { xs: '30px', sm: '38px' },
          height: { xs: '30px', sm: '38px' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          boxShadow: '0 0 10px rgba(20, 168, 0, 0.4)'
        }}>
          <WorkIcon sx={{ fontSize: { xs: 16, sm: 20 } }} />
        </Box>
        <Box>
          <Typography 
            variant="h6" 
            component="h1"
            sx={{ 
              fontSize: { xs: '15px', sm: '18px' }, 
              fontWeight: 800, 
              lineHeight: 1.1,
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontFamily: 'var(--font-display)'
            }}
          >
            Skill<span style={{ color: '#14a800' }}>Mate</span>
            <AutoAwesomeIcon sx={{ color: '#14a800', fontSize: { xs: 11, sm: 14 } }} />
          </Typography>
          <Typography 
            variant="caption" 
            sx={{ 
              fontSize: '8.5px', 
              color: 'rgba(255, 255, 255, 0.45)', 
              display: { xs: 'none', sm: 'block' }, 
              marginTop: '1px',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase'
            }}
          >
            The Next Gen Talent Matchmaker
          </Typography>
        </Box>
      </Box>

      {/* Navigation Links in Center */}
      <Box sx={{ 
        display: { xs: 'none', md: 'flex' }, 
        gap: 1.5,
        alignItems: 'center'
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

      {/* Right Action Controls */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: { xs: 1, sm: 1.8 }
      }}>
        
        {/* Saved Bookmarks Button */}
        <Tooltip title={`${favorites.length} Saved Profiles`}>
          <IconButton 
            onClick={() => onShowDashboard(true)}
            sx={{ 
              border: `1.5px solid ${favorites.length > 0 ? '#14a800' : 'rgba(255,255,255,0.1)'}`,
              borderRadius: '50%',
              color: favorites.length > 0 ? '#14a800' : '#fff',
              p: { xs: '6px', sm: '8px' },
              backgroundColor: favorites.length > 0 ? 'rgba(20, 168, 0, 0.05)' : 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.05)'
              }
            }}
          >
            <FavoriteIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />
          </IconButton>
        </Tooltip>

        {/* Theme Toggle Button */}
        <Tooltip title="Toggle Theme">
          <IconButton 
            onClick={toggleTheme} 
            sx={{ 
              border: '1.5px solid rgba(255,255,255,0.1)', 
              borderRadius: '50%',
              color: '#fff',
              p: { xs: '6px', sm: '8px' },
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.05)'
              }
            }}
          >
            {isDarkMode ? <LightModeIcon sx={{ fontSize: { xs: 14, sm: 16 }, color: '#f59e0b' }} /> : <DarkModeIcon sx={{ fontSize: { xs: 14, sm: 16 }, color: 'inherit' }} />}
          </IconButton>
        </Tooltip>

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
                padding: '6px 14px',
                borderRadius: '10px',
                backgroundColor: 'rgba(20, 168, 0, 0.1)',
                border: '1.5px solid rgba(20, 168, 0, 0.3)',
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: 'rgba(20, 168, 0, 0.18)'
                }
              }}
            >
              <Avatar sx={{
                width: 22,
                height: 22,
                backgroundColor: '#14a800',
                color: '#fff',
                fontSize: '10px',
                fontWeight: 'bold',
                textTransform: 'uppercase'
              }}>
                {currentUser.name.charAt(0)}
              </Avatar>
              <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' }, fontSize: '12.5px', fontWeight: 800, color: '#fff' }}>
                {currentUser.name.split(' ')[0]}
              </Typography>
            </Box>
            <Button 
              onClick={logoutUser}
              variant="outlined"
              size="small"
              startIcon={<LogoutIcon sx={{ fontSize: 14 }} />}
              sx={{ 
                borderColor: 'rgba(255,255,255,0.15)',
                color: '#fff',
                borderRadius: '10px',
                fontSize: '12px',
                textTransform: 'none',
                fontWeight: 700,
                py: '7px',
                px: '12px',
                '&:hover': {
                  borderColor: '#14a800',
                  color: '#14a800',
                }
              }}
            >
              Logout
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.8, sm: 1.5 } }}>
            <Button 
              onClick={onOpenLogin}
              variant="text" 
              sx={{ 
                color: '#fff', 
                textTransform: 'none', 
                fontWeight: 800,
                fontSize: { xs: '12px', sm: '13px' },
                px: { xs: 1, sm: 1.5 },
                '&:hover': { 
                  color: '#14a800',
                  backgroundColor: 'transparent'
                }
              }}
            >
              Log In
            </Button>
            <Button 
              onClick={onOpenRegister}
              variant="contained" 
              startIcon={<PersonAddIcon sx={{ display: { xs: 'none', sm: 'block' }, fontSize: 14 }} />}
              sx={{ 
                backgroundColor: '#14a800',
                color: '#fff',
                borderRadius: '10px',
                px: { xs: 1.5, sm: 2.5 },
                py: { xs: 0.7, sm: 0.9 },
                fontSize: { xs: '11.5px', sm: '12.5px' },
                fontWeight: 800,
                textTransform: 'none',
                boxShadow: '0 0 15px rgba(20, 168, 0, 0.35)',
                '&:hover': {
                  backgroundColor: '#118f00',
                  boxShadow: '0 0 20px rgba(20, 168, 0, 0.5)',
                }
              }}
            >
              Register
            </Button>
          </Box>
        )}

      </Box>
    </Box>
  );
};
