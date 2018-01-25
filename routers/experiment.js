const router = require("express").Router();

//image data api experiments
router.get("/imageData", (req, res) => {
  res.render("experiments/imageData");
});

//landing page
router.get("*", (req, res) => res.render("experiments/welcome"));

module.exports = router;
