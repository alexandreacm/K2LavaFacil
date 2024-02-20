import React, { useEffect, useState } from 'react';
import { Container, Text, Label, AppointmentFlatList } from './styles';
import { IFormData } from '../../models';
import { KEY_K2_LF_DATA } from '../../constants';
import { containsKey, loadData } from '../../storage';
import CardAppointmentItem from '../../components/AppointmentList';

const Appointments = () => {
  const [appointmentData, setAppointmentsData] = useState<IFormData[]>([]);

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
        renderItem={({ item }) => <CardAppointmentItem item={item} />}
      />
    </Container>
  );
};

export default Appointments;
