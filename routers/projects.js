const express = require("express");
let router = express.Router();

router.get("/", (req, res) => {
  return res.render("underConstruction");
});
router.get("/lca", (req, res) => {
  res.render("testFlash");
});

module.exports = router;
