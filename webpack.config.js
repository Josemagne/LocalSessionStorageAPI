const { resolve } = require("path");
const TerserWebpackPlugin = require("terser-webpack-plugin");

const isProduction = process.env.NODE_ENV === "production";

const config = {
  mode: isProduction ? "production" : "development",
  entry: {
    index: "./LocalSessionStorageAPI.ts",
  },
  output: {
    path: resolve(__dirname, "lssapi"),
    filename: "lssapi.js",
    publicPath: "/",
  },
  resolve: {
    extensions: [".js", ".ts"],
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
};

if (isProduction) {
  config.optimization = {
    minimizer: [new TerserWebpackPlugin()],
  };
} else {
  config.devServer = {
    static: resolve(__dirname, "public"),
    compress: true,
    hot: true,
    host: "localhost",
    port: 8090,
  };
}

module.exports = config;
