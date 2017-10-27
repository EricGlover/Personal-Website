const express = require("express");
let router = express.Router();

router.get("/", (req, res) => {
  return res.render("projects/portfolio");
  // res.render("testProject", { projects: true });
});

router.get("/lca", (req, res) => {
  res.render("projects/lca", { projects: true });
});

router.get("/bluejay", (req, res) => {
  res.render("projects/bluejay", { projects: true });
});

router.get("/djello", (req, res) => {
  // res.render("projects/djello");
  res.render("underConstruction", { projects: true });
});

module.exports = router;
