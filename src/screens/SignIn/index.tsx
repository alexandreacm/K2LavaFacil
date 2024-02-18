import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import defaultTheme from '../../styles/theme/default-theme';

import icLogo from '../../assets/images/ic_100.png';
import {
  HeaderImage,
  Container,
  ContainerForm,
  SignInButton,
  Title,
} from './styles';

export function SignIn() {
  return (
    <Container>
      <HeaderImage as={Animatable.View} animation="fadeInUp" duration={600}>
        <Image source={icLogo} resizeMode="contain" />
      </HeaderImage>

      <ContainerForm as={Animatable.View} animation="fadeInDown">
        <Title>Email</Title>
        <TextInput style={styles.input} placeholder="Digite seu email" />

        <Title>Senha</Title>
        <TextInput style={styles.input} placeholder="Digite sua senha" />

        <SignInButton>
          <Text style={styles.buttonText}>Entrar</Text>
        </SignInButton>

        <TouchableOpacity style={styles.buttonRegister}>
          <Text style={styles.registerText}>
            Não possui uma conta? Cadastre-se
          </Text>
        </TouchableOpacity>
      </ContainerForm>
    </Container>
  );
}

const styles = StyleSheet.create({
  message: {
    fontSize: 28,
    fontWeight: 'bold',
    color: defaultTheme.COLORS.ui.FORM,
  },
  input: {
    width: '100%',
    height: 40,
    borderBottomWidth: 1,
    fontSize: 16,
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: defaultTheme.COLORS.ui.FORM,
  },
  buttonRegister: {
    marginTop: 14,
    alignSelf: 'center',
  },
  registerText: {
    color: defaultTheme.COLORS.ui.SUB_TITLE,
  },
});
