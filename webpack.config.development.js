"use strict";

const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const baseConfig = require("./webpack.config.base");

let config = Object.create(baseConfig);

config.plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new ExtractTextPlugin(process.env.npm_package_config_name + ".css"),
  new webpack.DefinePlugin({
    "process.env.NODE_ENV": JSON.stringify("development")
  })
];

config.output.filename = process.env.npm_package_config_name + ".js";

module.exports = config;
