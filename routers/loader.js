const router = require("express").Router();

const token = "loaderio-e18afa5e6a1d14daaca79f678fd43915";

router.get("/*", (req, res) => {
  res.end(token);
});

module.exports = router;

