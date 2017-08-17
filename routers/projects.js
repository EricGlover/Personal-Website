const express = require("express");
let router = express.Router();

router.get("/", (req, res) => {
  return res.render("underConstruction");
});

module.exports = router;
