const express = require("express");
let router = require("express").Router();

//options

//mandelbrot testing
router.get("*", (req, res) => {
  res.render("mandelbrot");
});

module.exports = router;
