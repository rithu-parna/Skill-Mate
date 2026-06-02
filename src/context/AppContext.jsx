import React, { createContext, useState, useEffect } from 'react';
import { mockProfiles } from '../data/mockProfiles';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Load profiles from localStorage or use mockProfiles
  const [profiles, setProfiles] = useState(() => {
    const saved = localStorage.getItem('careermatch_profiles');
    return saved ? JSON.parse(saved) : mockProfiles;
  });

  // Logged in user session
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('careermatch_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Track unlocked contacts (simulating connection matches)
  const [unlockedContacts, setUnlockedContacts] = useState(() => {
    const saved = localStorage.getItem('careermatch_unlocked');
    return saved ? JSON.parse(saved) : [];
  });

  // Global filters
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    experience: 'all',
    type: 'all', // all, fulltime, hourly
    location: ''
  });

  // Favorites list
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('careermatch_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  // Selected profile for Detail Modal
  const [selectedProfileId, setSelectedProfileId] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('careermatch_profiles', JSON.stringify(profiles));
  }, [profiles]);

  useEffect(() => {
    localStorage.setItem('careermatch_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('careermatch_unlocked', JSON.stringify(unlockedContacts));
  }, [unlockedContacts]);

  useEffect(() => {
    localStorage.setItem('careermatch_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Actions
  const registerJobSeeker = (profileData) => {
    // Check if mobile already registered
    const exists = profiles.some(p => p.mobile === profileData.mobile);
    if (exists) {
      return { success: false, message: 'This mobile number is already registered!' };
    }

    const newProfile = {
      id: `prof-${Date.now()}`,
      joinedDate: 'Just Now',
      featured: false,
      ...profileData,
      experience: Number(profileData.experience),
      skills: typeof profileData.skills === 'string' 
        ? profileData.skills.split(',').map(s => s.trim()).filter(Boolean)
        : profileData.skills
    };

    setProfiles(prev => [newProfile, ...prev]);
    
    // Log the user in
    const userSession = {
      id: newProfile.id,
      name: newProfile.name,
      mobile: newProfile.mobile,
      role: newProfile.role,
      category: newProfile.category,
      accountType: 'seeker'
    };
    setCurrentUser(userSession);
    return { success: true, user: userSession };
  };

  const registerEmployer = (employerData) => {
    // Check if mobile already registered in seeker profiles (employers should have unique number)
    const existsInSeekers = profiles.some(p => p.mobile === employerData.mobile);
    if (existsInSeekers) {
      return { success: false, message: 'This mobile number is registered as a Job Seeker!' };
    }

    // Get existing employers
    const savedEmployers = JSON.parse(localStorage.getItem('careermatch_employers') || '[]');
    if (savedEmployers.some(e => e.mobile === employerData.mobile)) {
      return { success: false, message: 'This mobile number is already registered!' };
    }

    const newEmployer = {
      id: `emp-${Date.now()}`,
      ...employerData,
      accountType: 'employer'
    };

    savedEmployers.push(newEmployer);
    localStorage.setItem('careermatch_employers', JSON.stringify(savedEmployers));

    const userSession = {
      id: newEmployer.id,
      name: newEmployer.name,
      mobile: newEmployer.mobile,
      organization: newEmployer.organization,
      accountType: 'employer'
    };
    setCurrentUser(userSession);
    return { success: true, user: userSession };
  };

  const loginUser = (mobile, password) => {
    // 1. Check Seeker Profiles
    const seeker = profiles.find(p => p.mobile === mobile && p.password === password);
    if (seeker) {
      const userSession = {
        id: seeker.id,
        name: seeker.name,
        mobile: seeker.mobile,
        role: seeker.role,
        category: seeker.category,
        accountType: 'seeker'
      };
      setCurrentUser(userSession);
      return { success: true, user: userSession };
    }

    // 2. Check Employer DB
    const savedEmployers = JSON.parse(localStorage.getItem('careermatch_employers') || '[]');
    const employer = savedEmployers.find(e => e.mobile === mobile && e.password === password);
    if (employer) {
      const userSession = {
        id: employer.id,
        name: employer.name,
        mobile: employer.mobile,
        organization: employer.organization,
        accountType: 'employer'
      };
      setCurrentUser(userSession);
      return { success: true, user: userSession };
    }

    return { success: false, message: 'Invalid mobile number or password.' };
  };

  const logoutUser = () => {
    setCurrentUser(null);
    setSelectedProfileId(null);
  };

  const toggleFavorite = (profileId) => {
    setFavorites(prev => {
      if (prev.includes(profileId)) {
        return prev.filter(id => id !== profileId);
      } else {
        return [...prev, profileId];
      }
    });
  };

  const unlockContact = (profileId) => {
    if (!currentUser) return false;
    if (!unlockedContacts.includes(profileId)) {
      setUnlockedContacts(prev => [...prev, profileId]);
      
      // Simulate recruiter dashboard update:
      // If a seeker views another seeker, or recruiter views seeker, add a notification log
      const logs = JSON.parse(localStorage.getItem('careermatch_unlock_logs') || '[]');
      logs.push({
        id: `log-${Date.now()}`,
        unlockedBy: currentUser.name,
        unlockedByMobile: currentUser.mobile,
        unlockedProfileId: profileId,
        timestamp: new Date().toLocaleString()
      });
      localStorage.setItem('careermatch_unlock_logs', JSON.stringify(logs));
    }
    return true;
  };

  // Helper: check if a profile is unlocked
  const isContactUnlocked = (profileId) => {
    if (!currentUser) return false;
    // seeker can always see their own details
    if (currentUser.id === profileId) return true;
    return unlockedContacts.includes(profileId);
  };

  return (
    <AppContext.Provider value={{
      profiles,
      currentUser,
      unlockedContacts,
      favorites,
      filters,
      setFilters,
      selectedProfileId,
      setSelectedProfileId,
      registerJobSeeker,
      registerEmployer,
      loginUser,
      logoutUser,
      toggleFavorite,
      unlockContact,
      isContactUnlocked
    }}>
      {children}
    </AppContext.Provider>
  );
};
