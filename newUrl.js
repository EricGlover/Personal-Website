const md5 = require("md5");
let title = "Linked Lists and Pigeons";
title = title.split(" ").join("-");
let date = "9/24/17";
console.log("new url = \n", `${title}-${md5(title + date)}`);
// console.log(md5(stuff));
