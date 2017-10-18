const express = require("express");
let router = express.Router();

router.get("/", (req, res) => {
  return res.render("projects/portfolio");
});
router.get("/lca", (req, res) => {
  res.render("projects/lca");
});

module.exports = router;
