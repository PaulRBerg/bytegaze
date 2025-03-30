import { createGlobalStyle } from 'styled-components';

export const theme = {
  light: {
    background: '#ffffff',
    foreground: '#171717',
    cardBg: '#f9fafb',
    borderColor: 'rgba(0, 0, 0, 0.08)',
    primary: '#4f46e5',
    primaryHover: '#4338ca',
    ringColor: 'rgba(79, 70, 229, 0.2)',
    gray: {
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937'
    },
    red: {
      100: '#fee2e2',
      300: '#fca5a5',
      800: '#991b1b'
    },
    blue: {
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      800: '#1e40af'
    },
    violet: {
      100: '#ede9fe',
      200: '#ddd6fe',
      400: '#a78bfa',
      700: '#6d28d9',
      800: '#5b21b6',
      900: '#4c1d95'
    },
    emerald: {
      400: '#34d399',
      600: '#059669'
    }
  },
  dark: {
    background: '#1e1e2e',
    foreground: '#e5e7eb',
    cardBg: '#2a2a3c',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    primary: '#6366f1',
    primaryHover: '#818cf8',
    ringColor: 'rgba(99, 102, 241, 0.2)',
    gray: {
      100: '#374151',
      200: '#1f2937',
      300: '#6b7280',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937'
    },
    red: {
      100: '#7f1d1d',
      300: '#b91c1c',
      800: '#fecaca'
    },
    blue: {
      300: '#1e40af',
      400: '#3b82f6',
      500: '#60a5fa',
      600: '#93c5fd',
      800: '#bfdbfe'
    },
    violet: {
      100: '#4c1d95',
      200: '#5b21b6',
      400: '#a78bfa',
      700: '#ddd6fe',
      800: '#ede9fe',
      900: '#f5f3ff'
    },
    emerald: {
      400: '#10b981',
      600: '#6ee7b7'
    }
  }
};

export type ThemeType = typeof theme.light;

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.foreground};
    transition: background 0.3s ease, color 0.3s ease;
    font-family: 'Inter', Arial, Helvetica, sans-serif;
    margin: 0;
    padding: 0;
  }
`;
