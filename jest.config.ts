import type { Config } from "jest";
import baseConfig from "./jest.config.base";

const config: Config = {
  ...baseConfig,
  projects: ["<rootDir>/packages/*/*"],
};

export default config;
