//import liraries
import React, { useEffect, useState } from 'react';
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
import { containsKey, loadData } from '../../storage';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

const Appointments = () => {
  const [appointmentData, setAppointmentsData] = useState<IFormData[]>([]);

  useEffect(() => {
    async function loadVehicleAppointments() {
      const isKeyTask = await containsKey(KEY_K2_LF_DATA);
      const vehiclesAppointments = await loadData(KEY_K2_LF_DATA);

      if (isKeyTask && vehiclesAppointments !== null) {
        console.log(vehiclesAppointments.length);
        setAppointmentsData(vehiclesAppointments);
      }
    }

    loadVehicleAppointments();
  }, []);

  //   useFocusEffect(
  //     React.useCallback(() => {
  //       console.log('useEffect LOADING DATA..');
  //       loadVehicleAppointments();
  //     }, []),
  //   );

  const renderItem = ({ item }) => {
    return (
      <CardAppointment style={styles.border}>
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

        <ContainerDataHour>
          <Label>
            Tipo Lavagem: <Text>Simples / Carro</Text>
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

const styles = StyleSheet.create({
  border: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 6,
  },
});

export default Appointments;
