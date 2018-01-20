let router = require("express").Router();

//mandelbrot testing
router.get("/mandelbrot", (req, res) => {
  res.render("mandelbrot");
});

router.get("*", (req, res) => {
  res.render("test");
});

module.exports = router;
