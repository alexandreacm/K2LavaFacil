import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  Container,
  Title,
  Label,
  SubTitle,
  CardTitle,
  CardHome,
  ViewTopInfo,
  ViewBottomInfo,
  TextAll,
  TextSchedule,
  ViewLastSchedules,
  HelloText,
  TouchAllAppointments,
  ContainerLastAppointments,
} from './styles';
import { IFormData, IUser } from '../../models';
import { KEY_K2_LF, KEY_K2_LF_DATA } from '../../constants';
import { containsKey, deleteStorage, loadData, saveData } from '../../storage';
import { MaterialIcons, Ionicons, FontAwesome } from '@expo/vector-icons';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import CardAppointmentItem from '../../components/CardAppointmentItem';
import { formatCustomDate } from '../../utility/utils';
import { Alert } from 'react-native';

export function Home({ navigation }: NativeStackHeaderProps) {
  const [user, setUser] = useState<IUser>();
  const [appointmentData, setAppointmentsData] = useState<IFormData[]>([]);

  useEffect(() => {
    // deleteStorage(KEY_K2_LF);
    async function loadLocalData() {
      const userStorage = await loadData(KEY_K2_LF);
      if (userStorage !== null) {
        setUser(userStorage);
      }
    }
    loadLocalData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      // console.log(`Home useFocusEffect rendered ...`);

      async function loadVehicleAppointments() {
        const isKeyTask = await containsKey(KEY_K2_LF_DATA);
        const vehiclesAppointments = await loadData(KEY_K2_LF_DATA);

        if (isKeyTask && vehiclesAppointments !== null) {
          let storageData: IFormData[] = vehiclesAppointments;

          let orderedData = storageData.sort(
            (itemA: IFormData, itemB: IFormData) => {
              return (
                new Date(`${formatCustomDate(itemA)}`).getTime() -
                new Date(`${formatCustomDate(itemB)}`).getTime()
              );
            },
          );

          setAppointmentsData(orderedData);
        }
      }

      loadVehicleAppointments();
    }, []),
  );

  useEffect(() => {
    async function saveVehicleAppointments() {
      if (appointmentData.length > 0) {
        await saveData(KEY_K2_LF_DATA, appointmentData);
      }
    }

    saveVehicleAppointments();
  }, [appointmentData]);

  const onHandleFinishAppointment = (vehiclePlate: string) => {
    const editingSchedule: any = appointmentData.find(
      item => item.vehiclePlate == vehiclePlate,
    );

    editingSchedule.washingStatus = 'finished';

    setAppointmentsData([...appointmentData]);
  };

  const onCancelAppointmentAlert = (vehiclePlate: string) =>
    Alert.alert(
      'Agendamento de lavagem',
      'Deseja realmente cancelar este agendamento?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => onHandleCancelAppointment(vehiclePlate) },
      ],
    );

  function onHandleCancelAppointment(vehiclePlate: string) {
    const filteredAppointments = appointmentData.filter(
      item => item.vehiclePlate !== vehiclePlate,
    );

    setAppointmentsData(filteredAppointments);
  }

  return (
    <Container>
      <ViewTopInfo>
        <FontAwesome name="user-circle-o" size={30} color="black" />
        <HelloText>Olá,</HelloText>
        <Title isFeatured>{user && user?.email} !!</Title>
      </ViewTopInfo>

      <SubTitle>Como podemos te ajudar?</SubTitle>

      <ViewBottomInfo>
        <CardHome
          isPrimary
          onPress={() => navigation.navigate('ScheduleWashing')}>
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
        <TouchAllAppointments
          onPress={() => navigation.navigate('Appointments')}>
          <TextAll>Ver todos</TextAll>
        </TouchAllAppointments>
      </ViewLastSchedules>

      <ContainerLastAppointments>
        {appointmentData &&
          appointmentData.map((item, idx) => {
            return (
              <CardAppointmentItem
                key={idx}
                isEditable={true}
                onCancelAppointment={onCancelAppointmentAlert}
                onFinishAppointment={onHandleFinishAppointment}
                item={item}
              />
            );
          })}

        {!appointmentData.length && (
          <Label align="center">Não há agendamentos</Label>
        )}
      </ContainerLastAppointments>
    </Container>
  );
}
