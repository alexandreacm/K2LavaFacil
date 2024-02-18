import React from 'react';
import {ThemeProvider as DefaultThemeProvider} from 'styled-components/native';
import defaultTheme from '../../styles/theme/default-theme';

type Props = {
  children: React.ReactNode;
};

export function ThemeProvider({children}: Props) {
  return (
    <DefaultThemeProvider theme={defaultTheme}>{children}</DefaultThemeProvider>
  );
}
