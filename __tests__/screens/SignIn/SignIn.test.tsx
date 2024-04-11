import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react-native';
import { SignIn } from '../../../src/screens/SignIn';
import {
  ThemeProvider,
  ThemeProviderProps,
} from '../../../src/components/ThemeProvider';

const ThemeProviderMock = ({ children }: ThemeProviderProps) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

describe('SIGN_IN', () => {
  //   const tree = renderer.create(<SignIn />).toJSON();

  //   test('Should render a correctly component', () => {
  //     expect(tree).toMatchSnapshot();
  //   });

  test('Should render a correctly component with testing-library', () => {
    render(<SignIn />, { wrapper: ThemeProviderMock });
  });

  test('Should test if there is a imgLogo with a image.', () => {
    const { getByTestId } = render(<SignIn />, { wrapper: ThemeProviderMock });

    expect(getByTestId('imgLogo')).toBeTruthy();
  });

  test('Should validate if email is empty.', () => {
    const { getByTestId } = render(<SignIn />, {
      wrapper: ThemeProviderMock,
    });

    const btnSignIn = getByTestId('btnSignIn');
    fireEvent.press(btnSignIn);

    const labelError = getByTestId('lblError');
    expect(labelError).not.toBe(null);
  });

  test('Should validate if email/password is empty and have a message error', () => {
    const { getByTestId, getByText } = render(<SignIn />, {
      wrapper: ThemeProviderMock,
    });

    let errorMessage = 'É necessário preencher os campos email/senha';

    // const inputMail = getByPlaceholderText('Digite seu email');
    const btnSignIn = getByTestId('btnSignIn');
    fireEvent.press(btnSignIn);

    const labelError = getByText(errorMessage);

    expect(labelError).toBeTruthy();
  });

  test('Should validate if SignIn worked.', () => {});

  test('Should test lblRegister title.', () => {
    const { getByTestId } = render(<SignIn />, {
      wrapper: ThemeProviderMock,
    });

    const lblRegister = getByTestId('lblRegister');
    expect(lblRegister.children[0]).toEqual(
      'Não possui uma conta? Cadastre-se',
    );
  });

  test('Should test if a firebase request worked.', () => {});
});
