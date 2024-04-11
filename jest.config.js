module.exports = {
    preset: 'react-native',
    setupFiles: ['<rootDir>/__tests__/jest.setup.js'],
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
    testMatch: ['**/__tests__/**/*.(test|spec).(ts|tsx|js)'],
    testPathIgnorePatterns: [
        './node_modules',
        './android',
        './ios',
        '<rootDir>/__tests__/jest.setup.js',
    ],
    transformIgnorePatterns: [
        'node_modules/(?!(jest-)?@?react-native|@react-native-community|@react-navigation)',
    ],
}