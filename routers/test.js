let router = require("express").Router();

router.get("/flash", (req, res) => {
  res.render("testFlash");
});
router.get("*", (req, res) => {
  res.render("test");
});

module.exports = router;
