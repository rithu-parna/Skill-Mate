import { createTheme } from '@mui/material/styles';

export const getAppTheme = (mode) => {
  const isDark = mode === 'dark';

  return createTheme({
    palette: {
      mode,
      primary: {
        main: '#6366f1', // Indigo
        light: 'rgba(99, 102, 241, 0.15)',
        dark: '#4f46e5',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#ec4899', // Pink
        light: 'rgba(236, 72, 153, 0.15)',
        dark: '#db2777',
        contrastText: '#ffffff',
      },
      accent: {
        main: '#06b6d4', // Cyan
        light: 'rgba(6, 182, 212, 0.15)',
        dark: '#0891b2',
      },
      background: {
        default: isDark ? '#080c14' : '#f6f8fc',
        paper: isDark ? '#0f1624' : '#ffffff',
        glass: isDark ? 'rgba(15, 22, 36, 0.75)' : 'rgba(255, 255, 255, 0.8)',
      },
      text: {
        primary: isDark ? '#f8fafc' : '#0f172a',
        secondary: isDark ? '#94a3b8' : '#475569',
        light: isDark ? '#64748b' : '#94a3b8',
      },
      divider: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(15, 23, 42, 0.08)',
      success: {
        main: '#22c55e',
      },
      warning: {
        main: '#f59e0b',
      },
    },
    typography: {
      fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
      h1: {
        fontFamily: "'Outfit', system-ui, sans-serif",
        fontWeight: 800,
        letterSpacing: '-0.02em',
      },
      h2: {
        fontFamily: "'Outfit', system-ui, sans-serif",
        fontWeight: 800,
        letterSpacing: '-0.02em',
      },
      h3: {
        fontFamily: "'Outfit', system-ui, sans-serif",
        fontWeight: 700,
        letterSpacing: '-0.01em',
      },
      h4: {
        fontFamily: "'Outfit', system-ui, sans-serif",
        fontWeight: 700,
        letterSpacing: '-0.01em',
      },
      h5: {
        fontFamily: "'Outfit', system-ui, sans-serif",
        fontWeight: 600,
      },
      h6: {
        fontFamily: "'Outfit', system-ui, sans-serif",
        fontWeight: 600,
      },
      button: {
        fontFamily: "'Outfit', system-ui, sans-serif",
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
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none',
              transform: 'translateY(-1px)',
            },
          },
          containedPrimary: {
            '&:hover': {
              backgroundColor: '#4f46e5',
              boxShadow: '0 0 16px rgba(99, 102, 241, 0.4)',
            },
          },
          containedSecondary: {
            '&:hover': {
              backgroundColor: '#db2777',
              boxShadow: '0 0 16px rgba(236, 72, 153, 0.4)',
            },
          },
          outlined: {
            borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(15, 23, 42, 0.08)',
            color: isDark ? '#f8fafc' : '#0f172a',
            '&:hover': {
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(15, 23, 42, 0.04)',
              borderColor: isDark ? '#94a3b8' : '#475569',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            background: isDark ? 'rgba(15, 22, 36, 0.75)' : 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(12px)',
            border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(15, 23, 42, 0.08)'}`,
            borderRadius: 14,
            boxShadow: isDark ? '0 8px 24px rgba(0, 0, 0, 0.6)' : '0 8px 24px rgba(15, 23, 42, 0.04)',
            transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.3s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              borderColor: 'rgba(99, 102, 241, 0.3)',
              boxShadow: isDark 
                ? '0 16px 40px rgba(0, 0, 0, 0.8), 0 0 20px rgba(99, 102, 241, 0.25)' 
                : '0 16px 40px rgba(15, 23, 42, 0.08), 0 0 20px rgba(99, 102, 241, 0.15)',
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
              backgroundColor: isDark ? 'rgba(15, 22, 36, 0.5)' : 'rgba(255, 255, 255, 0.9)',
              transition: 'border-color 0.2s, box-shadow 0.2s',
              borderRadius: 8,
              '& fieldset': {
                borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(15, 23, 42, 0.08)',
              },
              '&:hover fieldset': {
                borderColor: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(15, 23, 42, 0.2)',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#6366f1',
                borderWidth: '1px',
              },
              '&.Mui-focused': {
                boxShadow: '0 0 0 3px rgba(99, 102, 241, 0.15)',
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
            backgroundColor: isDark ? 'rgba(15, 22, 36, 0.5)' : 'rgba(255, 255, 255, 0.9)',
            borderRadius: 8,
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(15, 23, 42, 0.08)',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(15, 23, 42, 0.2)',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#6366f1',
              borderWidth: '1px',
            },
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            background: isDark ? 'rgba(15, 22, 36, 0.85)' : 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(16px)',
            border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(15, 23, 42, 0.08)'}`,
            boxShadow: isDark ? '0 16px 40px rgba(0, 0, 0, 0.8)' : '0 16px 40px rgba(15, 23, 42, 0.12)',
            borderRadius: 14,
          },
        },
      },
    },
  });
};
