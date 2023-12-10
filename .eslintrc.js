module.exports = {
  root: true,

  env: {
    node: true,
    jest: true,
  },

  settings: {
    jest: {
      // Specifying the Jest version with `require` is needed because MegaLinter
      // does not have Jest installed. Also, linting for next line is disabled
      // because this is the recommended way to do it according to
      // eslint-plugin-jest.
      // eslint-disable-next-line
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
