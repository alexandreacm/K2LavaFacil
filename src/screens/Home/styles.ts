import { TextProps } from "react-native";
import styled, { css } from "styled-components/native";

interface TextType extends TextProps {
  isDisabled: boolean;
}

const StyledContainer = styled.View`
 flex: 1;
 justify-content: center;
 align-items: center;
`

const Title = styled.Text`
text-align: center;
font-size: 25px;
font-family: ${({ theme }) => theme.fonts.normal_title};
`

const DisabledText = styled.Text<TextType>`
  color: ${({ theme, isDisabled }) => (isDisabled ? theme.colors.button.PRIMARY : theme.colors.button.SECONDARY)};
  font-size: 12px;
  font-family: bold;
`;

export { Title, StyledContainer, DisabledText }