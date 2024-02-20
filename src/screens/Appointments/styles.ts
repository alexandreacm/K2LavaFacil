import styled, { css } from "styled-components/native";
import { TitleType } from "../Home/styles";


const Container = styled.View`
 flex: 1;
 justify-content: center;
 padding: 10px;
`
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
margin-top: 3px;
margin-bottom: 3px;
font-family: ${({ theme }) => theme.FONTS.large_title};
color: ${({ theme }) => theme.COLORS.ui.HOME_PRIMARY_900};
`;

const ContainerDataHour = styled.View`
  width: 100%;
  flex-direction: row;    
`;

const CardAppointment = styled.View`
  flex: 1;
  padding: 12px;
  justify-content: center;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.COLORS.ui.PRIMARY_500};
  border-bottom-color: ${({ theme }) => theme.COLORS.ui.PRIMARY_500};
`;
const AppointmentFlatList = styled.FlatList.attrs({
  contentContainerStyle: { marginTop: 15 }
})``;

const AppointmentStatus = styled.View`
  width: 100px;
  padding: 6px;
  border-radius: 16px;
  justify-content: center;
  align-items:center;
  background-color: ${({ theme }) => theme.COLORS.status.cancel};
`;

const LabelAppointmentStatus = styled.Text`
width: 100%;
text-align: center;
font-size: 14px;
font-family: ${({ theme }) => theme.FONTS.title};
color: ${({ theme }) => theme.COLORS.text.WHITE};
`;


export {
  Text,
  Container,
  Label,
  ContainerDataHour,
  CardAppointment,
  AppointmentFlatList,
  AppointmentStatus,
  LabelAppointmentStatus
}