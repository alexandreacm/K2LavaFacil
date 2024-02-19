import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export const signInRequest = (email: string, password: string) => {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password);
};