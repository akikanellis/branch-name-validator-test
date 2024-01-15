import type { Config } from "jest";

const config: Config = {
  collectCoverageFrom: ["**/src/**/*.ts"],
  coverageReporters: ["json", "html", "text"],
  resetMocks: true,
  testEnvironment: "node",
  testMatch: ["**/test/**/*.test.ts"],
  transform: { "^.+\\.tsx?$": "ts-jest" },
  verbose: true,
};

export default config;
