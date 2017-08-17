const express = require("express");
let router = express.Router();

//set up blog id's later
router.get("/blog", (req, res) => {
  //get handle blog requests
  res.render("blog/index");
});
router.get("/blog/:id", (req, res) => {
  //get handle blog requests
  res.render("blog/" + req.params.id);
});

module.exports = router;
