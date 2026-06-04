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
  Tabs, 
  Tab, 
  Grid, 
  Select, 
  MenuItem, 
  InputLabel, 
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
import AwardIcon from '@mui/icons-material/WorkspacePremium';
import GraduationIcon from '@mui/icons-material/School';
import SparklesIcon from '@mui/icons-material/AutoAwesome';

export const RegisterModal = ({ isOpen, onClose, onSwitchToLogin }) => {
  const { registerJobSeeker, registerEmployer } = useContext(AppContext);
  const theme = useTheme();
  
  const [activeTab, setActiveTab] = useState(0); // 0 = seeker, 1 = employer
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

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setError('');
  };

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
      maxWidth="sm"
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          borderRadius: 4
        }
      }}
    >
      {step === 0 ? (
        <Box sx={{ p: { xs: 3, md: 5 }, textAlign: 'center', backgroundColor: theme.palette.background.paper }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <IconButton onClick={onClose} sx={{ color: theme.palette.text.light }}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: theme.palette.text.primary, mb: 1.5, fontSize: { xs: '24px', md: '32px' } }}>
            Welcome to SkillMate
          </Typography>
          <Typography variant="body1" sx={{ color: theme.palette.text.secondary, mb: 4 }}>
            Which describes you best?
          </Typography>

          <Grid container spacing={3} sx={{ maxWidth: 500, mx: 'auto', mb: 5 }}>
            <Grid item xs={12} sm={6}>
              <Box
                onClick={() => setActiveTab(1)}
                sx={{
                  border: `2px solid ${activeTab === 1 ? theme.palette.primary.main : theme.palette.divider}`,
                  borderRadius: 3,
                  p: 3,
                  cursor: 'pointer',
                  backgroundColor: activeTab === 1 
                    ? (theme.palette.mode === 'dark' ? 'rgba(20, 168, 0, 0.15)' : '#f2fdf2') 
                    : 'transparent',
                  transition: 'all 0.2s',
                  '&:hover': {
                    borderColor: theme.palette.primary.main,
                    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(20, 168, 0, 0.05)' : '#fafafa'
                  }
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                  <BuildingIcon sx={{ fontSize: 40, color: theme.palette.text.primary }} />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.text.primary, mb: 1, fontSize: '18px' }}>
                  Client
                </Typography>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                  Find and hire talent
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box
                onClick={() => setActiveTab(0)}
                sx={{
                  border: `2px solid ${activeTab === 0 ? theme.palette.primary.main : theme.palette.divider}`,
                  borderRadius: 3,
                  p: 3,
                  cursor: 'pointer',
                  backgroundColor: activeTab === 0 
                    ? (theme.palette.mode === 'dark' ? 'rgba(20, 168, 0, 0.15)' : '#f2fdf2') 
                    : 'transparent',
                  transition: 'all 0.2s',
                  '&:hover': {
                    borderColor: theme.palette.primary.main,
                    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(20, 168, 0, 0.05)' : '#fafafa'
                  }
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                  <PersonIcon sx={{ fontSize: 40, color: theme.palette.text.primary }} />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.text.primary, mb: 1, fontSize: '18px' }}>
                  Freelancer
                </Typography>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                  Work and get paid
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleNextStep}
            sx={{ py: 1.5, px: 5, borderRadius: 2, fontWeight: 'bold', fontSize: '15px', mb: 3 }}
          >
            {activeTab === 0 ? 'Apply as a Freelancer' : 'Join as a Client'}
          </Button>

          <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
            Already have an account?{' '}
            <Link 
              href="#" 
              onClick={(e) => { e.preventDefault(); onSwitchToLogin(); }}
              sx={{ color: theme.palette.primary.main, fontWeight: 'bold', textDecoration: 'underline' }}
            >
              Log in
            </Link>
          </Typography>
        </Box>
      ) : (
        <>
          {/* Header banner */}
          <Box sx={{
            backgroundColor: theme.palette.background.default,
            pt: 3,
            px: 3,
            pb: 2,
            borderBottom: `1px solid ${theme.palette.divider}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Typography variant="h6" sx={{ fontWeight: 800, color: theme.palette.text.primary }}>
              Sign up to find work you love
            </Typography>

            <IconButton onClick={onClose} sx={{ color: theme.palette.text.light }}>
              <CloseIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Box>



      {/* Form Content */}
      <DialogContent sx={{ p: 3, overflowY: 'auto' }}>
        
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
        p: 3,
        borderTop: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(15, 22, 36, 0.4)' : 'rgba(0,0,0,0.01)',
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
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
            Already registered?{' '}
            <Link 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                onSwitchToLogin();
              }}
              sx={{ 
                fontWeight: 'bold', 
                color: theme.palette.primary.main, 
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
