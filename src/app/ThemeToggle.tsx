"use client";

import { useEffect, useState, useContext } from 'react';
import { SunIcon, MoonIcon } from 'lucide-react';
import { ThemeContext, ThemeProvider } from 'styled-components';
import { ThemeToggleButton } from './StyledComponents';
import { theme } from './GlobalStyles';

export default function ThemeToggle() {
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light');
  const themeContext = useContext(ThemeContext);

  useEffect(() => {
    // Check user's preferred theme on component mount
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    setCurrentTheme(initialTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setCurrentTheme(newTheme);
    localStorage.setItem('theme', newTheme);

    // This is where you would toggle the theme in your ThemeContext
    // but this will depend on how you implement theme switching with styled-components
  };

  return (
    <ThemeToggleButton onClick={toggleTheme} aria-label={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} theme`}>
      {currentTheme === 'light' ? (
        <MoonIcon size={20} style={{ color: themeContext.gray[800] }} />
      ) : (
        <SunIcon size={20} style={{ color: 'black' }} />
      )}
    </ThemeToggleButton>
  );
}
