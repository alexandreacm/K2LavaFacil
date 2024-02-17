import React from 'react';
import {ThemeProvider as DefaultThemeProvider} from 'styled-components/native';
import {theme} from '../../styles/theme';

type Props = {
  children: React.ReactNode;
};

export function ThemeProvider({children}: Props) {
  return <DefaultThemeProvider theme={theme}>{children}</DefaultThemeProvider>;
}
