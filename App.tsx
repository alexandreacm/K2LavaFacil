import React from 'react';
import { StyleSheet } from 'react-native';
import Navigation from './src/navigation';
import { ThemeProvider } from './src/components/ThemeProvider';

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
import { SafeArea } from './src/utility/safe-area';

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
    <SafeArea style={styles.container}>
      <ThemeProvider>
        <AuthenticationProvider>
          <Navigation />
        </AuthenticationProvider>
      </ThemeProvider>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
