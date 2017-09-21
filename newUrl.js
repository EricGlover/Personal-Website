const md5 = require("md5");
let title = "The Challenge of Communication";
title = title.split(" ").join("-");
let date = "9/20/17";
console.log("new url = \n", `${title}-${md5(title + date)}`);
// console.log(md5(stuff));
