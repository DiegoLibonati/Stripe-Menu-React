import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/tests/jest.setup.ts"],
  moduleNameMapper: {
    "\\.(css|scss)$": "<rootDir>/tests_mocks/styleMock.js",
    "\\.(png|jpe?g|gif|svg)$": "<rootDir>/tests_mocks/imageMock.js",
    "^@src/(.*)$": "<rootDir>/src/$1",
    "^@tests/(.*)$": "<rootDir>/tests/$1",
  },
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { tsconfig: "tsconfig.test.json" }],
  },
};

export default config;
