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

/* main entry point */

window.onload = () => {
  //make our mandelbrot
  const m = new Mandelbrot();
  console.log(m);
  //make the canvas, make and render the mandelbrot set
  //and benchmark I suppose
  let canvas = makeCanvas(m.aspectRatio);
  let fn = () => drawMandel(canvas, m);
  let t = benchmark(fn);
  console.log("drawMandel took ", t / 1000, " seconds");

  //hook up the UI functionality
  //set the current stats
  let w = $("#statCanvasWidth");
  let h = $("#statCanvasHeight");
  h.text(`Canvas height : ${canvas.height}`);
  w.text(`Canvas width : ${canvas.width}`);

  //iteration depth
  $("#statIterationDepth").text(`Iteration depth : ${m.depth}`);

  //benchmark section
  $("#statBenchmark").text(
    `It took ${t / 1000} seconds to make the mandelbrot set`
  );

  //redraw button
  $("#redrawButton").click(e => {
    // draw()
    //make the canvas, make and render the mandelbrot set
    //and benchmark I suppose
    let canvas = makeCanvas(m.aspectRatio);
    let fn = () => drawMandel(canvas, m);
    let t = benchmark(fn);
    console.log("drawMandel took ", t / 1000, " seconds");
    // updateUI()

    //hook up the UI functionality
    //set the current stats
    let w = $("#statCanvasWidth");
    let h = $("#statCanvasHeight");
    h.text(`Canvas height : ${canvas.height}`);
    w.text(`Canvas width : ${canvas.width}`);

    //iteration depth
    $("#statIterationDepth").text(`Iteration depth : ${m.depth}`);

    //benchmark section
    $("#statBenchmark").text(
      `It took ${t / 1000} seconds to make the mandelbrot set`
    );
  });

  //TODO: CLEAN / REFACTOR THIS NONSENSE LATER
  //TODO: MAKE INTO FORM
  //TODO: ADD REDRAW FUNCTIONALITY
  //might as well make this into a form
};
