import React, { useEffect, useState } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';

import AppNavigator from './app.navigator';
import AuthNavigator from './auth.navigator';

import { useAuthentication } from '../contexts/authentication.context';

function Navigation() {
  const { isAuthenticated, onSignIn } = useAuthentication();

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      {!isAuthenticated ? <AuthNavigator /> : <AppNavigator />}
    </NavigationContainer>
  );
}

export default Navigation;
