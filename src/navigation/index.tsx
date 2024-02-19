import React, { useEffect, useState } from 'react';
import AppNavigator from './app.navigator';
import SplashScreen from 'react-native-splash-screen';
import AuthNavigator from './auth.navigator';
import { useAuthentication } from '../contexts/authentication.context';

function Navigation() {
  const { isAuthenticated, onSignIn } = useAuthentication();

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return !isAuthenticated ? <AuthNavigator /> : <AppNavigator />;
}

export default Navigation;
