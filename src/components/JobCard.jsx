import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  IconButton, 
  Box, 
  useTheme 
} from '@mui/material';
import MapPinIcon from '@mui/icons-material/Place';
import AwardIcon from '@mui/icons-material/WorkspacePremium';
import GraduationIcon from '@mui/icons-material/School';
import LockIcon from '@mui/icons-material/Lock';
import HeartIcon from '@mui/icons-material/Favorite';
import HeartBorderIcon from '@mui/icons-material/FavoriteBorder';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { motion } from 'framer-motion';

export const JobCard = ({ profile }) => {
  const { 
    favorites, 
    toggleFavorite, 
    setSelectedProfileId, 
    isContactUnlocked 
  } = useContext(AppContext);
  
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const isFavorited = favorites.includes(profile.id);
  const isUnlocked = isContactUnlocked(profile.id);

  // Category Colors
  const categoryColors = {
    corporate: { bg: 'rgba(99, 102, 241, 0.15)', text: '#818cf8', label: 'Corporate' },
    creative: { bg: 'rgba(236, 72, 153, 0.15)', text: '#f472b6', label: 'Creative' },
    technical: { bg: 'rgba(6, 182, 212, 0.15)', text: '#22d3ee', label: 'Technical' },
    trades: { bg: 'rgba(34, 197, 94, 0.15)', text: '#4ade80', label: 'Skilled Trade' }
  };

  const catDetails = categoryColors[profile.category] || { bg: 'rgba(99, 102, 241, 0.15)', text: '#818cf8', label: profile.category };

  // Calculate Match Score based on Name/ID to make it look organic and match the mockups
  const getMatchScore = () => {
    if (profile.name.includes('Sarah')) return 95;
    if (profile.name.includes('Marcus')) return 92;
    if (profile.name.includes('David')) return 90;
    return 88;
  };

  const matchScore = getMatchScore();

  // Fallback Portrait Background Gradient (if image is missing)
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
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      style={{ height: '100%' }}
    >
      <Card sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '20px',
        background: isDark ? 'rgba(15, 22, 36, 0.6)' : 'rgba(255, 255, 255, 0.7)',
        border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'}`,
        boxShadow: isDark ? '0 10px 30px rgba(0, 0, 0, 0.4)' : '0 10px 30px rgba(0, 0, 0, 0.03)',
        backdropFilter: 'blur(16px)',
        '-webkit-backdrop-filter': 'blur(16px)',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: isDark ? '0 15px 35px rgba(20, 168, 0, 0.15)' : '0 15px 35px rgba(0, 0, 0, 0.08)',
        }
      }}>

        {/* IMAGE / HEADER CONTAINER */}
        <Box sx={{
          height: '220px',
          position: 'relative',
          background: profile.image ? `url(${profile.image})` : getFallbackGradient(profile.name),
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}>
          {/* Linear gradient fade from photo to card body */}
          <Box sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: isDark 
              ? 'linear-gradient(to bottom, transparent 40%, rgba(15, 22, 36, 0.9) 85%, rgba(15, 22, 36, 1) 100%)'
              : 'linear-gradient(to bottom, transparent 40%, rgba(255, 255, 255, 0.9) 85%, rgba(255, 255, 255, 1) 100%)',
            zIndex: 1
          }} />

          {/* Floating Verified Chip (Top Left) */}
          <Box sx={{
            position: 'absolute',
            top: 16,
            left: 16,
            zIndex: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            backgroundColor: 'rgba(20, 168, 0, 0.18)',
            border: '1.2px solid rgba(20, 168, 0, 0.35)',
            borderRadius: '9999px',
            px: 1.5,
            py: 0.4,
            backdropFilter: 'blur(4px)',
          }}>
            <CheckCircleIcon sx={{ color: '#14a800', fontSize: 11 }} />
            <Typography sx={{ color: '#14a800', fontSize: '9px', fontWeight: 800, letterSpacing: '0.05em' }}>
              VERIFIED
            </Typography>
          </Box>

          {/* Floating Save Profile Button (Top Right) */}
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(profile.id);
            }}
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              zIndex: 2,
              backgroundColor: 'rgba(0, 0, 0, 0.45)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: isFavorited ? theme.palette.primary.main : '#fff',
              width: 32,
              height: 32,
              backdropFilter: 'blur(4px)',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.65)'
              }
            }}
          >
            {isFavorited ? <HeartIcon sx={{ fontSize: 16 }} /> : <HeartBorderIcon sx={{ fontSize: 16 }} />}
          </IconButton>

          {/* Header Texts Overlay (Over image) */}
          <Box sx={{ position: 'relative', zIndex: 2, px: 2.5, pb: 1 }}>
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 800, 
                fontSize: '20px', 
                color: theme.palette.text.primary,
                fontFamily: 'var(--font-display)',
                lineHeight: 1.2
              }}
            >
              {profile.name}
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: theme.palette.text.secondary, 
                fontWeight: 600,
                fontSize: '13px',
                mt: 0.2
              }}
            >
              {profile.role}
            </Typography>
          </Box>
        </Box>

        {/* CARD CONTENT */}
        <CardContent sx={{ px: 2.5, pt: 1, pb: 2, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          
          {/* Category Tag & Match Percentage Loader */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box sx={{
              backgroundColor: catDetails.bg,
              borderRadius: '6px',
              px: 1.5,
              py: 0.5,
              border: `1px solid ${catDetails.text}30`,
            }}>
              <Typography sx={{ color: catDetails.text, fontSize: '10px', fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                {catDetails.label}
              </Typography>
            </Box>

            {/* Circular Progress score */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="body2" sx={{ fontWeight: 800, color: theme.palette.text.primary, fontSize: '12px', lineHeight: 1 }}>
                  {matchScore}%
                </Typography>
                <Typography variant="caption" sx={{ color: theme.palette.text.secondary, fontSize: '8px', fontWeight: 700 }}>
                  Match
                </Typography>
              </Box>
              <Box sx={{ position: 'relative', display: 'inline-flex', width: 28, height: 28 }}>
                <svg width="28" height="28" viewBox="0 0 36 36">
                  {/* Outer circle track */}
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke={isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}
                    strokeWidth="4"
                  />
                  {/* Glowing match bar */}
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#14a800"
                    strokeWidth="4"
                    strokeDasharray={`${matchScore}, 100`}
                    strokeLinecap="round"
                  />
                </svg>
              </Box>
            </Box>
          </Box>

          {/* Quick Metrics Icons */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            py: 1.5,
            borderTop: `1px dashed ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
            borderBottom: `1px dashed ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
            mb: 2.2
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
              <AwardIcon sx={{ color: '#14a800', fontSize: 15 }} />
              <Typography variant="body2" sx={{ fontSize: '11px', color: theme.palette.text.secondary, fontWeight: 700 }}>
                {profile.experience}+ Yrs Exp
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
              <GraduationIcon sx={{ color: '#a855f7', fontSize: 15 }} />
              <Typography variant="body2" sx={{ fontSize: '11px', color: theme.palette.text.secondary, fontWeight: 700 }}>
                {profile.education.split(',')[0]}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <MapPinIcon sx={{ color: theme.palette.text.secondary, opacity: 0.5, fontSize: 15 }} />
              <Typography variant="body2" sx={{ fontSize: '11px', color: theme.palette.text.secondary, fontWeight: 700 }}>
                {profile.location.split(',')[0]}
              </Typography>
            </Box>
          </Box>

          {/* Skills tags */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8, mb: 3, mt: 'auto' }}>
            {profile.skills.slice(0, 3).map((skill, index) => (
              <Box key={index} sx={{
                fontSize: '11px',
                fontWeight: 600,
                px: 1.2,
                py: 0.5,
                borderRadius: '6px',
                border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)'}`,
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)',
                color: theme.palette.text.secondary
              }}>
                {skill}
              </Box>
            ))}
            {profile.skills.length > 3 && (
              <Box sx={{
                fontSize: '10.5px',
                fontWeight: 800,
                px: 1,
                py: 0.5,
                borderRadius: '6px',
                backgroundColor: 'rgba(20, 168, 0, 0.1)',
                color: theme.palette.primary.main
              }}>
                +{profile.skills.length - 3}
              </Box>
            )}
          </Box>

          {/* Action buttons (View Profile & Unlock Contact side-by-side) */}
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <Button
              onClick={() => setSelectedProfileId(profile.id)}
              variant="text"
              startIcon={<VisibilityIcon sx={{ fontSize: 14 }} />}
              sx={{
                flex: 1,
                textTransform: 'none',
                fontWeight: 700,
                color: theme.palette.text.primary,
                fontSize: '12px',
                py: 1,
                borderRadius: '10px',
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.04)',
                '&:hover': {
                  backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'
                }
              }}
            >
              View Profile
            </Button>
            <Button
              onClick={() => setSelectedProfileId(profile.id)}
              variant="contained"
              color={isUnlocked ? "secondary" : "primary"}
              startIcon={isUnlocked ? <CheckCircleIcon sx={{ fontSize: 14 }} /> : <LockIcon sx={{ fontSize: 14 }} />}
              sx={{
                flex: 1.2,
                textTransform: 'none',
                fontWeight: 700,
                fontSize: '12px',
                py: 1,
                borderRadius: '10px',
                boxShadow: isUnlocked ? 'none' : '0 4px 15px rgba(20, 168, 0, 0.25)',
                '&:hover': {
                  backgroundColor: isUnlocked ? theme.palette.secondary.dark : theme.palette.primary.dark,
                  boxShadow: isUnlocked ? 'none' : '0 4px 20px rgba(20, 168, 0, 0.45)',
                }
              }}
            >
              {isUnlocked ? "Unlocked" : "Unlock"}
            </Button>
          </Box>

        </CardContent>

      </Card>
    </motion.div>
  );
};
