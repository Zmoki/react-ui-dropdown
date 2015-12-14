"use strict";

if (!process.env.EXAMPLE_NAME) {
  throw new Error("You don't choose example. Please set environment variable EXAMPLE_NAME.");
}

const express = require("express");
const path = require("path");
const itemChecker = require("./../lib/item-checker").default;

const example = process.env.EXAMPLE_NAME;
const mode = process.env.NODE_ENV || "development";
const port = process.env.PORT || 3000;

let app = express();

if(mode == "development") {
  const webpack = require("webpack");
  const webpackDevMiddleware = require("webpack-dev-middleware");
  const webpackHotMiddleware = require("webpack-hot-middleware");
  const config = require("./webpack.config");

  const compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

if(mode == "production"){
  app.use("/static", express.static(path.join(__dirname, example, "dist")));
}

app.get("/items-search", (req, res) => {
  const q = req.query.q || "";
  const searchIn = req.query["search_in"] ? req.query["search_in"].split(",") : ["first_name", "last_name", "domain"];

  let items = require("./data.json").items;

  if (q.length) {
    items = items.filter(item => itemChecker.check(q, item, searchIn));
  }

  items = items.map(item => {
    return {
      id: item.uid,
      title: [item["first_name"], item["last_name"]].join(" "),
      image: item["photo_50"]
    };
  });

  res.json({
    items
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, example, "index.html"));
});

app.listen(port, (error) => {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
});
