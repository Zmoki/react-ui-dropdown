"use strict";

module.exports = {
  module: {
    loaders: [
      { test: /\.js$/, loaders: ["babel-loader"], exclude: /node_modules/ }
    ]
  },
  output: {
    path: "./dist",
    library: process.env.npm_package_config_library,
    libraryTarget: "umd"
  },
  resolve: {
    extensions: ["", ".js"]
  }
};
