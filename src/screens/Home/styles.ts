import { TextProps } from "react-native";
import styled, { css } from "styled-components/native";

interface TextType extends TextProps {
  isDisabled: boolean;
}

type DataProps = {
  id: string;
  name: string;
}

const StyledContainer = styled.View`
 flex: 1;
 align-items: center;
`

const Title = styled.Text`
text-align: center;
font-size: 25px;
font-family: ${({ theme }) => theme.FONTS.Rob_300};
`

const DisabledText = styled.Text<TextType>`
  color: ${({ theme, isDisabled }) => (isDisabled ? theme.colors.button.PRIMARY : theme.colors.button.SECONDARY)};
  font-size: 12px;
  font-family: bold;
`;

// const CustomFlat = styled(FlatList as new (props: FlatListProps<DataProps>) => FlatList<DataProps>)``;

export { Title, StyledContainer, DisabledText }