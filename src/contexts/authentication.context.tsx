import React, { createContext, useContext, useState } from 'react';
import { IContext, IUser } from '../models';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const initialValue: IContext = {
  isAuthenticated: false,
  user: {
    isAuthenticated: false,
    name: '',
    email: '',
  },
  isLoading: false,
  error: '',
  onSignIn(email, password) {},
};

const AuthenticationContext = createContext(initialValue);
export const useAuthentication = () => useContext(AuthenticationContext);

type Props = {
  children: React.ReactNode;
};

export function AuthenticationProvider({ children }: Props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<IUser | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const auth = getAuth();

  function onSignIn(email: string, password: string) {
    setIsLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        setIsAuthenticated(true);
        // setUser(user);
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`${errorCode}-${errorMessage}`);
      });
  }

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        onSignIn,
        user,
      }}>
      {children}
    </AuthenticationContext.Provider>
  );
}
