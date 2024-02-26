import { FlatList, FlatListProps, TextProps, ViewProps } from "react-native";
import styled, { css } from "styled-components/native";
import { IFormData } from "../../models";

interface TextType extends TextProps {
  isDisabled: boolean;
}
export interface TitleType extends TextProps {
  isFeatured?: boolean;
}
interface TextType extends TextProps {
  isDisabled: boolean;
}

interface TypeHome extends ViewProps {
  isPrimary?: boolean;
}
interface CardTitleType extends TextProps {
  isPrimaryColor?: boolean;
}

const Container = styled.ScrollView`
 flex: 1;
 background-color: ${({ theme }) => theme.COLORS.ui.PRIMARY_800};
 padding: 14px;
`

const ViewSignIn = styled.View`
 width: 100%;
 background-color: ${({ theme }) => theme.COLORS.ui.PRIMARY_800};
 padding: 10px;
`

interface ILabel {
  align: string
}

const Title = styled.Text<TitleType>`
text-align: left;
font-size: 18px;
font-family: ${({ theme }) => theme.FONTS.title};
${({ theme, isFeatured }) => css`
 color: ${isFeatured ? theme.COLORS.text.TITLE : theme.COLORS.text.BLACK}
`}
`

const Label = styled.Text<ILabel>`
width: 100%;
text-align: ${({ align }) => align ? align : 'left'};
font-size: 16px;
margin-bottom: 2px;
font-family: ${({ theme }) => theme.FONTS.large_title};
color: ${({ theme }) => theme.COLORS.ui.HOME_PRIMARY_900};
`;


const SubTitle = styled.Text`
text-align: left;
font-size: 20px;
padding-bottom: 20px;
font-family: ${({ theme }) => theme.FONTS.middle_title};
margin-top: 10px;
`

const DisabledText = styled.Text<TextType>`
  color: ${({ theme, isDisabled }) => (isDisabled ? theme.COLORS.button.PRIMARY : theme.COLORS.button.SECONDARY)};
  font-size: 12px;
  font-family: bold;
`;

const CardHome = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8
}) <TypeHome>`
  width: 100%;
  padding: 40px;
  margin-bottom: 15px;
  border-radius: 10px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme, isPrimary }) => (isPrimary ? theme.COLORS.ui.HOME_PRIMARY_900 : theme.COLORS.ui.PRIMARY_900)};
`

const ViewTopInfo = styled.View`
  padding-bottom: 50px;
  flex-direction: row;
  align-items: center;
`;

const ViewBottomInfo = styled.View`
   flex: 1;
`;

const CardTitle = styled.Text<CardTitleType>`
text-align: left;
margin-left: 10px;
font-size: 20px;
font-family: ${({ theme }) => theme.FONTS.title};
color: ${({ theme, isPrimaryColor }) => isPrimaryColor ? theme.COLORS.text.BLACK : theme.COLORS.text.WHITE};
`

const TextAll = styled.Text`
 font-size: 18px;
 font-family: ${({ theme }) => theme.FONTS.Rob_300};
 color: ${({ theme }) => theme.COLORS.ui.PRIMARY_600};
 font-weight: normal;
 `;

const TouchAllAppointments = styled.TouchableOpacity.attrs({
  activeOpacity: 0.9
})``;

const TextSchedule = styled.Text`
font-size: 16px;
font-family: ${({ theme }) => theme.FONTS.large_title};
color: ${({ theme }) => theme.COLORS.text.BLACK};
 `
const HelloText = styled.Text`
font-size: 25px;
font-family: ${({ theme }) => theme.FONTS.large_title};
color: ${({ theme }) => theme.COLORS.text.BLACK};
margin-left: 10px;
margin-right: 12px;
 `

const ViewLastSchedules = styled.View`
 flex-direction: row;
 justify-content: space-between;
 padding-top: 12px;
`

const AppointmentFlatList = styled(FlatList as new (props: FlatListProps<IFormData>) => FlatList<IFormData>)
  .attrs({
    contentContainerStyle: { marginTop: 15 }
  })``;

const ContainerLastAppointments = styled.View`
  flex: 1;
  margin-top: 16px;
  padding-bottom: 20px;
`;

export {
  Title,
  Container,
  DisabledText,
  SubTitle,
  ViewSignIn,
  CardHome,
  ViewTopInfo,
  ViewBottomInfo,
  CardTitle,
  TextAll,
  TextSchedule,
  ViewLastSchedules,
  HelloText,
  TouchAllAppointments,
  AppointmentFlatList,
  ContainerLastAppointments,
  Label
}