const express = require("express");
let router = express.Router();

//map of urls to their handlebars files
let urls = {
  "Quick-HTML-CSS-Tip-7367f5a80fc5fa80118e7a86751a4e72": 1,
  "Making-the-most-of-Git-a5b4775aa68bcc483c9155ced98ca4b9": 2,
  "Switches-be-damned-Rest-and-Spread-ed14f497c32901e32b900e29019c8ec3": 3,
  "Asynchronous-JS-Programming-Pitfall-1-4047dc17031186c82be6eed5a3e4474e": 4,
  "When-to-use-recursion-802347e1211b0eda372ca0345360ff6b": 5,
  6: ["6"]
};
//legacy support
let legacyUrls = {
  1: "Quick-HTML-CSS-Tip-7367f5a80fc5fa80118e7a86751a4e72",
  2: "Making-the-most-of-Git-a5b4775aa68bcc483c9155ced98ca4b9",
  3: "Switches-be-damned-Rest-and-Spread-ed14f497c32901e32b900e29019c8ec3",
  4: "Asynchronous-JS-Programming-Pitfall-1-4047dc17031186c82be6eed5a3e4474e",
  5: "When-to-use-recursion-802347e1211b0eda372ca0345360ff6b",
  6: ["6"]
};

//set up blog id's later
router.get("/", (req, res) => {
  //get handle blog requests
  res.render("blog/index", { blog: true });
});
router.get("/:id", (req, res) => {
  //get number from url
  //handle legacy urls
  if (req.params.id > 0 && req.params.id <= 6) {
    return res.redirect(`/blog/${legacyUrls[req.params.id]}`);
  }
  let blogNum = urls[req.params.id];
  res.render("blog/" + blogNum, { blog: true });
});

module.exports = router;
