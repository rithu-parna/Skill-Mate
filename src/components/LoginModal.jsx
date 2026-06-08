import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { 
  Dialog, 
  TextField, 
  Button, 
  Box, 
  IconButton, 
  Alert, 
  CircularProgress, 
  Typography, 
  InputAdornment,
  Link,
  useTheme,
  Divider,
  Grid
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AppleIcon from '@mui/icons-material/Apple';
import GoogleIcon from '@mui/icons-material/Google';
import PhoneIcon from '@mui/icons-material/Phone';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import SparklesIcon from '@mui/icons-material/AutoAwesome';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PersonIcon from '@mui/icons-material/Person';

export const LoginModal = ({ isOpen, onClose, onSwitchToRegister }) => {
  const { loginUser } = useContext(AppContext);
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!mobile.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    
    setTimeout(() => {
      const res = loginUser(mobile.trim(), password);
      setLoading(false);
      if (res.success) {
        onClose();
        setMobile('');
        setPassword('');
      } else {
        setError(res.message);
      }
    }, 800);
  };

  return (
    <Dialog 
      open={isOpen} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          overflow: 'hidden',
          borderRadius: '24px',
          position: 'relative',
          background: isDark ? '#070a13' : '#fafafa',
          border: `1.5px solid ${isDark ? 'rgba(20, 168, 0, 0.35)' : 'rgba(20, 168, 0, 0.15)'}`,
          boxShadow: isDark 
            ? '0 24px 60px rgba(0, 0, 0, 0.85), 0 0 30px rgba(20, 168, 0, 0.15)'
            : '0 10px 30px rgba(0, 0, 0, 0.1)'
        }
      }}
    >
      <Grid container>
        {/* Left Info Panel */}
        <Grid size={{ xs: 12, md: 5.4 }} sx={{
          background: isDark 
            ? 'radial-gradient(circle at center, rgba(20, 168, 0, 0.22) 0%, rgba(7, 10, 19, 0) 80%), #070a13'
            : 'radial-gradient(circle at center, rgba(20, 168, 0, 0.08) 0%, rgba(255, 255, 255, 0) 80%), #f5f5f5',
          borderRight: { xs: 'none', md: `1.5px solid ${isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'}` },
          borderBottom: { xs: `1.5px solid ${isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'}`, md: 'none' },
          p: { xs: 3.5, md: 4.5 },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Subtle green glow overlay */}
          <Box sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(20, 168, 0, 0.08) 0%, transparent 40%)',
            pointerEvents: 'none'
          }} />

          {/* Top header description */}
          <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1.5 }}>
              <SparklesIcon sx={{ color: '#14a800', fontSize: 32, filter: 'drop-shadow(0 0 8px rgba(20, 168, 0, 0.4))' }} />
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 900, color: isDark ? '#fff' : '#070a13', mb: 1.5, fontFamily: 'var(--font-display)', fontSize: '28px' }}>
              Welcome <span style={{ color: '#14a800' }}>Back!</span>
            </Typography>
            <Typography variant="body2" sx={{ color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)', lineHeight: 1.5, fontSize: '13px', px: 1 }}>
              Log in to view contact details and match with opportunities.
            </Typography>
          </Box>

          {/* Center Glowing Lock Art (Orbit System) */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            my: { xs: 3, md: 4.5 },
            position: 'relative',
            zIndex: 1,
            height: 220
          }}>
            <Box sx={{
              position: 'relative',
              width: 200,
              height: 200,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {/* Slanted orbit rings */}
              <Box sx={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                border: '1.5px dashed rgba(20, 168, 0, 0.35)',
                transform: 'rotateX(60deg) rotateY(-15deg)',
                animation: 'spin 15s linear infinite',
                '@keyframes spin': {
                  '0%': { transform: 'rotateX(60deg) rotateY(-15deg) rotate(0deg)' },
                  '100%': { transform: 'rotateX(60deg) rotateY(-15deg) rotate(360deg)' }
                }
              }} />
              <Box sx={{
                position: 'absolute',
                width: '85%',
                height: '85%',
                borderRadius: '50%',
                border: '1px solid rgba(20, 168, 0, 0.15)',
                transform: 'rotateX(60deg) rotateY(15deg)',
                animation: 'spin-reverse 12s linear infinite',
                '@keyframes spin-reverse': {
                  '0%': { transform: 'rotateX(60deg) rotateY(15deg) rotate(360deg)' },
                  '100%': { transform: 'rotateX(60deg) rotateY(15deg) rotate(0deg)' }
                }
              }} />

              {/* Central glowing padlock capsule */}
              <Box sx={{
                width: 76,
                height: 76,
                borderRadius: '50%',
                backgroundColor: 'rgba(20, 168, 0, 0.1)',
                border: '2px solid #14a800',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 35px rgba(20, 168, 0, 0.45)',
                zIndex: 2,
                position: 'relative'
              }}>
                <LockIcon sx={{ color: '#14a800', fontSize: 32 }} />
              </Box>

              {/* Orbit nodes */}
              {/* Left Node */}
              <Box sx={{
                position: 'absolute',
                left: 15,
                top: '50%',
                transform: 'translateY(-50%)',
                width: 32,
                height: 32,
                borderRadius: '50%',
                backgroundColor: 'rgba(20, 168, 0, 0.2)',
                border: '1.5px solid #14a800',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 15px rgba(20, 168, 0, 0.3)',
                zIndex: 3
              }}>
                <PersonIcon sx={{ fontSize: 16, color: '#14a800' }} />
              </Box>

              {/* Right Node */}
              <Box sx={{
                position: 'absolute',
                right: 15,
                top: '50%',
                transform: 'translateY(-50%)',
                width: 32,
                height: 32,
                borderRadius: '50%',
                backgroundColor: isDark ? '#0f1624' : '#fff',
                border: `1.5px solid ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                zIndex: 3
              }}>
                <PersonIcon sx={{ fontSize: 16, color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }} />
              </Box>
            </Box>
          </Box>

          {/* Bottom 3-column features side-by-side */}
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Grid container spacing={1.5} sx={{ mb: 2 }}>
              <Grid size={{ xs: 4 }}>
                <Box sx={{
                  p: 1.5,
                  borderRadius: '12px',
                  border: `1.5px solid ${isDark ? 'rgba(20, 168, 0, 0.25)' : 'rgba(20, 168, 0, 0.15)'}`,
                  backgroundColor: isDark ? 'rgba(20, 168, 0, 0.04)' : 'rgba(20, 168, 0, 0.02)',
                  textAlign: 'center',
                  minHeight: '105px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Box sx={{
                    width: 30,
                    height: 30,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(20, 168, 0, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 0.8
                  }}>
                    <LockIcon sx={{ color: '#14a800', fontSize: 16 }} />
                  </Box>
                  <Typography sx={{ fontWeight: 800, color: isDark ? '#fff' : '#070a13', fontSize: '10px' }}>
                    Secure & Private
                  </Typography>
                  <Typography sx={{ color: isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)', fontSize: '8px', mt: 0.3 }}>
                    Your data is 100% protected
                  </Typography>
                </Box>
              </Grid>

              <Grid size={{ xs: 4 }}>
                <Box sx={{
                  p: 1.5,
                  borderRadius: '12px',
                  border: `1.5px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
                  backgroundColor: isDark ? 'rgba(255, 255, 255, 0.01)' : 'rgba(0, 0, 0, 0.01)',
                  textAlign: 'center',
                  minHeight: '105px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Box sx={{
                    width: 30,
                    height: 30,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(20, 168, 0, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 0.8
                  }}>
                    <SparklesIcon sx={{ color: '#14a800', fontSize: 16 }} />
                  </Box>
                  <Typography sx={{ fontWeight: 800, color: isDark ? '#fff' : '#070a13', fontSize: '10px' }}>
                    Smart Matching
                  </Typography>
                  <Typography sx={{ color: isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)', fontSize: '8px', mt: 0.3 }}>
                    AI matches the right opportunities
                  </Typography>
                </Box>
              </Grid>

              <Grid size={{ xs: 4 }}>
                <Box sx={{
                  p: 1.5,
                  borderRadius: '12px',
                  border: `1.5px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
                  backgroundColor: isDark ? 'rgba(255, 255, 255, 0.01)' : 'rgba(0, 0, 0, 0.01)',
                  textAlign: 'center',
                  minHeight: '105px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Box sx={{
                    width: 30,
                    height: 30,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(20, 168, 0, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 0.8
                  }}>
                    <CheckCircleIcon sx={{ color: '#14a800', fontSize: 16 }} />
                  </Box>
                  <Typography sx={{ fontWeight: 800, color: isDark ? '#fff' : '#070a13', fontSize: '10px' }}>
                    Verified Profiles
                  </Typography>
                  <Typography sx={{ color: isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)', fontSize: '8px', mt: 0.3 }}>
                    Only verified talents and clients
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            {/* Dots */}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 1 }}>
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#14a800' }} />
              <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)' }} />
              <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)' }} />
            </Box>
          </Box>
        </Grid>

        {/* Right Input Form Panel */}
        <Grid size={{ xs: 12, md: 6.6 }} sx={{
          p: { xs: 4, md: 5.5 },
          backgroundColor: isDark ? '#0b0f19' : '#ffffff',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          {/* Close Icon button in top right */}
          <IconButton 
            onClick={onClose}
            sx={{
              position: 'absolute',
              top: 20,
              right: 20,
              color: isDark ? '#fff' : theme.palette.text.primary,
              backgroundColor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
              '&:hover': {
                backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'
              }
            }}
          >
            <CloseIcon sx={{ fontSize: 18 }} />
          </IconButton>

          {/* Continue with divider */}
          <Divider sx={{ 
            my: 1.5, 
            '&::before, &::after': { borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' } 
          }}>
            <Typography sx={{ fontSize: '11px', color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)', px: 1, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Continue with
            </Typography>
          </Divider>

          {/* Social login triggers */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.8, mb: 2.2 }}>
            <Button
              variant="contained"
              fullWidth
              startIcon={<AppleIcon sx={{ fontSize: 18 }} />}
              sx={{
                backgroundColor: '#000000',
                color: '#ffffff',
                border: '1.5px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '10px',
                py: 1.3,
                fontWeight: 800,
                fontSize: '13px',
                textTransform: 'none',
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: '#111111',
                  boxShadow: 'none'
                }
              }}
            >
              Continue with Apple
            </Button>
            <Button
              variant="contained"
              fullWidth
              startIcon={<GoogleIcon sx={{ fontSize: 16 }} />}
              sx={{
                backgroundColor: '#ffffff',
                color: '#070a13',
                border: '1.5px solid rgba(0, 0, 0, 0.08)',
                borderRadius: '10px',
                py: 1.3,
                fontWeight: 800,
                fontSize: '13px',
                textTransform: 'none',
                boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                }
              }}
            >
              Continue with Google
            </Button>
          </Box>

          {/* OR separator */}
          <Divider sx={{ 
            my: 2.2, 
            '&::before, &::after': { borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' } 
          }}>
            <Typography sx={{ fontSize: '11px', color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)', px: 1, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              or
            </Typography>
          </Divider>

          <form onSubmit={handleSubmit}>
            {error && (
              <Alert 
                severity="error" 
                sx={{ 
                  mb: 2.5, 
                  borderRadius: '12px', 
                  fontSize: '13px',
                  alignItems: 'center'
                }}
              >
                {error}
              </Alert>
            )}

            {/* Mobile/Email input */}
            <Box sx={{ mb: 2.5 }}>
              <Typography sx={{ fontWeight: 700, color: isDark ? '#fff' : '#070a13', mb: 1, fontSize: '12.5px' }}>
                Mobile Number / Email
              </Typography>
              <TextField
                fullWidth
                placeholder="Enter mobile number or email"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.01)',
                    borderRadius: '10px',
                    '& fieldset': {
                      borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.1)'
                    },
                    '&:hover fieldset': {
                      borderColor: '#14a800'
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#14a800'
                    }
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon sx={{ fontSize: 18, color: '#14a800' }} />
                    </InputAdornment>
                  )
                }}
              />
            </Box>

            {/* Password input */}
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography sx={{ fontWeight: 700, color: isDark ? '#fff' : '#070a13', fontSize: '12.5px' }}>
                  Password
                </Typography>
                <Link 
                  href="#" 
                  onClick={(e) => e.preventDefault()}
                  sx={{ fontSize: '12.5px', color: '#14a800', textDecoration: 'none', fontWeight: 800, '&:hover': { textDecoration: 'underline' } }}
                >
                  Forgot Password?
                </Link>
              </Box>
              <TextField
                fullWidth
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.01)',
                    borderRadius: '10px',
                    '& fieldset': {
                      borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.1)'
                    },
                    '&:hover fieldset': {
                      borderColor: '#14a800'
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#14a800'
                    }
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ fontSize: 18, color: '#14a800' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        sx={{ color: isDark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)' }}
                      >
                        {showPassword ? <VisibilityOffIcon sx={{ fontSize: 18 }} /> : <VisibilityIcon sx={{ fontSize: 18 }} />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Box>

            {/* Remember Me checkbox */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <input
                  type="checkbox"
                  id="remember-me"
                  defaultChecked
                  style={{
                    accentColor: '#14a800',
                    width: '16px',
                    height: '16px',
                    cursor: 'pointer'
                  }}
                />
                <label htmlFor="remember-me" style={{ color: isDark ? '#fff' : '#070a13', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>
                  Remember me
                </label>
              </Box>
              <Typography sx={{ color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)', fontSize: '11px', fontWeight: 600 }}>
                Keep me signed in
              </Typography>
            </Box>

            {/* Submit Lock Action button */}
            <Button 
              fullWidth
              type="submit" 
              disabled={loading}
              sx={{
                py: 1.6,
                borderRadius: '12px',
                fontWeight: 800,
                fontSize: '15px',
                backgroundColor: '#14a800',
                boxShadow: '0 4px 20px rgba(20, 168, 0, 0.4)',
                textTransform: 'none',
                color: '#ffffff',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3.5,
                '&:hover': {
                  backgroundColor: '#118f00',
                  boxShadow: '0 4px 25px rgba(20, 168, 0, 0.55)',
                }
              }}
            >
              <Box sx={{ width: 28 }} /> {/* Balancer */}
              <span>{loading ? <CircularProgress size={20} color="inherit" /> : 'Log In'}</span>
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

            {/* Redirect link to registration */}
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" sx={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)', fontWeight: 500 }}>
                Don't have an account?{' '}
                <Link 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    onSwitchToRegister();
                  }}
                  sx={{ 
                    fontWeight: 800, 
                    color: '#14a800', 
                    textDecoration: 'none',
                    '&:hover': { textDecoration: 'underline' }
                  }}
                >
                  Register Now
                </Link>
              </Typography>
            </Box>
          </form>
        </Grid>
      </Grid>
    </Dialog>
  );
};
