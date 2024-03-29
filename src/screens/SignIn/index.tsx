import React, { useState } from 'react';
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
import { Loading } from '../../components/Loading';

export function SignIn() {
  const [email, setEmail] = useState('admin@gmail.com');
  const [password, setPassword] = useState('102030');

  const { onSignIn, error, isLoading } = useAuthentication();

  function handleSignIn() {
    onSignIn(email, password);
  }

  return (
    <Container>
      <HeaderImage as={Animatable.View} animation="fadeInUp" duration={600}>
        <Image testID="imgLogo" source={icLogo} resizeMode="contain" />
      </HeaderImage>

      <ContainerForm as={Animatable.View} animation="fadeInDown">
        <Label testID="lblEmail">Email</Label>
        <Input
          placeholder="Digite seu email"
          onChangeText={setEmail}
          value={email}
        />

        <Label testID="lblPassword">Senha</Label>
        <Input
          placeholder="Digite sua senha"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />

        {error && <LabelError>{error?.errorMessage}</LabelError>}

        <SignInButton testID="btnSignIn" onPress={handleSignIn}>
          <TextSignIn testID="lblSignIn">Entrar</TextSignIn>
          {isLoading && <Loading />}
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
