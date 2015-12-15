"use strict";

const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const baseConfig = require("./webpack.config.base");

let config = Object.create(baseConfig);

config.plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new ExtractTextPlugin(process.env.npm_package_config_name + ".min.css"),
  new webpack.DefinePlugin({
    "process.env.NODE_ENV": JSON.stringify("production")
  }),
  new webpack.optimize.UglifyJsPlugin({
    compressor: {
      screw_ie8: true,
      warnings: false
    }
  })
];

config.output.filename = process.env.npm_package_config_name + ".min.js";

config.postcss = config.postcss.concat([require("cssnano")]);

module.exports = config;
