import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { 
  Card, 
  CardContent, 
  CardActions, 
  Typography, 
  Button, 
  IconButton, 
  Avatar, 
  Chip, 
  Box, 
  Grid, 
  useTheme 
} from '@mui/material';
import MapPinIcon from '@mui/icons-material/Place';
import AwardIcon from '@mui/icons-material/WorkspacePremium';
import GraduationIcon from '@mui/icons-material/School';
import BriefcaseIcon from '@mui/icons-material/Work';
import PhoneIcon from '@mui/icons-material/Phone';
import LockIcon from '@mui/icons-material/Lock';
import HeartIcon from '@mui/icons-material/Favorite';
import HeartBorderIcon from '@mui/icons-material/FavoriteBorder';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
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

  // Define color mappings for category chips
  const categoryColors = {
    corporate: { bg: 'rgba(99, 102, 241, 0.15)', text: '#6366f1', label: 'Corporate' },
    creative: { bg: 'rgba(236, 72, 153, 0.15)', text: '#ec4899', label: 'Creative' },
    technical: { bg: 'rgba(6, 182, 212, 0.15)', text: '#06b6d4', label: 'Technical' },
    trades: { bg: 'rgba(34, 197, 94, 0.15)', text: '#22c55e', label: 'Skilled Trade' }
  };

  const catDetails = categoryColors[profile.category] || { bg: 'rgba(99, 102, 241, 0.15)', text: '#6366f1', label: profile.category };

  // Initials generator
  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  // Gradient generator
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

  // Card specific indicator bar color
  const getTopBarGradient = () => {
    switch(profile.category) {
      case 'creative':
        return 'linear-gradient(90deg, #ec4899, #06b6d4)';
      case 'technical':
        return 'linear-gradient(90deg, #06b6d4, #6366f1)';
      case 'trades':
        return 'linear-gradient(90deg, #22c55e, #06b6d4)';
      default:
        return 'linear-gradient(90deg, #6366f1, #ec4899)';
    }
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
        overflow: 'hidden'
      }}>
        
        {/* Top Gradient Decorative Line */}
        <Box sx={{
          height: '4px',
          width: '100%',
          background: getTopBarGradient()
        }} />

        {/* Floating Bookmark */}
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(profile.id);
          }}
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            backgroundColor: isDark ? 'rgba(15, 22, 36, 0.6)' : 'rgba(255, 255, 255, 0.8)',
            border: `1px solid ${theme.palette.divider}`,
            color: isFavorited ? theme.palette.secondary.main : theme.palette.text.light,
            boxShadow: theme.shadows[1],
            zIndex: 5,
            width: 32,
            height: 32,
            '&:hover': {
              backgroundColor: isDark ? '#1e293b' : '#f1f5f9'
            }
          }}
        >
          {isFavorited ? <HeartIcon sx={{ fontSize: 16 }} /> : <HeartBorderIcon sx={{ fontSize: 16 }} />}
        </IconButton>

        {/* Card Body */}
        <CardContent sx={{ p: 3, pb: 2, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          
          {/* Avatar and Primary Header */}
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', mb: 2 }}>
            {profile.image ? (
              <Avatar
                src={profile.image}
                variant="rounded"
                sx={{
                  width: 72,
                  height: 72,
                  border: `2px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)'}`,
                  boxShadow: theme.shadows[1]
                }}
              />
            ) : (
              <Avatar
                variant="rounded"
                sx={{
                  width: 72,
                  height: 72,
                  background: getGradient(profile.name),
                  border: `2px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)'}`,
                  color: '#fff',
                  fontWeight: 800,
                  fontSize: '22px',
                  fontFamily: 'var(--font-display)',
                  boxShadow: theme.shadows[1]
                }}
              >
                {getInitials(profile.name)}
              </Avatar>
            )}

            <Box sx={{ minWidth: 0, flexGrow: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
                <Chip 
                  label={catDetails.label} 
                  size="small"
                  sx={{
                    backgroundColor: catDetails.bg,
                    color: catDetails.text,
                    fontWeight: 700,
                    fontSize: '10px',
                    height: '20px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}
                />
                <Typography variant="caption" sx={{ color: theme.palette.text.light, fontWeight: 600 }}>
                  {profile.joinedDate}
                </Typography>
              </Box>

              <Typography 
                variant="h6" 
                noWrap 
                sx={{ 
                  fontWeight: 700, 
                  fontSize: '17px',
                  color: theme.palette.text.primary,
                  fontFamily: 'var(--font-display)'
                }}
              >
                {profile.name}
              </Typography>

              <Typography 
                variant="body2" 
                noWrap 
                sx={{ 
                  color: theme.palette.text.secondary, 
                  fontWeight: 500
                }}
              >
                {profile.role}
              </Typography>
            </Box>
          </Box>

          {/* Grid stats (Matrimony Style) */}
          <Box sx={{
            borderBottom: `1px dashed ${theme.palette.divider}`,
            pb: 2,
            mb: 2
          }}>
            <Grid container spacing={1.5}>
              <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                <AwardIcon sx={{ fontSize: 16, color: theme.palette.primary.main, flexShrink: 0 }} />
                <Typography variant="caption" noWrap sx={{ color: theme.palette.text.secondary }}>
                  <strong>Exp:</strong> {profile.experience} Yrs
                </Typography>
              </Grid>
              <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                <GraduationIcon sx={{ fontSize: 16, color: theme.palette.secondary.main, flexShrink: 0 }} />
                <Typography variant="caption" noWrap sx={{ color: theme.palette.text.secondary }} title={profile.education}>
                  {profile.education.split(',')[0]}
                </Typography>
              </Grid>
              <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                <BriefcaseIcon sx={{ fontSize: 16, color: theme.palette.accent.main, flexShrink: 0 }} />
                <Typography variant="caption" noWrap sx={{ color: theme.palette.text.secondary }}>
                  <strong>Salary:</strong> {profile.salary.split(' ')[0]}
                </Typography>
              </Grid>
              <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                <Typography variant="caption" sx={{ color: theme.palette.text.light, fontWeight: 700 }}>
                  Age/Sex:
                </Typography>
                <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                  {profile.age} / {profile.gender.charAt(0)}
                </Typography>
              </Grid>
            </Grid>
          </Box>

          {/* Biography Snippet */}
          <Box sx={{ flexGrow: 1, mb: 2.5 }}>
            <Typography 
              variant="body2" 
              sx={{
                color: theme.palette.text.secondary,
                fontSize: '13px',
                lineHeight: 1.5,
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {profile.bio}
            </Typography>
          </Box>

          {/* Skill Badges */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8, maxHeight: '68px', overflow: 'hidden' }}>
            {profile.skills.slice(0, 4).map((skill, index) => (
              <Chip 
                key={index}
                label={skill}
                size="small"
                variant="outlined"
                sx={{
                  fontSize: '11px',
                  height: '22px',
                  borderRadius: '4px',
                  borderColor: theme.palette.divider,
                  color: theme.palette.text.secondary,
                  backgroundColor: isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0,0,0,0.01)'
                }}
              />
            ))}
            {profile.skills.length > 4 && (
              <Typography 
                variant="caption" 
                sx={{ 
                  color: theme.palette.primary.main, 
                  fontWeight: 700, 
                  alignSelf: 'center',
                  ml: 0.5
                }}
              >
                +{profile.skills.length - 4} more
              </Typography>
            )}
          </Box>

        </CardContent>

        {/* Card Actions Footer */}
        <CardActions sx={{
          px: 3,
          py: 2,
          backgroundColor: isDark ? 'rgba(15, 22, 36, 0.4)' : 'rgba(0,0,0,0.01)',
          borderTop: `1px solid ${theme.palette.divider}`,
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          {/* Location */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, minWidth: 0, mr: 1 }}>
            <MapPinIcon sx={{ fontSize: 16, color: theme.palette.text.light, flexShrink: 0 }} />
            <Typography variant="caption" noWrap sx={{ color: theme.palette.text.secondary }}>
              {profile.location.split(',')[0]}
            </Typography>
          </Box>

          {/* Actions Button */}
          <Button
            onClick={() => setSelectedProfileId(profile.id)}
            variant={isUnlocked ? "outlined" : "contained"}
            color={isUnlocked ? "secondary" : "primary"}
            size="small"
            startIcon={isUnlocked ? <CheckCircleIcon sx={{ fontSize: 13 }} /> : <LockIcon sx={{ fontSize: 13 }} />}
            sx={{
              py: '7px',
              px: '14px',
              borderRadius: 1.5,
              background: !isUnlocked ? 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)' : undefined,
              '&:hover': {
                background: !isUnlocked ? 'linear-gradient(135deg, #4f46e5 0%, #db2777 100%)' : undefined,
              }
            }}
          >
            {isUnlocked ? "Contact Unlocked" : "Show Contact"}
          </Button>

        </CardActions>

      </Card>
    </motion.div>
  );
};
