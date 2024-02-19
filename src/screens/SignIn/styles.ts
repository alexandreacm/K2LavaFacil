import { View } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
    flex: 1;
    justify-content: space-between;
    background-color: ${({ theme }) => theme.COLORS.ui.PRIMARY_900};
`

const Label = styled.Text`
    font-size: 20px;
    margin-top: 28px;
`

const HeaderImage = styled(View)`
    flex: 1; 
    justify-content: center;
    align-items: center;
`

const ContainerForm = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.COLORS.ui.FORM};
    border-top-right-radius: 30px;
    border-top-left-radius: 30px;
    padding-left: 5%;
    padding-right: 5%;
`;

const ButtonRegister = styled.TouchableOpacity`
    margin-top: 14px;
    align-self: center;
`

const TextBtnRegister = styled.Text`
    color: ${({ theme }) => theme.COLORS.ui.SUB_TITLE}
`

const Input = styled.TextInput`
    width: 100%;
    height: 40px;
    border-bottom-width: 1px;
    font-size: 16px;
    margin-bottom: 16px;
`;

const SignInButton = styled.TouchableOpacity`
    width: 100%;
    padding: 15px;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.COLORS.ui.PRIMARY_900};
    margin-top: 14px;
    justify-content: center;
    align-items: center; 
`;

const TextSignIn = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: ${({ theme }) => theme.COLORS.ui.FORM};
`

const LabelError = styled.Text`
    font-size: 12px;
    color: ${({ theme }) => theme.COLORS.text.ERROR};
`;

export {
    Label,
    Container,
    HeaderImage,
    ContainerForm,
    SignInButton,
    ButtonRegister,
    TextBtnRegister,
    TextSignIn,
    Input,
    LabelError
}