import React, { useState, useEffect } from 'react';
import {
  Container,
  Title,
  SubTitle,
  CardTitle,
  CardHome,
  ViewTopInfo,
  ViewBottomInfo,
  TextAll,
  TextSchedule,
  ViewLastSchedules,
  HelloText,
} from './styles';
import { IUser } from '../../models';
import { KEY_K2_LF } from '../../constants';
import { loadData } from '../../storage';
import { MaterialIcons, Ionicons, FontAwesome } from '@expo/vector-icons';
import { Text } from 'react-native';

export function Home() {
  const [user, setUser] = useState<IUser>();

  useEffect(() => {
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
    <Container>
      <ViewTopInfo>
        <FontAwesome name="user-circle-o" size={30} color="black" />
        <HelloText>Olá,</HelloText>
        <Title isFeatured>{user && user?.email} !!</Title>
      </ViewTopInfo>

      <SubTitle>Como podemos te ajudar?</SubTitle>

      <ViewBottomInfo>
        <CardHome isPrimary>
          <MaterialIcons name="local-car-wash" size={30} color="white" />
          <CardTitle>Agendar uma lavagem</CardTitle>
          <MaterialIcons name="keyboard-arrow-right" size={30} color="white" />
        </CardHome>

        <CardHome>
          <Ionicons name="flash-outline" size={30} color="white" />
          <CardTitle>Pedir lavagem agora</CardTitle>
          <MaterialIcons name="keyboard-arrow-right" size={30} color="white" />
        </CardHome>
      </ViewBottomInfo>

      <ViewLastSchedules>
        <TextSchedule>Últimos Agendamentos</TextSchedule>
        <TextAll>Ver todas</TextAll>
      </ViewLastSchedules>
    </Container>
  );
}
