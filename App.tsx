import React from 'react';
import {Platform, SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import Navigation from './src/navigation';

import {
  useFonts,
  Roboto_100Thin,
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';
import {ThemeProvider} from 'styled-components/native';
import {theme} from './src/styles/theme';

const isAndroid = Platform.OS == 'android' ? StatusBar.currentHeight : 0;

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_100Thin,
    Roboto_300Light,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  if (!fontsLoaded) return null;

  return (
    <SafeAreaView style={styles.container}>
      <ThemeProvider theme={theme}>
        <Navigation />
      </ThemeProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: isAndroid,
  },
});
