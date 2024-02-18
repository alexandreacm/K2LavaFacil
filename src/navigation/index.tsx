import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './app.navigator';
import SplashScreen from 'react-native-splash-screen';
import AuthNavigator from './auth.navigator';

function Navigation() {
  const [user, setUser] = useState<boolean>(true);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  );
}

export default Navigation;
