"use strict";

if (!process.env.EXAMPLE_NAME) {
  throw new Error("You don't choose example. Please set environment variable EXAMPLE_NAME.");
}

const webpack = require("webpack");
const StringReplacePlugin = require("string-replace-webpack-plugin");

const path = require("path");

const example = process.env.EXAMPLE_NAME;
const mode = process.env.NODE_ENV || "development";

let config = {
  entry: [
    "./" + example + "/index"
  ],
  output: {
    path: path.join(__dirname, example, "dist"),
    filename: "bundle.js",
    publicPath: "/static/"
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin()
  ],
  module: {
    loaders: [
      {
        test: [/\.jsx$/, /\.js$/],
        loader: "babel",
        query: {
          presets: ["react", "es2015"]
        }
      }
    ]
  }
};

// Resolve react-ui-dropdown to source
config.resolve = {
  alias: {
    "react-ui-dropdown": path.join(__dirname, "..", "src"),
    "react": path.join(__dirname, "node_modules", "react")
  }
};

if (mode == "development") {
  config.devtool = "cheap-module-eval-source-map";

  config.entry = ["webpack-hot-middleware/client?noInfo=true"].concat(config.entry);

  config.plugins = config.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]);

  config.module.loaders = [
    {
      test: /\.js$/,
      loader: "webpack-module-hot-accept",
      exclude: /node_modules/,
      include: __dirname
    }
  ].concat(config.module.loaders);
}

if (mode == "production") {
  config.devtool = "source-map";

  config.entry = [
    "console-polyfill",
    "es5-shim",
    "es5-shim/es5-sham",
    "html5shiv"
  ].concat(config.entry);

  for (let loader of config.module.loaders) {
    if (loader.loader == "babel") {
      loader.query.plugins = (loader.query.plugins || []).concat([
        "transform-es3-property-literals",
        "transform-es3-member-expression-literals"
      ]);
    }
  }

  config.plugins = config.plugins.concat([new StringReplacePlugin()]);
  config.module.postLoaders = (config.module.postLoaders || []).concat([{
    test: [/\.jsx$/, /\.js$/],
    loader: StringReplacePlugin.replace({
      replacements: [
        {
          pattern: /\.default(?![a-z])/ig,
          replacement: () => {
            return "['default']";
          }
        }
      ]
    })
  }])
}

module.exports = config;
