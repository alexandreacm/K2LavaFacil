import React, { useEffect, useState } from 'react';
import { Container, AppointmentFlatList } from './styles';
import { IFormData } from '../../models';
import { KEY_K2_LF_DATA } from '../../constants';
import { containsKey, loadData, saveData } from '../../storage';
import CardAppointmentItem from '../../components/AppointmentList';
import { Alert } from 'react-native';

const Appointments = () => {
  const [appointmentData, setAppointmentsData] = useState<IFormData[]>([]);

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

  function onHandleFinishAppointment(vehiclePlate: string) {
    const editingSchedule: any = appointmentData.find(
      item => item.vehiclePlate == vehiclePlate,
    );

    editingSchedule.washingStatus = 'finished';

    setAppointmentsData([...appointmentData]);
  }

  useEffect(() => {
    async function loadVehicleAppointments() {
      const isKeyTask = await containsKey(KEY_K2_LF_DATA);
      const vehiclesAppointments = await loadData(KEY_K2_LF_DATA);

      if (isKeyTask && vehiclesAppointments !== null) {
        setAppointmentsData(vehiclesAppointments);
      }
    }

    loadVehicleAppointments();
  }, []);

  useEffect(() => {
    async function saveVehicleAppointments() {
      if (appointmentData.length > 0) {
        await saveData(KEY_K2_LF_DATA, appointmentData);
      }
    }

    saveVehicleAppointments();
  }, [appointmentData]);

  //   useFocusEffect(
  //     React.useCallback(() => {
  //       console.log('useEffect LOADING DATA..');
  //       loadVehicleAppointments();
  //     }, []),
  //   );

  return (
    <Container>
      <AppointmentFlatList
        data={appointmentData}
        keyExtractor={item => item.vehiclePlate}
        renderItem={({ item }) => (
          <CardAppointmentItem
            isEditable
            item={item}
            onCancelAppointment={onCancelAppointmentAlert}
            onFinishAppointment={onHandleFinishAppointment}
          />
        )}
      />
    </Container>
  );
};

export default Appointments;
