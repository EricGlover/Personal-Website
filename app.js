const fs = require("fs");
const express = require("express");
const app = express();

const port = process.env.PORT || 3000;
const hostname = "localhost";

app.use(express.static(__dirname + "/public"));

const hbs = require("express-handlebars");
app.engine("handlebars", hbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  //res.writeHead(200, { "Content-Type": "text/html" });
  //get index.html running
  console.log(`req.path = ${req.path}`);
  console.log(`req.url = ${req.url}`);
  console.log(`req.baseUrl = ${req.baseUrl}`);
  res.render("main");
  // fs.readFile("./public/index.html", "utf8", function(err, data) {
  //   if (err) {
  //     res.writeHead(404);
  //     res.end("404 Not Found");
  //   } else {
  //     res.writeHead(200, {
  //       "Content-Type": "text/html"
  //     });
  //     res.end(data);
  //   }
  // });
});

//set up blog id's later
app.get("/blog", (req, res) => {
  //get handle blog requests
  res.render("blog/index");
  // fs.readFile("./public/blog.html", "utf8", function(err, data) {
  //   if (err) {
  //     res.writeHead(404);
  //     res.end("404 Not Found");
  //   } else {
  //     res.writeHead(200, {
  //       "Content-Type": "text/html"
  //     });
  //     res.end(data);
  //   }
  // });
});
app.get("/blog/:id", (req, res) => {
  //get handle blog requests
  res.render("blog/" + req.params.id);
});

app.listen(port, (res, req) => {
  console.log(`Running on port ${port}`);
});
