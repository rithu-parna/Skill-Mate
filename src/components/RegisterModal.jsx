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
  InputAdornment
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
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
          position: 'relative'
        }
      }}
    >
      {/* Header banner */}
      <Box sx={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)',
        pt: 4,
        px: 3,
        pb: 2,
        borderBottom: `1px solid ${theme.palette.divider}`,
        textAlign: 'center',
        position: 'relative'
      }}>
        <Typography variant="h5" sx={{ fontWeight: 800, color: theme.palette.text.primary, mb: 0.5 }}>
          Create Match Account
        </Typography>
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
          Join SkillMate as a job candidate or searching employer.
        </Typography>

        {/* Close Button */}
        <IconButton 
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            color: theme.palette.text.light
          }}
        >
          <CloseIcon sx={{ fontSize: 20 }} />
        </IconButton>
      </Box>

      {/* Tabs */}
      <Tabs 
        value={activeTab} 
        onChange={handleTabChange}
        variant="fullWidth"
        textColor={activeTab === 0 ? "primary" : "secondary"}
        indicatorColor={activeTab === 0 ? "primary" : "secondary"}
        sx={{
          borderBottom: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.mode === 'dark' ? 'rgba(15, 22, 36, 0.2)' : 'rgba(0,0,0,0.01)'
        }}
      >
        <Tab label="Register as Talent" sx={{ fontWeight: 700, fontSize: '13px' }} />
        <Tab label="Register as Recruiter" sx={{ fontWeight: 700, fontSize: '13px' }} />
      </Tabs>

      {/* Form Content */}
      <DialogContent sx={{ p: 3, overflowY: 'auto' }}>
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
          color={activeTab === 0 ? "primary" : "secondary"}
          disabled={loading}
          sx={{
            py: 1.5,
            fontSize: '15px',
            fontWeight: 'bold',
            borderRadius: 2,
            background: activeTab === 0 
              ? 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' 
              : 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
            '&:hover': {
              background: activeTab === 0 
                ? 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)' 
                : 'linear-gradient(135deg, #db2777 0%, #c2185b 100%)',
            }
          }}
        >
          {loading ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <SparklesIcon sx={{ fontSize: 16 }} />
              <span>Register & Match Now</span>
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

    </Dialog>
  );
};
