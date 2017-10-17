//Basic geometry code
const util = require("util");
const { inspect } = util;

//internals
let pointNamespace = new WeakMap();
let pointInternal = point => {
  if (!pointNamespace.has(point)) pointNamespace.set(point, {});
  return pointNamespace.get(point);
};
//Contructor
function Point(x, y) {
  let myGuts = pointInternal(this);
  myGuts.x = x;
  myGuts.y = y;
}
//Prototype
Point.prototype = {
  test: function() {
    this.hi();
  },
  toString: function() {
    let myGuts = pointInternal(this);
    return `[${myGuts.x}, ${myGuts.y}]`;
  },
  plus: function(p) {
    let pGuts = pointInternal(p);
    let myGuts = pointInternal(this);
    return new Point(pGuts.x + myGuts.x, pGuts.y + myGuts.y);
  },
  minus: function(p) {
    let pGuts = pointInternal(p);
    let myGuts = pointInternal(this);
    return new Point(myGuts.x - pGuts.x, myGuts.y - pGuts.y);
  },
  distance: function(p) {
    let pGuts = pointInternal(p);
    let myGuts = pointInternal(this);
    let deltaX = myGuts.x - pGuts.x;
    let deltaY = myGuts.y - pGuts.y;
    let distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
    // console.log(`distance between ${this} and ${p} = ${distance}`);
    return distance;
  }
};

//RIGHT TRIANGLE
function RightTriangle(p1, p2, p3) {
  let points = [p1, p2, p3].map(p => {
    if (!(p instanceof Point)) {
      return new Point(...p);
    }
    return p;
  });
  console.log(inspect(points[0]));
  this.l1 = Math.abs(points[0].distance(points[1]));
  this.l2 = Math.abs(points[1].distance(points[2]));
  this.h = Math.abs(points[0].distance(points[2]));
  this.points = points;
}
RightTriangle.prototype = {};

module.exports = {
  Point,
  RightTriangle
};
