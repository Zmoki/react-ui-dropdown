"use strict";

const webpack = require("webpack");
const baseConfig = require("./webpack.config.base");

let config = Object.create(baseConfig);
9
config.plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
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

module.exports = config;
