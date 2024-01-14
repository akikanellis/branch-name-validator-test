import type { Config } from "jest";

export default {
  collectCoverageFrom: ["src/**/*.ts"],
  coverageReporters: ["json", "html", "text"],
  resetMocks: true,
  testEnvironment: "node",
  testMatch: ["**/test/**/*.test.ts"],
  transform: { "^.+\\.ts$": "ts-jest" },
  verbose: true,
} as Config;
