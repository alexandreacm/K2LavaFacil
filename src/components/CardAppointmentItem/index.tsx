import React, { memo } from 'react';
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

type Props = {
  item: IFormData;
  onCancelAppointment: (vehiclePlate: string) => void;
  onFinishAppointment: (vehiclePlate: string) => void;
  isEditable: boolean;
};

const status: any = {
  awaiting: 'Aguardando',
  cancel: 'Cancelado',
  finished: 'Finalizado',
};

const CardAppointmentItem = ({
  item,
  onCancelAppointment,
  onFinishAppointment,
  isEditable,
}: Props) => {
  const isFinishedAppointment = item.washingStatus == 'finished';

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

      {isEditable && !isFinishedAppointment && (
        <ContainerOperation>
          <OperationButton
            disabled={isFinishedAppointment}
            isCancel
            onPress={() => onCancelAppointment(item.vehiclePlate)}>
            <LabelOperation isCancel>Cancelar</LabelOperation>
          </OperationButton>

          <OperationButton
            disabled={isFinishedAppointment}
            onPress={() => onFinishAppointment(item.vehiclePlate)}>
            <LabelOperation>Finalizar</LabelOperation>
          </OperationButton>
        </ContainerOperation>
      )}
    </CardAppointment>
  );
};

const styles = StyleSheet.create({
  border: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
});

export default memo(CardAppointmentItem);
