import React from 'react';
import { Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import Navigation from './src/navigation';
import { ThemeProvider } from './src/components/ThemeProvider';
import { NavigationContainer } from '@react-navigation/native';

import {
  useFonts,
  Roboto_100Thin,
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';
import { AuthenticationProvider } from './src/contexts/authentication.context';
import { initializeApp, getApps } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const isAndroid = Platform.OS == 'android' ? StatusBar.currentHeight : 0;

const firebaseConfig = {
  apiKey: 'AIzaSyA_JLSVtFxJG51n4yD2Sy8bvpck_ZVsvwE',
  authDomain: 'k2lavafacil.firebaseapp.com',
  projectId: 'k2lavafacil',
  storageBucket: 'k2lavafacil.appspot.com',
  messagingSenderId: '103632625342',
  appId: '1:103632625342:web:21c25f2171a31cfdd748ef',
};

if (!getApps().length) {
  const app = initializeApp(firebaseConfig);
  initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
}

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
      <ThemeProvider>
        <AuthenticationProvider>
          <NavigationContainer>
            <Navigation />
          </NavigationContainer>
        </AuthenticationProvider>
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
