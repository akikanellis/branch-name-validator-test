import type { Config } from "jest";
import { pathsToModuleNameMapper } from "ts-jest";
import { compilerOptions } from "./tsconfig.base.json";

const config: Config = {
  collectCoverageFrom: ["**/src/**/*.ts"],
  coverageReporters: ["json", "html", "text"],
  resetMocks: true,
  testEnvironment: "node",
  testMatch: ["**/test/**/*.test.ts"],
  transform: { "^.+\\.ts$": "ts-jest" },
  verbose: true,
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths, {
      prefix: "<rootDir>../../../",
    }),
  },
};

export default config;
