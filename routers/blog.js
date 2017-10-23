const express = require("express");
const { labelizer } = require("../helpers/blog");
let router = express.Router();

//TODO: start using a db for posts
const posts = [
  {
    link:
      "A-not-so-quick-blog-about-Quicksort-c4897a7e05dd2b464e7de1f50f2eb167",
    title: "Quicksort",
    subtitle: "A not so quick blog about Quicksort",
    description:
      "This week we did a lot of algorithms in VCS. When we were doing sorting algorithms I found quicksort to be a bit of a stumbling block. So I figured I’d try my hand at a human legible explanation of it…then I realized I’d made a never-ending rant so …..sorry about that...",
    labels: ["CS", "Algorithms"]
  },
  {
    link: "Linked-Lists-and-Pigeons-08174b70c89f8fd8cc9c719b336e0edc",
    title: "Linked Lists and Pigeons",
    subtitle: "",
    description:
      "This week at VCS we implemented a bunch of data structures in JS and since everyone loves their data structured I figured I should spread the joy. My hope is this will be part of a small series of posts that will build upon each other culminating in a test of our final data structure against a graphing problem on HackerRank. But first let’s talk about linked lists!",
    labels: ["CS", "Algorithms"]
  },
  {
    link: "The-Challenge-of-Communication-d2bc9fd247c27341a9ad418a1e1a2ff9",
    title: "The Challenge of Communication",
    subtitle: "Philosophy and Programming",
    description:
      "Today I find myself thinking about philosophy and it’s similarities with programming. At first glance the two seem quite disparate; most people think of philosophy as the long-winded, pedantic meandering thoughts of old men in lofty ivory towers, programming seems to stand in stark contrast with this because of it’s immense practical utility...",
    labels: ["randomMusings"]
  },
  {
    link: "Using-Generators-for-Dates-9752a54a516c0ff2f6bff57fb41bec0a",
    title: "Using Generators for Dates",
    subtitle: "",
    description:
      "Generator are rather fun. Dates are rather not fun. Let’s make Dates a little more fun by using Generators and Iterators.",
    labels: ["JS", "es6"]
  },
  {
    link: "OOP-and-private-vars-in-JS-edcaf6524baa5f72528b84935e1db61e",
    title: "OOP and private vars in JS",
    subtitle: "Hide that Data",
    description:
      "Ok, this isn’t quite intended as an actual defense of OOP - I just liked the title too much - but I am going to do a brief drive-by of what OOP is useful for.",
    labels: ["JS", "OOP"]
  },
  {
    link: "When-to-use-recursion-802347e1211b0eda372ca0345360ff6b",
    title: "When to use recursion",
    subtitle: "How I learned to love (tolerate) the infinite stack",
    description:
      "Recursion, is it useful? This week I stumbled upon a definite use case and learned that the squirreler the recursive function the more likely it is that it’s necessary. Before we look at that let’s dive into recursion!",
    labels: ["JS", "CS"]
  },
  {
    link:
      "Asynchronous-JS-Programming-Pitfall-1-4047dc17031186c82be6eed5a3e4474e",
    title: "Asynchronous JS Programming Pitfall #1",
    subtitle: "As explained by an explorer of conceptual pitfalls",
    description:
      "In my adventures in the magical land of JS last week I stumbled head-first into some problems with the time-space continuum..well mostly the time aspect but irregardless. I’d like to take a short trip into the land of JS and explore it’s relationship with time.",
    labels: ["JS", "Asynchronous JS"]
  },
  {
    link: "Switches-be-damned-Rest-and-Spread-ed14f497c32901e32b900e29019c8ec3",
    title: "Switches be damned, Rest, and Spread",
    subtitle: "CLI: a code-walkthrough",
    description:
      "Let’s look at a few language features provided by JS to make our lives a little bit easier. To do this we’ll walkthrough some of the decisions you’d face when making a command line interface.",
    labels: ["JS", "es6"]
  },
  {
    link: "Making-the-most-of-Git-a5b4775aa68bcc483c9155ced98ca4b9",
    title: "Making the most of Git",
    subtitle: "I solemnly swear to version control like I'm up to no good.",
    description:
      "I’ll be honest, I don’t use git. At least not in the way it seems you should. For longer than I care to remember I didn’t use it at all. Let’s take a trip back to those dark times, when it seemed like every hour or so was playing Russian Roulette with your program, it’ll be fun...",
    labels: ["Git"]
  },
  {
    link: "Quick-HTML-CSS-Tip-7367f5a80fc5fa80118e7a86751a4e72",
    title: "Quick HTML CSS Tip",
    subtitle: "To make the HTML nightmares go away",
    description:
      "When I first began learning HTML / CSS it was an absolute nightmare. My navbars looked like jumbled cubes, my images hovered over each other, and the thought of someone viewing the site from a screen with different dimensions....oh gahd...",
    labels: ["HTML5"]
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
  //modify labels to make them easier to render
  let viewPosts = posts.map(post => {
    let viewPost = post;
    viewPost.labelString = labelizer(post);
    return viewPost;
  });
  res.render("blog/index", { blog: true, posts: viewPosts });
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
