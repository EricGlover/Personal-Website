const express = require("express");
const app = express();
const compress = require("compression");
const logger = require("morgan");
const security = require("./middleware/security");
const port = process.env.PORT || 3000;

//handlebars
// const hbs = require("handlebars");
const hbs = require('express-handlebars');
console.log(hbs);
app.engine('handlebars', hbs.engine());
app.set('view engine', 'handlebars');
//compression
const filter = (req, res) => {
  return true;
};
app.use(compress({ filter: filter, level: 1 }));

//security (prevents click jacking)
app.use(security);

//ROUTERS
const {
  indexRouter,
  blogRouter,
  projectRouter,
  testRouter,
  mandelbrotRouter,
  loaderRouter,
  experimentRouter
} = require("./routers");

//what is this ?
const loaderFileURL = "/loaderio-e18afa5e6a1d14daaca79f678fd43915";

app.use(logger("dev"));
app.use("/blog", blogRouter);
app.use("/projects", projectRouter);
app.use("/mandelbrot", mandelbrotRouter);
app.use("/test", testRouter);
app.use("/x", experimentRouter);
app.use(loaderFileURL, loaderRouter);
app.use("/", indexRouter);

//Static files
app.use(express.static(__dirname + "/public"));

app.listen(port, (res, req) => {
  console.log(`Running on port ${port}`);
});
