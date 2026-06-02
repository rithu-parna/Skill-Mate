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
import CompassIcon from '@mui/icons-material/Explore';

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

  // Count profiles per type
  const seekerCount = profiles.length;
  const corporateCount = profiles.filter(p => p.category === 'corporate').length;
  const creativeCount = profiles.filter(p => p.category === 'creative').length;
  const techCount = profiles.filter(p => p.category === 'technical').length;

  return (
    <Box sx={{
      position: 'relative',
      py: { xs: 8, md: 10 },
      background: isDark 
        ? 'radial-gradient(circle at 80% 20%, rgba(99, 102, 241, 0.1) 0%, transparent 50%), radial-gradient(circle at 10% 80%, rgba(236, 72, 153, 0.08) 0%, transparent 50%)'
        : 'radial-gradient(circle at 80% 20%, rgba(99, 102, 241, 0.05) 0%, transparent 50%), radial-gradient(circle at 10% 80%, rgba(236, 72, 153, 0.04) 0%, transparent 50%)',
      borderBottom: `1px solid ${theme.palette.divider}`,
      overflow: 'hidden'
    }}>
      {/* Decorative blurred background shapes */}
      <Box sx={{
        position: 'absolute',
        top: '-150px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '600px',
        height: '300px',
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(236, 72, 153, 0.15))',
        filter: 'blur(100px)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        
        {/* Glow Tagline */}
        <Box sx={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 1,
          px: 2,
          py: 0.8,
          backgroundColor: isDark ? 'rgba(99, 102, 241, 0.1)' : 'rgba(99, 102, 241, 0.06)',
          border: `1px solid ${isDark ? 'rgba(99, 102, 241, 0.3)' : 'rgba(99, 102, 241, 0.2)'}`,
          borderRadius: 9999,
          mb: 3,
          color: theme.palette.primary.main,
          fontSize: '13px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }} className="glow-animation">
          <SparklesIcon sx={{ fontSize: 14 }} />
          <span>The Next Generation Talent Matchmaker</span>
        </Box>

        {/* Hero Title */}
        <Typography 
          variant="h2" 
          component="h1"
          sx={{
            fontSize: { xs: '32px', sm: '42px', md: '56px' },
            fontWeight: 800,
            maxWidth: '850px',
            margin: '0 auto 20px auto',
            lineHeight: 1.15,
            color: theme.palette.text.primary
          }}
        >
          Where Great{' '}
          <Box component="span" sx={{
            background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Talents
          </Box>{' '}
          Meet the Perfect{' '}
          <Box component="span" sx={{
            background: 'linear-gradient(135deg, #ec4899 0%, #06b6d4 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Opportunities
          </Box>
        </Typography>

        <Typography 
          variant="h6" 
          sx={{
            fontSize: { xs: '15px', md: '18px' },
            fontWeight: 400,
            maxWidth: '650px',
            margin: '0 auto 40px auto',
            color: theme.palette.text.secondary
          }}
        >
          A premium, matrimony-style matchmaking registry for professionals, creatives, and skilled services. 
          View verified portfolios and unlock instant contact details.
        </Typography>

        {/* Search Panel Card */}
        <Box sx={{
          background: theme.palette.background.glass,
          backdropFilter: 'blur(12px)',
          border: `1px solid ${theme.palette.divider}`,
          maxWidth: '780px',
          margin: '0 auto 50px auto',
          p: 1,
          borderRadius: 3.5,
          boxShadow: theme.shadows[4],
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 1,
          alignItems: 'center'
        }}>
          
          {/* Keyword Search */}
          <TextField 
            fullWidth
            placeholder="Search by name, role, or skills (e.g. Figma, SQL)..." 
            value={filters.search}
            onChange={handleSearchChange}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: theme.palette.text.light }} />
                </InputAdornment>
              ),
              sx: {
                backgroundColor: 'transparent !important',
                '& fieldset': { border: 'none !important' }
              }
            }}
          />

          <Divider 
            orientation="vertical" 
            flexItem 
            sx={{ display: { xs: 'none', md: 'block' }, mx: 0.5, my: 1 }} 
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
                  <MapPinIcon sx={{ color: theme.palette.text.light }} />
                </InputAdornment>
              ),
              sx: {
                backgroundColor: 'transparent !important',
                '& fieldset': { border: 'none !important' }
              }
            }}
          />

          <Button 
            variant="contained" 
            color="primary"
            sx={{
              width: { xs: '100%', md: 'auto' },
              px: 4,
              py: 1.5,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
              whiteSpace: 'nowrap'
            }}
          >
            Find Matches
          </Button>
        </Box>

        {/* Stats Grid Counters */}
        <Grid 
          container 
          spacing={3}
          sx={{
            justifyContent: 'center',
            maxWidth: '800px',
            margin: '0 auto',
            pt: 2.5,
            borderTop: `1px solid ${theme.palette.divider}`
          }}
        >
          <Grid item xs={6} sm={4} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, justifyContent: { xs: 'center', sm: 'flex-start' } }}>
            <Box sx={{ color: theme.palette.primary.main, display: 'flex' }}>
              <GroupIcon />
            </Box>
            <Box sx={{ textAlign: 'left' }}>
              <Typography variant="h6" sx={{ fontSize: '18px', fontWeight: 800, color: theme.palette.text.primary, lineHeight: 1.1 }}>
                {seekerCount}
              </Typography>
              <Typography variant="caption" sx={{ fontSize: '11px', color: theme.palette.text.secondary, fontWeight: 600 }}>
                Registered Talents
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={6} sm={4} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, justifyContent: { xs: 'center', sm: 'flex-start' } }}>
            <Box sx={{ color: theme.palette.secondary.main, display: 'flex' }}>
              <BriefcaseIcon />
            </Box>
            <Box sx={{ textAlign: 'left' }}>
              <Typography variant="h6" sx={{ fontSize: '18px', fontWeight: 800, color: theme.palette.text.primary, lineHeight: 1.1 }}>
                {corporateCount + techCount}
              </Typography>
              <Typography variant="caption" sx={{ fontSize: '11px', color: theme.palette.text.secondary, fontWeight: 600 }}>
                Corp & Tech Pros
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={6} sm={4} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, justifyContent: { xs: 'center', sm: 'flex-start' } }}>
            <Box sx={{ color: theme.palette.accent.main, display: 'flex' }}>
              <CompassIcon />
            </Box>
            <Box sx={{ textAlign: 'left' }}>
              <Typography variant="h6" sx={{ fontSize: '18px', fontWeight: 800, color: theme.palette.text.primary, lineHeight: 1.1 }}>
                {creativeCount}
              </Typography>
              <Typography variant="caption" sx={{ fontSize: '11px', color: theme.palette.text.secondary, fontWeight: 600 }}>
                Creative Services
              </Typography>
            </Box>
          </Grid>
        </Grid>

      </Container>
    </Box>
  );
};
