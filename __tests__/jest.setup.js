// include this line for mocking react-native-gesture-handler
// import 'react-native-gesture-handler/jestSetup';

import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

jest.useFakeTimers();

jest.mock('firebase/auth', () => ({
    getAuth: jest.fn(),
    signInWithEmailAndPassword: jest.fn()
}));

jest.mock('@react-navigation/native', () => ({
    useNavigation: () => {
        return {
            navigate: jest.fn(),
            goBack: jest.fn(),
        };
    },
}));