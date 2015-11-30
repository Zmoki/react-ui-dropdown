"use strict";

module.exports = {
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: "babel",
        query: {
          presets: ["react", "es2015"]
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel",
        query: {
          presets: ["es2015"]
        }
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
  }
};
