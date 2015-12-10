"use strict";

var argv = require("yargs").argv;
var wordsChecker = require("./../lib/words-checker").default;

if (!argv.example) {
  throw new Error("You don't choose example. Please pass 'npm start -- --example=examplename'.");
}
var example = argv.example;

var path = require("path");

var webpack = require("webpack");
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpackHotMiddleware = require("webpack-hot-middleware");
var config = require("./webpack.config");

var app = new (require("express"))();
var port = 3000;

var compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

app.get("/items-search", function(req, res) {
  const q = req.query.q || "";
  const searchIn = req.query["search_in"] ? req.query["search_in"].split(",") : ["first_name", "last_name", "domain"];
  let items = require("./data.json").items;

  if (q.length) {
    let words = wordsChecker.getConditionalWords(q);

    items = items.filter(item => {
      for (let field of searchIn) {
        if(item[field] == undefined){
          return false;
        }
        const value = item[field].toLowerCase();
        for (let word of words) {
          if (~value.search(word)) {
            return true;
          }
        }
      }
      return false;
    });
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

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, example, "index.html"));
});

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
});
