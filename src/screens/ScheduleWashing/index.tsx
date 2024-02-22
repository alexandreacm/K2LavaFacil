import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
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
import { format, isEqual } from 'date-fns';

export function ScheduleWashing() {
  const [appointmentsData, setAppointmentsData] = useState<IFormData[]>([]);

  const [isWashTypeSelected, setIsWashTypeSelected] = useState(false);
  const [isTypeCarSelected, setIsTypeCarSelected] = useState(false);
  const [washType, setWashType] = useState('');
  const [typeVehicle, setTypeVehicle] = useState('');

  const mercosulPlateRegex = /^[A-Z]{3}[0-9]{1}[a-zA-Z]{1}[0-9]{2}$/;
  const regexPlacaMercosulMoto = /^[A-Z]{3}[0-9]{2}[a-zA-Z]{1}[0-9]{1}$/;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>();

  function onSelectWashType(type: string) {
    setIsWashTypeSelected(!isWashTypeSelected);
    setWashType(type);
  }

  function onSelectTypeVehicle(typeVehicle: string) {
    setIsTypeCarSelected(!isTypeCarSelected);
    setTypeVehicle(typeVehicle);
  }

  function validateVehicleWithSamePlate(data: IFormData): boolean {
    return Boolean(
      appointmentsData.find(
        vehiclePlate =>
          vehiclePlate.vehiclePlate.toUpperCase() ==
          data.vehiclePlate.toUpperCase(),
      ),
    );
  }

  function validationOfVehicleTime(data: IFormData) {
    const aux: string[] | undefined = data.date?.split('/');
    const formattedDate = `${aux[2]}-${aux[1]}-${aux[0]} ${data.hour}`;

    const date1 = new Date(formattedDate);

    let existAppointment = Boolean(
      appointmentsData.find(item => {
        const formattedDateItem = new Date(
          `${item.date?.split('/')[2]}-${item.date?.split('/')[1]}-${item.date?.split('/')[0]} ${item.hour}`,
        );

        return isEqual(date1, formattedDateItem);
      }),
    );

    // console.log(isEqual(date1, date2));
    // console.log(date1.getTime() === date2.getTime());

    return existAppointment;
  }

  const onSubmit = (data: IFormData) => {
    // console.log(data);
    data.vehicleType = typeVehicle;
    data.washingType = washType;
    data.washingStatus = 'awaiting';

    if (validateVehicleWithSamePlate(data)) {
      Alert.alert(
        'Novo Agendamento',
        'Agendamento não realizado porque já existe um veiculo cadastrado com esta placa!!',
      );
      return;
    }

    if (validationOfVehicleTime(data)) {
      Alert.alert(
        'Novo Agendamento',
        'Não são permitidas agendas para mesmo horário!!',
      );
      return;
    }

    setAppointmentsData([...appointmentsData, data]);

    Alert.alert('Novo Agendamento', 'Lavagem agendada com sucesso!!');
  };

  useEffect(() => {
    // deleteAllStorage();
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
      if (appointmentsData.length > 0) {
        await saveData(KEY_K2_LF_DATA, appointmentsData);
      }
    }

    saveVehicleAppointments();
  }, [appointmentsData]);

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
        {isWashTypeSelected ? (
          washTypes.map((item, idx) => {
            return (
              <PressableButton
                key={idx}
                onPressIn={() => onSelectWashType(item)}>
                <Title>{item}</Title>
              </PressableButton>
            );
          })
        ) : (
          <Input
            onPressIn={() => setIsWashTypeSelected(true)}
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
