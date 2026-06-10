import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import {
  Box,
  Typography,
  Grid,
  Button,
  Avatar,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Card,
  CardContent,
  useTheme
} from '@mui/material';
import HeartIcon from '@mui/icons-material/Favorite';
import PhoneIcon from '@mui/icons-material/Phone';
import PersonIcon from '@mui/icons-material/Person';
import EyeIcon from '@mui/icons-material/Visibility';
import PlaceIcon from '@mui/icons-material/Place';
import MailIcon from '@mui/icons-material/Mail';
import SparklesIcon from '@mui/icons-material/AutoAwesome';
import ShieldIcon from '@mui/icons-material/Shield';
import TargetIcon from '@mui/icons-material/TrackChanges';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import GridViewIcon from '@mui/icons-material/GridView';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SearchIcon from '@mui/icons-material/Search';
import LockIcon from '@mui/icons-material/Lock';
import SendIcon from '@mui/icons-material/Send';
import { JobCard } from './JobCard';

export const Dashboard = ({ onOpenLogin, onOpenRegister }) => {
  const {
    currentUser,
    profiles,
    favorites,
    unlockedContacts,
    setSelectedProfileId
  } = useContext(AppContext);

  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const [activeTab, setActiveTab] = useState('saved');
  const [unlockLogs, setUnlockLogs] = useState([]);

  // Load unlock logs
  useEffect(() => {
    const logs = JSON.parse(localStorage.getItem('careermatch_unlock_logs') || '[]');
    setUnlockLogs(logs);

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

  const bookmarkedProfiles = profiles.filter(p => favorites.includes(p.id));
  const unlockedProfiles = profiles.filter(p => unlockedContacts.includes(p.id));

  const myProfileViews = currentUser && currentUser.accountType === 'seeker'
    ? unlockLogs.filter(log => log.unlockedProfileId === currentUser.id)
    : [];

  const getSeededViews = () => {
    if (!currentUser || currentUser.accountType !== 'seeker') return [];

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

    const mappedActual = myProfileViews.map(v => ({
      id: v.id,
      unlockedBy: `${v.unlockedBy} (Verified Recruiter)`,
      unlockedByMobile: v.unlockedByMobile,
      timestamp: v.timestamp
    }));

    return [...mappedActual, ...seedViews];
  };

  const seededViews = getSeededViews();
  const myProfile = currentUser && currentUser.accountType === 'seeker'
    ? profiles.find(p => p.id === currentUser.id)
    : null;

  return (
    <Box sx={{ py: 4, px: { xs: 2, sm: 4 }, maxWidth: 1280, mx: 'auto' }}>

      {/* Guest/User Workspace Top welcome banner */}
      <Box sx={{
        p: { xs: 2.5, sm: 3.5, md: 5 },
        borderRadius: '24px',
        mb: 5,
        border: `1.5px solid ${isDark ? 'rgba(20, 168, 0, 0.35)' : 'rgba(20, 168, 0, 0.15)'}`,
        background: isDark
          ? 'radial-gradient(circle at right, rgba(20, 168, 0, 0.16) 0%, rgba(7, 10, 19, 0) 65%), #0f1624'
          : 'radial-gradient(circle at right, rgba(20, 168, 0, 0.06) 0%, rgba(255, 255, 255, 0) 65%), #ffffff',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 4,
        position: 'relative',
        overflow: 'hidden',
        boxShadow: isDark ? '0 12px 40px rgba(0, 0, 0, 0.4)' : '0 10px 30px rgba(0,0,0,0.04)'
      }}>
        {/* Subtle mesh background effect inside banner */}
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.25,
          zIndex: 0,
          backgroundSize: '20px 20px',
          backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)'
        }} />

        {/* Left text column */}
        <Box sx={{ flex: 1, position: 'relative', zIndex: 1 }}>
          <Box sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            px: 2,
            py: 0.6,
            backgroundColor: isDark ? 'rgba(20, 168, 0, 0.08)' : 'rgba(20, 168, 0, 0.04)',
            border: `1px solid ${isDark ? 'rgba(20, 168, 0, 0.35)' : 'rgba(20, 168, 0, 0.15)'}`,
            borderRadius: '9999px',
            mb: 2.2,
            color: '#14a800',
            fontSize: '10.5px',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.08em'
          }}>
            <SparklesIcon sx={{ fontSize: 13 }} />
            <span>User Workspace</span>
          </Box>

          <Typography variant="h4" sx={{ fontWeight: 900, color: isDark ? '#fff' : '#070a13', mb: 1.5, fontSize: { xs: '22px', sm: '28px', md: '36px' }, display: 'flex', alignItems: 'center', gap: 1 }}>
            {currentUser ? (
              <>Hello, <span style={{ color: '#14a800' }}>{currentUser.name.split(' ')[0]}</span>!</>
            ) : (
              <>Guest <span style={{ color: '#14a800' }}>Workspace</span></>
            )}
            <SparklesIcon sx={{ color: '#14a800', fontSize: { xs: 18, sm: 22 } }} />
          </Typography>

          <Typography variant="body2" sx={{ color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)', maxWidth: '620px', mb: 3.5, lineHeight: 1.5, fontSize: '13.5px' }}>
            {currentUser
              ? (currentUser.accountType === 'employer'
                ? `Recruiting for ${currentUser.organization || 'Independent Recruitment'}. Track favorited talents and unlocked contact parameters.`
                : `Role: ${currentUser.role || 'Job Seeker'}. Review your matching parameters and discover who viewed your profile.`)
              : 'Log in to unlock custom dashboards, view match scores, and track professional matrimony connections.'}
          </Typography>

          {/* Three sub cards for features */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.2,
              px: 2,
              py: 1.2,
              borderRadius: '12px',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
              backgroundColor: isDark ? 'rgba(15, 22, 36, 0.4)' : 'rgba(0,0,0,0.01)'
            }}>
              <ShieldIcon sx={{ color: '#14a800', fontSize: 18 }} />
              <Box>
                <Typography sx={{ fontWeight: 800, fontSize: '11px', color: isDark ? '#fff' : '#070a13' }}>Private & Secure</Typography>
                <Typography sx={{ fontSize: '9.5px', color: isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)' }}>Your data is protected</Typography>
              </Box>
            </Box>

            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.2,
              px: 2,
              py: 1.2,
              borderRadius: '12px',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
              backgroundColor: isDark ? 'rgba(15, 22, 36, 0.4)' : 'rgba(0,0,0,0.01)'
            }}>
              <TargetIcon sx={{ color: '#14a800', fontSize: 18 }} />
              <Box>
                <Typography sx={{ fontWeight: 800, fontSize: '11px', color: isDark ? '#fff' : '#070a13' }}>Smart Matching</Typography>
                <Typography sx={{ fontSize: '9.5px', color: isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)' }}>AI-driven recommendations</Typography>
              </Box>
            </Box>

            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.2,
              px: 2,
              py: 1.2,
              borderRadius: '12px',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
              backgroundColor: isDark ? 'rgba(15, 22, 36, 0.4)' : 'rgba(0,0,0,0.01)'
            }}>
              <TrendingUpIcon sx={{ color: '#14a800', fontSize: 18 }} />
              <Box>
                <Typography sx={{ fontWeight: 800, fontSize: '11px', color: isDark ? '#fff' : '#070a13' }}>Track Progress</Typography>
                <Typography sx={{ fontSize: '9.5px', color: isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)' }}>Monitor your journey</Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Right Orbit Art and Buttons Column */}
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
          position: 'relative',
          zIndex: 1,
          minWidth: { md: 240 }
        }}>
          {/* Orbital Padlock graphics */}
          <Box sx={{
            width: { xs: 100, sm: 140 },
            height: { xs: 100, sm: 140 },
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {/* Spinning dotted line */}
            <Box sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: '50%',
              border: '1.5px dashed rgba(20, 168, 0, 0.35)',
              animation: 'spin 12s linear infinite',
              '@keyframes spin': {
                '0%': { transform: 'rotate(0deg)' },
                '100%': { transform: 'rotate(360deg)' }
              }
            }} />

            {/* Central lock capsule */}
            <Box sx={{
              width: { xs: 44, sm: 58 },
              height: { xs: 44, sm: 58 },
              borderRadius: '50%',
              backgroundColor: 'rgba(20, 168, 0, 0.1)',
              border: '1.5px solid #14a800',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(20, 168, 0, 0.35)'
            }}>
              <LockIcon sx={{ color: '#14a800', fontSize: { xs: 18, sm: 24 } }} />
            </Box>

            {/* Orbit nodes */}
            <Box sx={{
              position: 'absolute',
              top: { xs: 10, sm: 15 },
              right: { xs: 10, sm: 15 },
              width: { xs: 20, sm: 26 },
              height: { xs: 20, sm: 26 },
              borderRadius: '50%',
              backgroundColor: isDark ? '#0f1624' : '#fff',
              border: '1px solid rgba(255,255,255,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
            }}>
              <PersonIcon sx={{ fontSize: { xs: 10, sm: 13 }, color: '#14a800' }} />
            </Box>
            <Box sx={{
              position: 'absolute',
              bottom: { xs: 15, sm: 25 },
              left: { xs: 2, sm: 5 },
              width: { xs: 20, sm: 26 },
              height: { xs: 20, sm: 26 },
              borderRadius: '50%',
              backgroundColor: isDark ? '#0f1624' : '#fff',
              border: '1px solid rgba(255,255,255,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
            }}>
              <PersonIcon sx={{ fontSize: { xs: 10, sm: 13 }, color: '#14a800' }} />
            </Box>
            <Box sx={{
              position: 'absolute',
              bottom: { xs: 10, sm: 15 },
              right: { xs: 10, sm: 15 },
              width: { xs: 20, sm: 26 },
              height: { xs: 20, sm: 26 },
              borderRadius: '50%',
              backgroundColor: isDark ? '#0f1624' : '#fff',
              border: '1.5px solid #14a800',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 10px rgba(20, 168, 0, 0.2)'
            }}>
              <ShieldIcon sx={{ fontSize: { xs: 10, sm: 13 }, color: '#14a800' }} />
            </Box>
          </Box>

          {/* Action trigger buttons (only if guest) */}
          {!currentUser && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Button
                variant="text"
                onClick={onOpenLogin}
                sx={{
                  color: isDark ? '#fff' : '#070a13',
                  fontWeight: 800,
                  textTransform: 'none',
                  fontSize: '13.5px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  '&:hover': {
                    color: '#14a800',
                    backgroundColor: 'transparent'
                  }
                }}
              >
                Log In <ArrowForwardIcon sx={{ fontSize: 14 }} />
              </Button>
              <Button
                variant="contained"
                onClick={onOpenRegister}
                startIcon={<PersonIcon sx={{ fontSize: 14 }} />}
                sx={{
                  backgroundColor: '#14a800',
                  color: '#fff',
                  borderRadius: '10px',
                  px: 3,
                  py: 1,
                  fontSize: '13px',
                  fontWeight: 800,
                  textTransform: 'none',
                  boxShadow: '0 4px 15px rgba(20, 168, 0, 0.3)',
                  '&:hover': {
                    backgroundColor: '#118f00',
                    boxShadow: '0 4px 20px rgba(20, 168, 0, 0.45)'
                  }
                }}
              >
                Register
              </Button>
            </Box>
          )}
        </Box>
      </Box>

      {/* Main Grid Panel */}
      <Grid container spacing={4}>

        {/* Sidebar Workspace Menu */}
        <Grid size={{ xs: 12, md: 3.8, lg: 3.2 }}>
          <Box sx={{
            background: isDark ? 'rgba(15, 22, 36, 0.6)' : 'rgba(255, 255, 255, 0.65)',
            border: `1.5px solid ${isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'}`,
            borderRadius: '20px',
            p: 2,
            backdropFilter: 'blur(16px)',
            boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.3)' : '0 10px 30px rgba(0,0,0,0.03)'
          }}>
            {/* Header label */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, px: 2, py: 1.5, mb: 1.8 }}>
              <GridViewIcon sx={{ color: '#14a800', fontSize: 18 }} />
              <Typography sx={{ fontWeight: 800, color: isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)', fontSize: '11.5px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Workspace Menu
              </Typography>
            </Box>

            {/* List links */}
            <List sx={{ display: 'flex', flexDirection: 'column', gap: 1.2, p: 0 }}>

              {/* Option 1: Saved Matches */}
              <ListItem
                onClick={() => setActiveTab('saved')}
                sx={{
                  cursor: 'pointer',
                  borderRadius: '12px',
                  py: 1.4,
                  px: 2,
                  border: activeTab === 'saved'
                    ? '1.5px solid rgba(20, 168, 0, 0.35)'
                    : `1px solid ${isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'}`,
                  backgroundColor: activeTab === 'saved'
                    ? 'rgba(20, 168, 0, 0.06)'
                    : 'transparent',
                  color: activeTab === 'saved' ? '#14a800' : (isDark ? 'rgba(255,255,255,0.7)' : '#070a13'),
                  transition: 'all 0.2s',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  '&:hover': {
                    backgroundColor: activeTab === 'saved' ? 'rgba(20, 168, 0, 0.08)' : (isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)')
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <HeartIcon sx={{ fontSize: 18 }} />
                  <Typography sx={{ fontSize: '13.5px', fontWeight: 800 }}>Saved Matches</Typography>
                </Box>
                <Box sx={{
                  width: 22,
                  height: 22,
                  borderRadius: '50%',
                  backgroundColor: '#14a800',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '10.5px',
                  fontWeight: 800
                }}>
                  {favorites.length}
                </Box>
              </ListItem>

              {/* Option 2: Unlocked Contacts (Recruiter view) */}
              {currentUser && currentUser.accountType === 'employer' && (
                <ListItem
                  onClick={() => setActiveTab('unlocked')}
                  sx={{
                    cursor: 'pointer',
                    borderRadius: '12px',
                    py: 1.4,
                    px: 2,
                    border: activeTab === 'unlocked'
                      ? '1.5px solid rgba(20, 168, 0, 0.35)'
                      : `1px solid ${isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'}`,
                    backgroundColor: activeTab === 'unlocked'
                      ? 'rgba(20, 168, 0, 0.06)'
                      : 'transparent',
                    color: activeTab === 'unlocked' ? '#14a800' : (isDark ? 'rgba(255,255,255,0.7)' : '#070a13'),
                    transition: 'all 0.2s',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    '&:hover': {
                      backgroundColor: activeTab === 'unlocked' ? 'rgba(20, 168, 0, 0.08)' : (isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)')
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <PhoneIcon sx={{ fontSize: 18 }} />
                    <Typography sx={{ fontSize: '13.5px', fontWeight: 800 }}>Unlocked Contacts</Typography>
                  </Box>
                  <Box sx={{
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    backgroundColor: '#14a800',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '10.5px',
                    fontWeight: 800
                  }}>
                    {unlockedContacts.length}
                  </Box>
                </ListItem>
              )}

              {/* Option 3: Seeker profile options */}
              {currentUser && currentUser.accountType === 'seeker' && [
                <ListItem
                  key="myprofile"
                  onClick={() => setActiveTab('myprofile')}
                  sx={{
                    cursor: 'pointer',
                    borderRadius: '12px',
                    py: 1.4,
                    px: 2,
                    border: activeTab === 'myprofile'
                      ? '1.5px solid rgba(20, 168, 0, 0.35)'
                      : `1px solid ${isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'}`,
                    backgroundColor: activeTab === 'myprofile'
                      ? 'rgba(20, 168, 0, 0.06)'
                      : 'transparent',
                    color: activeTab === 'myprofile' ? '#14a800' : (isDark ? 'rgba(255,255,255,0.7)' : '#070a13'),
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    '&:hover': {
                      backgroundColor: activeTab === 'myprofile' ? 'rgba(20, 168, 0, 0.08)' : (isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)')
                    }
                  }}
                >
                  <PersonIcon sx={{ fontSize: 18 }} />
                  <Typography sx={{ fontSize: '13.5px', fontWeight: 800 }}>My Profile Details</Typography>
                </ListItem>,

                <ListItem
                  key="views"
                  onClick={() => setActiveTab('views')}
                  sx={{
                    cursor: 'pointer',
                    borderRadius: '12px',
                    py: 1.4,
                    px: 2,
                    border: activeTab === 'views'
                      ? '1.5px solid rgba(20, 168, 0, 0.35)'
                      : `1px solid ${isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'}`,
                    backgroundColor: activeTab === 'views'
                      ? 'rgba(20, 168, 0, 0.06)'
                      : 'transparent',
                    color: activeTab === 'views' ? '#14a800' : (isDark ? 'rgba(255,255,255,0.7)' : '#070a13'),
                    transition: 'all 0.2s',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    '&:hover': {
                      backgroundColor: activeTab === 'views' ? 'rgba(20, 168, 0, 0.08)' : (isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)')
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <EyeIcon sx={{ fontSize: 18 }} />
                    <Typography sx={{ fontSize: '13.5px', fontWeight: 800 }}>Who Viewed Me</Typography>
                  </Box>
                  <Box sx={{
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    backgroundColor: '#14a800',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '10.5px',
                    fontWeight: 800
                  }}>
                    {seededViews.length}
                  </Box>
                </ListItem>
              ]}

              {/* Decorative inactive sidebar items to fill workspace menu look */}
              <ListItem sx={{ opacity: 0.5, py: 1.4, px: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <EyeIcon sx={{ fontSize: 18 }} />
                  <Typography sx={{ fontSize: '13.5px', fontWeight: 700 }}>Recent Views</Typography>
                </Box>
              </ListItem>
              <ListItem sx={{ opacity: 0.5, py: 1.4, px: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <SparklesIcon sx={{ fontSize: 18 }} />
                  <Typography sx={{ fontSize: '13.5px', fontWeight: 700 }}>Shortlisted Profiles</Typography>
                </Box>
              </ListItem>
              <ListItem sx={{ opacity: 0.5, py: 1.4, px: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <PlaceIcon sx={{ fontSize: 18 }} />
                  <Typography sx={{ fontSize: '13.5px', fontWeight: 700 }}>Account & Settings</Typography>
                </Box>
              </ListItem>

            </List>
          </Box>
        </Grid>

        {/* Tab Panel Content Display */}
        <Grid size={{ xs: 12, md: 8.2, lg: 8.8 }}>

          {/* TAB 1: SAVED MATCHES */}
          {activeTab === 'saved' && (
            <Box>
              {/* Header Title with heart and sort dropdown */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 900, display: 'flex', alignItems: 'center', gap: 1.2, color: isDark ? '#fff' : '#070a13', fontSize: '20px' }}>
                  <HeartIcon sx={{ color: '#3b82f6' }} />
                  Your Saved Matches
                </Typography>

                {/* Sort Pill Dropdown */}
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  px: 1.8,
                  py: 0.8,
                  borderRadius: '10px',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                  backgroundColor: isDark ? 'rgba(15, 22, 36, 0.5)' : 'rgba(0,0,0,0.02)',
                  cursor: 'pointer'
                }}>
                  <Typography sx={{ fontSize: '12px', fontWeight: 700, color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)' }}>
                    Sort by: <span style={{ color: isDark ? '#fff' : '#000' }}>Recent Added</span>
                  </Typography>
                  <KeyboardArrowDownIcon sx={{ fontSize: 16, color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }} />
                </Box>
              </Box>

              {bookmarkedProfiles.length === 0 ? (
                <Box sx={{
                  p: 8,
                  textAlign: 'center',
                  border: `1.5px solid ${isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'}`,
                  borderRadius: '20px',
                  backgroundColor: isDark ? 'rgba(15, 22, 36, 0.4)' : '#ffffff',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  {/* Concentric heart outline circle rings */}
                  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                    <Box sx={{
                      width: 90,
                      height: 90,
                      borderRadius: '50%',
                      border: '1.5px dashed rgba(255, 255, 255, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      animation: 'pulse 3s infinite ease-in-out',
                      '@keyframes pulse': {
                        '0%, 100%': { transform: 'scale(1)', opacity: 0.8 },
                        '50%': { transform: 'scale(1.06)', opacity: 1 }
                      }
                    }}>
                      <Box sx={{
                        width: 58,
                        height: 58,
                        borderRadius: '50%',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <HeartIcon sx={{ fontSize: 26, color: '#3b82f6' }} />
                      </Box>
                    </Box>
                  </Box>

                  <Typography variant="h6" sx={{ color: isDark ? '#fff' : '#070a13', mb: 1.2, fontWeight: 800, fontSize: '17px' }}>
                    No profiles bookmarked yet
                  </Typography>
                  <Typography variant="body2" sx={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)', maxWidth: 380, mx: 'auto', mb: 3.5, fontSize: '13px', lineHeight: 1.4 }}>
                    Browse the registry, select profiles and click the bookmark heart icon to save matches.
                  </Typography>

                  {/* Explore button */}
                  <Button
                    variant="outlined"
                    startIcon={<SearchIcon sx={{ fontSize: 15 }} />}
                    sx={{
                      borderRadius: '10px',
                      textTransform: 'none',
                      fontSize: '12.5px',
                      fontWeight: 800,
                      borderColor: '#14a800',
                      color: '#14a800',
                      py: 1,
                      px: 2.5,
                      '&:hover': {
                        borderColor: '#118f00',
                        backgroundColor: 'rgba(20, 168, 0, 0.05)'
                      }
                    }}
                  >
                    Explore Talents
                  </Button>

                  {/* Right paper airplane trajectory SVG */}
                  <Box sx={{
                    position: 'absolute',
                    right: 40,
                    bottom: 40,
                    opacity: 0.6,
                    pointerEvents: 'none',
                    display: { xs: 'none', sm: 'block' }
                  }}>
                    <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                      <path
                        d="M10,100 Q40,40 80,70 T110,20"
                        stroke="#14a800"
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                        fill="none"
                      />
                      <g transform="translate(108, 17) rotate(-45)">
                        <SendIcon sx={{ color: '#14a800', fontSize: 18 }} />
                      </g>
                    </svg>
                  </Box>
                </Box>
              ) : (
                <Grid container spacing={3}>
                  {bookmarkedProfiles.map(profile => (
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 4 }} key={profile.id}>
                      <JobCard profile={profile} />
                    </Grid>
                  ))}
                </Grid>
              )}
            </Box>
          )}

          {/* TAB 2: UNLOCKED CONNECTIONS */}
          {activeTab === 'unlocked' && currentUser && currentUser.accountType === 'employer' && (
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 800, mb: 3, display: 'flex', alignItems: 'center', gap: 1.2, color: isDark ? '#fff' : '#070a13' }}>
                <PhoneIcon sx={{ color: '#14a800' }} />
                Unlocked Talent Directory
              </Typography>

              {unlockedProfiles.length === 0 ? (
                <Box sx={{
                  p: 6,
                  textAlign: 'center',
                  border: `1px dashed ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                  borderRadius: 3.5,
                  backgroundColor: isDark ? 'rgba(255, 255, 255, 0.01)' : 'rgba(0, 0, 0, 0.01)'
                }}>
                  <PhoneIcon sx={{ fontSize: 40, color: 'rgba(255,255,255,0.2)', mb: 1.5 }} />
                  <Typography variant="body1" sx={{ color: isDark ? '#fff' : '#070a13', mb: 0.5, fontWeight: 'bold' }}>No unlocked contact details yet</Typography>
                  <Typography variant="body2" sx={{ color: isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)' }}>View profile cards, open detailed dialogues and select "Unlock Contact Details".</Typography>
                </Box>
              ) : (
                <Grid container spacing={2.5}>
                  {unlockedProfiles.map(profile => (
                    <Grid size={{ xs: 12 }} key={profile.id}>
                      <Card sx={{
                        border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                        boxShadow: 'none',
                        background: isDark ? 'rgba(15, 22, 36, 0.4)' : '#ffffff',
                        '&:hover': { transform: 'none' }
                      }}>
                        <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
                          <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                            {/* Left details */}
                            <Grid size={{ xs: 12, sm: 5 }} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              {profile.image ? (
                                <Avatar src={profile.image} sx={{ width: 48, height: 48 }} />
                              ) : (
                                <Avatar sx={{
                                  width: 48,
                                  height: 48,
                                  backgroundColor: '#14a800',
                                  fontWeight: 'bold'
                                }}>
                                  {profile.name.charAt(0)}
                                </Avatar>
                              )}
                              <Box sx={{ minWidth: 0 }}>
                                <Typography variant="body1" sx={{ fontWeight: 'bold', color: isDark ? '#fff' : '#070a13' }} noWrap>
                                  {profile.name}
                                </Typography>
                                <Typography variant="caption" sx={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}>
                                  {profile.role} • {profile.location.split(',')[0]}
                                </Typography>
                              </Box>
                            </Grid>

                            {/* Center contacts */}
                            <Grid size={{ xs: 12, sm: 5 }} sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 1.5, sm: 3 } }}>
                              <Box>
                                <Typography variant="caption" sx={{ color: isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)', display: 'block', fontWeight: 700, textTransform: 'uppercase' }}>Mobile</Typography>
                                <Typography
                                  component="a"
                                  href={`tel:${profile.mobile}`}
                                  sx={{ fontSize: '14px', fontWeight: 'bold', color: '#14a800', textDecoration: 'none' }}
                                >
                                  {profile.mobile}
                                </Typography>
                              </Box>
                              <Box>
                                <Typography variant="caption" sx={{ color: isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)', display: 'block', fontWeight: 700, textTransform: 'uppercase' }}>Email</Typography>
                                <Typography
                                  component="a"
                                  href={`mailto:${profile.email}`}
                                  sx={{ fontSize: '13px', fontWeight: 'bold', color: isDark ? '#fff' : '#070a13', textDecoration: 'none' }}
                                >
                                  {profile.email}
                                </Typography>
                              </Box>
                            </Grid>

                            {/* Right action */}
                            <Grid size={{ xs: 12, sm: 2 }} sx={{ textalign: { xs: 'left', sm: 'right' } }}>
                              <Button
                                size="small"
                                variant="outlined"
                                onClick={() => setSelectedProfileId(profile.id)}
                                sx={{ borderColor: '#14a800', color: '#14a800', textTransform: 'none', fontWeight: 700 }}
                              >
                                View Details
                              </Button>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Box>
          )}

          {/* TAB 3: SEEKER DETAILS */}
          {activeTab === 'myprofile' && currentUser && currentUser.accountType === 'seeker' && myProfile && (
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 800, mb: 3, display: 'flex', alignItems: 'center', gap: 1.2, color: isDark ? '#fff' : '#070a13' }}>
                <PersonIcon sx={{ color: '#14a800' }} />
                Your Job Matrimony Profile
              </Typography>

              <Card sx={{
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                boxShadow: 'none',
                background: isDark ? 'rgba(15, 22, 36, 0.4)' : '#ffffff',
                p: 2
              }}>
                <CardContent sx={{ p: 4 }}>
                  {/* Top info */}
                  <Box sx={{ display: 'flex', gap: 2.5, alignItems: 'center', mb: 4, flexWrap: 'wrap' }}>
                    {myProfile.image ? (
                      <Avatar src={myProfile.image} variant="rounded" sx={{ width: { xs: 60, sm: 80 }, height: { xs: 60, sm: 80 } }} />
                    ) : (
                      <Avatar
                        variant="rounded"
                        sx={{
                          width: { xs: 60, sm: 80 },
                          height: { xs: 60, sm: 80 },
                          backgroundColor: '#14a800',
                          color: '#fff',
                          fontWeight: 800,
                          fontSize: { xs: '20px', sm: '28px' }
                        }}
                      >
                        {myProfile.name.charAt(0)}
                      </Avatar>
                    )}
                    <Box sx={{ minWidth: 0 }}>
                      <Typography variant="h5" sx={{ fontWeight: 800, color: isDark ? '#fff' : '#070a13', mb: 0.5, fontSize: { xs: '19px', sm: '22px', md: '25px' } }}>
                        {myProfile.name}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
                        <Typography variant="body2" sx={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)', fontWeight: 500 }}>
                          {myProfile.role}
                        </Typography>
                        <Chip label={myProfile.category} size="small" sx={{ backgroundColor: 'rgba(20, 168, 0, 0.1)', color: '#14a800', textTransform: 'capitalize', fontWeight: 'bold', height: '20px', fontSize: '10px' }} />
                      </Box>
                    </Box>
                  </Box>

                  {/* Core details */}
                  <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid size={{ xs: 12, sm: 4 }}>
                      <Typography variant="caption" sx={{ color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)', display: 'block', fontWeight: 700, textTransform: 'uppercase' }}>Mobile Login</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 'bold', color: isDark ? '#fff' : '#070a13', mt: 0.5 }}>{myProfile.mobile}</Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                      <Typography variant="caption" sx={{ color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)', display: 'block', fontWeight: 700, textTransform: 'uppercase' }}>Email</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 'bold', color: isDark ? '#fff' : '#070a13', mt: 0.5 }}>{myProfile.email}</Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                      <Typography variant="caption" sx={{ color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)', display: 'block', fontWeight: 700, textTransform: 'uppercase' }}>Age & Gender</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 'bold', color: isDark ? '#fff' : '#070a13', mt: 0.5 }}>{myProfile.age} Years / {myProfile.gender}</Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                      <Typography variant="caption" sx={{ color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)', display: 'block', fontWeight: 700, textTransform: 'uppercase' }}>Experience</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 'bold', color: isDark ? '#fff' : '#070a13', mt: 0.5 }}>{myProfile.experience} Years</Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                      <Typography variant="caption" sx={{ color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)', display: 'block', fontWeight: 700, textTransform: 'uppercase' }}>Target Salary</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 'bold', color: isDark ? '#fff' : '#070a13', mt: 0.5 }}>{myProfile.salary}</Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                      <Typography variant="caption" sx={{ color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)', display: 'block', fontWeight: 700, textTransform: 'uppercase' }}>Location</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 'bold', color: isDark ? '#fff' : '#070a13', mt: 0.5 }}>{myProfile.location}</Typography>
                    </Grid>
                  </Grid>

                  {/* Skills */}
                  <Box sx={{ mb: 4 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: isDark ? '#fff' : '#070a13', mb: 1.5, borderBottom: `1.5px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`, pb: 0.5 }}>
                      Registered Skills
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {myProfile.skills.map((skill, index) => (
                        <Chip key={index} label={skill} size="small" variant="outlined" sx={{ color: isDark ? '#fff' : '#070a13', borderColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)' }} />
                      ))}
                    </Box>
                  </Box>

                  {/* Biography */}
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: isDark ? '#fff' : '#070a13', mb: 1.5, borderBottom: `1.5px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`, pb: 0.5 }}>
                      Professional Biography
                    </Typography>
                    <Typography variant="body2" sx={{ color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)', lineHeight: 1.6 }}>
                      {myProfile.bio}
                    </Typography>
                  </Box>

                </CardContent>
              </Card>
            </Box>
          )}

          {/* TAB 4: WHO VIEWED ME */}
          {activeTab === 'views' && currentUser && currentUser.accountType === 'seeker' && (
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 800, color: isDark ? '#fff' : '#070a13', mb: 0.5 }}>
                Who Unlocked Your Contact Parameters
              </Typography>
              <Typography variant="body2" sx={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)', mb: 3.5 }}>
                Matched connection history. These verified recruiters have unlocked your phone number to start matches.
              </Typography>

              <List sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 0 }}>
                {seededViews.map(view => (
                  <ListItem
                    key={view.id}
                    sx={{
                      p: 2.5,
                      borderRadius: '16px',
                      border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                      borderLeft: '4px solid #14a800',
                      backgroundColor: isDark ? 'rgba(15, 22, 36, 0.4)' : '#ffffff',
                      flexWrap: 'wrap',
                      gap: 2,
                      justifyContent: 'space-between'
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ backgroundColor: 'rgba(20, 168, 0, 0.1)', color: '#14a800' }}>
                        <PhoneIcon sx={{ fontSize: 20 }} />
                      </Avatar>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 'bold', color: isDark ? '#fff' : '#070a13' }}>
                          {view.unlockedBy}
                        </Typography>
                        <Typography variant="caption" sx={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}>
                          Mobile: <strong>{view.unlockedByMobile}</strong>
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Typography variant="caption" sx={{ color: isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)' }}>
                        {view.timestamp}
                      </Typography>
                      <IconButton
                        component="a"
                        href={`tel:${view.unlockedByMobile}`}
                        color="success"
                        sx={{ border: `1.5px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`, p: 1 }}
                        title="Call Back Recruiter"
                      >
                        <PhoneIcon sx={{ fontSize: 16, color: '#14a800' }} />
                      </IconButton>
                    </Box>

                  </ListItem>
                ))}
              </List>
            </Box>
          )}

        </Grid>

      </Grid>
    </Box>
  );
};
