import React, { useEffect, useState } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';

import AppNavigator from './app.navigator';
import AuthNavigator from './auth.navigator';

import { useAuthentication } from '../contexts/authentication.context';
import { IUser } from '../models';
import { loadData } from '../storage';
import { KEY_K2_LF } from '../constants';

function Navigation() {
  const { isAuthenticated } = useAuthentication();
  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    SplashScreen.hide();
    async function loadLocalData() {
      const userStorage = await loadData(KEY_K2_LF);
      if (userStorage !== null) {
        // console.log(userStorage);
        setUser(userStorage);
      }
    }
    loadLocalData();
  }, []);

  return (
    <NavigationContainer>
      {isAuthenticated || user ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

export default Navigation;
