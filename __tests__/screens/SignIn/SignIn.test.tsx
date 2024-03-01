import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react-native';
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

  test('Should test if there is a imgLogo with a image.', () => {});
  test('Should validate if email is empty.', () => {});
  test('Should validate if password is empty.', () => {});
  test('Should validate if SignIn worked.', () => {});
  test('Should test lblRegister title.', () => {});
  test('Should test lblError title.', () => {});
});
