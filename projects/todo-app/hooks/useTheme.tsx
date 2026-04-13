import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';

// typeScript interface
export interface ColorScheme {
  bg: string;
  surface: string;
  text: string;
  textMuted: string;
  border: string;
  primary: string;
  success: string;
  warning: string;
  danger: string;
  shadow: string;
  gradients: {
    background: [string, string];
    surface: [string, string];
    primary: [string, string];
    success: [string, string];
    warning: [string, string];
    danger: [string, string];
    muted: [string, string];
    empty: [string, string];
  };
  backgrounds: {
    input: string;
    editInput: string;
  };
  statusBarStyle: 'light-content' | 'dark-content';
}

interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  colors: ColorScheme;
}

// light theme colors
const lightColors: ColorScheme = {
  bg: '#f8fafc',
  surface: '#ffffff',
  text: '#1e293b',
  textMuted: '#64748b',
  border: '#e2e8f0',
  primary: '#3b82f6',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  shadow: '#000000',
  gradients: {
    background: ['#f8fafc', '#e2e8f0'],
    surface: ['#ffffff', '#f8fafc'],
    primary: ['#3b82f6', '#1d4ed8'],
    success: ['#10b981', '#059669'],
    warning: ['#f59e0b', '#d97706'],
    danger: ['#ef4444', '#dc2626'],
    muted: ['#9ca3af', '#6b7280'],
    empty: ['#f3f4f6', '#e5e7eb'],
  },
  backgrounds: {
    input: '#ffffff',
    editInput: '#ffffff',
  },
  statusBarStyle: 'dark-content' as const,
};

// dark theme colors
const darkColors: ColorScheme = {
  bg: '#0f172a',
  surface: '#1e293b',
  text: '#f1f5f9',
  textMuted: '#94a3b8',
  border: '#334155',
  primary: '#60a5fa',
  success: '#34d399',
  warning: '#fbbf24',
  danger: '#f87171',
  shadow: '#000000',
  gradients: {
    background: ['#0f182bff', '#0b0f17ff'],
    surface: ['#1e293b', '#334155'],
    primary: ['#3b82f6', '#1d4ed8'],
    success: ['#10b981', '#059669'],
    warning: ['#f59e0b', '#d97706'],
    danger: ['#ef4444', '#dc2626'],
    muted: ['#374151', '#4b5563'],
    empty: ['#374151', '#4b5563'],
  },
  backgrounds: {
    input: '#1e293b',
    editInput: '#0f172a',
  },
  statusBarStyle: 'light-content' as const,
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // getting the user's choice
    AsyncStorage.getItem('isDarkMode')
      .then((value) => {
        if (value) {
          setIsDarkMode(JSON.parse(value));
        }
      })
      .catch((error) => {
        if (error) {
          console.error(error);
        }
      });
  }, []);

  const toggleDarkMode = async () => {
    setIsDarkMode(!isDarkMode);
    await AsyncStorage.setItem('isDarkMode', JSON.stringify(!isDarkMode));
  }

  const colors = isDarkMode ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, colors }}>
      {children}
    </ThemeContext.Provider>
  )

};

const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
 };


export default useTheme;
