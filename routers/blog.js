const express = require("express");
let router = express.Router();

//set up blog id's later
router.get("/", (req, res) => {
  //get handle blog requests
  res.render("blog/index", { blog: true });
});
router.get("/:id", (req, res) => {
  //get handle blog requests
  res.render("blog/" + req.params.id, { blog: true });
});

module.exports = router;
