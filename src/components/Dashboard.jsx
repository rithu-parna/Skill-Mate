import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import {
  Box,
  Typography,
  Grid,
  Button,
  Tabs,
  Tab,
  Avatar,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
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
import AwardIcon from '@mui/icons-material/WorkspacePremium';
import BuildingIcon from '@mui/icons-material/Business';
import PlaceIcon from '@mui/icons-material/Place';
import SchoolIcon from '@mui/icons-material/School';
import MailIcon from '@mui/icons-material/Mail';
import LaunchIcon from '@mui/icons-material/OpenInNew';
import SparklesIcon from '@mui/icons-material/AutoAwesome';
import { JobCard } from './JobCard';
import { motion } from 'framer-motion';

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

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ py: 6, px: { xs: 2, sm: 3 } }}>

      {/* Dashboard Top welcome banner */}
      <Box sx={{
        p: 4,
        borderRadius: 3.5,
        mb: 4,
        border: `1px solid ${theme.palette.divider}`,
        backgroundColor: isDark ? theme.palette.background.paper : theme.palette.background.default,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 3,
        boxShadow: theme.shadows[2]
      }}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: theme.palette.primary.main, mb: 1 }}>
            <AwardIcon sx={{ fontSize: 18 }} />
            <Typography variant="caption" sx={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              User Workspace
            </Typography>
          </Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: theme.palette.text.primary, mb: 1, fontSize: { xs: '24px', sm: '30px' } }}>
            {currentUser ? `Hello, ${currentUser.name}!` : 'Guest Workspace'}
          </Typography>
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary, maxWidth: '600px' }}>
            {currentUser
              ? (currentUser.accountType === 'employer'
                ? `Recruiting for ${currentUser.organization || 'Independent Recruitment'}. Track favorited talents and unlocked contact parameters.`
                : `Role: ${currentUser.role || 'Job Seeker'}. Review your matching parameters and discover who viewed your profile.`)
              : 'Log in to unlock custom dashboards, view match scores, and track professional matrimony connections.'}
          </Typography>
        </Box>

        {!currentUser && (
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <Button variant="outlined" onClick={onOpenLogin} size="small">Log In</Button>
            <Button variant="contained" onClick={onOpenRegister} size="small" color="primary">Register</Button>
          </Box>
        )}
      </Box>

      {/* Main Grid Panel */}
      <Grid container spacing={4}>

        {/* Navigation Sidebar Tabs */}
        <Grid item xs={12} md={3.5} lg={3}>
          <Box sx={{
            background: theme.palette.background.glass,
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 3,
            p: 1.5,
            boxShadow: theme.shadows[1]
          }}>
            <Tabs
              orientation="vertical"
              value={activeTab}
              onChange={handleTabChange}
              sx={{
                '& .MuiTabs-indicator': {
                  left: 0,
                  right: 'auto',
                  width: '3px',
                  backgroundColor: theme.palette.primary.main
                },
                '& .MuiTab-root': {
                  alignItems: 'flex-start',
                  textAlign: 'left',
                  py: 1.5,
                  px: 2,
                  borderRadius: 1.5,
                  fontSize: '14px',
                  fontWeight: 700,
                  color: theme.palette.text.secondary,
                  '&.Mui-selected': {
                    color: theme.palette.primary.main,
                    backgroundColor: theme.palette.primary.light
                  }
                }
              }}
            >
              <Tab
                value="saved"
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <HeartIcon sx={{ fontSize: 18 }} />
                    <span>Saved Matches ({favorites.length})</span>
                  </Box>
                }
              />

              {currentUser && currentUser.accountType === 'employer' && (
                <Tab
                  value="unlocked"
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <PhoneIcon sx={{ fontSize: 18 }} />
                      <span>Unlocked Contacts ({unlockedContacts.length})</span>
                    </Box>
                  }
                />
              )}

              {currentUser && currentUser.accountType === 'seeker' && [
                <Tab
                  key="myprofile"
                  value="myprofile"
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <PersonIcon sx={{ fontSize: 18 }} />
                      <span>My Profile Details</span>
                    </Box>
                  }
                />,
                <Tab
                  key="views"
                  value="views"
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <EyeIcon sx={{ fontSize: 18 }} />
                      <span>Who Viewed Me ({seededViews.length})</span>
                    </Box>
                  }
                />
              ]}
            </Tabs>
          </Box>
        </Grid>

        {/* Tab Panel Content Display */}
        <Grid item xs={12} md={8.5} lg={9}>

          {/* TAB 1: SAVED MATCHES */}
          {activeTab === 'saved' && (
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 800, mb: 3, display: 'flex', alignItems: 'center', gap: 1.2, color: theme.palette.text.primary }}>
                <HeartIcon sx={{ color: theme.palette.secondary.main }} />
                Your Saved Matches
              </Typography>

              {bookmarkedProfiles.length === 0 ? (
                <Box sx={{
                  p: 6,
                  textAlign: 'center',
                  border: `1px dashed ${theme.palette.divider}`,
                  borderRadius: 3.5,
                  backgroundColor: isDark ? 'rgba(255, 255, 255, 0.01)' : 'rgba(0, 0, 0, 0.01)'
                }}>
                  <HeartIcon sx={{ fontSize: 40, color: theme.palette.text.light, mb: 1.5 }} />
                  <Typography variant="body1" sx={{ color: theme.palette.text.primary, mb: 0.5, fontWeight: 'bold' }}>No profiles bookmarked yet</Typography>
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>Browse the registry, select profiles and click the bookmark heart icon.</Typography>
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

          {/* TAB 2: UNLOCKED CONNECTIONS (RECRUITERS) */}
          {activeTab === 'unlocked' && currentUser && currentUser.accountType === 'employer' && (
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 800, mb: 3, display: 'flex', alignItems: 'center', gap: 1.2, color: theme.palette.text.primary }}>
                <PhoneIcon sx={{ color: theme.palette.success.main }} />
                Unlocked Talent Directory
              </Typography>

              {unlockedProfiles.length === 0 ? (
                <Box sx={{
                  p: 6,
                  textAlign: 'center',
                  border: `1px dashed ${theme.palette.divider}`,
                  borderRadius: 3.5,
                  backgroundColor: isDark ? 'rgba(255, 255, 255, 0.01)' : 'rgba(0, 0, 0, 0.01)'
                }}>
                  <PhoneIcon sx={{ fontSize: 40, color: theme.palette.text.light, mb: 1.5 }} />
                  <Typography variant="body1" sx={{ color: theme.palette.text.primary, mb: 0.5, fontWeight: 'bold' }}>No unlocked contact details yet</Typography>
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>View profile cards, open detailed dialogues and select "Unlock Contact Details".</Typography>
                </Box>
              ) : (
                <Grid container spacing={2.5}>
                  {unlockedProfiles.map(profile => (
                    <Grid item xs={12} key={profile.id}>
                      <Card sx={{
                        border: `1px solid ${theme.palette.divider}`,
                        boxShadow: theme.shadows[1],
                        '&:hover': { transform: 'none', boxShadow: theme.shadows[2] }
                      }}>
                        <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
                          <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                            {/* Left details */}
                            <Grid item xs={12} sm={5} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              {profile.image ? (
                                <Avatar src={profile.image} sx={{ width: 48, height: 48 }} />
                              ) : (
                                <Avatar sx={{
                                  width: 48,
                                  height: 48,
                                  backgroundColor: theme.palette.primary.main,
                                  fontWeight: 'bold'
                                }}>
                                  {profile.name.charAt(0)}
                                </Avatar>
                              )}
                              <Box sx={{ minWidth: 0 }}>
                                <Typography variant="body1" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }} noWrap>
                                  {profile.name}
                                </Typography>
                                <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                                  {profile.role} • {profile.location.split(',')[0]}
                                </Typography>
                              </Box>
                            </Grid>

                            {/* Center contacts */}
                            <Grid item xs={12} sm={5} sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 1.5, sm: 3 } }}>
                              <Box>
                                <Typography variant="caption" sx={{ color: theme.palette.text.light, display: 'block', fontWeight: 700, textTransform: 'uppercase' }}>Mobile</Typography>
                                <Typography
                                  component="a"
                                  href={`tel:${profile.mobile}`}
                                  sx={{ fontSize: '14px', fontWeight: 'bold', color: theme.palette.text.primary, textDecoration: 'none' }}
                                >
                                  {profile.mobile}
                                </Typography>
                              </Box>
                              <Box>
                                <Typography variant="caption" sx={{ color: theme.palette.text.light, display: 'block', fontWeight: 700, textTransform: 'uppercase' }}>Email</Typography>
                                <Typography
                                  component="a"
                                  href={`mailto:${profile.email}`}
                                  sx={{ fontSize: '13px', fontWeight: 'bold', color: theme.palette.text.secondary, textDecoration: 'none' }}
                                >
                                  {profile.email}
                                </Typography>
                              </Box>
                            </Grid>

                            {/* Right action */}
                            <Grid item xs={12} sm={2} sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
                              <Button
                                size="small"
                                variant="outlined"
                                onClick={() => setSelectedProfileId(profile.id)}
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

          {/* TAB 3: MY MATRIMONIAL SEEKER PROFILE (SEEKERS) */}
          {activeTab === 'myprofile' && currentUser && currentUser.accountType === 'seeker' && myProfile && (
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 800, mb: 3, display: 'flex', alignItems: 'center', gap: 1.2, color: theme.palette.text.primary }}>
                <PersonIcon sx={{ color: theme.palette.primary.main }} />
                Your Job Matrimony Profile
              </Typography>

              <Card sx={{
                border: `1px solid ${theme.palette.divider}`,
                boxShadow: theme.shadows[2],
                '&:hover': { transform: 'none', boxShadow: theme.shadows[3] }
              }}>
                <CardContent sx={{ p: 4 }}>
                  {/* Top info */}
                  <Box sx={{ display: 'flex', gap: 2.5, alignItems: 'center', mb: 4, flexWrap: 'wrap' }}>
                    {myProfile.image ? (
                      <Avatar src={myProfile.image} variant="rounded" sx={{ width: 80, height: 80 }} />
                    ) : (
                      <Avatar
                        variant="rounded"
                        sx={{
                          width: 80,
                          height: 80,
                          backgroundColor: theme.palette.primary.main,
                          color: '#fff',
                          fontWeight: 800,
                          fontSize: '28px'
                        }}
                      >
                        {myProfile.name.charAt(0)}
                      </Avatar>
                    )}
                    <Box sx={{ minWidth: 0 }}>
                      <Typography variant="h5" sx={{ fontWeight: 800, color: theme.palette.text.primary, mb: 0.5 }}>
                        {myProfile.name}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
                        <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontWeight: 500 }}>
                          {myProfile.role}
                        </Typography>
                        <Chip label={myProfile.category} size="small" color="primary" sx={{ textTransform: 'capitalize', fontWeight: 'bold', height: '20px', fontSize: '10px' }} />
                      </Box>
                    </Box>
                  </Box>

                  {/* Core details */}
                  <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="caption" sx={{ color: theme.palette.text.light, display: 'block', fontWeight: 700, textTransform: 'uppercase' }}>Mobile Login</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 'bold', color: theme.palette.text.primary, mt: 0.5 }}>{myProfile.mobile}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="caption" sx={{ color: theme.palette.text.light, display: 'block', fontWeight: 700, textTransform: 'uppercase' }}>Email</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 'bold', color: theme.palette.text.primary, mt: 0.5 }}>{myProfile.email}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="caption" sx={{ color: theme.palette.text.light, display: 'block', fontWeight: 700, textTransform: 'uppercase' }}>Age & Gender</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 'bold', color: theme.palette.text.primary, mt: 0.5 }}>{myProfile.age} Years / {myProfile.gender}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="caption" sx={{ color: theme.palette.text.light, display: 'block', fontWeight: 700, textTransform: 'uppercase' }}>Experience</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 'bold', color: theme.palette.text.primary, mt: 0.5 }}>{myProfile.experience} Years</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="caption" sx={{ color: theme.palette.text.light, display: 'block', fontWeight: 700, textTransform: 'uppercase' }}>Target Salary</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 'bold', color: theme.palette.text.primary, mt: 0.5 }}>{myProfile.salary}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="caption" sx={{ color: theme.palette.text.light, display: 'block', fontWeight: 700, textTransform: 'uppercase' }}>Location</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 'bold', color: theme.palette.text.primary, mt: 0.5 }}>{myProfile.location}</Typography>
                    </Grid>
                  </Grid>

                  {/* Skills */}
                  <Box sx={{ mb: 4 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: theme.palette.text.primary, mb: 1.5, borderBottom: `1px solid ${theme.palette.divider}`, pb: 0.5 }}>
                      Registered Skills
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {myProfile.skills.map((skill, index) => (
                        <Chip key={index} label={skill} size="small" variant="outlined" />
                      ))}
                    </Box>
                  </Box>

                  {/* Biography */}
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: theme.palette.text.primary, mb: 1.5, borderBottom: `1px solid ${theme.palette.divider}`, pb: 0.5 }}>
                      Professional Biography
                    </Typography>
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary, lineHeight: 1.6 }}>
                      {myProfile.bio}
                    </Typography>
                  </Box>

                </CardContent>
              </Card>
            </Box>
          )}

          {/* TAB 4: WHO VIEWED ME (SEEKERS) */}
          {activeTab === 'views' && currentUser && currentUser.accountType === 'seeker' && (
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 800, color: theme.palette.text.primary, mb: 0.5 }}>
                Who Unlocked Your Contact Parameters
              </Typography>
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 3.5 }}>
                Matched connection history. These verified recruiters have unlocked your phone number to start matches.
              </Typography>

              <List sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {seededViews.map(view => (
                  <ListItem
                    key={view.id}
                    sx={{
                      p: 2.5,
                      borderRadius: 2,
                      border: `1px solid ${theme.palette.divider}`,
                      borderLeft: `4px solid ${theme.palette.primary.main}`,
                      backgroundColor: theme.palette.background.glass,
                      flexWrap: 'wrap',
                      gap: 2,
                      justifyContent: 'space-between'
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ backgroundColor: theme.palette.primary.light, color: theme.palette.primary.main }}>
                        <BuildingIcon sx={{ fontSize: 20 }} />
                      </Avatar>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
                          {view.unlockedBy}
                        </Typography>
                        <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                          Mobile: <strong>{view.unlockedByMobile}</strong>
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Typography variant="caption" sx={{ color: theme.palette.text.light }}>
                        {view.timestamp}
                      </Typography>
                      <IconButton
                        component="a"
                        href={`tel:${view.unlockedByMobile}`}
                        color="success"
                        sx={{ border: `1px solid ${theme.palette.divider}`, p: 1 }}
                        title="Call Back Recruiter"
                      >
                        <PhoneIcon sx={{ fontSize: 16 }} />
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
