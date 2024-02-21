import React from 'react';
import { StyleSheet } from 'react-native';
import {
  AppointmentStatus,
  LabelAppointmentStatus,
  CardAppointment,
  Label,
  Text,
  ContainerDataHour,
  OperationButton,
  LabelOperation,
  ContainerOperation,
} from './styles';
import { IFormData } from '../../models';

type FlatListProps = {
  item: IFormData;
};

const status: any = {
  awaiting: 'Aguardando',
  cancel: 'Cancelado',
  finished: 'Finalizado',
};

const CardAppointmentItem = ({ item }: FlatListProps) => {
  return (
    <CardAppointment style={styles.border}>
      <AppointmentStatus status={item.washingStatus}>
        <LabelAppointmentStatus>
          {status[item.washingStatus]}
        </LabelAppointmentStatus>
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
          Tipo Lavagem:{' '}
          <Text>
            {item.washingType} / {item.vehicleType}
          </Text>
        </Label>
      </ContainerDataHour>

      <ContainerOperation>
        <OperationButton isCancel>
          <LabelOperation isCancel>Cancelar</LabelOperation>
        </OperationButton>

        <OperationButton>
          <LabelOperation>Finalizar</LabelOperation>
        </OperationButton>
      </ContainerOperation>
    </CardAppointment>
  );
};

export default CardAppointmentItem;

const styles = StyleSheet.create({
  border: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
});
