import type { Configuration } from "webpack";
import * as path from "node:path";
// @ts-expect-error: This is only complaining on the editor, using webpack works
// as expected.
import LicensePlugin from "webpack-license-plugin";
import TerserPlugin from "terser-webpack-plugin";
import { TsconfigPathsPlugin } from "tsconfig-paths-webpack-plugin";

const tsconfigFile = path.resolve(process.cwd(), "tsconfig.build.json");

const config: Configuration = {
  entry: "./src/index.ts",
  target: "node",
  mode: "production",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true,
          configFile: tsconfigFile,
        },
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js", ".json"],
    plugins: [new TsconfigPathsPlugin({ configFile: tsconfigFile })],
  },
  output: {
    path: path.resolve(process.cwd(), "bundle"),
    filename: "index.js",
  },
  optimization: {
    minimize: true,
    usedExports: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: { format: { comments: false } },
        extractComments: false,
      }),
    ],
  },
  plugins: [new LicensePlugin({ outputFilename: "licenses.json" })],
};

export default config;
