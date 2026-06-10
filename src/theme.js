import { createTheme } from '@mui/material/styles';

export const getAppTheme = (mode) => {
  const isDark = mode === 'dark';

  return createTheme({
    palette: {
      mode,
      primary: {
        main: '#14a800', // Upwork Green
        light: 'rgba(20, 168, 0, 0.15)',
        dark: '#108a00',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#1f57c3', // Blue
        light: 'rgba(31, 87, 195, 0.15)',
        dark: '#1847a1',
        contrastText: '#ffffff',
      },
      accent: {
        main: '#222222', // Dark accent
        light: 'rgba(34, 34, 34, 0.15)',
        dark: '#111111',
      },
      background: {
        default: isDark ? '#070a13' : '#ffffff',
        paper: isDark ? '#0f1624' : '#ffffff',
        glass: isDark ? 'rgba(15, 22, 36, 0.8)' : 'rgba(255, 255, 255, 0.95)',
      },
      text: {
        primary: isDark ? '#ffffff' : '#222222',
        secondary: isDark ? '#e0e0e0' : '#5e6d55',
        light: isDark ? '#9e9e9e' : '#9aa09d',
      },
      divider: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(34, 34, 34, 0.12)',
      success: {
        main: '#14a800',
      },
      warning: {
        main: '#f59e0b',
      },
    },
    typography: {
      fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      h1: {
        fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif",
        fontWeight: 800,
        letterSpacing: '-0.025em',
        fontSize: '2.2rem',
        '@media (min-width:600px)': { fontSize: '2.8rem' },
        '@media (min-width:960px)': { fontSize: '3.75rem' },
      },
      h2: {
        fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif",
        fontWeight: 800,
        letterSpacing: '-0.025em',
        fontSize: '1.8rem',
        '@media (min-width:600px)': { fontSize: '2.4rem' },
        '@media (min-width:960px)': { fontSize: '3.0rem' },
      },
      h3: {
        fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif",
        fontWeight: 700,
        letterSpacing: '-0.015em',
        fontSize: '1.5rem',
        '@media (min-width:600px)': { fontSize: '1.8rem' },
        '@media (min-width:960px)': { fontSize: '2.2rem' },
      },
      h4: {
        fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif",
        fontWeight: 700,
        letterSpacing: '-0.015em',
        fontSize: '1.25rem',
        '@media (min-width:600px)': { fontSize: '1.45rem' },
        '@media (min-width:960px)': { fontSize: '1.75rem' },
      },
      h5: {
        fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif",
        fontWeight: 600,
        fontSize: '1.1rem',
        '@media (min-width:600px)': { fontSize: '1.2rem' },
        '@media (min-width:960px)': { fontSize: '1.35rem' },
      },
      h6: {
        fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif",
        fontWeight: 600,
        fontSize: '0.95rem',
        '@media (min-width:600px)': { fontSize: '1.05rem' },
        '@media (min-width:960px)': { fontSize: '1.15rem' },
      },
      body1: {
        fontSize: '0.875rem',
        '@media (min-width:600px)': { fontSize: '0.925rem' },
        '@media (min-width:960px)': { fontSize: '0.975rem' },
      },
      body2: {
        fontSize: '0.775rem',
        '@media (min-width:600px)': { fontSize: '0.825rem' },
        '@media (min-width:960px)': { fontSize: '0.875rem' },
      },
      button: {
        fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif",
        fontWeight: 700,
        textTransform: 'none',
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            transition: 'background-color 0.3s ease, color 0.3s ease',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            padding: '8px 20px',
            fontSize: '14px',
            transition: 'all 0.2s ease',
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none',
              transform: 'translateY(0)',
            },
          },
          containedPrimary: {
            '&:hover': {
              backgroundColor: '#108a00',
              boxShadow: 'none',
            },
          },
          containedSecondary: {
            '&:hover': {
              backgroundColor: '#1847a1',
              boxShadow: 'none',
            },
          },
          outlined: {
            borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(34, 34, 34, 0.12)',
            color: isDark ? '#ffffff' : '#222222',
            '&:hover': {
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(34, 34, 34, 0.04)',
              borderColor: isDark ? '#e0e0e0' : '#222222',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            background: isDark ? '#0f1624' : '#ffffff',
            backdropFilter: 'none',
            border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(34, 34, 34, 0.12)'}`,
            borderRadius: 14,
            boxShadow: isDark ? '0 4px 12px rgba(0, 0, 0, 0.3)' : '0 4px 12px rgba(0, 0, 0, 0.05)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              borderColor: 'rgba(20, 168, 0, 0.3)',
              boxShadow: isDark 
                ? '0 8px 24px rgba(0, 0, 0, 0.5)' 
                : '0 8px 24px rgba(0, 0, 0, 0.08)',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
          outlined: {
            borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(15, 23, 42, 0.08)',
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          size: 'small',
        },
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              backgroundColor: isDark ? 'rgba(15, 22, 36, 0.5)' : '#ffffff',
              transition: 'border-color 0.2s, box-shadow 0.2s',
              borderRadius: 8,
              '& fieldset': {
                borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(34, 34, 34, 0.12)',
              },
              '&:hover fieldset': {
                borderColor: isDark ? 'rgba(255, 255, 255, 0.25)' : 'rgba(34, 34, 34, 0.25)',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#14a800',
                borderWidth: '1px',
              },
              '&.Mui-focused': {
                boxShadow: 'none',
              },
            },
          },
        },
      },
      MuiSelect: {
        defaultProps: {
          size: 'small',
        },
        styleOverrides: {
          root: {
            backgroundColor: isDark ? 'rgba(15, 22, 36, 0.5)' : '#ffffff',
            borderRadius: 8,
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(34, 34, 34, 0.12)',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: isDark ? 'rgba(255, 255, 255, 0.25)' : 'rgba(34, 34, 34, 0.25)',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#14a800',
              borderWidth: '1px',
            },
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            background: isDark ? '#0f1624' : '#ffffff',
            backdropFilter: 'none',
            border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(34, 34, 34, 0.12)'}`,
            boxShadow: isDark ? '0 16px 40px rgba(0, 0, 0, 0.6)' : '0 16px 40px rgba(0, 0, 0, 0.1)',
            borderRadius: 14,
          },
        },
      },
    },
  });
};
