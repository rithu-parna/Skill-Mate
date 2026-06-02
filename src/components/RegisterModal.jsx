import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { X, User, Phone, Lock, Briefcase, GraduationCap, MapPin, Award, Building, Sparkles, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const RegisterModal = ({ isOpen, onClose, onSwitchToLogin }) => {
  const { registerJobSeeker, registerEmployer } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState('seeker'); // seeker or employer
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

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Common validations
    if (!name.trim() || !mobile.trim() || !password.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      let result;
      if (activeTab === 'seeker') {
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
          image: null // Defaults to dynamic initials avatar
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
    <AnimatePresence>
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(5, 7, 12, 0.85)',
        backdropFilter: 'blur(8px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }} onClick={onClose}>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 250 }}
          className="glass"
          style={{
            width: '100%',
            maxWidth: '650px',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-lg)',
            border: '1px solid var(--border-color)',
            overflow: 'hidden',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(236, 72, 153, 0.1))',
            padding: '28px 24px 16px 24px',
            borderBottom: '1px solid var(--border-color)',
            textAlign: 'center',
            position: 'relative',
            flexShrink: 0
          }}>
            <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '4px' }}>
              Create Match Account
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              Join CareerMatch as a job candidate or searching employer.
            </p>

            {/* Close Button */}
            <button 
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'transparent',
                border: 'none',
                color: 'var(--text-light)',
                cursor: 'pointer',
                padding: '4px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Form Tabs Selector */}
          <div style={{
            display: 'flex',
            borderBottom: '1px solid var(--border-color)',
            backgroundColor: 'rgba(15, 22, 36, 0.2)',
            flexShrink: 0
          }}>
            <button
              onClick={() => { setActiveTab('seeker'); setError(''); }}
              style={{
                flex: 1,
                padding: '14px',
                background: 'transparent',
                border: 'none',
                borderBottom: activeTab === 'seeker' ? '3px solid var(--primary)' : '3px solid transparent',
                color: activeTab === 'seeker' ? 'var(--primary)' : 'var(--text-muted)',
                fontWeight: activeTab === 'seeker' ? 700 : 500,
                fontSize: '14px',
                cursor: 'pointer',
                borderRadius: 0,
                transition: 'all 0.2s'
              }}
            >
              Register as Talent (Job Seeker)
            </button>
            <button
              onClick={() => { setActiveTab('employer'); setError(''); }}
              style={{
                flex: 1,
                padding: '14px',
                background: 'transparent',
                border: 'none',
                borderBottom: activeTab === 'employer' ? '3px solid var(--secondary)' : '3px solid transparent',
                color: activeTab === 'employer' ? 'var(--secondary)' : 'var(--text-muted)',
                fontWeight: activeTab === 'employer' ? 700 : 500,
                fontSize: '14px',
                cursor: 'pointer',
                borderRadius: 0,
                transition: 'all 0.2s'
              }}
            >
              Register as Recruiter (Employer)
            </button>
          </div>

          {/* Scrolling form content */}
          <div style={{ padding: '24px', overflowY: 'auto', flexGrow: 1 }}>
            {error && (
              <div style={{
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: 'var(--radius-sm)',
                padding: '12px',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                color: '#ef4444',
                fontSize: '13px'
              }}>
                <AlertCircle size={18} style={{ flexShrink: 0 }} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} id="register-form">
              {/* Form Grid Layout */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '16px 24px'
              }} className="register-grid">
                
                {/* Name */}
                <div>
                  <label htmlFor="reg-name">Full Name <span style={{ color: 'var(--secondary)' }}>*</span></label>
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <User size={16} style={{ position: 'absolute', left: '14px', color: 'var(--text-light)' }} />
                    <input 
                      id="reg-name"
                      type="text" 
                      placeholder="John Doe" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)}
                      style={{ paddingLeft: '40px' }}
                      required
                    />
                  </div>
                </div>

                {/* Mobile Number */}
                <div>
                  <label htmlFor="reg-mobile">Mobile Number (Log In ID) <span style={{ color: 'var(--secondary)' }}>*</span></label>
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <Phone size={16} style={{ position: 'absolute', left: '14px', color: 'var(--text-light)' }} />
                    <input 
                      id="reg-mobile"
                      type="tel" 
                      placeholder="+1 (555) 000-0000" 
                      value={mobile} 
                      onChange={(e) => setMobile(e.target.value)}
                      style={{ paddingLeft: '40px' }}
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="reg-password">Password <span style={{ color: 'var(--secondary)' }}>*</span></label>
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <Lock size={16} style={{ position: 'absolute', left: '14px', color: 'var(--text-light)' }} />
                    <input 
                      id="reg-password"
                      type="password" 
                      placeholder="Min 6 characters" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)}
                      style={{ paddingLeft: '40px' }}
                      required
                    />
                  </div>
                </div>

                {/* EMPLOYER SPECIAL FIELD: Organization */}
                {activeTab === 'employer' && (
                  <div>
                    <label htmlFor="reg-org">Company / Organization <span style={{ color: 'var(--secondary)' }}>*</span></label>
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                      <Building size={16} style={{ position: 'absolute', left: '14px', color: 'var(--text-light)' }} />
                      <input 
                        id="reg-org"
                        type="text" 
                        placeholder="Google, TechCorp, Freelance Recruiter..." 
                        value={organization} 
                        onChange={(e) => setOrganization(e.target.value)}
                        style={{ paddingLeft: '40px' }}
                        required={activeTab === 'employer'}
                      />
                    </div>
                  </div>
                )}

                {/* SEEKER SPECIAL FIELDS */}
                {activeTab === 'seeker' && (
                  <>
                    {/* Age and Gender */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <div>
                        <label htmlFor="reg-age">Age <span style={{ color: 'var(--secondary)' }}>*</span></label>
                        <input 
                          id="reg-age"
                          type="number" 
                          placeholder="25" 
                          min="18"
                          max="99"
                          value={age} 
                          onChange={(e) => setAge(e.target.value)}
                          required={activeTab === 'seeker'}
                        />
                      </div>
                      <div>
                        <label htmlFor="reg-gender">Gender</label>
                        <select 
                          id="reg-gender" 
                          value={gender} 
                          onChange={(e) => setGender(e.target.value)}
                        >
                          <option value="Female">Female</option>
                          <option value="Male">Male</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    {/* Job Title / Role */}
                    <div>
                      <label htmlFor="reg-role">Target Job Role <span style={{ color: 'var(--secondary)' }}>*</span></label>
                      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                        <Briefcase size={16} style={{ position: 'absolute', left: '14px', color: 'var(--text-light)' }} />
                        <input 
                          id="reg-role"
                          type="text" 
                          placeholder="Software Architect, Wedding Photographer..." 
                          value={role} 
                          onChange={(e) => setRole(e.target.value)}
                          style={{ paddingLeft: '40px' }}
                          required={activeTab === 'seeker'}
                        />
                      </div>
                    </div>

                    {/* Category Selector */}
                    <div>
                      <label htmlFor="reg-cat">Job Category</label>
                      <select 
                        id="reg-cat" 
                        value={category} 
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <option value="corporate">Corporate & Management</option>
                        <option value="creative">Creative & Arts</option>
                        <option value="technical">Technical & Software</option>
                        <option value="trades">Skilled Trades & Services</option>
                      </select>
                    </div>

                    {/* Subcategory */}
                    <div>
                      <label htmlFor="reg-subcat">Subcategory / Specialization</label>
                      <input 
                        id="reg-subcat"
                        type="text" 
                        placeholder="e.g. UI/UX Design, Pastry Arts, Mobile Dev" 
                        value={subcategory} 
                        onChange={(e) => setSubcategory(e.target.value)}
                      />
                    </div>

                    {/* Experience and Salary */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <div>
                        <label htmlFor="reg-exp">Experience (Years) <span style={{ color: 'var(--secondary)' }}>*</span></label>
                        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                          <Award size={16} style={{ position: 'absolute', left: '14px', color: 'var(--text-light)' }} />
                          <input 
                            id="reg-exp"
                            type="number" 
                            placeholder="5" 
                            min="0"
                            value={experience} 
                            onChange={(e) => setExperience(e.target.value)}
                            style={{ paddingLeft: '40px' }}
                            required={activeTab === 'seeker'}
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="reg-salary">Expected Salary / Rates <span style={{ color: 'var(--secondary)' }}>*</span></label>
                        <input 
                          id="reg-salary"
                          type="text" 
                          placeholder="e.g. $90,000 / yr or $45 / hr" 
                          value={salary} 
                          onChange={(e) => setSalary(e.target.value)}
                          required={activeTab === 'seeker'}
                        />
                      </div>
                    </div>

                    {/* Location */}
                    <div>
                      <label htmlFor="reg-loc">Location (City, State) <span style={{ color: 'var(--secondary)' }}>*</span></label>
                      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                        <MapPin size={16} style={{ position: 'absolute', left: '14px', color: 'var(--text-light)' }} />
                        <input 
                          id="reg-loc"
                          type="text" 
                          placeholder="New York, NY" 
                          value={location} 
                          onChange={(e) => setLocation(e.target.value)}
                          style={{ paddingLeft: '40px' }}
                          required={activeTab === 'seeker'}
                        />
                      </div>
                    </div>

                    {/* Education */}
                    <div>
                      <label htmlFor="reg-edu">Education Details <span style={{ color: 'var(--secondary)' }}>*</span></label>
                      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                        <GraduationCap size={16} style={{ position: 'absolute', left: '14px', color: 'var(--text-light)' }} />
                        <input 
                          id="reg-edu"
                          type="text" 
                          placeholder="BFA, ArtCenter or Self-taught Specialist" 
                          value={education} 
                          onChange={(e) => setEducation(e.target.value)}
                          style={{ paddingLeft: '40px' }}
                          required={activeTab === 'seeker'}
                        />
                      </div>
                    </div>

                    {/* Skills */}
                    <div>
                      <label htmlFor="reg-skills">Skills (Comma Separated) <span style={{ color: 'var(--secondary)' }}>*</span></label>
                      <input 
                        id="reg-skills"
                        type="text" 
                        placeholder="Figma, Adobe XD, HTML, CSS, React" 
                        value={skills} 
                        onChange={(e) => setSkills(e.target.value)}
                        required={activeTab === 'seeker'}
                      />
                    </div>

                    {/* Portfolio URL */}
                    <div>
                      <label htmlFor="reg-portfolio">Portfolio / LinkedIn Link</label>
                      <input 
                        id="reg-portfolio"
                        type="url" 
                        placeholder="https://example.com" 
                        value={portfolioUrl} 
                        onChange={(e) => setPortfolioUrl(e.target.value)}
                      />
                    </div>

                    {/* Bio */}
                    <div style={{ gridColumn: 'span 1' }}>
                      <label htmlFor="reg-bio">Professional Bio <span style={{ color: 'var(--secondary)' }}>*</span></label>
                      <textarea 
                        id="reg-bio"
                        placeholder="Tell recruiters about your expertise, creative background, or services..." 
                        rows="3"
                        value={bio} 
                        onChange={(e) => setBio(e.target.value)}
                        style={{ width: '100%', resize: 'vertical' }}
                        required={activeTab === 'seeker'}
                      />
                    </div>
                  </>
                )}

              </div>
            </form>
          </div>

          {/* Sticky footer actions */}
          <div style={{
            padding: '16px 24px',
            borderTop: '1px solid var(--border-color)',
            backgroundColor: 'rgba(15, 22, 36, 0.4)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            flexShrink: 0
          }}>
            <button 
              type="submit" 
              form="register-form"
              className={`btn ${activeTab === 'employer' ? 'btn-accent' : 'btn-primary'}`}
              disabled={loading}
              style={{
                width: '100%',
                justifyContent: 'center',
                padding: '14px',
                fontSize: '15px'
              }}
            >
              {loading ? (
                <div style={{
                  width: '20px',
                  height: '20px',
                  border: '2.5px solid rgba(255,255,255,0.3)',
                  borderTopColor: '#ffffff',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite'
                }} />
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sparkles size={16} />
                  <span>Register & Match Now</span>
                </div>
              )}
            </button>

            <div style={{ textAlign: 'center', fontSize: '13px', color: 'var(--text-muted)' }}>
              Already registered?{' '}
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  onSwitchToLogin();
                }}
                style={{ fontWeight: 'bold' }}
              >
                Log In Here
              </a>
            </div>
          </div>

        </motion.div>
      </div>

      <style>{`
        @media (min-width: 580px) {
          .register-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .register-grid > div:last-child {
            grid-column: span 2 !important;
          }
        }
      `}</style>
    </AnimatePresence>
  );
};
