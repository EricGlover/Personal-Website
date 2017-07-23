const fs = require("fs");
const express = require("express");
const app = express();

const port = process.env.PORT || 3000;
const hostname = "localhost";

//consider using app.route

app.get("/", (req, res) => {
  //res.writeHead(200, { "Content-Type": "text/html" });
  //get index.html running
  console.log(`req.path = ${req.path}`);
  console.log(`req.url = ${req.url}`);
  console.log(`req.baseUrl = ${req.baseUrl}`);
  res.redirect;
  fs.readFile("./public/index.html", "utf8", function(err, data) {
    if (err) {
      res.writeHead(404);
      res.end("404 Not Found");
    } else {
      res.writeHead(200, {
        "Content-Type": "text/html"
      });
      res.end(data);
    }
  });
});

//set up blog id's later
app.get("/blog", (req, res) => {
  //res.writeHead(200, { "Content-Type": "text/html" });

  //get handle blog requests
  fs.readFile("./public/blog.html", "utf8", function(err, data) {
    if (err) {
      res.writeHead(404);
      res.end("404 Not Found");
    } else {
      res.writeHead(200, {
        "Content-Type": "text/html"
      });
      res.end(data);
    }
  });
});
//app.use(express.static("public"));
app.use(express.static(__dirname + "/public"));

app.listen(port, (res, req) => {
  console.log(`Running on port ${port}`);
});
