// const { Point, RightTriangle } = import("./geometry");

/**********     GEOMETRY    **********/
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
  this.x = x;
  this.y = y;
}
//Prototype
Point.prototype = {
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
  this.l1 = Math.abs(points[0].distance(points[1]));
  this.l2 = Math.abs(points[1].distance(points[2]));
  this.h = Math.abs(points[0].distance(points[2]));
  this.points = points;
}
RightTriangle.prototype = {
  draw: function(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.points[0].x, this.points[0].y);
    this.points.forEach(point => ctx.lineTo(point.x, point.y));
    ctx.closePath();
    ctx.stroke();
  }
};

/**********     GEOMETRY    **********/

const drawSquare = (ctx, a, b, c, d) => {
  ctx.beginPath();
  ctx.moveTo(...a);
  ctx.lineTo(...b);
  ctx.lineTo(...c);
  ctx.lineTo(...d);
  ctx.closePath();
  ctx.stroke();
};
const draw = (ctx, ...points) => {
  console.log(`points in draw = ${points}`);
  ctx.beginPath();
  ctx.moveTo(...points[0]);
  points.forEach(point => ctx.lineTo(...point));
  ctx.closePath();
  ctx.stroke();
};
console.log("hello world");

//experiment #1, changing a rectangle's color
const getRandomColor = () => {
  const getRandomNum = () => Math.floor(Math.random() * 9 + 1);
  return "#" + getRandomNum() + getRandomNum() + getRandomNum();
};

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let color = getRandomColor();
ctx.fillStyle = "red";
ctx.fillRect(10, 10, 100, 100);

const colorChange = () => {
  color = getRandomColor();
  ctx.fillStyle = color;
  ctx.fillRect(10, 10, 100, 100);
};
// setInterval(colorChange, 1000);

//experiment #2, drawing a triangle

let triangleCanvas = document.getElementById("triangle");
let tCtx = triangleCanvas.getContext("2d");
// let triangle = new RightTriangle([50, 50], [100, 50], [100, 0]);
tCtx.fillStyle = "#999";
// draw(tCtx, triangle.points);
// tCtx.beginPath();
// tCtx.moveTo(50, 50);
// tCtx.lineTo(100, 50);
// tCtx.lineTo(100, 0);
//
// tCtx.fill();
tCtx.font = "18px serif";
tCtx.fillStyle = "#000";
tCtx.fillText("A", 105, 25);

//opening visual
//messin around with basic vector graphics
let c1 = document.getElementById("openingVisual");
let ctx1 = c1.getContext("2d");

let triangleColor = "#000";
let fontColor = "#000";
ctx1.fillStyle = triangleColor;
//triangle
let triangle = new RightTriangle([0, 300], [300, 300], [300, 0]);
console.log(`points = ${triangle.points}`);
triangle.draw(ctx1);
// draw(ctx1, triangle.points);
// ctx1.beginPath();
// ctx1.moveTo(0, 300);
// ctx1.lineTo(300, 300);
// ctx1.lineTo(300, 0);
// ctx1.lineTo(0, 300);
// ctx1.stroke();
//right angle sign
ctx1.beginPath();
ctx1.moveTo(280, 300);
ctx1.lineTo(280, 280);
ctx1.lineTo(300, 280);
ctx1.lineTo(300, 300);
ctx1.closePath();
ctx1.stroke();

ctx1.fillStyle = fontColor;
ctx1.font = "22px serif";
//label the sides of the triangle
ctx1.fillText("A", 320, 150);
ctx1.fillText("B", 110, 150);
ctx1.fillText("C", 150, 320);
//A2 + B2 = C2
ctx1.fillText("A^2 + B^2 = C^2", 420, 150);

////visual 2, triangle with expanded squares
let scene2 = document.getElementById("scene2");
ctx = scene2.getContext("2d");
draw(ctx, [0, 0], [300, 0], [300, 300], [0, 300]);
