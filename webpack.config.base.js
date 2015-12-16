"use strict";

const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel",
        query: {
          presets: ["react", "es2015"]
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader")
      }
    ]
  },
  output: {
    path: "./dist",
    library: process.env.npm_package_config_library,
    libraryTarget: "umd"
  },
  resolve: {
    extensions: ["", ".js"]
  },
  externals: {
    react: "commonjs react"
  },
  postcss: [require("precss"), require("autoprefixer")]
};
