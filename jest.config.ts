import type { Config } from "jest";
import nxPreset from "@nx/jest/preset";

export default {
  ...nxPreset,
  collectCoverageFrom: ["src/**/*.ts"],
  coverageReporters: ["json", "html", "text"],
  displayName: "branch-name-validator-test",
  resetMocks: true,
  testEnvironment: "node",
  testMatch: ["**/test/**/*.test.ts"],
  transform: { "^.+\\.ts$": "ts-jest" },
  verbose: true
} as Config;
