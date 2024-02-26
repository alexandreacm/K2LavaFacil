import styled, { css } from "styled-components/native";
import { FlatList, FlatListProps } from "react-native";
import { IFormData } from "../../models";


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


const AppointmentFlatList = styled(FlatList as new (props: FlatListProps<IFormData>) => FlatList<IFormData>)
  .attrs({
    contentContainerStyle: { marginTop: 15, paddingBottom: 20 }
  })``;


export {
  Text,
  Container,
  Label,
  AppointmentFlatList,
}