import React, { useState } from 'react';
import {
  Container,
  Input,
  Label,
  Title,
  ViewForm,
  PressableButton,
  PressableContainer,
  ButtonNewSchedule,
  LabelButtonNewSchedule,
  PressableVehicle,
} from './styles';
import { vehicleTypes, washTypes } from '../../constants';

export function ScheduleWashing() {
  const [isSelectionOn, setSelectionOn] = useState(false);
  const [isTypeCarSelected, setIsTypeCarSelected] = useState(false);
  const [washType, setWashType] = useState('');
  const [typeVehicle, setTypeVehicle] = useState('');

  function handleSelectWashType(type: string) {
    setSelectionOn(!isSelectionOn);
    setWashType(type);
  }

  function onSelectTypeVehicle(typeVehicle: string) {
    setIsTypeCarSelected(!isTypeCarSelected);
    setTypeVehicle(typeVehicle);
  }

  return (
    <Container>
      <Input width={100} testID="input_placa" placeholder="Informe sua placa" />

      <ViewForm>
        <Input width={50} testID="input_placa" placeholder="Data" />
        <Input
          isMarginLeft
          width={50}
          testID="input_placa"
          placeholder="Hora"
        />
      </ViewForm>

      <PressableContainer>
        {isSelectionOn ? (
          washTypes.map((item, idx) => {
            return (
              <PressableButton
                key={idx}
                onPressIn={() => handleSelectWashType(item)}>
                <Title>{item}</Title>
              </PressableButton>
            );
          })
        ) : (
          <Input
            onPressIn={() => setSelectionOn(true)}
            placeholder="Tipo de lavagem"
            placeholderTextColor={'rgba(0,0,0,0.4)'}
            onChangeText={setWashType}
            value={washType}
          />
        )}
      </PressableContainer>

      <PressableContainer>
        {isTypeCarSelected ? (
          vehicleTypes.map((typeVehicle, idx) => {
            return (
              <PressableVehicle
                key={idx}
                onPressIn={() => onSelectTypeVehicle(typeVehicle)}>
                <Title>{typeVehicle}</Title>
              </PressableVehicle>
            );
          })
        ) : (
          <Input
            onPressIn={() => setIsTypeCarSelected(!isTypeCarSelected)}
            placeholder="Tipo de veiculo"
            placeholderTextColor={'rgba(0,0,0,0.4)'}
            onChangeText={setTypeVehicle}
            value={typeVehicle}
          />
        )}
      </PressableContainer>

      <ButtonNewSchedule>
        <LabelButtonNewSchedule>Novo Agendamento</LabelButtonNewSchedule>
      </ButtonNewSchedule>
    </Container>
  );
}
