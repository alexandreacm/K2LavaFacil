import React from 'react';
import { ThemeProvider as DefaultThemeProvider } from 'styled-components/native';
import defaultTheme from '../../styles/theme/default-theme';

export type ThemeProviderProps = {
  children: React.ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <DefaultThemeProvider theme={defaultTheme}>{children}</DefaultThemeProvider>
  );
}
