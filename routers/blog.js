const express = require("express");
let router = express.Router();

//legacy support
let urls = {
  "47edaa7269d266e037079567291f0dda": 1,
  2: ["2"],
  3: ["3"],
  4: ["4"],
  5: ["5"]
};

//set up blog id's later
router.get("/", (req, res) => {
  //get handle blog requests
  res.render("blog/index", { blog: true });
});
router.get("/:id", (req, res) => {
  //get handle blog requests
  //get number from url
  let blogNum = urls[req.params.id] || req.params.id;
  res.render("blog/" + blogNum, { blog: true });
});

module.exports = router;
