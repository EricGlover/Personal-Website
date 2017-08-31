const express = require("express");
let router = express.Router();

router.get("/", (req, res) => {
  res.render("main", { main: true });
});

module.exports = {
  indexRouter: router,
  blogRouter: require("./blog"),
  projectRouter: require("./projects")
};
