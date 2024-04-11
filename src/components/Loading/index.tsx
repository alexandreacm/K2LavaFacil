import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components/native';
import { StyledContainer } from './styles';

export function Loading() {
  const { COLORS } = useTheme();
  return (
    <StyledContainer>
      <ActivityIndicator
        testID="indicator"
        size={'small'}
        color={COLORS.ui.SECONDARY_900}
      />
    </StyledContainer>
  );
}
