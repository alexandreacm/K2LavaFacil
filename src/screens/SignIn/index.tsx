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
} from './styles';
import { useAuthentication } from '../../contexts/authentication.context';

export function SignIn() {
  const { isAuthenticated, onSignIn, user } = useAuthentication();

  console.log(user);

  function handleSignIn() {
    onSignIn();
  }
  return (
    <Container>
      <HeaderImage as={Animatable.View} animation="fadeInUp" duration={600}>
        <Image source={icLogo} resizeMode="contain" />
      </HeaderImage>

      <ContainerForm as={Animatable.View} animation="fadeInDown">
        <Label>Email</Label>
        <Input placeholder="Digite seu email" />

        <Label>Senha</Label>
        <Input placeholder="Digite sua senha" />

        <SignInButton onPress={handleSignIn}>
          <TextSignIn>Entrar</TextSignIn>
        </SignInButton>

        <ButtonRegister>
          <TextBtnRegister>Não possui uma conta? Cadastre-se</TextBtnRegister>
        </ButtonRegister>
      </ContainerForm>
    </Container>
  );
}
