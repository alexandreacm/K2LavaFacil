import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '../screens/Home';
import { ScheduleWashing } from '../screens/ScheduleWashing';
import defaultTheme from '../styles/theme/default-theme';
import { View } from 'react-native';
import { useTheme } from 'styled-components/native';
import Appointments from '../screens/Appointments';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { COLORS } = useTheme();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ScheduleWashing"
        component={ScheduleWashing}
        options={{
          title: 'Agendar Lavagem',
          headerStyle: {
            backgroundColor: COLORS.ui.PRIMARY_900,
          },
          headerTintColor: COLORS.text.WHITE,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="Appointments"
        component={Appointments}
        options={{
          title: 'Últimos Agendamentos',
          headerStyle: {
            backgroundColor: COLORS.ui.PRIMARY_900,
          },
          headerTintColor: COLORS.text.WHITE,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
