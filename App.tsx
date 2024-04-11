import React from 'react';
import Navigation from './src/navigation';
import { ThemeProvider } from './src/components/ThemeProvider';

import { AuthenticationProvider } from './src/contexts/authentication.context';
import { initializeApp, getApps } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { SafeArea } from './src/utility/safe-area';
import useGoogleFonts from './src/hooks/useGoogleFonts';

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
  const fontsLoaded = useGoogleFonts();

  if (!fontsLoaded) return null;

  return (
    <SafeArea>
      <ThemeProvider>
        <AuthenticationProvider>
          <Navigation />
        </AuthenticationProvider>
      </ThemeProvider>
    </SafeArea>
  );
}
