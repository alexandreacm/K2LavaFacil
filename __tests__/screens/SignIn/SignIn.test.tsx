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

describe('SIGN IN', () => {
  //   const tree = renderer.create(<SignIn />).toJSON();

  //   test('Should render a correctly component', () => {
  //     expect(tree).toMatchSnapshot();
  //   });

  test('Should render a correctly component with testing-library', () => {
    render(<SignIn />, { wrapper: ThemeProviderMock });
  });
});
