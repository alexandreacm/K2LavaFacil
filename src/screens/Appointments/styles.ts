import styled, { css } from "styled-components/native";
import { TitleType } from "../Home/styles";


const Container = styled.View`
 flex: 1;
 justify-content: center;
 padding: 8px;
 background-color: ${({ theme }) => theme.COLORS.ui.SECONDARY_900};
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

const AppointmentFlatList = styled.FlatList.attrs({
  contentContainerStyle: { marginTop: 15 }
})`
`;

const AppointmentStatus = styled.View`
  width: 100px;
  padding: 6px;
  border-radius: 16px;
  justify-content: center;
  align-items:center;
  background-color: ${({ theme }) => theme.COLORS.status.finish};
  margin-bottom: 8px;
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