import { pathsToModuleNameMapper } from "ts-jest";
import { compilerOptions } from "./tsconfig.json";

export default {
  bail: true,
  clearMocks: true,
  coverageProvider: "v8",
  moduleNameMapper: {
    "@modules/(.*)": "<rootDir>/src/modules/$1",
    "@config/(.*)": "<rootDir>/src/config/$1",
    "@shared/(.*)": "<rootDir>/src/shared/$1",
    "@utils/(.*)": "<rootDir>/src/utils/$1",
  },
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/*.spec.ts"],
};
