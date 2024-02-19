export interface IUser {
    isAuthenticated: boolean;
    name: string;
    email: string;
}
export interface IContext {
    isAuthenticated: boolean
    user?: IUser
    isLoading: boolean;
    error?: string,
    onSignIn: (email: string, password: string) => void
}