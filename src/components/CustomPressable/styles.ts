import styled, { css } from "styled-components/native";
import { TitleType } from "../../screens/Home/styles";

interface InputType {
    width?: number;
    isMarginLeft?: boolean;
}

const PressableButton = styled.TouchableOpacity.attrs({
    activeOpacity: 0.8
})`
  width: 100px;
  height: 40px;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  border-radius: 50px;
  background-color: ${({ theme }) => theme.COLORS.ui.HOME_PRIMARY_800};
`;

const PressableContainer = styled.View`
   width: 100%;
   flex-direction: row;
   justify-content: left;
   margin-top: 12px;
   margin-bottom: 10px;
`;

const Title = styled.Text<TitleType>`
text-align: left;
font-size: 18px;
font-family: ${({ theme }) => theme.FONTS.title};
${({ theme, isFeatured }) => css`
 color: ${isFeatured ? theme.COLORS.text.TITLE : theme.COLORS.text.BLACK}
`}
`

const Input = styled.TextInput<InputType>`
    width: ${({ width }) => width ? `${width}%` : `100%`};
    height: 50px;
    border-bottom-width: 1px;
    font-size: 16px;
    margin-bottom: 16px;
    margin-left: ${({ isMarginLeft }) => isMarginLeft ? `10px` : `0px`};
`;

export { PressableButton, PressableContainer, Title, Input }