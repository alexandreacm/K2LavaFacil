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
  InputMaskVehiclePlate,
  InputMaskDate,
  InputMaskHour,
} from './styles';
import { KEY_K2_LF_DATA, vehicleTypes, washTypes } from '../../constants';
import { Controller, useForm } from 'react-hook-form';
import { IFormData } from '../../models';
import {
  saveData,
  loadData,
  containsKey,
  deleteAllStorage,
} from '../../storage';
import { useNavigation } from '@react-navigation/native';

export function ScheduleWashing() {
  const [isSelectionOn, setSelectionOn] = useState(false);
  const [appointmentData, setAppointmentsData] = useState<IFormData[]>([]);

  const [isTypeCarSelected, setIsTypeCarSelected] = useState(false);
  const [washType, setWashType] = useState('');
  const [typeVehicle, setTypeVehicle] = useState('');
  const { goBack } = useNavigation();

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
    // console.log(data);

    data.vehicleType = typeVehicle;
    data.washingType = washType;
    data.washingStatus = 'awaiting';

    setAppointmentsData([...appointmentData, data]);
  };

  useEffect(() => {
    // deleteAllStorage();
    console.log('useEffect LOAD..');

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
    console.log('useEffect SAVE..');

    async function saveVehicleAppointments() {
      if (appointmentData.length > 0) {
        await saveData(KEY_K2_LF_DATA, appointmentData);
      }
    }

    saveVehicleAppointments();
  }, [appointmentData]);

  return (
    <Container>
      <Controller
        name="vehiclePlate"
        control={control}
        rules={{
          required: true,
          pattern: mercosulPlateRegex,
        }}
        render={({ field: { onChange, value } }) => (
          <InputMaskVehiclePlate
            mask="AAA9A99"
            testID="vehiclePlate"
            placeholder="Informe sua placa"
            onChangeText={onChange}
            value={value}
          />
        )}
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
            <InputMaskDate
              testID="date"
              mask="99/99/9999"
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
            <InputMaskHour
              testID="hour"
              mask="99:99"
              placeholder="Hora"
              onChangeText={rawText => onChange(rawText)}
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
