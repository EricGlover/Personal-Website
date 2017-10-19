const express = require("express");
let router = express.Router();

//TODO: start using a db for posts
const posts = [
  {
    link: "Quick-HTML-CSS-Tip-7367f5a80fc5fa80118e7a86751a4e72",
    title: "Quick HTML CSS Tip",
    description: "Quick HTML CSS Tip",
    labels: ["JS"]
  },
  {
    link: "Making-the-most-of-Git-a5b4775aa68bcc483c9155ced98ca4b9",
    title: "Making the most of Git",
    description: "Making the most of Git",
    labels: ["JS"]
  },
  {
    link: "Switches-be-damned-Rest-and-Spread-ed14f497c32901e32b900e29019c8ec3",
    title: "Switches be damned, Rest, and Spread",
    description: "Switches be damned, Rest, and Spread",
    labels: ["JS"]
  },
  {
    link:
      "Asynchronous-JS-Programming-Pitfall-1-4047dc17031186c82be6eed5a3e4474e",
    title: "Asynchronous JS Programming Pitfall #1",
    description: "Asynchronous JS Programming Pitfall #1",
    labels: ["JS"]
  },
  {
    link: "When-to-use-recursion-802347e1211b0eda372ca0345360ff6b",
    title: "When to use recursion",
    description: "When to use recursion",
    labels: ["JS"]
  },
  {
    link: "OOP-and-private-vars-in-JS-edcaf6524baa5f72528b84935e1db61e",
    title: "OOP and private vars in JS",
    description: "OOP and private vars in JS",
    labels: ["JS"]
  },
  {
    link: "Using-Generators-for-Dates-9752a54a516c0ff2f6bff57fb41bec0a",
    title: "Using Generators for Dates",
    description: "Using Generators for Dates",
    labels: ["JS"]
  },
  {
    link: "The-Challenge-of-Communication-d2bc9fd247c27341a9ad418a1e1a2ff9",
    title: "The Challenge of Communication",
    description: "The Challenge of Communication",
    labels: ["JS"]
  },
  {
    link: "Linked-Lists-and-Pigeons-08174b70c89f8fd8cc9c719b336e0edc",
    title: "Linked Lists and Pigeons",
    description: "Linked Lists and Pigeons",
    labels: ["JS"]
  },
  {
    link:
      "A-not-so-quick-blog-about-Quicksort-c4897a7e05dd2b464e7de1f50f2eb167",
    title: "A not so quick blog about Quicksort",
    description: "A not so quick blog about Quicksort",
    labels: ["JS"]
  }
];

//map of urls to their handlebars files
let urls = {
  "Quick-HTML-CSS-Tip-7367f5a80fc5fa80118e7a86751a4e72": 1,
  "Making-the-most-of-Git-a5b4775aa68bcc483c9155ced98ca4b9": 2,
  "Switches-be-damned-Rest-and-Spread-ed14f497c32901e32b900e29019c8ec3": 3,
  "Asynchronous-JS-Programming-Pitfall-1-4047dc17031186c82be6eed5a3e4474e": 4,
  "When-to-use-recursion-802347e1211b0eda372ca0345360ff6b": 5,
  "OOP-and-private-vars-in-JS-edcaf6524baa5f72528b84935e1db61e": 6,
  "Using-Generators-for-Dates-9752a54a516c0ff2f6bff57fb41bec0a": 7,
  "The-Challenge-of-Communication-d2bc9fd247c27341a9ad418a1e1a2ff9": 8,
  "Linked-Lists-and-Pigeons-08174b70c89f8fd8cc9c719b336e0edc": 9,
  "A-not-so-quick-blog-about-Quicksort-c4897a7e05dd2b464e7de1f50f2eb167": 10
};
//legacy support
let legacyUrls = {
  1: "Quick-HTML-CSS-Tip-7367f5a80fc5fa80118e7a86751a4e72",
  2: "Making-the-most-of-Git-a5b4775aa68bcc483c9155ced98ca4b9",
  3: "Switches-be-damned-Rest-and-Spread-ed14f497c32901e32b900e29019c8ec3",
  4: "Asynchronous-JS-Programming-Pitfall-1-4047dc17031186c82be6eed5a3e4474e",
  5: "When-to-use-recursion-802347e1211b0eda372ca0345360ff6b",
  6: "OOP-and-private-vars-in-JS-edcaf6524baa5f72528b84935e1db61e"
};

//set up blog id's later
router.get("/", (req, res) => {
  //get handle blog requests
  res.render("blog/index", { blog: true, posts });
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
