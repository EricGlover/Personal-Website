const express = require("express");
const app = express();
const logger = require("morgan");

const port = process.env.PORT || 3000;
const hostname = "localhost";

//handlebars
const hbs = require("express-handlebars");
app.engine("handlebars", hbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

const { indexRouter, blogRouter, projectRouter } = require("./routers");

app.use(logger("dev"));
app.use("/blog", blogRouter);
app.use("/", indexRouter);
app.use("/projects", projectRouter);

app.use(express.static(__dirname + "/public"));

app.listen(port, (res, req) => {
  console.log(`Running on port ${port}`);
});
