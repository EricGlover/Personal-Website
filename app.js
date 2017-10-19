const express = require("express");
const app = express();
const compress = require("compression");
const logger = require("morgan");

const port = process.env.PORT || 3000;

//handlebars
const hbs = require("express-handlebars");
app.engine("handlebars", hbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//compression
const filter = (req, res) => {
  return true;
};
app.use(compress({ filter: filter, level: 1 }));

//ROUTERS
const {
  indexRouter,
  blogRouter,
  projectRouter,
  testRouter
} = require("./routers");

app.use(logger("dev"));
app.use("/blog", blogRouter);
app.use("/projects", projectRouter);
app.use("/test", testRouter);
app.use("/", indexRouter);

app.use(express.static(__dirname + "/public"));

app.listen(port, (res, req) => {
  console.log(`Running on port ${port}`);
});
