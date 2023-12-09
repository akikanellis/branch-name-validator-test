module.exports = {
  root: true,

  env: {
    node: true,
    jest: true,
  },

  settings: {
    jest: {
      // This is needed because MegaLinter does not have Jest installed
      version: require("jest/package.json").version,
    },
  },

  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "prettier",
  ],

  parser: "@typescript-eslint/parser",

  parserOptions: {
    project: "tsconfig.json",
    ecmaVersion: "latest",
    sourceType: "module",
  },

  plugins: ["@typescript-eslint"],

  overrides: [
    {
      files: ["test/**"],
      plugins: ["jest"],
      extends: ["plugin:jest/recommended", "plugin:jest/style"],
    },
  ],
};
