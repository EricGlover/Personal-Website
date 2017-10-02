const md5 = require("md5");
let title = "A not so quick blog about Quicksort";
title = title.split(" ").join("-");
let date = "10/1/17";
console.log("new url = \n", `${title}-${md5(title + date)}`);
// console.log(md5(stuff));
