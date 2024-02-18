import { View } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
 flex: 1;
 justify-content: space-between;
 background-color: ${({ theme }) => theme.COLORS.ui.PRIMARY_900}
`

const Title = styled.Text`
font-size: 20px;
margin-top: 28px;
`

const HeaderImage = styled(View)`
flex: 1; 
justify-content: center;
align-items: center;
`

const SignInButton = styled.TouchableOpacity`
width: 100%;
padding: 15px;
border-radius: 10px;
background-color: ${({ theme }) => theme.COLORS.ui.PRIMARY_900};
margin-top: 14px;
justify-content: center;
align-items: center; 
`;

const ContainerForm = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.COLORS.ui.FORM};
    border-top-right-radius: 30px;
    border-top-left-radius: 30px;
    padding-left: 5%;
    padding-right: 5%;
`;

export { Title, Container, HeaderImage, ContainerForm, SignInButton }