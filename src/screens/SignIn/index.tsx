import React from 'react';
import { Image } from 'react-native';
import * as Animatable from 'react-native-animatable';

import icLogo from '../../assets/images/ic_100.png';
import {
  HeaderImage,
  Container,
  ContainerForm,
  SignInButton,
  Label,
  ButtonRegister,
  TextBtnRegister,
  TextSignIn,
  Input,
  LabelError,
} from './styles';
import { useAuthentication } from '../../contexts/authentication.context';

export function SignIn() {
  const { onSignIn, error, isLoading } = useAuthentication();

  function handleSignIn() {
    onSignIn('admin@gmail.com', '102030');
  }

  return (
    <Container>
      <HeaderImage as={Animatable.View} animation="fadeInUp" duration={600}>
        <Image testID="imgLogo" source={icLogo} resizeMode="contain" />
      </HeaderImage>

      <ContainerForm as={Animatable.View} animation="fadeInDown">
        <Label testID="lblEmail">Email</Label>
        <Input placeholder="Digite seu email" />
        <Label testID="lblPassword">Senha</Label>
        <Input placeholder="Digite sua senha" />
        {error && <LabelError>{error?.errorMessage}</LabelError>}
        <SignInButton testID="btnSignIn" onPress={handleSignIn}>
          <TextSignIn testID="lblSignIn">Entrar</TextSignIn>
        </SignInButton>
        <ButtonRegister testID="btnRegister">
          <TextBtnRegister testID="lblRegister">
            Não possui uma conta? Cadastre-se
          </TextBtnRegister>
        </ButtonRegister>
      </ContainerForm>
    </Container>
  );
}
