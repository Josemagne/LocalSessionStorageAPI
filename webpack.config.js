const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");

const isProduction = process.env.NODE_ENV === "production";

const config = {
  mode: isProduction ? "production" : "development",
  entry: {
    index: "./LocalSessionStorageAPI.ts",
  },
  output: {
    path: resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/",
  },
  resolve: {
    extensions: [".tsx", ".js", ".jsx", ".ts"],
  },
  module: {
    rules: [
      // ANCHOR js
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, "index.html"),
      filename: "index.html",
      inject: "body",
    }),
  ],
  devServer: {
    historyApiFallback: true,
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
    port: 8888,
  };
}

module.exports = config;
