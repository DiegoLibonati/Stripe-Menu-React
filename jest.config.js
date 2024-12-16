module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/tests/jest.setup.ts"],
  moduleNameMapper: {
    "\\.(css|scss)$": "<rootDir>/src/tests/mocks/files/styleMock.js",
    "\\.(png|jpe?g|gif|svg)$": "<rootDir>/src/tests/mocks/assets/imageMock.js",
  },
};
