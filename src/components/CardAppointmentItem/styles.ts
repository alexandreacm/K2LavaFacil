import styled, { css } from "styled-components/native";
import defaultTheme from "../../styles/theme/default-theme";

interface IStatus {
  status: string;
}

interface IOperation {
  isCancel?: boolean;
}

const washingStatus: any = {
  awaiting: defaultTheme.COLORS.status.awaiting,
  cancel: defaultTheme.COLORS.status.cancel,
  finished: defaultTheme.COLORS.status.finish
};

const Text = styled.Text`
width: 100%;
text-align: left;
font-size: 16px;
font-family: ${({ theme }) => theme.FONTS.title};
color: ${({ theme }) => theme.COLORS.ui.HOME_PRIMARY_900};
`;

const Label = styled.Text`
width: 100%;
text-align: left;
font-size: 16px;
margin-bottom: 2px;
font-family: ${({ theme }) => theme.FONTS.large_title};
color: ${({ theme }) => theme.COLORS.ui.HOME_PRIMARY_900};
`;

const ContainerDataHour = styled.View`
  width: 100%;
  flex-direction: row;    
`;

const CardAppointment = styled.View`
  width: 100%;
  padding: 12px;
  justify-content: center;
  border-width: 1px;
  border-color: ${({ theme }) => theme.COLORS.ui.PRIMARY_500};
  background-color: ${({ theme }) => theme.COLORS.ui.SECONDARY_900};
  border-radius: 10px;
  margin-bottom: 12px;
`;


const AppointmentStatus = styled.View<IStatus>`
  width: 100px;
  padding: 4px;
  border-radius: 14px;
  justify-content: center;
  align-items:center;
  ${({ theme, status }) => css`
    background-color: ${status ? washingStatus[status] : theme.COLORS.status.awaiting};
  `}
  margin-bottom: 8px;
`;

const LabelAppointmentStatus = styled.Text`
width: 100%;
text-align: center;
font-size: 12px;
font-family: ${({ theme }) => theme.FONTS.title};
color: ${({ theme }) => theme.COLORS.text.WHITE};
`;


const LabelOperation = styled.Text<IOperation>`
width: 100%;
text-align: center;
font-size: 12px;
font-family: ${({ theme }) => theme.FONTS.title};
color: ${({ theme }) => theme.COLORS.text.WHITE};
`;

const OperationButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8
}) <IOperation>`
  width: 50%;
  padding: 8px;
  background: ${({ theme, isCancel }) => isCancel ? theme.COLORS.status.cancel : theme.COLORS.status.finish};
  border-radius: 10px;
  margin-left: 2px;
`;

const ContainerOperation = styled.View`
  width: 100%;
  flex-direction: row; 
  justify-content: space-between; 
  margin-top: 16px;  
`;

export {
  Text,
  Label,
  ContainerDataHour,
  CardAppointment,
  AppointmentStatus,
  LabelAppointmentStatus,
  OperationButton,
  LabelOperation,
  ContainerOperation
}