//import liraries
import React, { useState } from 'react';
import {
  Container,
  ContainerDataHour,
  CardAppointment,
  Text,
  Label,
  AppointmentFlatList,
  AppointmentStatus,
  LabelAppointmentStatus,
} from './styles';
import { IFormData } from '../../models';
import { KEY_K2_LF_DATA } from '../../constants';
import { containsKey, loadData, saveData } from '../../storage';
import { useFocusEffect } from '@react-navigation/native';

const Appointments = () => {
  const [appointmentData, setAppointmentsData] = useState<IFormData[]>([]);

  async function loadVehicleAppointments() {
    const isKeyTask = await containsKey(KEY_K2_LF_DATA);
    const vehiclesAppointments = await loadData(KEY_K2_LF_DATA);

    if (isKeyTask && vehiclesAppointments !== null) {
      console.log(vehiclesAppointments.length);
      setAppointmentsData(vehiclesAppointments);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      console.log('useEffect LOADING DATA..');
      loadVehicleAppointments();
    }, []),
  );

  const renderItem = ({ item }) => {
    return (
      <CardAppointment>
        <AppointmentStatus>
          <LabelAppointmentStatus>Aguardando</LabelAppointmentStatus>
        </AppointmentStatus>

        <Label>
          Lavagem carro placa <Text>{item.vehiclePlate}</Text>
        </Label>

        <ContainerDataHour>
          <Label>
            Data:{' '}
            <Text>
              {item.date} ás {item.hour}
            </Text>
          </Label>
        </ContainerDataHour>
      </CardAppointment>
    );
  };
  return (
    <Container>
      <AppointmentFlatList
        data={appointmentData}
        keyExtractor={item => item.vehiclePlate}
        renderItem={renderItem}
      />
    </Container>
  );
};

export default Appointments;
