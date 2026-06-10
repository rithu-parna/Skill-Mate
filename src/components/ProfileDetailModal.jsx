import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { 
  Dialog, 
  DialogContent, 
  Typography, 
  Box, 
  Grid, 
  Button, 
  IconButton, 
  Avatar, 
  useTheme
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PhoneIcon from '@mui/icons-material/Phone';
import MailIcon from '@mui/icons-material/Mail';
import PlaceIcon from '@mui/icons-material/Place';
import AwardIcon from '@mui/icons-material/WorkspacePremium';
import SchoolIcon from '@mui/icons-material/School';
import LockIcon from '@mui/icons-material/Lock';
import HeartIcon from '@mui/icons-material/Favorite';
import LaunchIcon from '@mui/icons-material/Launch';
import SparklesIcon from '@mui/icons-material/AutoAwesome';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PersonIcon from '@mui/icons-material/Person';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import PsychologyIcon from '@mui/icons-material/Psychology';

export const ProfileDetailModal = ({ onOpenLogin }) => {
  const { 
    selectedProfileId, 
    setSelectedProfileId, 
    profiles, 
    currentUser, 
    unlockContact, 
    isContactUnlocked 
  } = useContext(AppContext);

  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const profile = profiles.find(p => p.id === selectedProfileId);
  if (!profile) return null;

  const isUnlocked = isContactUnlocked(profile.id);

  const handleUnlockClick = () => {
    if (!currentUser) {
      onOpenLogin();
      return;
    }
    unlockContact(profile.id);
  };

  // Match percentage helper
  const getMatchScore = () => {
    if (profile.name.includes('Sarah')) return 95;
    if (profile.name.includes('Marcus')) return 92;
    if (profile.name.includes('David')) return 90;
    return 88;
  };
  const matchPercentage = getMatchScore();

  // Match rating text
  const getMatchRating = (score) => {
    if (score >= 95) return 'Excellent';
    if (score >= 90) return 'Superb';
    return 'Great';
  };
  const matchRating = getMatchRating(matchPercentage);

  // Fallback gradient generator
  const getFallbackGradient = (name) => {
    let sum = 0;
    for (let i = 0; i < name.length; i++) {
      sum += name.charCodeAt(i);
    }
    const gradients = [
      'linear-gradient(135deg, #1e1b4b 0%, #311042 100%)',
      'linear-gradient(135deg, #062f4f 0%, #000000 100%)',
      'linear-gradient(135deg, #1c3d1c 0%, #071507 100%)'
    ];
    return gradients[sum % gradients.length];
  };

  return (
    <Dialog
      open={!!selectedProfileId}
      onClose={() => setSelectedProfileId(null)}
      maxWidth="md"
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          overflow: 'hidden',
          borderRadius: '24px',
          position: 'relative',
          background: isDark ? '#070a13' : '#fafafa',
          border: `1.5px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
          boxShadow: '0 24px 60px rgba(0,0,0,0.8)'
        }
      }}
    >
      {/* Absolute Close Button */}
      <IconButton
        onClick={() => setSelectedProfileId(null)}
        sx={{
          position: 'absolute',
          top: 20,
          right: 20,
          zIndex: 10,
          backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.04)',
          border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)'}`,
          color: isDark ? '#fff' : theme.palette.text.primary,
          width: 36,
          height: 36,
          '&:hover': { 
            backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)' 
          }
        }}
      >
        <CloseIcon sx={{ fontSize: 18 }} />
      </IconButton>

      {/* SPACE/NEBULA HEADER BANNER */}
      <Box sx={{
        px: { xs: 3, md: 5.5 },
        pt: { xs: 4, md: 6 },
        pb: { xs: 3, md: 4.5 },
        position: 'relative',
        background: isDark 
          ? 'radial-gradient(ellipse at top left, rgba(20, 168, 0, 0.28) 0%, rgba(7, 10, 19, 0) 65%), radial-gradient(ellipse at top right, rgba(20, 168, 0, 0.1) 0%, rgba(7, 10, 19, 0) 65%), #070a13'
          : 'radial-gradient(ellipse at top left, rgba(20, 168, 0, 0.12) 0%, rgba(250, 250, 250, 0) 65%), #fafafa',
        borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
        display: 'flex',
        alignItems: 'center',
        gap: { xs: 3, md: 4 },
        flexWrap: 'wrap'
      }}>
        {/* Double concentric glowing Avatar frame */}
        <Box sx={{ position: 'relative' }}>
          <Box sx={{
            width: { xs: 90, sm: 120, md: 144 },
            height: { xs: 90, sm: 120, md: 144 },
            borderRadius: '50%',
            border: isDark ? '2px solid rgba(20, 168, 0, 0.3)' : '2px solid rgba(20, 168, 0, 0.15)',
            boxShadow: isDark ? '0 0 20px rgba(20, 168, 0, 0.25)' : 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Box sx={{
              width: { xs: 80, sm: 108, md: 130 },
              height: { xs: 80, sm: 108, md: 130 },
              borderRadius: '50%',
              border: '2px solid #14a800',
              p: '3px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Avatar
                src={profile.image}
                sx={{
                  width: '100%',
                  height: '100%',
                  background: getFallbackGradient(profile.name)
                }}
              />
            </Box>
          </Box>
          {/* Active online dot indicator */}
          <Box sx={{
            position: 'absolute',
            bottom: 12,
            right: 12,
            width: 14,
            height: 14,
            borderRadius: '50%',
            backgroundColor: '#14a800',
            border: `3px solid ${isDark ? '#070a13' : '#fafafa'}`,
            zIndex: 5
          }} />
        </Box>

        {/* Central user details */}
        <Box sx={{ minWidth: 0, flex: 1 }}>
          {/* Verified tag */}
          <Box sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.5,
            backgroundColor: 'rgba(20, 168, 0, 0.15)',
            border: '1px solid rgba(20, 168, 0, 0.3)',
            borderRadius: '9999px',
            px: 1.5,
            py: 0.4,
            mb: 1.5
          }}>
            <CheckCircleIcon sx={{ color: '#14a800', fontSize: 11 }} />
            <Typography sx={{ color: '#14a800', fontSize: '9px', fontWeight: 800, letterSpacing: '0.05em' }}>
              VERIFIED PROFESSIONAL
            </Typography>
          </Box>

          {/* Name & Title */}
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 800, 
              color: isDark ? '#fff' : '#070a13', 
              fontSize: { xs: '19px', sm: '24px', md: '28px' }, 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1, 
              fontFamily: 'var(--font-display)',
              lineHeight: 1.2
            }}
          >
            {profile.name}
            <CheckCircleIcon sx={{ color: '#14a800', fontSize: { xs: 16, sm: 20 } }} />
          </Typography>

          <Typography 
            variant="body1" 
            sx={{ 
              color: theme.palette.text.secondary, 
              fontWeight: 600,
              fontSize: { xs: '13px', sm: '15px' },
              mt: 0.5,
              mb: 2
            }}
          >
            {profile.role}
          </Typography>

          {/* Details Row */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
              <PlaceIcon sx={{ color: '#14a800', fontSize: 16 }} />
              <Typography sx={{ color: theme.palette.text.secondary, fontSize: '12.5px', fontWeight: 700 }}>
                {profile.location}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
              <AwardIcon sx={{ color: '#14a800', fontSize: 16 }} />
              <Typography sx={{ color: theme.palette.text.secondary, fontSize: '12.5px', fontWeight: 700 }}>
                {profile.experience}+ Years Exp
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
              <Typography sx={{ color: '#14a800', fontSize: 16, fontWeight: 900, lineHeight: 1 }}>$</Typography>
              <Typography sx={{ color: theme.palette.text.secondary, fontSize: '12.5px', fontWeight: 700 }}>
                {profile.salary} / yr
              </Typography>
            </Box>
          </Box>

          {/* Education tag */}
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.8,
            backgroundColor: isDark ? 'rgba(139, 92, 246, 0.12)' : 'rgba(139, 92, 246, 0.08)',
            border: `1px solid ${isDark ? 'rgba(139, 92, 246, 0.25)' : 'rgba(139, 92, 246, 0.15)'}`,
            borderRadius: '8px',
            px: 1.5,
            py: 0.6,
            mt: 2,
            width: 'fit-content'
          }}>
            <SchoolIcon sx={{ color: isDark ? '#a78bfa' : '#7c3aed', fontSize: 15 }} />
            <Typography sx={{ color: isDark ? '#a78bfa' : '#7c3aed', fontSize: '11px', fontWeight: 800 }}>
              {profile.education.split(',')[0]}
            </Typography>
          </Box>
        </Box>

        {/* Circular Match Gauge (Right Align) */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          ml: { xs: 0, md: 'auto' },
          width: { xs: '100%', md: 'auto' }
        }}>
          <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 110, height: 110 }}>
            {/* SVG Ring */}
            <svg width="110" height="110" viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)' }}>
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke={isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}
                strokeWidth="3.2"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#14a800"
                strokeWidth="3.2"
                strokeDasharray={`${matchPercentage}, 100`}
                strokeLinecap="round"
                style={{ filter: isDark ? 'drop-shadow(0 0 5px rgba(20, 168, 0, 0.4))' : 'none' }}
              />
            </svg>
            <Box sx={{ position: 'absolute', textAlign: 'center' }}>
              <Typography sx={{ fontWeight: 800, color: isDark ? '#fff' : '#070a13', fontSize: '22px', lineHeight: 1 }}>
                {matchPercentage}%
              </Typography>
              <Typography sx={{ color: theme.palette.text.secondary, fontSize: '8px', fontWeight: 700, mt: 0.2 }}>
                SkillMate Match
              </Typography>
              <Typography sx={{ color: '#14a800', fontSize: '9px', fontWeight: 900, mt: 0.3, letterSpacing: '0.05em' }}>
                ★★★★★
              </Typography>
              <Typography sx={{ color: '#14a800', fontSize: '8px', fontWeight: 800, mt: 0.1 }}>
                {matchRating}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* DOUBLE COLUMN SCROLLABLE BODY */}
      <DialogContent sx={{ p: { xs: 3, md: 5.5 }, overflowY: 'auto', maxHeight: '55vh' }}>
        <Grid container spacing={{ xs: 4, md: 5 }}>
          
          {/* LEFT COLUMN: About, Experience, Education */}
          <Grid size={{xs: 12, md: 6.5}}>
            {/* About Professional */}
            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5, borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`, pb: 1 }}>
                <PersonIcon sx={{ color: '#14a800', fontSize: 18 }} />
                <Typography variant="subtitle1" sx={{ fontWeight: 800, color: isDark ? '#fff' : '#070a13', fontFamily: 'var(--font-display)' }}>
                  About Professional
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary, lineHeight: 1.6, fontSize: '13px' }}>
                {profile.bio}
              </Typography>
            </Box>

            {/* Experience timeline */}
            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2.5, borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`, pb: 1 }}>
                <AwardIcon sx={{ color: '#14a800', fontSize: 18 }} />
                <Typography variant="subtitle1" sx={{ fontWeight: 800, color: isDark ? '#fff' : '#070a13', fontFamily: 'var(--font-display)' }}>
                  Experience
                </Typography>
              </Box>

              {/* Vertical Timeline Nodes */}
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {[
                  {
                    title: profile.role,
                    company: 'Creative Studio',
                    period: '2021 – Present',
                    desc: 'Leading product design decisions, standardizing UI assets and collaborating with cross-functional engineers.'
                  },
                  {
                    title: 'Senior Associate Designer',
                    company: 'DesignLab',
                    period: '2019 – 2021',
                    desc: 'Developed comprehensive visual frameworks, product styling systems and user-flows for client platforms.'
                  },
                  {
                    title: 'Junior Designer',
                    company: 'PixelCraft',
                    period: '2017 – 2019',
                    desc: 'Assisted in refining interface styling, creating graphics assets and preparing icons packages.'
                  }
                ].map((job, idx, arr) => (
                  <Box key={idx} sx={{
                    borderLeft: idx !== arr.length - 1 ? `2.5px solid ${isDark ? 'rgba(20, 168, 0, 0.25)' : 'rgba(20, 168, 0, 0.15)'}` : '2.5px solid transparent',
                    pl: 3.5,
                    pb: idx !== arr.length - 1 ? 3.5 : 1,
                    position: 'relative'
                  }}>
                    {/* Glowing green timeline dot */}
                    <Box sx={{
                      position: 'absolute',
                      left: '-6px',
                      top: '4px',
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: '#14a800',
                      boxShadow: isDark ? '0 0 8px #14a800' : 'none'
                    }} />

                    {/* Timeline text content */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 1 }}>
                      <Typography sx={{ fontWeight: 750, color: isDark ? '#fff' : '#070a13', fontSize: '13.5px' }}>
                        {job.title}
                      </Typography>
                      <Typography sx={{ color: theme.palette.text.secondary, fontSize: '11px', fontWeight: 600 }}>
                        {job.period}
                      </Typography>
                    </Box>
                    <Typography sx={{ color: '#14a800', fontSize: '12px', fontWeight: 700, mt: 0.2 }}>
                      {job.company}
                    </Typography>
                    <Typography sx={{ color: theme.palette.text.secondary, fontSize: '12px', mt: 0.8, lineHeight: 1.4 }}>
                      {job.desc}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Education qualification details */}
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`, pb: 1 }}>
                <SchoolIcon sx={{ color: '#14a800', fontSize: 18 }} />
                <Typography variant="subtitle1" sx={{ fontWeight: 800, color: isDark ? '#fff' : '#070a13', fontFamily: 'var(--font-display)' }}>
                  Education
                </Typography>
              </Box>

              <Box sx={{
                display: 'flex',
                gap: 2,
                alignItems: 'center',
                p: 2,
                borderRadius: '12px',
                backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`
              }}>
                <Box sx={{
                  width: 44,
                  height: 44,
                  borderRadius: '8px',
                  backgroundColor: 'rgba(20, 168, 0, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <SchoolIcon sx={{ color: '#14a800', fontSize: 22 }} />
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 750, color: isDark ? '#fff' : '#070a13', fontSize: '13.5px' }}>
                    {profile.education.includes(',') ? profile.education.split(',')[1].trim() : 'Rhode Island School of Design'}
                  </Typography>
                  <Typography sx={{ color: theme.palette.text.secondary, fontSize: '12px', mt: 0.2, fontWeight: 500 }}>
                    {profile.education.includes(',') ? profile.education.split(',')[0].trim() : profile.education}
                  </Typography>
                  <Typography sx={{ color: theme.palette.text.secondary, opacity: 0.6, fontSize: '11px', mt: 0.2 }}>
                    2013 - 2017
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* RIGHT COLUMN: Portfolio highlights, Skills chips, Compatibility match card */}
          <Grid size={{xs: 12, md: 5.5}}>
            {/* Portfolio grid highlights */}
            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`, pb: 1 }}>
                <FolderOpenIcon sx={{ color: '#14a800', fontSize: 18 }} />
                <Typography variant="subtitle1" sx={{ fontWeight: 800, color: isDark ? '#fff' : '#070a13', fontFamily: 'var(--font-display)' }}>
                  Portfolio Highlights
                </Typography>
              </Box>

              <Grid container spacing={1.5} sx={{ mb: 2.2 }}>
                {[1, 2, 3, 4].map((num) => {
                  const isLast = num === 4;
                  return (
                    <Grid size={{xs: 3}} key={num}>
                      <Box sx={{
                        height: { xs: '54px', sm: '68px' },
                        borderRadius: '8px',
                        backgroundImage: profile.image ? `url(${profile.image})` : 'none',
                        backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        position: 'relative',
                        border: `1.5px solid ${isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'}`,
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'border-color 0.2s',
                        '&:hover': {
                          borderColor: '#14a800'
                        }
                      }}>
                        {isLast && (
                          <Box sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(15, 22, 36, 0.85)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 1
                          }}>
                            <Typography sx={{ fontWeight: 850, color: '#fff', fontSize: '13px' }}>
                              +6
                            </Typography>
                            <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '8px', fontWeight: 700, textTransform: 'uppercase' }}>
                              Projects
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>

              <Button
                fullWidth
                variant="outlined"
                endIcon={<LaunchIcon sx={{ fontSize: 13 }} />}
                sx={{
                  textTransform: 'none',
                  py: 1,
                  borderRadius: '10px',
                  borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
                  color: theme.palette.text.primary,
                  fontSize: '12px',
                  fontWeight: 700,
                  '&:hover': {
                    borderColor: '#14a800',
                    backgroundColor: isDark ? 'rgba(20, 168, 0, 0.05)' : 'rgba(20, 168, 0, 0.02)'
                  }
                }}
              >
                View Full Portfolio
              </Button>
            </Box>

            {/* Skills chip badges */}
            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`, pb: 1 }}>
                <PsychologyIcon sx={{ color: '#14a800', fontSize: 18 }} />
                <Typography variant="subtitle1" sx={{ fontWeight: 800, color: isDark ? '#fff' : '#070a13', fontFamily: 'var(--font-display)' }}>
                  Skills & Expertise
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {profile.skills.map((skill, index) => (
                  <Box key={index} sx={{
                    fontSize: '11px',
                    fontWeight: 700,
                    px: 1.5,
                    py: 0.6,
                    borderRadius: '6px',
                    border: isDark ? '1px solid rgba(20, 168, 0, 0.3)' : '1px solid rgba(20, 168, 0, 0.15)',
                    backgroundColor: isDark ? 'rgba(20, 168, 0, 0.05)' : 'rgba(20, 168, 0, 0.02)',
                    color: isDark ? '#4ade80' : '#14a800'
                  }}>
                    {skill}
                  </Box>
                ))}
                <Box sx={{
                  fontSize: '11px',
                  fontWeight: 800,
                  px: 1.5,
                  py: 0.6,
                  borderRadius: '6px',
                  backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
                  color: theme.palette.text.secondary
                }}>
                  +8 More
                </Box>
              </Box>
            </Box>

            {/* SkillMate compatibility matching list card */}
            <Box sx={{
              p: 2.2,
              borderRadius: '16px',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
              backgroundColor: isDark ? 'rgba(255,255,255,0.01)' : 'rgba(0,0,0,0.01)',
              position: 'relative'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography sx={{ color: isDark ? '#fff' : '#070a13', fontWeight: 800, fontSize: '13.5px', display: 'flex', alignItems: 'center', gap: 1 }}>
                  <SparklesIcon sx={{ color: isDark ? '#a78bfa' : '#7c3aed', fontSize: 15 }} />
                  SkillMate Compatibility
                </Typography>
                
                {/* Outlined heart badge */}
                <Box sx={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(236, 72, 153, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ec4899',
                  border: '1px solid rgba(236, 72, 153, 0.25)'
                }}>
                  <HeartIcon sx={{ fontSize: 13 }} />
                </Box>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
                {[
                  "Skills match current market demand",
                  "Verified professional credentials",
                  `Located in ${profile.location.split(',')[0]} (Matches regional criteria)`,
                  "High client satisfaction rate"
                ].map((text, idx) => (
                  <Box key={idx} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                    <CheckCircleIcon sx={{ color: '#14a800', fontSize: 14, mt: '2px', flexShrink: 0 }} />
                    <Typography sx={{ color: theme.palette.text.secondary, fontSize: '12px', lineHeight: 1.3 }}>
                      {text}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>

        </Grid>
      </DialogContent>

      {/* FIXED ACTION FOOTER */}
      <Box sx={{
        p: 3,
        borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
        backgroundColor: isDark ? 'rgba(15, 22, 36, 0.95)' : '#fff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 2
      }}>
        {isUnlocked ? (
          /* UNLOCKED STATE */
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.8 }}>
              <Box sx={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                backgroundColor: 'rgba(20, 168, 0, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#14a800',
                border: '1.5px solid rgba(20, 168, 0, 0.25)'
              }}>
                <CheckCircleIcon sx={{ fontSize: 20 }} />
              </Box>
              <Box sx={{ minWidth: 0 }}>
                <Typography sx={{ fontWeight: 800, color: isDark ? '#fff' : '#070a13', fontSize: '14px' }}>
                  Contact Details Unlocked
                </Typography>
                <Typography sx={{ color: theme.palette.text.secondary, fontSize: '11px', mt: 0.2, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                  Email: {profile.email} | Phone: {profile.mobile}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 1.5 }}>
              <Button
                variant="contained"
                color="primary"
                href={`mailto:${profile.email}`}
                startIcon={<MailIcon />}
                sx={{ textTransform: 'none', py: 1, px: 2.5, borderRadius: '8px', fontWeight: 700, fontSize: '12px' }}
              >
                Send Email
              </Button>
              <Button
                variant="outlined"
                color="primary"
                href={`tel:${profile.mobile}`}
                startIcon={<PhoneIcon />}
                sx={{ textTransform: 'none', py: 1, px: 2.5, borderRadius: '8px', fontWeight: 700, fontSize: '12px' }}
              >
                Call Direct
              </Button>
            </Box>
          </>
        ) : (
          /* LOCKED STATE */
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.8 }}>
              <Box sx={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.04)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: theme.palette.text.secondary,
                border: `1.5px solid ${isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'}`
              }}>
                <LockIcon sx={{ fontSize: 18 }} />
              </Box>
              <Box>
                <Typography sx={{ fontWeight: 800, color: isDark ? '#fff' : '#070a13', fontSize: '14px' }}>
                  Contact Details Locked
                </Typography>
                <Typography sx={{ color: theme.palette.text.secondary, fontSize: '11px', mt: 0.2 }}>
                  Unlock to view phone number, email & more
                </Typography>
              </Box>
            </Box>

            <Box sx={{ textAlign: { xs: 'center', md: 'right' }, width: { xs: '100%', md: 'auto' } }}>
              <Button
                onClick={handleUnlockClick}
                variant="contained"
                color="primary"
                startIcon={<LockIcon sx={{ fontSize: 13 }} />}
                sx={{
                  textTransform: 'none',
                  py: 1,
                  px: 3.5,
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: 800,
                  boxShadow: '0 4px 15px rgba(20, 168, 0, 0.35)',
                  '&:hover': {
                    backgroundColor: theme.palette.primary.dark,
                    boxShadow: '0 4px 20px rgba(20, 168, 0, 0.55)',
                  }
                }}
              >
                Unlock Contact Details
              </Button>
              <Typography sx={{ color: theme.palette.text.secondary, opacity: 0.5, fontSize: '9px', mt: 0.8, display: 'block', fontWeight: 600 }}>
                🔒 100% Secure & Confidential
              </Typography>
            </Box>
          </>
        )}
      </Box>
    </Dialog>
  );
};
