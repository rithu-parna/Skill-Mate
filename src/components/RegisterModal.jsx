import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { 
  Dialog, 
  DialogContent, 
  TextField, 
  Button, 
  Box, 
  IconButton, 
  Alert, 
  CircularProgress, 
  Typography, 
  Grid, 
  Select, 
  MenuItem, 
  FormControl,
  Link,
  useTheme,
  InputAdornment,
  Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AppleIcon from '@mui/icons-material/Apple';
import GoogleIcon from '@mui/icons-material/Google';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import LockIcon from '@mui/icons-material/Lock';
import BuildingIcon from '@mui/icons-material/Business';
import MapPinIcon from '@mui/icons-material/Place';
import GraduationIcon from '@mui/icons-material/School';
import SparklesIcon from '@mui/icons-material/AutoAwesome';
import GroupIcon from '@mui/icons-material/Group';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SearchIcon from '@mui/icons-material/Search';
import WorkIcon from '@mui/icons-material/Work';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export const RegisterModal = ({ isOpen, onClose, onSwitchToLogin }) => {
  const { registerJobSeeker, registerEmployer } = useContext(AppContext);
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  
  const [activeTab, setActiveTab] = useState(1); // Default to Client (1) to match mockup
  const [step, setStep] = useState(0); // 0 = role selection, 1 = form
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Common Fields
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');

  // Seeker Specific Fields
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Female');
  const [role, setRole] = useState('');
  const [category, setCategory] = useState('corporate');
  const [subcategory, setSubcategory] = useState('');
  const [experience, setExperience] = useState('');
  const [salary, setSalary] = useState('');
  const [location, setLocation] = useState('');
  const [education, setEducation] = useState('');
  const [bio, setBio] = useState('');
  const [skills, setSkills] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');

  // Employer Specific Fields
  const [organization, setOrganization] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !mobile.trim() || !password.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      let result;
      if (activeTab === 0) {
        const seekerData = {
          name: name.trim(),
          mobile: mobile.trim(),
          password,
          age: Number(age) || 25,
          gender,
          role: role.trim() || 'Professional Seeker',
          category,
          subcategory: subcategory.trim() || (category.charAt(0).toUpperCase() + category.slice(1) + ' Sector'),
          experience: Number(experience) || 0,
          salary: salary.trim() || '$50,000 / yr',
          location: location.trim() || 'Remote',
          education: education.trim() || 'Degree Graduate',
          bio: bio.trim() || 'No bio provided yet.',
          skills: skills.trim() ? skills.split(',').map(s => s.trim()).filter(Boolean) : ['General'],
          portfolioUrl: portfolioUrl.trim(),
          image: null
        };
        result = registerJobSeeker(seekerData);
      } else {
        const employerData = {
          name: name.trim(),
          mobile: mobile.trim(),
          password,
          organization: organization.trim() || 'Independent Recruiter'
        };
        result = registerEmployer(employerData);
      }

      setLoading(false);

      if (result.success) {
        onClose();
        resetFields();
      } else {
        setError(result.message);
      }
    }, 850);
  };

  const resetFields = () => {
    setName('');
    setMobile('');
    setPassword('');
    setAge('');
    setRole('');
    setSubcategory('');
    setExperience('');
    setSalary('');
    setLocation('');
    setEducation('');
    setBio('');
    setSkills('');
    setPortfolioUrl('');
    setOrganization('');
    setError('');
    setStep(0);
  };

  const handleNextStep = () => {
    setStep(1);
  };

  return (
    <Dialog 
      open={isOpen} 
      onClose={onClose}
      maxWidth={step === 0 ? "md" : "sm"}
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          maxHeight: '95vh',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          borderRadius: '24px',
          background: isDark 
            ? 'radial-gradient(circle at top left, rgba(20, 168, 0, 0.15) 0%, rgba(7, 10, 19, 0) 50%), radial-gradient(circle at bottom right, rgba(20, 168, 0, 0.15) 0%, rgba(7, 10, 19, 0) 50%), #070a13'
            : '#fafafa',
          border: `1.5px solid ${isDark ? 'rgba(20, 168, 0, 0.35)' : 'rgba(20, 168, 0, 0.15)'}`,
          boxShadow: isDark 
            ? '0 24px 60px rgba(0, 0, 0, 0.85), 0 0 30px rgba(20, 168, 0, 0.15)'
            : '0 10px 30px rgba(0, 0, 0, 0.1)'
        }
      }}
    >
      {step === 0 ? (
        <Box sx={{ p: { xs: 3, md: 5 }, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          
          {/* Glowing bottom grid overlay */}
          <Box sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 160,
            pointerEvents: 'none',
            opacity: 0.85,
            zIndex: 0,
            backgroundSize: '24px 24px',
            backgroundImage: isDark 
              ? 'linear-gradient(to right, rgba(20, 168, 0, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(20, 168, 0, 0.05) 1px, transparent 1px), linear-gradient(to top, #070a13 0%, rgba(7, 10, 19, 0) 100%), radial-gradient(ellipse at bottom, rgba(20, 168, 0, 0.25) 0%, rgba(7, 10, 19, 0) 70%)'
              : 'none'
          }} />

          {/* Close Button */}
          <IconButton 
            onClick={onClose} 
            sx={{ 
              position: 'absolute',
              top: 20,
              right: 20,
              zIndex: 2,
              color: isDark ? '#fff' : theme.palette.text.primary,
              backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
              '&:hover': { backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }
            }}
          >
            <CloseIcon sx={{ fontSize: 18 }} />
          </IconButton>

          {/* Centered Green Matching Icon */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 2.5, position: 'relative', zIndex: 1 }}>
            <Box sx={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              border: '1.5px solid #14a800',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: isDark ? '0 0 15px rgba(20, 168, 0, 0.4)' : 'none',
              backgroundColor: isDark ? 'rgba(20, 168, 0, 0.08)' : 'rgba(20, 168, 0, 0.03)'
            }}>
              <GroupIcon sx={{ color: '#14a800', fontSize: 24 }} />
            </Box>
          </Box>

          {/* Sparkle Welcome branding */}
          <Typography 
            variant="caption" 
            sx={{ 
              color: '#14a800', 
              fontWeight: 800, 
              letterSpacing: '0.12em', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: 1, 
              textTransform: 'uppercase', 
              mb: 1,
              position: 'relative',
              zIndex: 1
            }}
          >
            <SparklesIcon sx={{ fontSize: 12 }} /> Welcome to <SparklesIcon sx={{ fontSize: 12 }} />
          </Typography>

          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 900, 
              color: isDark ? '#fff' : '#070a13', 
              mb: 1.5, 
              fontFamily: 'var(--font-display)',
              fontSize: { xs: '26px', md: '34px' },
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              position: 'relative',
              zIndex: 1
            }}
          >
            Skill<span style={{ color: '#14a800' }}>Mate</span>
          </Typography>

          <Typography variant="body1" sx={{ color: theme.palette.text.secondary, mb: 4.5, fontWeight: 600, position: 'relative', zIndex: 1 }}>
            Which describes you best?
          </Typography>

          {/* Two Selector Cards Grid */}
          <Grid container spacing={3} sx={{ maxWidth: 660, mx: 'auto', mb: 5.5, position: 'relative', zIndex: 1 }}>
            {/* CLIENT CARD */}
            <Grid item xs={12} sm={6}>
              <Box
                onClick={() => setActiveTab(1)}
                sx={{
                  border: '2px solid',
                  borderColor: activeTab === 1 ? '#14a800' : (isDark ? 'rgba(20, 168, 0, 0.25)' : 'rgba(20, 168, 0, 0.15)'),
                  borderRadius: '20px',
                  p: 3.5,
                  position: 'relative',
                  cursor: 'pointer',
                  background: activeTab === 1 
                    ? (isDark ? 'rgba(20, 168, 0, 0.08)' : 'rgba(20, 168, 0, 0.04)')
                    : (isDark ? 'rgba(15, 22, 36, 0.6)' : 'rgba(255, 255, 255, 0.7)'),
                  backdropFilter: 'blur(16px)',
                  boxShadow: activeTab === 1 ? (isDark ? '0 0 25px rgba(20, 168, 0, 0.2)' : '0 4px 15px rgba(20, 168, 0, 0.1)') : 'none',
                  transition: 'all 0.2s',
                  '&:hover': {
                    borderColor: '#14a800',
                    boxShadow: isDark ? '0 0 25px rgba(20, 168, 0, 0.15)' : '0 4px 15px rgba(20, 168, 0, 0.08)'
                  }
                }}
              >
                {/* Active check indicator */}
                {activeTab === 1 && (
                  <Box sx={{
                    position: 'absolute',
                    top: 16,
                    left: 16,
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    backgroundColor: '#14a800',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    boxShadow: '0 0 10px rgba(20, 168, 0, 0.4)'
                  }}>
                    <CheckCircleIcon sx={{ fontSize: 16 }} />
                  </Box>
                )}

                {/* Building logo icon */}
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                  <Box sx={{
                    width: 72,
                    height: 72,
                    borderRadius: '50%',
                    border: '2px solid rgba(20, 168, 0, 0.25)',
                    boxShadow: activeTab === 1 ? '0 0 15px rgba(20, 168, 0, 0.3)' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: isDark ? 'rgba(7, 10, 19, 0.4)' : '#fff'
                  }}>
                    <BuildingIcon sx={{ fontSize: 30, color: '#14a800' }} />
                  </Box>
                </Box>

                <Typography variant="h6" sx={{ fontWeight: 800, color: isDark ? '#fff' : '#070a13', mb: 1, fontSize: '18px' }}>
                  Client
                </Typography>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontSize: '12.5px', lineHeight: 1.4, mb: 3.5, height: '36px', overflow: 'hidden' }}>
                  Find and hire the best talent for your projects
                </Typography>

                {/* Three feature icons */}
                <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`, pt: 2.2 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                    <WorkIcon sx={{ color: '#14a800', fontSize: 18 }} />
                    <Typography sx={{ fontSize: '10.5px', color: theme.palette.text.secondary, mt: 0.8, fontWeight: 700 }}>Post Jobs</Typography>
                  </Box>
                  <Divider orientation="vertical" flexItem sx={{ borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }} />
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                    <SearchIcon sx={{ color: '#14a800', fontSize: 18 }} />
                    <Typography sx={{ fontSize: '10.5px', color: theme.palette.text.secondary, mt: 0.8, fontWeight: 700 }}>Find Talent</Typography>
                  </Box>
                  <Divider orientation="vertical" flexItem sx={{ borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }} />
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                    <CheckCircleIcon sx={{ color: '#14a800', fontSize: 18 }} />
                    <Typography sx={{ fontSize: '10.5px', color: theme.palette.text.secondary, mt: 0.8, fontWeight: 700 }}>Verified Pros</Typography>
                  </Box>
                </Box>

              </Box>
            </Grid>

            {/* FREELANCER CARD */}
            <Grid item xs={12} sm={6}>
              <Box
                onClick={() => setActiveTab(0)}
                sx={{
                  border: '2px solid',
                  borderColor: activeTab === 0 ? '#8b5cf6' : (isDark ? 'rgba(139, 92, 246, 0.25)' : 'rgba(139, 92, 246, 0.15)'),
                  borderRadius: '20px',
                  p: 3.5,
                  position: 'relative',
                  cursor: 'pointer',
                  background: activeTab === 0 
                    ? (isDark ? 'rgba(139, 92, 246, 0.08)' : 'rgba(139, 92, 246, 0.04)')
                    : (isDark ? 'rgba(15, 22, 36, 0.6)' : 'rgba(255, 255, 255, 0.7)'),
                  backdropFilter: 'blur(16px)',
                  boxShadow: activeTab === 0 ? (isDark ? '0 0 25px rgba(139, 92, 246, 0.2)' : '0 4px 15px rgba(139, 92, 246, 0.1)') : 'none',
                  transition: 'all 0.2s',
                  '&:hover': {
                    borderColor: '#8b5cf6',
                    boxShadow: isDark ? '0 0 25px rgba(139, 92, 246, 0.15)' : '0 4px 15px rgba(139, 92, 246, 0.08)'
                  }
                }}
              >
                {/* Active check indicator */}
                {activeTab === 0 && (
                  <Box sx={{
                    position: 'absolute',
                    top: 16,
                    left: 16,
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    backgroundColor: '#8b5cf6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    boxShadow: '0 0 10px rgba(139, 92, 246, 0.4)'
                  }}>
                    <CheckCircleIcon sx={{ fontSize: 16 }} />
                  </Box>
                )}

                {/* User logo icon */}
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                  <Box sx={{
                    width: 72,
                    height: 72,
                    borderRadius: '50%',
                    border: '2px solid rgba(139, 92, 246, 0.25)',
                    boxShadow: activeTab === 0 ? '0 0 15px rgba(139, 92, 246, 0.3)' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: isDark ? 'rgba(7, 10, 19, 0.4)' : '#fff'
                  }}>
                    <PersonIcon sx={{ fontSize: 30, color: '#8b5cf6' }} />
                  </Box>
                </Box>

                <Typography variant="h6" sx={{ fontWeight: 800, color: isDark ? '#fff' : '#070a13', mb: 1, fontSize: '18px' }}>
                  Freelancer
                </Typography>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontSize: '12.5px', lineHeight: 1.4, mb: 3.5, height: '36px', overflow: 'hidden' }}>
                  Work on exciting projects and grow your career
                </Typography>

                {/* Three feature icons */}
                <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`, pt: 2.2 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                    <WorkIcon sx={{ color: '#8b5cf6', fontSize: 18 }} />
                    <Typography sx={{ fontSize: '10.5px', color: theme.palette.text.secondary, mt: 0.8, fontWeight: 700 }}>Find Projects</Typography>
                  </Box>
                  <Divider orientation="vertical" flexItem sx={{ borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }} />
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                    <MonetizationOnIcon sx={{ color: '#8b5cf6', fontSize: 18 }} />
                    <Typography sx={{ fontSize: '10.5px', color: theme.palette.text.secondary, mt: 0.8, fontWeight: 700 }}>Work & Earn</Typography>
                  </Box>
                  <Divider orientation="vertical" flexItem sx={{ borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }} />
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                    <TrendingUpIcon sx={{ color: '#8b5cf6', fontSize: 18 }} />
                    <Typography sx={{ fontSize: '10.5px', color: theme.palette.text.secondary, mt: 0.8, fontWeight: 700 }}>Build Profile</Typography>
                  </Box>
                </Box>

              </Box>
            </Grid>
          </Grid>

          {/* Continue Action Button */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3.5, position: 'relative', zIndex: 1 }}>
            <Button 
              variant="contained" 
              onClick={handleNextStep}
              sx={{ 
                py: 1.5, 
                px: 4, 
                borderRadius: '12px', 
                fontWeight: 800, 
                fontSize: '15px', 
                backgroundColor: activeTab === 0 ? '#8b5cf6' : '#14a800',
                boxShadow: activeTab === 0 ? '0 4px 20px rgba(139, 92, 246, 0.4)' : '0 4px 20px rgba(20, 168, 0, 0.4)',
                textTransform: 'none',
                width: '100%',
                maxWidth: 420,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                '&:hover': {
                  backgroundColor: activeTab === 0 ? '#7c3aed' : '#118f00',
                  boxShadow: activeTab === 0 ? '0 4px 25px rgba(139, 92, 246, 0.55)' : '0 4px 25px rgba(20, 168, 0, 0.55)',
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <SparklesIcon sx={{ fontSize: 16 }} />
                <span>Continue as {activeTab === 0 ? 'Freelancer' : 'Client'}</span>
              </Box>
              <Box sx={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff'
              }}>
                <ArrowForwardIcon sx={{ fontSize: 14 }} />
              </Box>
            </Button>
          </Box>

          <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontWeight: 500, position: 'relative', zIndex: 1 }}>
            Already have an account?{' '}
            <Link 
              href="#" 
              onClick={(e) => { e.preventDefault(); onSwitchToLogin(); }}
              sx={{ color: '#14a800', fontWeight: 700, textDecoration: 'underline' }}
            >
              Log in
            </Link>
          </Typography>
        </Box>
      ) : (
        <>
          {/* Header banner */}
          <Box sx={{
            pt: 4,
            px: 4,
            pb: 2,
            borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Typography variant="h6" sx={{ fontWeight: 800, color: isDark ? '#fff' : '#070a13', fontFamily: 'var(--font-display)' }}>
              Sign up to find work you love
            </Typography>

            <IconButton 
              onClick={onClose} 
              sx={{ 
                color: isDark ? '#fff' : theme.palette.text.primary,
                backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                '&:hover': { backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }
              }}
            >
              <CloseIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Box>

      {/* Form Content */}
      <DialogContent sx={{ p: 4, overflowY: 'auto' }}>
        
        {/* Social Auth Buttons */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 3 }}>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<AppleIcon />}
            sx={{
              color: isDark ? '#fff' : '#000',
              borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.8)',
              borderRadius: '8px',
              py: 1.2,
              fontWeight: 'bold',
              textTransform: 'none'
            }}
          >
            Continue with Apple
          </Button>
          <Button
            variant="contained"
            fullWidth
            startIcon={<GoogleIcon />}
            sx={{
              backgroundColor: '#1f57c3',
              color: '#fff',
              borderRadius: '8px',
              py: 1.2,
              fontWeight: 'bold',
              textTransform: 'none',
              '&:hover': { backgroundColor: '#1847a1' }
            }}
          >
            Continue with Google
          </Button>
          <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
            <Divider sx={{ flexGrow: 1 }} />
            <Typography variant="body2" sx={{ px: 2, color: theme.palette.text.secondary, fontWeight: 500 }}>or</Typography>
            <Divider sx={{ flexGrow: 1 }} />
          </Box>
        </Box>

        <form onSubmit={handleSubmit} id="mui-register-form">
          
          {error && (
            <Alert severity="error" sx={{ mb: 2.5, borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          <Grid container spacing={2.5}>
            {/* Name */}
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.8, color: theme.palette.text.primary, fontSize: '13px' }}>
                Full Name *
              </Typography>
              <TextField
                fullWidth
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon sx={{ fontSize: 16, color: theme.palette.text.light }} />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>

            {/* Mobile */}
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.8, color: theme.palette.text.primary, fontSize: '13px' }}>
                Mobile (Log In ID) *
              </Typography>
              <TextField
                fullWidth
                placeholder="+1 (555) 000-0000"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon sx={{ fontSize: 16, color: theme.palette.text.light }} />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>

            {/* Password */}
            <Grid item xs={12} sm={activeTab === 0 ? 12 : 6}>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.8, color: theme.palette.text.primary, fontSize: '13px' }}>
                Password *
              </Typography>
              <TextField
                fullWidth
                type="password"
                placeholder="Min 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ fontSize: 16, color: theme.palette.text.light }} />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>

            {/* RECRUITER SPECIFIC FIELD: Organization */}
            {activeTab === 1 && (
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.8, color: theme.palette.text.primary, fontSize: '13px' }}>
                  Company Name *
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Google, TechCorp, Self..."
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BuildingIcon sx={{ fontSize: 16, color: theme.palette.text.light }} />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
            )}

            {/* SEEKER SPECIFIC FIELDS */}
            {activeTab === 0 && (
              <>
                {/* Age & Gender */}
                <Grid item xs={6}>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.8, color: theme.palette.text.primary, fontSize: '13px' }}>
                    Age *
                  </Typography>
                  <TextField
                    fullWidth
                    type="number"
                    placeholder="25"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                    inputProps={{ min: 18, max: 99 }}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.8, color: theme.palette.text.primary, fontSize: '13px' }}>
                    Gender *
                  </Typography>
                  <FormControl fullWidth>
                    <Select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <MenuItem value="Female">Female</MenuItem>
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {/* Job Role */}
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.8, color: theme.palette.text.primary, fontSize: '13px' }}>
                    Target Job Role *
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Software Architect, Chef..."
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon sx={{ fontSize: 16, color: theme.palette.text.light }} />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>

                {/* Category Selection */}
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.8, color: theme.palette.text.primary, fontSize: '13px' }}>
                    Job Category *
                  </Typography>
                  <FormControl fullWidth>
                    <Select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <MenuItem value="corporate">Corporate & Management</MenuItem>
                      <MenuItem value="creative">Creative & Arts</MenuItem>
                      <MenuItem value="technical">Technical & Software</MenuItem>
                      <MenuItem value="trades">Skilled Trades & Services</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {/* Subcategory */}
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.8, color: theme.palette.text.primary, fontSize: '13px' }}>
                    Specialization
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="UI/UX Design, Pastry Arts..."
                    value={subcategory}
                    onChange={(e) => setSubcategory(e.target.value)}
                  />
                </Grid>

                {/* Experience & Salary */}
                <Grid item xs={6} sm={3}>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.8, color: theme.palette.text.primary, fontSize: '13px' }}>
                    Exp (Yrs) *
                  </Typography>
                  <TextField
                    fullWidth
                    type="number"
                    placeholder="5"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    required
                    inputProps={{ min: 0 }}
                  />
                </Grid>

                <Grid item xs={6} sm={3}>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.8, color: theme.palette.text.primary, fontSize: '13px' }}>
                    Expected Salary *
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="e.g. $80k/yr or $40/hr"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    required
                  />
                </Grid>

                {/* Location */}
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.8, color: theme.palette.text.primary, fontSize: '13px' }}>
                    Location (City, State) *
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="New York, NY"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MapPinIcon sx={{ fontSize: 16, color: theme.palette.text.light }} />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>

                {/* Education */}
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.8, color: theme.palette.text.primary, fontSize: '13px' }}>
                    Education Details *
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="BFA, ArtCenter or Self-taught..."
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <GraduationIcon sx={{ fontSize: 16, color: theme.palette.text.light }} />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>

                {/* Skills */}
                <Grid item xs={12}>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.8, color: theme.palette.text.primary, fontSize: '13px' }}>
                    Skills (Comma Separated) *
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Figma, React, Node, SQL..."
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    required
                  />
                </Grid>

                {/* Portfolio URL */}
                <Grid item xs={12}>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.8, color: theme.palette.text.primary, fontSize: '13px' }}>
                    Portfolio / Website Link
                  </Typography>
                  <TextField
                    fullWidth
                    type="url"
                    placeholder="https://example.com"
                    value={portfolioUrl}
                    onChange={(e) => setPortfolioUrl(e.target.value)}
                  />
                </Grid>

                {/* Bio */}
                <Grid item xs={12}>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.8, color: theme.palette.text.primary, fontSize: '13px' }}>
                    Professional Bio *
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    placeholder="Tell recruiters about your expertise or services..."
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    required
                  />
                </Grid>
              </>
            )}

          </Grid>
        </form>
      </DialogContent>

      {/* Dialog Actions Footer */}
      <Box sx={{
        p: 4,
        borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
        backgroundColor: isDark ? 'rgba(15, 22, 36, 0.4)' : 'rgba(0,0,0,0.01)',
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5
      }}>
        <Button 
          fullWidth
          type="submit" 
          form="mui-register-form"
          variant="contained" 
          color="primary"
          disabled={loading}
          sx={{
            py: 1.5,
            fontSize: '15px',
            fontWeight: 'bold',
            borderRadius: 2,
            textTransform: 'none'
          }}
        >
          {loading ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <span>Create my account</span>
            </Box>
          )}
        </Button>

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontWeight: 500 }}>
            Already registered?{' '}
            <Link 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                onSwitchToLogin();
              }}
              sx={{ 
                fontWeight: 'bold', 
                color: '#14a800', 
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' }
              }}
            >
              Log In Here
            </Link>
          </Typography>
        </Box>
      </Box>
      </>
      )}

    </Dialog>
  );
};
