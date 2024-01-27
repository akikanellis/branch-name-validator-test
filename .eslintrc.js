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

  extends: ["eslint:recommended", "prettier"],

  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },

  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      extends: [
        "plugin:@typescript-eslint/recommended-type-checked",
        "plugin:@typescript-eslint/stylistic-type-checked",
      ],
      plugins: ["@typescript-eslint"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: ["tsconfig.lint.json", "packages/*/*/tsconfig.lint.json"],
      },
    },
    {
      files: ["test/**"],
      extends: ["plugin:jest/recommended", "plugin:jest/style"],
      plugins: ["jest"],
    },
    {
      files: ["*.json"],
      extends: ["plugin:jsonc/recommended-with-json", "plugin:jsonc/prettier"],
      parser: "jsonc-eslint-parser",
    },
    {
      files: ["*.json5"],
      extends: ["plugin:jsonc/recommended-with-json5", "plugin:jsonc/prettier"],
      parser: "jsonc-eslint-parser",
    },
    {
      files: ["*.jsonc"],
      extends: ["plugin:jsonc/recommended-with-jsonc", "plugin:jsonc/prettier"],
      parser: "jsonc-eslint-parser",
    },
  ],
};
