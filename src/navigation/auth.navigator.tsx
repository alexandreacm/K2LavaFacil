import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {SignIn} from '../screens/SignIn';

const {Screen, Navigator} = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Navigator>
      <Screen
        options={{
          headerShown: false,
        }}
        name="SignIn"
        component={SignIn}
      />
    </Navigator>
  );
};

export default AuthNavigator;
