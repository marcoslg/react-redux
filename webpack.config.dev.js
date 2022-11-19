const webpack = require("webpack");
const path = require("path");
const htmlWebPackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

process.env.NODE_ENV = "development";

module.exports = {
  mode: "development",
  target: "web",
  devtool: "cheap-module-source-map", //relation between source code origina in browser
  entry: "./src/index",
  output: {
    //in dev will be load in memory
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
    filename: "bundle.js", // file when bundle files
  },
  stats: "minimal", //logs
  devServer: {
    //overlay: true, //cath except
    historyApiFallback: true, //all request will be sent to index.hml, import for deep links be catched by router
    allowedHosts: "auto",

    headers: {
      "Access-control-Allow-Origin": "*",
    },
    https: false,
  },
  plugins: [
    new htmlWebPackPlugin({
      template: "public/index.html",
      favicon: "src/favicon.ico",
    }),
    new ESLintPlugin({
      extensions: ["js", "jsx"],
      exclude: ["/node_modules/"],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx|svg)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(css)$/,
        //exclude: /node_modules/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        //exclude: /node_modules/,
        use: ["file-loader"],
      },
    ],
  },
};
