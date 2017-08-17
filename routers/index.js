const express = require("express");
let router = express.Router();

router.get("/", (req, res) => {
  // res.render("main");
  res.end("things");
});

module.exports = {
  indexRouter: router,
  blogRouter: require("./blog"),
  projectRouter: require("./projects")
};
