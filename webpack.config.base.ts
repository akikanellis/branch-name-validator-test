import type { Configuration } from "webpack";
import * as path from "node:path";
// @ts-expect-error: This is only complaining on the editor, using webpack works
// as expected.
import LicensePlugin from "webpack-license-plugin";
import TerserPlugin from "terser-webpack-plugin";

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
          // TODO This is needed due to `rootDir` not including all files
          transpileOnly: true,
          configFile: path.resolve(process.cwd(), "tsconfig.build.json"),
        },
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js", ".json"],
  },
  output: {
    path: path.resolve(process.cwd(), "bundle"),
    filename: "index.js",
  },
  optimization: {
    minimize: true,
    usedExports: true,
    minimizer: [
      // We use the LicensePlugin to bundle the licenses
      new TerserPlugin({
        terserOptions: { format: { comments: false } },
        extractComments: false,
      }),
    ],
  },
  plugins: [new LicensePlugin({ outputFilename: "licenses.json" })],
};

export default config;
