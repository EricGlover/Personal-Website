const express = require("express");
let router = express.Router();

router.get("/", (req, res) => {
  res.render("main", { main: true });
});
router.get("/secret*", (req, res) => {
  res.render("secret");
});

module.exports = {
  indexRouter: router,
  loaderRouter: require("./loader"),
  blogRouter: require("./blog"),
  projectRouter: require("./projects"),
  testRouter: require("./test"),
  experimentRouter: require("./experiment")
};
