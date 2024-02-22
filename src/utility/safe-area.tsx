import { SafeAreaView, StatusBar } from 'react-native';
import styled from 'styled-components/native';

export const SafeArea = styled(SafeAreaView)`
  flex: 1;
  ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`};
`;

// const isAndroid = Platform.OS == 'android' ? StatusBar.currentHeight : 0;
