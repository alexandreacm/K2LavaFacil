import React from 'react';
import {ActivityIndicator} from 'react-native';
import {useTheme} from 'styled-components/native';
import {StyledContainer} from './styles';

export function Loading() {
  const {colors} = useTheme();
  return (
    <StyledContainer>
      <ActivityIndicator size={'large'} color={colors.ui.PRIMARY} />
    </StyledContainer>
  );
}
