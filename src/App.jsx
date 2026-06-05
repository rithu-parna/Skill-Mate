import React, { useState, useContext } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { JobCard } from './components/JobCard';
import { LoginModal } from './components/LoginModal';
import { RegisterModal } from './components/RegisterModal';
import { ProfileDetailModal } from './components/ProfileDetailModal';
import { Dashboard } from './components/Dashboard';
import { AppContext } from './context/AppContext';
import { categories } from './data/mockProfiles';
import { getAppTheme } from './theme';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  Link,
  Divider,
  useTheme
} from '@mui/material';
import FilterIcon from '@mui/icons-material/FilterAlt';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import GridViewIcon from '@mui/icons-material/GridView';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { motion, AnimatePresence } from 'framer-motion';

function AppContent() {
  const { profiles, filters, setFilters, selectedProfileId, isDarkMode } = useContext(AppContext);
  const theme = useTheme();

  // Modal open states
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  
  // Dashboard view toggle
  const [showDashboard, setShowDashboard] = useState(false);

  // Experience options
  const experienceOptions = [
    { value: 'all', label: 'All Experience Levels' },
    { value: 'entry', label: 'Entry Level (< 2 Years)' },
    { value: 'mid', label: 'Mid Level (2 - 5 Years)' },
    { value: 'senior', label: 'Senior Level (5+ Years)' }
  ];

  // Filtering Logic
  const filteredProfiles = profiles.filter(p => {
    // 1. Search Query (matches name, role, skills)
    const matchesSearch = !filters.search || 
      p.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      p.role.toLowerCase().includes(filters.search.toLowerCase()) ||
      p.skills.some(s => s.toLowerCase().includes(filters.search.toLowerCase()));

    // 2. Category Filter
    const matchesCategory = filters.category === 'all' || p.category === filters.category;

    // 3. Location Filter
    const matchesLocation = !filters.location || 
      p.location.toLowerCase().includes(filters.location.toLowerCase());

    // 4. Experience Filter
    let matchesExperience = true;
    if (filters.experience !== 'all') {
      if (filters.experience === 'entry') matchesExperience = p.experience < 2;
      else if (filters.experience === 'mid') matchesExperience = p.experience >= 2 && p.experience <= 5;
      else if (filters.experience === 'senior') matchesExperience = p.experience > 5;
    }

    return matchesSearch && matchesCategory && matchesLocation && matchesExperience;
  });

  const handleCategorySelect = (catId) => {
    setFilters(prev => ({ ...prev, category: catId }));
  };

  const handleExperienceChange = (e) => {
    setFilters(prev => ({ ...prev, experience: e.target.value }));
  };

  const resetAllFilters = () => {
    setFilters({
      search: '',
      category: 'all',
      experience: 'all',
      type: 'all',
      location: ''
    });
  };

  const hasActiveFilters = filters.search || filters.category !== 'all' || filters.location || filters.experience !== 'all';

  return (
    <Box className={isDarkMode ? 'dark-theme' : 'light-theme'} sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: theme.palette.background.default }}>
      
      {/* Navigation header */}
      <Navbar 
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenRegister={() => setIsRegisterOpen(true)}
        onShowDashboard={setShowDashboard}
        showDashboard={showDashboard}
      />

      <Box component="main" sx={{ flexGrow: 1 }}>
        {showDashboard ? (
          /* WORKSPACE DASHBOARD VIEW */
          <Dashboard 
            onOpenLogin={() => setIsLoginOpen(true)}
            onOpenRegister={() => setIsRegisterOpen(true)}
          />
        ) : (
          /* MAIN DIRECTORY SEARCH PAGE */
          <>
            {/* Hero search section */}
            <HeroSection />

            {/* Content Filters & Directory list */}
            <Container id="category-filter-section" maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
              
              {/* Filters Panel Header */}
              <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 2.5,
                mb: 4
              }}>
                {/* Category Pills Navigation */}
                <Box sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 1.5,
                  overflowX: 'auto',
                  pb: 0.5
                }}>
                  {categories.map(cat => {
                    const currentCount = cat.id === 'all' 
                      ? profiles.length 
                      : profiles.filter(p => p.category === cat.id).length;

                    const isActive = filters.category === cat.id;

                    return (
                      <Button
                        key={cat.id}
                        onClick={() => handleCategorySelect(cat.id)}
                        variant={isActive ? "contained" : "outlined"}
                        color={isActive ? "primary" : "inherit"}
                        size="small"
                        sx={{
                          borderRadius: '9999px',
                          px: 2.4,
                          py: 0.9,
                          fontSize: '13px',
                          fontWeight: 600,
                          textTransform: 'none',
                          fontFamily: 'var(--font-display)',
                          borderColor: isActive ? 'transparent' : (isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'),
                          backgroundColor: isActive 
                            ? theme.palette.primary.main 
                            : (isDarkMode ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)'),
                          color: isActive ? '#fff' : theme.palette.text.primary,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1.2,
                          boxShadow: isActive ? '0 0 15px rgba(20, 168, 0, 0.25)' : 'none',
                          '&:hover': {
                            backgroundColor: isActive 
                              ? theme.palette.primary.dark 
                              : (isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)'),
                            borderColor: isActive ? 'transparent' : (isDarkMode ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)'),
                          }
                        }}
                      >
                        <span>{cat.name}</span>
                        {cat.id === 'all' ? (
                          <GridViewIcon sx={{ fontSize: 15, opacity: 0.8 }} />
                        ) : (
                          <Box sx={{
                            backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : (isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)'),
                            color: isActive ? '#fff' : theme.palette.text.secondary,
                            px: 1,
                            py: 0.1,
                            borderRadius: '4px',
                            fontSize: '10px',
                            fontWeight: 700
                          }}>
                            {currentCount}
                          </Box>
                        )}
                      </Button>
                    );
                  })}
                </Box>

                {/* Dropdown Filters (Experience) */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <FilterIcon sx={{ color: theme.palette.text.light, fontSize: 16 }} />
                  <FormControl size="small" sx={{ minWidth: 200 }}>
                    <Select
                      value={filters.experience}
                      onChange={handleExperienceChange}
                      displayEmpty
                      sx={{
                        borderRadius: '8px',
                        backgroundColor: isDarkMode ? 'rgba(15, 22, 36, 0.4)' : 'rgba(255, 255, 255, 0.8)',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: theme.palette.primary.main,
                          borderWidth: '1px'
                        },
                        fontSize: '13px',
                        fontWeight: 600,
                        fontFamily: 'var(--font-display)',
                        color: theme.palette.text.primary
                      }}
                    >
                      {experienceOptions.map(opt => (
                        <MenuItem key={opt.value} value={opt.value} sx={{ fontSize: '13px', fontWeight: 500 }}>
                          {opt.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Box>

              {/* Directory Count Title */}
              <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3
              }}>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontWeight: 500 }}>
                  Showing <strong>{filteredProfiles.length}</strong> matching candidate profiles
                </Typography>
                
                {hasActiveFilters && (
                  <Button 
                    onClick={resetAllFilters} 
                    variant="text" 
                    size="small"
                    sx={{ fontWeight: 'bold', fontSize: '12px' }}
                  >
                    Clear Filters
                  </Button>
                )}
              </Box>

              {/* Job Seekers Grid */}
              <AnimatePresence mode="popLayout">
                {filteredProfiles.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Box sx={{
                      background: theme.palette.background.glass,
                      backdropFilter: 'blur(12px)',
                      border: `1px solid ${theme.palette.divider}`,
                      borderRadius: 3.5,
                      py: 8,
                      px: 3,
                      textAlign: 'center',
                      boxShadow: theme.shadows[1]
                    }}>
                      <SearchOffIcon sx={{ fontSize: 50, color: theme.palette.text.light, mb: 2 }} />
                      <Typography variant="h5" sx={{ fontWeight: 800, color: theme.palette.text.primary, mb: 1 }}>
                        No Matches Found
                      </Typography>
                      <Typography variant="body2" sx={{ color: theme.palette.text.secondary, maxWidth: 450, mx: 'auto', mb: 3 }}>
                        We couldn't find any job or creative profiles matching your current filters. 
                        Try adjusting your keywords or resetting your search.
                      </Typography>
                      <Button onClick={resetAllFilters} variant="contained" size="small">
                        Reset All Filters
                      </Button>
                    </Box>
                  </motion.div>
                ) : (
                  <Grid container spacing={3}>
                    {filteredProfiles.map(profile => (
                      <Grid size={{ xs: 12, sm: 6, md: 6, lg: 3 }} key={profile.id}>
                        <JobCard profile={profile} />
                      </Grid>
                    ))}

                    {/* Glowing AI matchmaking request card */}
                    <Grid size={{ xs: 12, sm: 6, md: 6, lg: 3 }}>
                      <Box sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        p: 3,
                        borderRadius: '20px',
                        background: isDarkMode ? 'rgba(15, 22, 36, 0.6)' : 'rgba(255, 255, 255, 0.7)',
                        border: `1.5px dashed ${isDarkMode ? 'rgba(20, 168, 0, 0.35)' : 'rgba(20, 168, 0, 0.25)'}`,
                        boxShadow: isDarkMode ? '0 10px 30px rgba(0, 0, 0, 0.4)' : '0 10px 30px rgba(0, 0, 0, 0.03)',
                        backdropFilter: 'blur(16px)',
                        '-webkit-backdrop-filter': 'blur(16px)',
                        position: 'relative',
                        overflow: 'hidden'
                      }}>
                        {/* Concentric spinning rings & glowing icon */}
                        <Box sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: '160px',
                          position: 'relative',
                          mb: 2,
                          mt: 1
                        }}>
                          {/* Glowing green background sphere */}
                          <Box sx={{
                            position: 'absolute',
                            width: '90px',
                            height: '90px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(20, 168, 0, 0.15)',
                            filter: 'blur(15px)',
                            boxShadow: '0 0 25px rgba(20, 168, 0, 0.25)',
                          }} />
                          {/* Ring 1 */}
                          <Box sx={{
                            position: 'absolute',
                            width: '120px',
                            height: '120px',
                            borderRadius: '50%',
                            border: '1px dashed rgba(20, 168, 0, 0.25)',
                          }} />
                          {/* Ring 2 */}
                          <Box sx={{
                            position: 'absolute',
                            width: '90px',
                            height: '90px',
                            borderRadius: '50%',
                            border: '1.5px solid rgba(20, 168, 0, 0.25)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: isDarkMode ? 'rgba(15, 22, 36, 0.6)' : 'rgba(255, 255, 255, 0.8)',
                          }}>
                            <AutoAwesomeIcon sx={{ color: '#14a800', fontSize: 36 }} />
                          </Box>
                        </Box>

                        <Typography variant="h5" sx={{ fontWeight: 800, color: theme.palette.text.primary, fontSize: '18px', textAlign: 'center', mb: 1.5, fontFamily: 'var(--font-display)' }}>
                          Can't find the right match?
                        </Typography>
                        <Typography variant="body2" sx={{ color: theme.palette.text.secondary, textAlign: 'center', fontSize: '13px', px: 2, mb: 4, lineHeight: 1.5 }}>
                          Let our AI matchmaker find the best talent for you.
                        </Typography>

                        <Button
                          variant="outlined"
                          color="primary"
                          startIcon={<AutoAwesomeIcon sx={{ fontSize: 14 }} />}
                          sx={{
                            width: '100%',
                            textTransform: 'none',
                            fontWeight: 700,
                            fontSize: '13px',
                            py: 1.2,
                            borderRadius: '10px',
                            borderColor: 'rgba(20, 168, 0, 0.45)',
                            color: theme.palette.primary.main,
                            '&:hover': {
                              borderColor: theme.palette.primary.main,
                              backgroundColor: 'rgba(20, 168, 0, 0.05)',
                              boxShadow: '0 0 15px rgba(20, 168, 0, 0.2)',
                            }
                          }}
                        >
                          Request a Match
                        </Button>
                      </Box>
                    </Grid>

                  </Grid>
                )}
              </AnimatePresence>

            </Container>
          </>
        )}
      </Box>

      {/* Footer */}
      <Box 
        component="footer" 
        sx={{
          borderTop: `1px solid ${theme.palette.divider}`,
          py: 5,
          backgroundColor: theme.palette.mode === 'dark' ? 'rgba(15, 22, 36, 0.4)' : 'rgba(0,0,0,0.01)',
          fontSize: '13px',
          color: theme.palette.text.secondary
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
            mb: 3
          }}>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 800, color: theme.palette.text.primary, lineHeight: 1 }}>
                SkillMate
              </Typography>
              <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                Matrimonial Matching for Professional Endeavors.
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 3 }}>
              <Link href="#" onClick={(e) => { e.preventDefault(); resetAllFilters(); setShowDashboard(false); }} sx={{ color: 'inherit', textDecoration: 'none', '&:hover': { color: theme.palette.primary.main } }}>Talent Registry</Link>
              <Link href="#" onClick={(e) => { e.preventDefault(); setShowDashboard(true); }} sx={{ color: 'inherit', textDecoration: 'none', '&:hover': { color: theme.palette.primary.main } }}>Favorites Portal</Link>
              <Link href="#" onClick={(e) => { e.preventDefault(); setIsRegisterOpen(true); }} sx={{ color: 'inherit', textDecoration: 'none', '&:hover': { color: theme.palette.primary.main } }}>Register Seeker</Link>
            </Box>
          </Box>
          <Divider sx={{ mb: 3 }} />
          <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', color: theme.palette.text.light, fontSize: '11px' }}>
            © {new Date().getFullYear()} SkillMate Inc. All rights reserved. Registered candidates details are protected. Logged-in verification required for contact discovery.
          </Typography>
        </Container>
      </Box>

      {/* TRANSACTION OVERLAY MODALS */}
      <LoginModal 
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSwitchToRegister={() => {
          setIsLoginOpen(false);
          setIsRegisterOpen(true);
        }}
      />

      <RegisterModal 
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onSwitchToLogin={() => {
          setIsRegisterOpen(false);
          setIsLoginOpen(true);
        }}
      />

      <ProfileDetailModal 
        onOpenLogin={() => {
          setIsLoginOpen(true);
        }}
      />

    </Box>
  );
}

function App() {
  const { isDarkMode } = useContext(AppContext);
  const theme = getAppTheme(isDarkMode ? 'dark' : 'light');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
