import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
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
  Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AppleIcon from '@mui/icons-material/Apple';
import GoogleIcon from '@mui/icons-material/Google';
import PhoneIcon from '@mui/icons-material/Phone';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export const LoginModal = ({ isOpen, onClose, onSwitchToRegister }) => {
  const { loginUser } = useContext(AppContext);
  const theme = useTheme();
  
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
      maxWidth="xs"
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          overflow: 'hidden',
          position: 'relative'
        }
      }}
    >
      {/* Banner Head */}
      <Box sx={{
        backgroundColor: theme.palette.background.default,
        pt: 4,
        px: 3,
        pb: 2.5,
        borderBottom: `1px solid ${theme.palette.divider}`,
        textAlign: 'center',
        position: 'relative'
      }}>
        <Typography variant="h5" sx={{ fontWeight: 800, color: theme.palette.text.primary, mb: 0.5 }}>
          Welcome Back
        </Typography>
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
          Log in to view contact details and match with opportunities.
        </Typography>

        {/* Close Button */}
        <IconButton 
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            color: theme.palette.text.light,
            '&:hover': {
              color: theme.palette.text.primary
            }
          }}
        >
          <CloseIcon sx={{ fontSize: 20 }} />
        </IconButton>
      </Box>

      {/* Form Content */}
      <DialogContent sx={{ p: 3, pt: 3.5 }}>
        
        {/* Social Auth Buttons */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 3 }}>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<AppleIcon />}
            sx={{
              color: theme.palette.mode === 'dark' ? '#fff' : '#000',
              borderColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.8)',
              borderRadius: '8px',
              py: 1.2,
              fontWeight: 'bold'
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
              '&:hover': { backgroundColor: '#1847a1' }
            }}
          >
            Continue with Google
          </Button>
          <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
            <Divider sx={{ flexGrow: 1 }} />
            <Typography variant="body2" sx={{ px: 2, color: theme.palette.text.secondary }}>or</Typography>
            <Divider sx={{ flexGrow: 1 }} />
          </Box>
        </Box>

        <form onSubmit={handleSubmit}>
          
          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                mb: 2.5, 
                borderRadius: 2, 
                fontSize: '13px',
                alignItems: 'center'
              }}
            >
              {error}
            </Alert>
          )}

          {/* Mobile Field */}
          <Box sx={{ mb: 2.5 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: theme.palette.text.primary, fontSize: '13px' }}>
              Mobile Number
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
                    <PhoneIcon sx={{ fontSize: 18, color: theme.palette.text.light }} />
                  </InputAdornment>
                )
              }}
            />
          </Box>

          {/* Password Field */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.text.primary, fontSize: '13px' }}>
                Password
              </Typography>
              <Link 
                href="#" 
                onClick={(e) => e.preventDefault()}
                sx={{ fontSize: '12px', color: theme.palette.primary.main, textDecoration: 'none', fontWeight: 600 }}
              >
                Forgot Password?
              </Link>
            </Box>
            <TextField
              fullWidth
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ fontSize: 18, color: theme.palette.text.light }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: theme.palette.text.light }}
                    >
                      {showPassword ? <VisibilityOffIcon sx={{ fontSize: 18 }} /> : <VisibilityIcon sx={{ fontSize: 18 }} />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Box>

          {/* Submit */}
          <Button 
            fullWidth
            type="submit" 
            variant="contained" 
            color="primary"
            disabled={loading}
            sx={{
              py: 1.5,
              fontSize: '15px',
              fontWeight: 'bold',
              borderRadius: 2,
              mb: 2.5,
            }}
          >
            {loading ? <CircularProgress size={20} color="inherit" /> : 'Log In'}
          </Button>

          {/* Register Redirect */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
              Don't have an account?{' '}
              <Link 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  onSwitchToRegister();
                }}
                sx={{ 
                  fontWeight: 'bold', 
                  color: theme.palette.primary.main, 
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' }
                }}
              >
                Register Now
              </Link>
            </Typography>
          </Box>

        </form>
      </DialogContent>
    </Dialog>
  );
};
