var argv = require("yargs").argv;
var path = require("path");
var webpack = require("webpack");

var example = argv.example;

module.exports = {
  devtool: "cheap-module-eval-source-map",
  entry: [
    "webpack-hot-middleware/client",
    "./" + example + "/index"
  ],
  output: {
    path: path.join(__dirname, example, "dist"),
    filename: "bundle.js",
    publicPath: "/static/"
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ["babel", "webpack-module-hot-accept"],
      exclude: /node_modules/,
      include: __dirname
    }]
  }
};

/*
// When inside js-module-starter-kit repo, prefer src to compiled version.
// You can safely delete these lines in your project.
var jsModuleStarterKitSrc = path.join(__dirname, "..", "src");
var jsModuleStarterKitNodeModules = path.join(__dirname, "..", "node_modules");
var fs = require("fs");
if (fs.existsSync(jsModuleStarterKitSrc) && fs.existsSync(jsModuleStarterKitNodeModules)) {
  // Resolve js-module-starter-kit to source
  module.exports.resolve = { alias: { "js-module-starter-kit": jsModuleStarterKitSrc } };
  // Compile js-module-starter-kit from source
  module.exports.module.loaders.push({
    test: /\.js$/,
    loaders: ["babel"],
    include: jsModuleStarterKitSrc
  })
}*/
