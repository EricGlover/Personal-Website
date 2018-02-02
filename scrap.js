let a = {
  10: "dank"
};
Object.keys(a).forEach(key => {
  console.log(typeof key);
});

//mapper
const mapper = (keys, values) => {
  let m = new Map();
  keys.forEach((key, i) => {
    m.set(key, values[i]);
  });
  return m;
};
//maps
let m = new Map();
let nums = [1, 3, 5];
let strs = ["dank", "memez", "cashMoney"];
let m2 = mapper(nums, strs);
console.log(m2);

