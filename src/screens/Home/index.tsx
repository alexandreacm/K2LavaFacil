import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
} from 'react';

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
import { containsKey, loadData } from '../../storage';
import { MaterialIcons, Ionicons, FontAwesome } from '@expo/vector-icons';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import CardAppointmentItem from '../../components/CardAppointmentItem';
import { formatCustomDate } from '../../utility/utils';
import { useIsFocused } from '@react-navigation/native';

export function Home({ navigation }: NativeStackHeaderProps) {
  const [user, setUser] = useState<IUser>();
  const isFocused = useIsFocused();

  const [appointmentData, setAppointmentsData] = useState<IFormData[]>([]);

  const onHandleCancelAppointment = useCallback(
    (vehiclePlate: string) => {
      const filteredAppointments = appointmentData.filter(
        item => item.vehiclePlate !== vehiclePlate,
      );

      setAppointmentsData([...filteredAppointments]);
    },
    [appointmentData],
  );

  const onHandleFinishAppointment = useCallback(
    (vehiclePlate: string) => {
      const editingSchedule: any = appointmentData.find(
        item => item.vehiclePlate == vehiclePlate,
      );

      editingSchedule.washingStatus = 'finished';

      setAppointmentsData([...appointmentData]);
    },
    [appointmentData],
  );

  useEffect(() => {
    // console.log(`Home useEffectI rendered ...`);

    async function loadLocalData() {
      const userStorage = await loadData(KEY_K2_LF);
      if (userStorage !== null) {
        // console.log(userStorage);
        setUser(userStorage);
      }
    }
    loadLocalData();
  }, []);

  useEffect(() => {
    // console.log(`Home useEffectII rendered ...`);

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
  }, [isFocused]);

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
                isEditable={false}
                onCancelAppointment={onHandleCancelAppointment}
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
