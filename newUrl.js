const md5 = require("md5");
let title = "OOP and private vars in JS";
title = title.split(" ").join("-");
let date = "9/4/17";
console.log("new url = \n", `${title}-${md5(title + date)}`);
// console.log(md5(stuff));
