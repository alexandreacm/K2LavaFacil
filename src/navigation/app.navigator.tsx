import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Home} from '../screens/Home';
import {ScheduleWashing} from '../screens/ScheduleWashing';
import defaultTheme from '../styles/theme/default-theme';
import {View} from 'react-native';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="ScheduleWashing" component={ScheduleWashing} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
