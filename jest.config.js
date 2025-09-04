module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/tests/jest.setup.ts"],
  moduleNameMapper: {
    "\\.(css|scss)$": "<rootDir>/tests_mocks/styleMock.js",
    "\\.(png|jpe?g|gif|svg)$": "<rootDir>/tests_mocks/imageMock.js",
  },
};
