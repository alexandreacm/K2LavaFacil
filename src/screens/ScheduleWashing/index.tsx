import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import {
  Container,
  ViewForm,
  ButtonNewSchedule,
  LabelButtonNewSchedule,
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
import CustomPressable from '../../components/CustomPressable';

export function ScheduleWashing() {
  const [appointmentsData, setAppointmentsData] = useState<IFormData[]>([]);

  const [isWashTypeSelected, setIsWashTypeSelected] = useState(false);
  const [isTypeCarSelected, setIsTypeCarSelected] = useState(false);

  const [typeWash, setTypeWash] = useState('');
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
    setTypeWash(type);
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
    const currentFormattedDate = new Date(
      `${aux[2]}-${aux[1]}-${aux[0]} ${data.hour}`,
    );

    let existAppointment = Boolean(
      appointmentsData.find(item => {
        const formattedDateItem = new Date(
          `${item.date?.split('/')[2]}-${item.date?.split('/')[1]}-${item.date?.split('/')[0]} ${item.hour}`,
        );

        return isEqual(currentFormattedDate, formattedDateItem);
      }),
    );

    // console.log(isEqual(date1, date2));
    // console.log(date1.getTime() === date2.getTime());

    return existAppointment;
  }

  const onSubmit = (data: IFormData) => {
    // console.log(data);
    data.vehicleType = typeVehicle;
    data.washingType = typeWash;
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

      <CustomPressable
        data={washTypes}
        placeholder="Tipo de lavagem"
        isTypeSelected={isWashTypeSelected}
        onSelectType={onSelectWashType}
        setTypeSelected={setIsWashTypeSelected}
        washType={typeWash}
      />

      <CustomPressable
        data={vehicleTypes}
        placeholder="Tipo de veiculo"
        isTypeSelected={isTypeCarSelected}
        onSelectType={onSelectTypeVehicle}
        setTypeSelected={setIsTypeCarSelected}
        washType={typeVehicle}
      />

      <ButtonNewSchedule onPress={handleSubmit(onSubmit)}>
        <LabelButtonNewSchedule>Novo Agendamento</LabelButtonNewSchedule>
      </ButtonNewSchedule>
    </Container>
  );
}
