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
        default: isDark ? '#1d1e20' : '#ffffff',
        paper: isDark ? '#2b2d30' : '#ffffff',
        glass: isDark ? 'rgba(43, 45, 48, 0.95)' : 'rgba(255, 255, 255, 0.95)',
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
      fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
      h1: {
        fontWeight: 700,
        letterSpacing: '-0.02em',
      },
      h2: {
        fontWeight: 700,
        letterSpacing: '-0.02em',
      },
      h3: {
        fontWeight: 700,
        letterSpacing: '-0.01em',
      },
      h4: {
        fontWeight: 700,
        letterSpacing: '-0.01em',
      },
      h5: {
        fontWeight: 600,
      },
      h6: {
        fontWeight: 600,
      },
      button: {
        fontWeight: 600,
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
            background: isDark ? '#2b2d30' : '#ffffff',
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
              backgroundColor: isDark ? 'rgba(43, 45, 48, 0.5)' : '#ffffff',
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
            backgroundColor: isDark ? 'rgba(43, 45, 48, 0.5)' : '#ffffff',
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
            background: isDark ? '#2b2d30' : '#ffffff',
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
