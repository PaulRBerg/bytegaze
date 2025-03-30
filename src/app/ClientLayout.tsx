'use client';

import React, { ReactNode } from 'react';
import { ThemeProviderWrapper } from './ThemeContext';
import { GlobalStyles } from './GlobalStyles';

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProviderWrapper>
      <GlobalStyles />
      {children}
    </ThemeProviderWrapper>
  );
}
