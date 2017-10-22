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
  },
  coordinates: function() {
    let pGuts = pointInternal(this);
    return [pGuts.x, pGuts.y];
  }
};

//RIGHT TRIANGLE
//p1 -> p2 = l1
//p2 -> p3 = l2
//p3 -> p1 = h
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
  },
  pathDraw: function() {
    let ctx = new Path2D();
    ctx.moveTo(this.points[0].x, this.points[0].y);
    this.points.forEach(point => ctx.lineTo(point.x, point.y));
    return ctx;
  },
  //experimenting with the curious approach
  // of making doodles on the canvas by translating and rotating
  // instead of making entities
  //FUNCTION:
  //draw the squares for the lengths of the triangle
  expandedSquares: async function(ctx, delay = 1) {
    //instead of Promise.resolving( <frame animations> )
    //I'm trying this daisy chain sort of approach
    //note due to const not hoisting, I needing to write this function in reverse sequential order ///sorry
    ctx.save();
    const f3 = () => {
      //move canvas to point c rotate and draw
      // ////the rotation is a bit tricky here but it's -(2pi - angle formed by l2 and hypotenuese)
      // ////to get the angle we'll do some quick trig
      // ////tan(angle) = l1 / l2
      // ////so arcTan(l1/l2) = angle
      let angle = Math.atan(this.l1 / this.l2);
      ctx.translate(this.l2, 0);
      ctx.rotate(Math.PI + angle);
      ctx.strokeRect(0, 0, this.h, this.h);
      let bAngle = Math.atan(this.l2 / this.l1);
      console.log("angle  = ", angle);
      //math check, doesn't seem right.........
      console.log(`a + b + right = ${angle + bAngle + Math.PI / 4}`);
      //reset canvas
      ctx.restore();
    };
    const f2 = () => {
      //move canvas to point b rotate and draw
      ctx.translate(this.l1, 0);
      ctx.rotate(-Math.PI / 2);
      ctx.strokeRect(0, 0, this.l2, this.l2);
      setTimeout(f3, 1000 * delay);
    };
    const f1 = () => {
      //move canvas to point a and draw
      ctx.fillRect(0, 0, 100, 100);
      ctx.translate(...this.points[0].coordinates());
      ctx.strokeRect(0, 0, this.l1, this.l1);
      setTimeout(f2, 1000 * delay);
    };
    f1();
  }
  // center: function() {
  //
  // }
};

/**********     GEOMETRY    **********/

/**** Utility Functions ***/

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
  if (points[0] instanceof Point) {
    ctx.moveTo(...points[0].coordinates());
    points.forEach(point => ctx.lineTo(...point.coordinates()));
  } else {
    ctx.moveTo(...points[0]);
    points.forEach(point => ctx.lineTo(...point));
  }

  ctx.closePath();
  ctx.stroke();
};

//experiment #1, changing a rectangle's color
const getRandomColor = () => {
  const getRandomNum = () => Math.floor(Math.random() * 9 + 1);
  return "#" + getRandomNum() + getRandomNum() + getRandomNum();
};

const colorChange = () => {
  color = getRandomColor();
  ctx.fillStyle = color;
  ctx.fillRect(10, 10, 100, 100);
};

/**** Utility Functions ***/

// let canvas = document.getElementById("canvas");
// let ctx = canvas.getContext("2d");
// let color = getRandomColor();
// ctx.fillStyle = "red";
// ctx.fillRect(10, 10, 100, 100);
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
// tCtx.font = "18px serif";
// tCtx.fillStyle = "#000";
// tCtx.fillText("A", 105, 25);

//opening visual
//messin around with basic vector graphics
let c1 = document.getElementById("openingVisual");
let ctx1 = c1.getContext("2d");

let triangleColor = "#000";
let fontColor = "#000";
ctx1.fillStyle = triangleColor;
//triangle
let pA = new Point(0, 300);
let pB = new Point(300, 300);
let pC = new Point(300, 0);
let pD = new Point(0, 0);
let triangle = new RightTriangle(pA, pB, pC);
// let triangle = new RightTriangle([0, 300], [300, 300], [300, 0]);
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
let a = new Point(300, 500);
let b = new Point(400, 500);
let c = new Point(400, 300);
let smallTriangle = new RightTriangle(
  new Point(300, 500),
  new Point(400, 500),
  new Point(400, 300)
);
smallTriangle.draw(ctx);
smallTriangle.expandedSquares(ctx);
// ctx.fillRect(0, 0, 100, 100);

// ctx.strokeRect(...a.coordinates(), 100, 100);
// let path = smallTriangle.pathDraw();
// ctx.stroke(path);
// ctx.rotate(Math.PI / 4);

//canvas experiments
// ctx.save();
// ctx.translate(100, 100);
// ctx.fillRect(0, 0, 100, 100);
// ctx.translate(100, 100);
// ctx.fillRect(0, 0, 100, 100);
// ctx.translate(100, 100);
// ctx.rotate(-Math.PI / 4);
// ctx.fillRect(0, 0, 100, 100);
// ctx.restore();
// ctx.fillRect(150, 150, 100, 100);
// ctx.stroke(path);
// setTimeout(() => ctx.clearRect(0, 0, 600, 600), 1000);

// draw(ctx, pA, pB, pC, pD);
