import React, { useEffect, useState } from 'react';
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
  LabelError,
} from './styles';
import { KEY_K2_LF_DATA, vehicleTypes, washTypes } from '../../constants';
import { Controller, useForm } from 'react-hook-form';
import { IFormData } from '../../models';
import { saveData, loadData, containsKey } from '../../storage';

export function ScheduleWashing() {
  const [isSelectionOn, setSelectionOn] = useState(false);
  const [listAppointments, setListAppointments] = useState<IFormData[]>([]);
  const [isTypeCarSelected, setIsTypeCarSelected] = useState(false);
  const [washType, setWashType] = useState('');
  const [typeVehicle, setTypeVehicle] = useState('');

  const regexPlaca = /^[A-Z]{3}[0-9]{4}$/;
  const mercosulPlateRegex = /^[A-Z]{3}[0-9]{1}[a-zA-Z]{1}[0-9]{2}$/;
  const regexPlacaMercosulMoto = /^[A-Z]{3}[0-9]{2}[a-zA-Z]{1}[0-9]{1}$/;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>();

  function handleSelectWashType(type: string) {
    setSelectionOn(!isSelectionOn);
    setWashType(type);
  }

  function onSelectTypeVehicle(typeVehicle: string) {
    setIsTypeCarSelected(!isTypeCarSelected);
    setTypeVehicle(typeVehicle);
  }

  const onSubmit = (data: IFormData) => {
    setListAppointments([...listAppointments, data]);
  };

  useEffect(() => {
    console.log('LOADING DATA..');
    async function loadVehicleAppointments() {
      const isKeyTask = await containsKey(KEY_K2_LF_DATA);
      const vehiclesAppointments = await loadData(KEY_K2_LF_DATA);

      if (isKeyTask && vehiclesAppointments !== null) {
        setListAppointments(vehiclesAppointments);
      }
    }

    loadVehicleAppointments();
  }, []);

  useEffect(() => {
    console.log('SAVE DATA..');

    async function saveVehicleAppointments() {
      if (listAppointments.length > 0) {
        await saveData(KEY_K2_LF_DATA, listAppointments);
      }
    }

    saveVehicleAppointments();
  }, [listAppointments]);

  return (
    <Container>
      <Controller
        control={control}
        rules={{
          required: true,
          pattern: mercosulPlateRegex,
        }}
        render={({ field: { onChange, value } }) => (
          <Input
            width={100}
            testID="vehiclePlate"
            placeholder="Informe sua placa"
            onChangeText={onChange}
            value={value}
          />
        )}
        name="vehiclePlate"
      />

      {errors.vehiclePlate && (
        <LabelError>
          {errors.vehiclePlate.type == 'pattern'
            ? 'Placa inválida'
            : 'Placa do veiculo é obrigatória.'}
        </LabelError>
      )}

      <ViewForm>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              width={50}
              testID="date"
              placeholder="Data"
              onChangeText={onChange}
              value={value}
            />
          )}
          name="date"
        />
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              isMarginLeft
              width={50}
              testID="hour"
              placeholder="Hora"
              onChangeText={onChange}
              value={value}
            />
          )}
          name="hour"
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

      <ButtonNewSchedule onPress={handleSubmit(onSubmit)}>
        <LabelButtonNewSchedule>Novo Agendamento</LabelButtonNewSchedule>
      </ButtonNewSchedule>
    </Container>
  );
}
