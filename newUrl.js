const md5 = require("md5");
let title = "When to use recursion";
title = title.split(" ").join("-");
let date = "8/21/17";
console.log("new url = \n", `${title}-${md5(title + date)}`);
// console.log(md5(stuff));
