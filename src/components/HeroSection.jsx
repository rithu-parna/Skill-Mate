import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Container, 
  Grid, 
  InputAdornment, 
  Divider,
  useTheme
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MapPinIcon from '@mui/icons-material/Place';
import SparklesIcon from '@mui/icons-material/AutoAwesome';
import GroupIcon from '@mui/icons-material/People';
import BriefcaseIcon from '@mui/icons-material/Work';
import PaletteIcon from '@mui/icons-material/Palette';
import StarIcon from '@mui/icons-material/Star';
import ShieldIcon from '@mui/icons-material/Shield';
import LightningIcon from '@mui/icons-material/Bolt';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export const HeroSection = () => {
  const { filters, setFilters, profiles } = useContext(AppContext);
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const handleSearchChange = (e) => {
    setFilters(prev => ({ ...prev, search: e.target.value }));
  };

  const handleLocationChange = (e) => {
    setFilters(prev => ({ ...prev, location: e.target.value }));
  };

  // Count profiles per type dynamically
  const seekerCount = profiles.length;
  const corpTechCount = profiles.filter(p => p.category === 'corporate' || p.category === 'technical').length;
  const creativeCount = profiles.filter(p => p.category === 'creative').length;

  return (
    <Box sx={{
      position: 'relative',
      py: { xs: 6, md: 10 },
      backgroundColor: theme.palette.background.default,
      borderBottom: `1px solid ${theme.palette.divider}`,
      overflow: 'hidden'
    }}>
      {/* Background Ambient Glow */}
      <Box className="green-glow-bg" sx={{ top: '-10%', right: '-5%', width: '600px', height: '600px' }} />
      <Box className="green-glow-bg" sx={{ bottom: '-10%', left: '-5%', width: '400px', height: '400px', opacity: 0.5 }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={{ xs: 6, md: 4 }} alignItems="center">
          
          {/* LEFT COLUMN: Texts and Search */}
          <Grid size={{ xs: 12, md: 7 }} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            {/* Sparkle Tagline */}
            <Box sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              px: 2.2,
              py: 0.8,
              backgroundColor: isDark ? 'rgba(20, 168, 0, 0.08)' : 'rgba(20, 168, 0, 0.05)',
              border: `1.5px solid ${isDark ? 'rgba(20, 168, 0, 0.35)' : 'rgba(20, 168, 0, 0.2)'}`,
              borderRadius: '9999px',
              mb: 3.5,
              color: theme.palette.primary.main,
              fontSize: '11px',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              boxShadow: isDark ? '0 0 15px rgba(20, 168, 0, 0.15)' : 'none'
            }}>
              <SparklesIcon sx={{ fontSize: 13 }} />
              <span>The Next Generation Talent Matchmaker</span>
            </Box>

            {/* Hero Title */}
            <Typography 
              variant="h2" 
              component="h1"
              sx={{
                fontSize: { xs: '34px', sm: '46px', md: '54px' },
                fontWeight: 800,
                lineHeight: 1.12,
                color: theme.palette.text.primary,
                mb: 2.5,
                fontFamily: 'var(--font-display)',
                letterSpacing: '-0.02em'
              }}
            >
              Where Great{' '}
              <Box component="span" sx={{ color: theme.palette.primary.main }}>
                Talents
              </Box>{' '}
              Meet the Perfect{' '}
              <Box component="span" sx={{ color: theme.palette.primary.main }}>
                Opportunities
              </Box>
            </Typography>

            {/* Hero Subtitle */}
            <Typography 
              variant="body1" 
              sx={{
                fontSize: { xs: '15px', md: '16.5px' },
                fontWeight: 400,
                lineHeight: 1.6,
                color: theme.palette.text.secondary,
                mb: 4.5,
                maxWidth: '600px'
              }}
            >
              A premium, matrimony-style matchmaking registry for professionals, creatives, and skilled services. 
              View verified portfolios and unlock instant contact details.
            </Typography>

            {/* Search Panel Card */}
            <Box sx={{
              background: isDark ? 'rgba(15, 22, 36, 0.65)' : 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(20px)',
              border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'}`,
              p: 1.2,
              borderRadius: '18px',
              boxShadow: isDark ? '0 12px 36px rgba(0, 0, 0, 0.5)' : '0 12px 36px rgba(0, 0, 0, 0.06)',
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 1,
              alignItems: 'center',
              maxWidth: '680px'
            }}>
              
              {/* Keyword Search */}
              <TextField 
                fullWidth
                placeholder="Search by name, role, or skills (e.g. Figma, Developer)" 
                value={filters.search}
                onChange={handleSearchChange}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: theme.palette.text.light, fontSize: 20 }} />
                    </InputAdornment>
                  ),
                  sx: {
                    backgroundColor: 'transparent !important',
                    '& fieldset': { border: 'none !important' },
                    fontSize: '13.5px'
                  }
                }}
              />

              <Divider 
                orientation="vertical" 
                flexItem 
                sx={{ display: { xs: 'none', sm: 'block' }, mx: 0.5, my: 1.5, borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0,0,0,0.1)' }} 
              />

              {/* Location Search */}
              <TextField 
                fullWidth
                placeholder="City, State..." 
                value={filters.location}
                onChange={handleLocationChange}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MapPinIcon sx={{ color: theme.palette.text.light, fontSize: 20 }} />
                    </InputAdornment>
                  ),
                  sx: {
                    backgroundColor: 'transparent !important',
                    '& fieldset': { border: 'none !important' },
                    fontSize: '13.5px'
                  }
                }}
              />

              <Button 
                variant="contained" 
                color="primary"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  width: { xs: '100%', sm: 'auto' },
                  px: 7,
                  py: 1.4,
                  borderRadius: '10px',
                  whiteSpace: 'nowrap',
                  fontWeight: 700,
                  fontSize: '13px',
                  fontFamily: 'var(--font-display)',
                  boxShadow: 'none',
                  '&:hover': {
                    backgroundColor: theme.palette.primary.dark,
                    boxShadow: 'none'
                  }
                }}
              >
                Find Matches
              </Button>
            </Box>
          </Grid>

          {/* RIGHT COLUMN: Asymmetric Profile Collage */}
          <Grid size={{ xs: 12, md: 5 }} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Box className="collage-container">
              
              {/* Background waves/rings (SVG overlay) */}
              <Box sx={{
                position: 'absolute',
                width: '120%',
                height: '120%',
                zIndex: 0,
                opacity: 0.3,
                pointerEvents: 'none'
              }}>
                <svg width="100%" height="100%" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="200" cy="200" r="120" stroke="#14a800" strokeWidth="1" strokeDasharray="4 8" />
                  <circle cx="200" cy="200" r="160" stroke="#14a800" strokeWidth="0.75" />
                  <circle cx="200" cy="200" r="80" stroke="#14a800" strokeWidth="1.5" strokeDasharray="2 4" />
                  <path d="M50 200 C 150 100, 250 300, 350 200" stroke="#14a800" strokeWidth="0.5" opacity="0.5" />
                </svg>
              </Box>

              {/* COLLAGE IMAGES */}
              {/* 1. Sarah Jenkins (Top Right) */}
              <Box className="profile-frame" sx={{
                width: '110px',
                height: '130px',
                top: '20px',
                right: '12%',
                borderRadius: '18px 45px 18px 18px',
                zIndex: 2
              }}>
                <img src="/images/executive.png" alt="Sarah Jenkins" />
              </Box>

              {/* 2. Marcus Chen (Center - Main) */}
              <Box className="profile-frame" sx={{
                width: '160px',
                height: '190px',
                top: '90px',
                left: '42%',
                transform: 'translateX(-50%)',
                borderRadius: '18px 18px 45px 18px',
                borderWidth: '2px',
                borderColor: 'rgba(20, 168, 0, 0.4)',
                boxShadow: '0 20px 45px rgba(0, 0, 0, 0.6), 0 0 25px rgba(20, 168, 0, 0.15)',
                zIndex: 4
              }}>
                <img src="/images/designer.png" alt="Marcus Chen" />
              </Box>

              {/* 3. Maria Gonzalez (Bottom Left) */}
              <Box className="profile-frame" sx={{
                width: '105px',
                height: '125px',
                top: '190px',
                left: '12%',
                borderRadius: '45px 18px 18px 18px',
                zIndex: 2
              }}>
                <img src="/images/chef.png" alt="Maria Gonzalez" />
              </Box>

              {/* 4. David Miller (Bottom Right) */}
              <Box className="profile-frame" sx={{
                width: '110px',
                height: '130px',
                top: '210px',
                right: '15%',
                borderRadius: '18px 18px 18px 45px',
                zIndex: 2
              }}>
                <img src="/images/developer.png" alt="David Miller" />
              </Box>

              {/* FLOATING BADGES */}
              {/* Badge 1: Verified (Top Left) */}
              <Box className="float-badge-1" sx={{
                position: 'absolute',
                top: '50px',
                left: '5%',
                zIndex: 5,
                display: 'flex',
                alignItems: 'center',
                gap: 1.2,
                px: 2,
                py: 1.2,
                borderRadius: '12px',
                backgroundColor: 'rgba(15, 22, 36, 0.75)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 12px 24px rgba(0,0,0,0.4)'
              }}>
                <Box sx={{
                  backgroundColor: 'rgba(20, 168, 0, 0.15)',
                  color: '#14a800',
                  borderRadius: '50%',
                  width: '26px',
                  height: '26px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 14
                }}>
                  <ShieldIcon sx={{ fontSize: 15 }} />
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ fontSize: '11px', fontWeight: 800, color: '#fff', lineHeight: 1.2 }}>
                    Verified
                  </Typography>
                  <Typography variant="caption" sx={{ fontSize: '9px', color: theme.palette.text.light, display: 'block', fontWeight: 600 }}>
                    Quality Profiles
                  </Typography>
                </Box>
              </Box>

              {/* Badge 2: Connect Instantly (Bottom Right) */}
              <Box className="float-badge-2" sx={{
                position: 'absolute',
                bottom: '40px',
                right: '0%',
                zIndex: 5,
                display: 'flex',
                alignItems: 'center',
                gap: 1.2,
                px: 2,
                py: 1.2,
                borderRadius: '12px',
                backgroundColor: 'rgba(15, 22, 36, 0.75)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 12px 24px rgba(0,0,0,0.4)'
              }}>
                <Box sx={{
                  backgroundColor: 'rgba(20, 168, 0, 0.15)',
                  color: '#14a800',
                  borderRadius: '50%',
                  width: '26px',
                  height: '26px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 14
                }}>
                  <LightningIcon sx={{ fontSize: 15 }} />
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ fontSize: '11px', fontWeight: 800, color: '#fff', lineHeight: 1.2 }}>
                    Connect Instantly
                  </Typography>
                  <Typography variant="caption" sx={{ fontSize: '9px', color: theme.palette.text.light, display: 'block', fontWeight: 600 }}>
                    Real Opportunities
                  </Typography>
                </Box>
              </Box>

            </Box>
          </Grid>

        </Grid>

        {/* BOTTOM SECTION: Full-Width Statistics Counter Bar */}
        <Box sx={{
          mt: { xs: 8, md: 10 },
          background: isDark ? 'rgba(15, 22, 36, 0.45)' : 'rgba(255, 255, 255, 0.5)',
          backdropFilter: 'blur(12px)',
          border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'}`,
          borderRadius: '20px',
          p: { xs: 2.5, md: 3 },
          boxShadow: isDark ? '0 10px 30px rgba(0, 0, 0, 0.3)' : '0 10px 30px rgba(0, 0, 0, 0.03)',
        }}>
          <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
            
            {/* Stat 1: Registered Talents */}
            <Grid size={{ xs: 12, sm: 6, md: 3 }} sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: { xs: 'flex-start', md: 'center' } }}>
              <Box sx={{ 
                color: theme.palette.primary.main, 
                backgroundColor: isDark ? 'rgba(20, 168, 0, 0.1)' : 'rgba(20, 168, 0, 0.05)',
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <GroupIcon sx={{ fontSize: 22 }} />
              </Box>
              <Box>
                <Typography variant="h5" sx={{ fontSize: '22px', fontWeight: 800, color: theme.palette.text.primary, lineHeight: 1.1, fontFamily: 'var(--font-display)' }}>
                  {seekerCount}
                </Typography>
                <Typography variant="caption" sx={{ fontSize: '11px', color: theme.palette.text.secondary, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Registered Talents
                </Typography>
              </Box>
            </Grid>

            {/* Stat 2: Corp & Tech Pros */}
            <Grid size={{ xs: 12, sm: 6, md: 3 }} sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: { xs: 'flex-start', md: 'center' } }}>
              <Box sx={{ 
                color: theme.palette.secondary.main, 
                backgroundColor: isDark ? 'rgba(31, 87, 195, 0.1)' : 'rgba(31, 87, 195, 0.05)',
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <BriefcaseIcon sx={{ fontSize: 22 }} />
              </Box>
              <Box>
                <Typography variant="h5" sx={{ fontSize: '22px', fontWeight: 800, color: theme.palette.text.primary, lineHeight: 1.1, fontFamily: 'var(--font-display)' }}>
                  {corpTechCount}
                </Typography>
                <Typography variant="caption" sx={{ fontSize: '11px', color: theme.palette.text.secondary, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Corp & Tech Pros
                </Typography>
              </Box>
            </Grid>

            {/* Stat 3: Creative Services */}
            <Grid size={{ xs: 12, sm: 6, md: 3 }} sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: { xs: 'flex-start', md: 'center' } }}>
              <Box sx={{ 
                color: 'var(--accent)', 
                backgroundColor: isDark ? 'rgba(168, 85, 247, 0.1)' : 'rgba(168, 85, 247, 0.05)',
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <PaletteIcon sx={{ fontSize: 22 }} />
              </Box>
              <Box>
                <Typography variant="h5" sx={{ fontSize: '22px', fontWeight: 800, color: theme.palette.text.primary, lineHeight: 1.1, fontFamily: 'var(--font-display)' }}>
                  {creativeCount}
                </Typography>
                <Typography variant="caption" sx={{ fontSize: '11px', color: theme.palette.text.secondary, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Creative Services
                </Typography>
              </Box>
            </Grid>

            {/* Stat 4: Verified Profiles */}
            <Grid size={{ xs: 12, sm: 6, md: 3 }} sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: { xs: 'flex-start', md: 'center' } }}>
              <Box sx={{ 
                color: '#f59e0b', 
                backgroundColor: isDark ? 'rgba(245, 158, 11, 0.1)' : 'rgba(245, 158, 11, 0.05)',
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <StarIcon sx={{ fontSize: 22 }} />
              </Box>
              <Box>
                <Typography variant="h5" sx={{ fontSize: '22px', fontWeight: 800, color: theme.palette.text.primary, lineHeight: 1.1, fontFamily: 'var(--font-display)' }}>
                  100%
                </Typography>
                <Typography variant="caption" sx={{ fontSize: '11px', color: theme.palette.text.secondary, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Verified Profiles
                </Typography>
              </Box>
            </Grid>

          </Grid>
        </Box>

      </Container>
    </Box>
  );
};
