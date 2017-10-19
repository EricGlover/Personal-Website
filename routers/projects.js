const express = require("express");
let router = express.Router();

router.get("/", (req, res) => {
  return res.render("projects/portfolio");
});

router.get("/lca", (req, res) => {
  res.render("projects/lca");
});

router.get("/bluejay", (req, res) => {
  res.render("projects/bluejay");
});

router.get("/djello", (req, res) => {
  // res.render("projects/djello");
  res.render("underConstruction");
});

module.exports = router;
