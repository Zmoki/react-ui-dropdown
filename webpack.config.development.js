"use strict";

const webpack = require("webpack");
const baseConfig = require("./webpack.config.base");

let config = Object.create(baseConfig);

config.plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.DefinePlugin({
    "process.env.NODE_ENV": JSON.stringify("development")
  })
];

config.output.filename = process.env.npm_package_config_name + ".js";

module.exports = config;
