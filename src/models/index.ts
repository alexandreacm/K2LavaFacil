export interface IUser {
    displayName: string | null;
    email: string | null;
}
export interface IError {
    errorCode: number;
    errorMessage: string;
}
export interface IContext {
    isAuthenticated: boolean
    user?: IUser
    isLoading: boolean;
    error?: IError,
    onSignIn: (email: string, password: string) => void
}

export interface IFormData {
    vehiclePlate: string;
    date?: string;
    hour?: string;
    washingType?: string;
    vehicleType?: string;
    washingStatus?: string;
}