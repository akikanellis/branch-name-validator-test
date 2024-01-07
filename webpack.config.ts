import { composePlugins, withNx } from "@nx/webpack";
import { merge } from "webpack-merge";
import { Configuration } from "webpack";
import * as path from "node:path";
import LicensePlugin from "webpack-license-plugin";

export default composePlugins(withNx(), (config: Configuration) => {
  return merge(config, {
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
            configFile: path.resolve(__dirname, "tsconfig.build.json"),
          },
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: [".ts", ".js", ".json"],
    },
    output: {
      filename: "index.js",
      path: path.resolve(__dirname, "dist"),
    },
    optimization: {
      minimize: true,
      usedExports: true,
    },
    plugins: [new LicensePlugin({ outputFilename: "licenses.json" })],
  });
});
