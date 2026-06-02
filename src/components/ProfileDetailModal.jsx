import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { 
  Dialog, 
  DialogContent, 
  Typography, 
  Box, 
  Grid, 
  Chip, 
  Button, 
  IconButton, 
  Avatar, 
  TextField,
  Divider,
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
import HeartBorderIcon from '@mui/icons-material/FavoriteBorder';
import LaunchIcon from '@mui/icons-material/Launch';
import SparklesIcon from '@mui/icons-material/AutoAwesome';
import SendIcon from '@mui/icons-material/Send';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { motion, AnimatePresence } from 'framer-motion';

export const ProfileDetailModal = ({ onOpenLogin }) => {
  const { 
    selectedProfileId, 
    setSelectedProfileId, 
    profiles, 
    currentUser, 
    favorites, 
    toggleFavorite, 
    unlockContact, 
    isContactUnlocked 
  } = useContext(AppContext);

  const [messageSent, setMessageSent] = useState(false);
  const [typedMessage, setTypedMessage] = useState('');
  
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const profile = profiles.find(p => p.id === selectedProfileId);
  if (!profile) return null;

  const isFavorited = favorites.includes(profile.id);
  const isUnlocked = isContactUnlocked(profile.id);

  const handleUnlockClick = () => {
    if (!currentUser) {
      onOpenLogin();
      return;
    }
    unlockContact(profile.id);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!typedMessage.trim()) return;
    setMessageSent(true);
    setTypedMessage('');
    setTimeout(() => setMessageSent(false), 3000);
  };

  // Generate deterministic compatibility scores
  const matchPercentage = Math.floor(75 + (profile.name.length * 3) % 21);
  const matchReasons = [
    "Skills match current market demand",
    "Verified professional credentials",
    `Located in ${profile.location.split(',')[0]} (Matches regional criteria)`
  ];

  // Helper for profile color gradient
  const getGradient = (name) => {
    const colors = [
      'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
      'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)',
      'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
      'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    ];
    let sum = 0;
    for (let i = 0; i < name.length; i++) {
      sum += name.charCodeAt(i);
    }
    return colors[sum % colors.length];
  };

  // Initials generator
  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <Dialog
      open={!!selectedProfileId}
      onClose={() => setSelectedProfileId(null)}
      maxWidth="sm"
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          overflow: 'hidden',
          borderRadius: 3.5,
          position: 'relative'
        }
      }}
    >
      {/* Dynamic Gradient Banner Header */}
      <Box sx={{
        height: '110px',
        background: getGradient(profile.name),
        position: 'relative'
      }}>
        {/* Absolute Buttons */}
        <IconButton
          onClick={() => toggleFavorite(profile.id)}
          sx={{
            position: 'absolute',
            top: 14,
            left: 14,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            color: isFavorited ? theme.palette.secondary.main : '#fff',
            '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.6)' }
          }}
        >
          {isFavorited ? <HeartIcon /> : <HeartBorderIcon />}
        </IconButton>

        <IconButton
          onClick={() => setSelectedProfileId(null)}
          sx={{
            position: 'absolute',
            top: 14,
            right: 14,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            color: '#fff',
            '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.6)' }
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Avatar & Header Overlap overlay */}
      <Box sx={{
        px: 3,
        mt: '-45px',
        display: 'flex',
        alignItems: 'flex-end',
        gap: 2,
        mb: 3
      }}>
        {profile.image ? (
          <Avatar 
            src={profile.image}
            variant="rounded"
            sx={{
              width: 90,
              height: 90,
              border: `4px solid ${theme.palette.background.paper}`,
              boxShadow: theme.shadows[3],
              backgroundColor: theme.palette.background.paper
            }}
          />
        ) : (
          <Avatar 
            variant="rounded"
            sx={{
              width: 90,
              height: 90,
              background: getGradient(profile.name),
              border: `4px solid ${theme.palette.background.paper}`,
              boxShadow: theme.shadows[3],
              color: '#fff',
              fontWeight: 800,
              fontSize: '28px'
            }}
          >
            {getInitials(profile.name)}
          </Avatar>
        )}

        <Box sx={{ pb: 0.5, minWidth: 0, flexGrow: 1 }}>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 0.5 }}>
            <Typography variant="h5" sx={{ fontWeight: 800, color: theme.palette.text.primary, fontSize: '20px' }}>
              {profile.name}
            </Typography>
            <Chip 
              label={profile.category} 
              size="small" 
              color="primary"
              variant="outlined"
              sx={{ textTransform: 'capitalize', fontWeight: 'bold', height: '20px', fontSize: '10px' }} 
            />
          </Box>
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontWeight: 500 }}>
            {profile.role}
          </Typography>
        </Box>
      </Box>

      {/* Dialog Scrollable Body */}
      <DialogContent sx={{ p: 3, pt: 0, overflowY: 'auto' }}>
        
        {/* Core Stats Parameters Grid */}
        <Box sx={{
          backgroundColor: isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)',
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 2,
          p: 2,
          mb: 3
        }}>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={3}>
              <Typography variant="caption" sx={{ color: theme.palette.text.light, display: 'block', fontWeight: 700, textTransform: 'uppercase' }}>
                Experience
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 'bold', color: theme.palette.text.primary, display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                <AwardIcon sx={{ fontSize: 16, color: theme.palette.primary.main }} />
                {profile.experience} Years
              </Typography>
            </Grid>

            <Grid item xs={6} sm={3}>
              <Typography variant="caption" sx={{ color: theme.palette.text.light, display: 'block', fontWeight: 700, textTransform: 'uppercase' }}>
                Salary Target
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 'bold', color: theme.palette.text.primary, mt: 0.5 }}>
                {profile.salary}
              </Typography>
            </Grid>

            <Grid item xs={6} sm={3}>
              <Typography variant="caption" sx={{ color: theme.palette.text.light, display: 'block', fontWeight: 700, textTransform: 'uppercase' }}>
                Age & Gender
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 'bold', color: theme.palette.text.primary, mt: 0.5 }}>
                {profile.age} Yrs / {profile.gender}
              </Typography>
            </Grid>

            <Grid item xs={6} sm={3}>
              <Typography variant="caption" sx={{ color: theme.palette.text.light, display: 'block', fontWeight: 700, textTransform: 'uppercase' }}>
                Location
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 'bold', color: theme.palette.text.primary, display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                <PlaceIcon sx={{ fontSize: 16, color: theme.palette.accent.main }} />
                {profile.location.split(',')[0]}
              </Typography>
            </Grid>
          </Grid>
        </Box>

        {/* Biography */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: theme.palette.text.primary, mb: 1, borderBottom: `1px solid ${theme.palette.divider}`, pb: 0.5 }}>
            About Professional
          </Typography>
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary, lineHeight: 1.6 }}>
            {profile.bio}
          </Typography>
        </Box>

        {/* Education & Portfolio Grid */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: theme.palette.text.primary, mb: 1, borderBottom: `1px solid ${theme.palette.divider}`, pb: 0.5 }}>
              Qualifications
            </Typography>
            <Typography variant="body2" sx={{ color: theme.palette.text.secondary, display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
              <SchoolIcon sx={{ fontSize: 18, color: theme.palette.primary.main }} />
              {profile.education}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            {profile.portfolioUrl && (
              <>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: theme.palette.text.primary, mb: 1, borderBottom: `1px solid ${theme.palette.divider}`, pb: 0.5 }}>
                  Work Showcase
                </Typography>
                <Button
                  href={profile.portfolioUrl}
                  target="_blank"
                  rel="noreferrer"
                  variant="outlined"
                  size="small"
                  endIcon={<LaunchIcon sx={{ fontSize: 14 }} />}
                  sx={{ mt: 1 }}
                >
                  View Work Portfolio
                </Button>
              </>
            )}
          </Grid>
        </Grid>

        {/* Skills */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: theme.palette.text.primary, mb: 1.5, borderBottom: `1px solid ${theme.palette.divider}`, pb: 0.5 }}>
            Skills & Specializations
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {profile.skills.map((skill, index) => (
              <Chip 
                key={index} 
                label={skill} 
                size="small"
                sx={{
                  backgroundColor: theme.palette.primary.light,
                  color: theme.palette.primary.main,
                  borderColor: 'rgba(99,102,241,0.2)',
                  fontWeight: 600
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Matrimony Compatibility Section */}
        <Box sx={{
          p: 2,
          borderRadius: 2,
          border: `1px solid ${isDark ? 'rgba(236,72,153,0.2)' : 'rgba(236,72,153,0.1)'}`,
          background: isDark 
            ? 'radial-gradient(ellipse at top, rgba(236,72,153,0.06), transparent)' 
            : 'radial-gradient(ellipse at top, rgba(236,72,153,0.03), transparent)',
          mb: 4
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
            <Typography variant="subtitle2" sx={{ color: theme.palette.text.primary, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
              <SparklesIcon sx={{ color: theme.palette.secondary.main, fontSize: 18 }} />
              SkillMate Compatibility Match
            </Typography>
            <Chip 
              label={`${matchPercentage}% Match`} 
              color="secondary"
              size="small"
              sx={{ fontWeight: 'bold' }}
            />
          </Box>
          <Box component="ul" sx={{ m: 0, pl: 2, fontSize: '13px', color: theme.palette.text.secondary }}>
            {matchReasons.map((reason, index) => (
              <Box component="li" key={index} sx={{ mb: 0.5 }}>{reason}</Box>
            ))}
          </Box>
        </Box>

        {/* Contact info reveals (Core locks details) */}
        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: theme.palette.text.primary, mb: 1.5, borderBottom: `1px solid ${theme.palette.divider}`, pb: 0.5 }}>
            Contact Verification & Details
          </Typography>

          {isUnlocked ? (
            /* UNLOCKED STATE */
            <Box sx={{
              backgroundColor: isDark ? 'rgba(34, 197, 94, 0.04)' : 'rgba(34, 197, 94, 0.02)',
              border: `1px dashed ${theme.palette.success.main}`,
              borderRadius: 2,
              p: 2.5
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: theme.palette.success.main, fontWeight: 'bold', fontSize: '14px', mb: 2 }}>
                <CheckCircleIcon sx={{ fontSize: 18 }} />
                <span>Contact Details Unlocked Successfully</span>
              </Box>

              <Grid container spacing={2} sx={{ mb: 2.5 }}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="caption" sx={{ color: theme.palette.text.light, fontWeight: 700, textTransform: 'uppercase' }}>
                    Mobile Phone Number
                  </Typography>
                  <Typography 
                    component="a" 
                    href={`tel:${profile.mobile}`} 
                    sx={{ display: 'block', fontSize: '16px', fontWeight: 'bold', color: theme.palette.text.primary, textDecoration: 'none', mt: 0.5 }}
                  >
                    {profile.mobile}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="caption" sx={{ color: theme.palette.text.light, fontWeight: 700, textTransform: 'uppercase' }}>
                    Verified Email
                  </Typography>
                  <Typography 
                    component="a" 
                    href={`mailto:${profile.email}`} 
                    sx={{ display: 'block', fontSize: '15px', fontWeight: 'bold', color: theme.palette.text.primary, textDecoration: 'none', mt: 0.5 }}
                  >
                    {profile.email}
                  </Typography>
                </Grid>
              </Grid>

              {/* Action buttons */}
              <Grid container spacing={1} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={4}>
                  <Button 
                    fullWidth 
                    variant="contained" 
                    color="primary" 
                    size="small"
                    href={`tel:${profile.mobile}`}
                    startIcon={<PhoneIcon />}
                    sx={{ py: 1 }}
                  >
                    Call Direct
                  </Button>
                </Grid>
                
                <Grid item xs={12} sm={4}>
                  <Button 
                    fullWidth 
                    variant="contained" 
                    size="small"
                    href={`https://wa.me/${profile.mobile.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    startIcon={<WhatsAppIcon />}
                    sx={{ 
                      py: 1, 
                      backgroundColor: '#25D366', 
                      color: '#fff',
                      '&:hover': { backgroundColor: '#1ebe57' }
                    }}
                  >
                    WhatsApp Chat
                  </Button>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Button 
                    fullWidth 
                    variant="outlined" 
                    size="small"
                    href={`mailto:${profile.email}`}
                    startIcon={<MailIcon />}
                    sx={{ py: 1 }}
                  >
                    Send Email
                  </Button>
                </Grid>
              </Grid>

              {/* Mock Instant messenger */}
              <Box component="form" onSubmit={handleSendMessage} sx={{ borderTop: `1px solid ${theme.palette.divider}`, pt: 2 }}>
                <Typography variant="caption" sx={{ color: theme.palette.text.secondary, mb: 1, display: 'block' }}>
                  Send simulated connection request:
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Hi, I am interested in matching with your profile..."
                    value={typedMessage}
                    onChange={(e) => setTypedMessage(e.target.value)}
                  />
                  <IconButton type="submit" color="primary" sx={{ border: `1px solid ${theme.palette.primary.main}` }}>
                    <SendIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                </Box>
                {messageSent && (
                  <Typography variant="caption" sx={{ color: theme.palette.success.main, mt: 1, display: 'block', fontWeight: 600 }}>
                    ✓ Match invitation sent to {profile.name}!
                  </Typography>
                )}
              </Box>

            </Box>
          ) : (
            /* LOCKED STATE */
            <Box sx={{
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 2,
              overflow: 'hidden',
              position: 'relative'
            }}>
              {/* Blur Container */}
              <Box sx={{ p: 2.5, filter: 'blur(5px)', userSelect: 'none', pointerEvents: 'none' }}>
                <Box sx={{ mb: 1.5 }}>
                  <Typography variant="caption" sx={{ color: theme.palette.text.light, display: 'block' }}>Mobile Number</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>+1 (555) 000-0000</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" sx={{ color: theme.palette.text.light, display: 'block' }}>Verified Email</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>sarah.jenkins@careermatch.com</Typography>
                </Box>
              </Box>

              {/* Glass Overlay Lock */}
              <Box sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: isDark ? 'rgba(15, 22, 36, 0.9)' : 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(4px)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: 2,
                textAlign: 'center',
                zIndex: 2
              }}>
                <LockIcon sx={{ color: theme.palette.secondary.main, mb: 1, fontSize: 24 }} />
                <Typography variant="body2" sx={{ fontWeight: 'bold', color: theme.palette.text.primary, mb: 0.5, maxWidth: '280px', lineHeight: 1.3 }}>
                  Contact parameters are locked
                </Typography>
                <Typography variant="caption" sx={{ color: theme.palette.text.secondary, mb: 2, maxWidth: '320px', display: 'block' }}>
                  {currentUser 
                    ? "Unlock this contact profile to reveal details."
                    : "Only registered and verified users can discover candidate contact tags."}
                </Typography>

                <Button
                  onClick={handleUnlockClick}
                  variant="contained"
                  size="small"
                  color="accent"
                  startIcon={<LockIcon sx={{ fontSize: 13 }} />}
                  sx={{
                    background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
                    color: '#fff',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #4f46e5 0%, #db2777 100%)',
                    }
                  }}
                >
                  {currentUser ? "Unlock Contact Details" : "Log In to Unlock"}
                </Button>
              </Box>

            </Box>
          )}
        </Box>

      </DialogContent>
    </Dialog>
  );
};
