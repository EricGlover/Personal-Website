//TODO: look into bundling these scripts together

/*  drawing functions */

//make a canvas with some dynamic sizing
//returns the created canvas
const makeCanvas = (aspectRatio, width, height) => {
  //make it
  let canvas = document.createElement("canvas");

  //try to size it to use maximal amount of width
  //size it, try and preserve the aspect ratio

  //set width
  if (width === null || width === undefined) {
    width = document.body.scrollWidth;
  }
  //set height
  if (height === null || height === undefined) {
    height = (() => {
      let unit = width / aspectRatio[0];
      let height = document.body.scrollHeight;
      if (height / aspectRatio[1] > unit) {
        height = Math.floor(unit * aspectRatio[1]);
      }
      return height;
    })();
  }
  canvas.width = width;
  canvas.height = height;
  //insert into the dom dom dom dooom
  let wrap = document.getElementById("wrapper");
  wrap.append(canvas);
  //ship it
  return canvas;
};

//render the mandelbrot set
const drawMandel = (canvas, mandelbrotSet) => {
  const pixels = mandelbrotSet.makeMandelbrotPixels(
    canvas.width,
    canvas.height
  );
  const delay = 10;
  //get canvas ready
  let ctx = canvas.getContext("2d");
  ctx.fillStyle = "rgb(0, 0, 0)";
  //render it
  pixels.forEach((row, i) => {
    //making a slight animation for the painting
    let fn = () => {
      row.forEach((isM, j) => {
        if (isM) {
          ctx.fillRect(i, j, 1, 1);
        }
      });
    };
    setTimeout(fn, i * delay);
  });
};

//return time taken to run fn
const benchmark = fn => {
  const start = new Date();
  fn();
  const finish = new Date();
  const elapsed = finish - start;
  return elapsed;
};
let s;
/* main entry point */
const test = () => {
  let statsUI = $("#canvasStats");
  s = statsUI;
  let obj = {
    width: 0,
    height: 0
  };
  //grab the values
  statsUI.children().each(function(idx) {
    console.log(`idx ${idx}, this ${this}`);
    if (obj[this.name]) {
      console.log("found ", this.name);
      obj[this.name] = this.value;
    }
  });
  //silly benchmark test
  let fn = () => testD();
  let fn1 = () => testJ();
  let t = benchmark(fn);
  console.log(`dom api took ${t / 1000}`);
  t = benchmark(fn1);
  console.log(`jQuery api took ${t / 1000}`);
  return obj;
};
const tries = 10e4;
const testD = () => {
  let c;
  let names = ["height", "width"];
  for (let i = 0; i < tries; i++) {
    c = document.getElementById("canvasStats");
    c.children[names[0]].value = 0;
    c.children[names[1]].value = 0;
  }
  console.log(`dom api found ${c}`);
};
const testJ = () => {
  let c;
  let names = ["height", "width"];
  for (let i = 0; i < tries; i++) {
    c = $("#canvasStats");
    $(c.children()[0]).val(0);
    $(c.children()[1]).val(0);
    // c.children().each(function() {
    //   $(this).val(0);
    // });
  }
  console.log(`jQuery found ${c}`);
};
window.onload = () => {
  let obj = test();
  console.log(obj);
  //make our mandelbrot
  const m = new Mandelbrot();
  //set up some variable for reuse
  let canvas;
  let timeTaken;
  const draw = () => {
    //make the canvas, make and render the mandelbrot set
    //and benchmark I suppose
    canvas = makeCanvas(m.aspectRatio);
    let fn = () => drawMandel(canvas, m);
    timeTaken = benchmark(fn);
  };
  const ui = () => {
    //hook up the UI functionality
    //set the current stats
    let w = $("#statCanvasWidth");
    let h = $("#statCanvasHeight");
    let i = $("#statIterationDepth");
    let timeUI = $("#statBenchmark");
    return () => {
      h.text(`Canvas height : ${canvas.height}`);
      w.text(`Canvas width : ${canvas.width}`);
      //iteration depth
      i.text(`Iteration depth : ${m.depth}`);
      //benchmark section
      timeUI.text(
        `It took ${timeTaken / 1000} seconds to make the mandelbrot set`
      );
    };
  };
  //first render
  // draw();
  // ui();

  //redraw button
  $("#redrawButton").click(e => {
    draw();
    ui();
  });

  //TODO: CLEAN / REFACTOR THIS NONSENSE LATER
  //TODO: MAKE INTO FORM
  //might as well make this into a form
};
