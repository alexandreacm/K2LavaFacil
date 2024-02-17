import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Home} from '../screens/Home';
import {ScheduleWashing} from '../screens/ScheduleWashing';

const {Screen, Navigator} = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Navigator>
      <Screen name="Home" component={Home} />
      <Screen name="ScheduleWashing" component={ScheduleWashing} />
    </Navigator>
  );
};

export default AppNavigator;
