const md5 = require("md5");
let title = "Using Generators / Iterators for Dates";
title = title.split(" ").join("-");
let date = "9/11/17";
console.log("new url = \n", `${title}-${md5(title + date)}`);
// console.log(md5(stuff));
