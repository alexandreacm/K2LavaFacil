import React, { createContext, useContext, useState } from 'react';
import { IUser } from '../models';

const AuthenticationContext = createContext({});

export const useAuthentication = () => useContext(AuthenticationContext);

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<IUser>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  function onSignIn() {
    let localUser: IUser = {
      isAuthenticated: false,
      name: 'Alexandre',
      email: 'teste@gmail.com',
    };

    setUser(localUser);
  }

  return (
    <AuthenticationContext.Provider
      value={{ isAuthenticated: !!user, onSignIn, user, isLoading, error }}>
      {children}
    </AuthenticationContext.Provider>
  );
}
