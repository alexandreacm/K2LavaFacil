import styled, { css } from "styled-components/native";
import { TitleType } from "../Home/styles";
import { MaskedTextInput } from "react-native-mask-text";

interface InputType {
  width?: number;
  isMarginLeft?: boolean;
}

const Container = styled.ScrollView.attrs({
  contentContainerStyle: { alignItems: 'center' }
})`
 flex: 1;
 padding: 16px;
`
const ViewForm = styled.View`
   flex-direction: row;
   justify-content: space-between;
   align-items: center;
`;

const ButtonNewSchedule = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8
})`
  width: 100%;
  border-radius: 12px;
  padding: 20px;
  background-color: ${({ theme }) => theme.COLORS.ui.BUTTON};
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const LabelButtonNewSchedule = styled.Text`
text-align: left;
font-size: 18px;
font-family: ${({ theme }) => theme.FONTS.middle_title};
${({ theme }) => css`
 color: ${theme.COLORS.text.WHITE};
`}
`;

const LabelError = styled.Text`
width: 100%;
line-height: 20px;
text-align: left;
font-size: 16px;
font-family: ${({ theme }) => theme.FONTS.Rob_300};
${({ theme }) => css`
 color: ${theme.COLORS.text.ERROR};
`}
`

const InputMaskVehiclePlate = styled(MaskedTextInput)`
    width: 100%;
    height: 50px;
    border-bottom-width: 1px;
    font-size: 16px;
    margin-bottom: 16px;
    margin-left: 10px;
`;

const InputMaskDate = styled(MaskedTextInput)`
    width: 50%;
    height: 50px;
    border-bottom-width: 1px;
    font-size: 16px;
    margin-bottom: 16px;
    margin-left: 10px;
`;

const InputMaskHour = styled(MaskedTextInput)`
    width: 50%;
    height: 50px;
    border-bottom-width: 1px;
    font-size: 16px;
    margin-bottom: 16px;
    margin-left: 10px;
`;

export {
  Container,
  ViewForm,
  ButtonNewSchedule,
  LabelButtonNewSchedule,
  LabelError,
  InputMaskVehiclePlate,
  InputMaskDate,
  InputMaskHour
}