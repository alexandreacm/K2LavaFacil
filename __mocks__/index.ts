const spyOnLog = jest.spyOn(console, 'log').mockReturnValue();
const spyOnWarn = jest.spyOn(console, 'warn').mockReturnValue();

const navigationMock = {
    navigate: jest.fn(),
    goBack: jest.fn(),
};

export const mocks = { navigationMock, spyOnLog, spyOnWarn }