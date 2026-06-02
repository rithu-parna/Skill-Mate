import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Badge, 
  Box, 
  Avatar, 
  Tooltip,
  useTheme
} from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

export const Navbar = ({ onOpenLogin, onOpenRegister, onShowDashboard, showDashboard }) => {
  const { currentUser, logoutUser, favorites, isDarkMode, toggleTheme } = useContext(AppContext);
  const theme = useTheme();

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{
        backgroundColor: theme.palette.background.glass,
        backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${theme.palette.divider}`,
        transition: 'all 0.3s ease',
        top: 0,
        zIndex: 50
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', minHeight: '70px' }}>
        
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
            background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
            borderRadius: '12px',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            boxShadow: theme.shadows[1]
          }}>
            <WorkIcon sx={{ fontSize: 22 }} />
          </Box>
          <Box>
            <Typography 
              variant="h6" 
              component="h1"
              sx={{ 
                fontSize: '20px', 
                fontWeight: 800, 
                lineHeight: 1.1,
                background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              SkillMate
              <AutoAwesomeIcon sx={{ color: theme.palette.secondary.main, fontSize: 14 }} />
            </Typography>
            <Typography 
              variant="caption" 
              sx={{ 
                fontSize: '10px', 
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

        {/* Controls Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
          
          {/* Light/Dark Toggle */}
          <Tooltip title="Toggle Theme">
            <IconButton 
              onClick={toggleTheme} 
              sx={{ 
                border: `1px solid ${theme.palette.divider}`,
                padding: '8px',
                borderRadius: '50%',
                color: isDarkMode ? theme.palette.warning.main : theme.palette.primary.main,
                '&:hover': {
                  backgroundColor: theme.palette.background.default
                }
              }}
            >
              {isDarkMode ? <LightModeIcon sx={{ fontSize: 18 }} /> : <DarkModeIcon sx={{ fontSize: 18 }} />}
            </IconButton>
          </Tooltip>

          {/* Bookmarks Counter */}
          <Tooltip title={`${favorites.length} Saved Profiles`}>
            <IconButton 
              onClick={() => onShowDashboard(true)}
              sx={{ 
                color: favorites.length > 0 ? theme.palette.secondary.main : theme.palette.text.secondary,
                padding: '8px',
                transition: 'color 0.2s'
              }}
            >
              <Badge 
                badgeContent={favorites.length} 
                color="secondary"
                sx={{
                  '& .MuiBadge-badge': {
                    fontSize: '10px',
                    height: '16px',
                    minWidth: '16px',
                    padding: '0 4px',
                    fontWeight: 'bold',
                    boxShadow: '0 0 5px rgba(236,72,153,0.5)'
                  }
                }}
              >
                <FavoriteIcon sx={{ fontSize: 20 }} />
              </Badge>
            </IconButton>
          </Tooltip>

          {/* Authentication Actions */}
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
                  borderRadius: 1.5,
                  backgroundColor: theme.palette.primary.light,
                  border: '1px solid rgba(99, 102, 241, 0.2)',
                  transition: 'background-color 0.2s',
                  '&:hover': {
                    backgroundColor: 'rgba(99, 102, 241, 0.25)'
                  }
                }}
              >
                <Avatar sx={{
                  width: 26,
                  height: 26,
                  backgroundColor: theme.palette.primary.main,
                  color: '#fff',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  textTransform: 'uppercase'
                }}>
                  {currentUser.name.charAt(0)}
                </Avatar>
                
                <Box sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'column', textAlign: 'left' }}>
                  <Typography variant="body2" sx={{ fontSize: '12px', fontWeight: 'bold', color: theme.palette.text.primary, lineHeight: 1 }}>
                    {currentUser.name}
                  </Typography>
                  <Typography variant="caption" sx={{ fontSize: '9px', color: theme.palette.primary.main, fontWeight: 700, textTransform: 'capitalize', mt: 0.2 }}>
                    {currentUser.accountType === 'employer' ? 'Recruiter' : 'Candidate'}
                  </Typography>
                </Box>
              </Box>

              <Button 
                onClick={logoutUser}
                variant="outlined"
                size="small"
                startIcon={<LogoutIcon sx={{ fontSize: 14 }} />}
                sx={{ 
                  py: '6px',
                  display: { xs: 'none', sm: 'inline-flex' }
                }}
              >
                Logout
              </Button>
              <IconButton 
                onClick={logoutUser}
                color="inherit"
                sx={{ display: { xs: 'flex', sm: 'none' }, border: `1px solid ${theme.palette.divider}` }}
              >
                <LogoutIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Button 
                onClick={onOpenLogin}
                variant="outlined"
                size="small"
                startIcon={<LoginIcon sx={{ fontSize: 14 }} />}
                sx={{ py: '6px' }}
              >
                Log In
              </Button>
              <Button 
                onClick={onOpenRegister}
                variant="contained"
                size="small"
                color="primary"
                startIcon={<PersonAddIcon sx={{ fontSize: 14 }} />}
                sx={{ 
                  py: '6px',
                  background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)'
                }}
              >
                Register
              </Button>
            </Box>
          )}

        </Box>
      </Toolbar>
    </AppBar>
  );
};
