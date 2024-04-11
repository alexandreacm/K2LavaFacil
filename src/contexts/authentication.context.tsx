import React, { createContext, useContext, useState } from 'react';
import { IContext, IError, IUser } from '../models';
import { signInRequest } from '../services/authentication.service';
import { saveData } from '../storage';
import { KEY_K2_LF } from '../constants';

const initialValue: IContext = {
  isAuthenticated: false,
  user: {
    displayName: '',
    email: '',
  },
  isLoading: false,
  error: { errorCode: 0, errorMessage: '' },
  onSignIn: () => {},
};

const AuthenticationContext = createContext(initialValue);
export const useAuthentication = () => useContext(AuthenticationContext);

type Props = {
  children: React.ReactNode;
};

export function AuthenticationProvider({ children }: Props) {
  const [user, setUser] = useState<IUser | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<IError | undefined>();

  function onSignIn(email: string, password: string) {
    setIsLoading(true);

    signInRequest(email, password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        saveData(KEY_K2_LF, user);

        setUser(user);
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
        const errorCode = err.code;
        const errorMessage = err.message;
        setError({
          errorCode,
          errorMessage,
        });
        setIsLoading(false);
        // console.log(`${errorCode}-${errorMessage}`);
      });
  }

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!user,
        isLoading,
        onSignIn,
        user,
        error,
      }}>
      {children}
    </AuthenticationContext.Provider>
  );
}
