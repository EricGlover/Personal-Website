//TODO: look into bundling these scripts together

/*  drawing functions */

//make a canvas with some dynamic sizing
//returns the created canvas
const makeCanvas = (aspectRatio, width, height) => {
  //make it
  let canvas = document.createElement("canvas");
  canvas.classList.add("background");
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
  //insert canvas into the dom dom dom dooom
  let wrap = document.getElementById("wrapper");
  wrap.append(canvas);
  //ship it
  return canvas;
};

//NOTE: this has a lot of different rendering methods stored
//render the mandelbrot set
const drawMandel = (canvas, mandelbrotSet) => {
  const weirdRender = (canvas, mandelbrotSet) => {
    let ctx = canvas.getContext("2d");
    ctx.fillStyle = "rgb(0,0,0)";
    let iter = mandelbrotSet.pixelGenerator(canvas.width, canvas.height);
    let current;
    let i = 1;
    let delay = 1;
    while (!(current = iter.next()).done) {
      let pixel = current.value;
      if (pixel[2]) {
        setTimeout(() => {
          let x = pixel[0];
          let y = pixel[1];
          ctx.fillRect(x, y, 1, 1);
        }, delay * i);
      }
      i++;
      if (i > 100) {
        i = 1;
        delay++;
      }
    }
  };

  const realTimeRender = (canvas, mandelbrotSet) => {
    let ctx = canvas.getContext("2d");
    ctx.fillStyle = "rgb(0,0,0)";
    let iter = mandelbrotSet.pixelGenerator(canvas.width, canvas.height);
    let current;
    while (!(current = iter.next()).done) {
      let pixel = current.value;
      if (pixel[2]) {
        //try this out
        ctx.fillRect(pixel[0], pixel[1], 1, 1);

        //and this
        // setTimeout(() => {
        //   let x = pixel[0];
        //   let y = pixel[1];
        //   ctx.fillRect(x, y, 1, 1);
        // }, 5);
      }
    }
  };
  const sweep = (canvas, mandelbrotSet) => {
    const pixels = mandelbrotSet.makeMandelbrotPixels(
      canvas.width,
      canvas.height
    );
    const delay = 2;
    //get canvas ready
    let ctx = canvas.getContext("2d");
    ctx.fillStyle = "rgb(0, 0, 0)";
    //render it
    pixels.forEach((row, i) => {
      // row.forEach((isM, j) => {
      //   if (isM) {
      //     ctx.fillRect(i, j, 1, 1);
      //   }
      // });
      // //making a slight animation for the painting
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
  //holy shit this works
  const patchWorkDraw = (canvas, mandelbrotSet) => {
    let ctx = canvas.getContext("2d");
    ctx.fillStyle = "rgb(0, 0, 0)";
    let iter = mandelbrotSet.pixelPatcher(canvas.width, canvas.height, 800);
    let pixels = [];
    let current;
    let timeBetween = 20;
    let nextRun;
    let i = 0;
    let runMaker = () => {
      // console.log("runmaker");
      i++;
      return () => {
        // console.log(`run ${i}`);
        if (!(current = iter.next()).done) {
          pixels = current.value;
          pixels.forEach(pixel => {
            ctx.fillRect(pixel[0], pixel[1], 1, 1);
          });
          //create the next function to run
          nextRun = runMaker();
          //weave in some downtime
          setTimeout(nextRun, timeBetween);
        } else {
          //TODO:
          //add some promise resolving for timing
        }
      };
    };
    nextRun = runMaker();
    setTimeout(nextRun, timeBetween);
  };
  //same thing as patch work but it gradually increases
  //the iterations
  const multiplePassRender = (canvas, mandelbrotSet) => {
    let ctx = canvas.getContext("2d");
    ctx.fillStyle = "rgb(0, 0, 0)";
    let pixels = [];
    let current;
    let timeBetween = 10;
    let nextRun;
    let i = 0;
    let iterations = [16, 32, 64, 128, 256, 512, 1024, 2048];
    let currentIteration = 0;
    mandelbrotSet.depth = iterations[currentIteration];
    let iter = mandelbrotSet.pixelPatcher2(canvas.width, canvas.height, 500);

    let runMaker = () => {
      i++;
      return () => {
        //complete a run
        if (!(current = iter.next()).done) {
          pixels = current.value;
          for (let x in pixels) {
            for (let y in pixels[x]) {
              if (pixels[x][y]) {
                ctx.fillStyle = "rgb(0,0,0)";
                ctx.fillRect(x, y, 1, 1);
              } else {
                ctx.fillStyle = "rgb(255,255,255)";
                ctx.fillRect(x, y, 1, 1);
              }
            }
          }
          //create the next function to run
          nextRun = runMaker();
          //weave in some downtime
          setTimeout(nextRun, timeBetween);
        } else {
          currentIteration++;
          if (currentIteration + 1 > iterations.length) {
            //we're done
            console.log("done");
            //TODO:
            //add some promise resolving for timing
          } else {
            console.log(`current depth = ${iterations[currentIteration]}`);
            mandelbrotSet.depth = iterations[currentIteration];
            iter = mandelbrotSet.pixelPatcher2(
              canvas.width,
              canvas.height,
              800
            );
            nextRun = runMaker();
            //weave in some downtime
            setTimeout(nextRun, timeBetween);
          }
        }
      };
    };
    nextRun = runMaker();
    setTimeout(nextRun, timeBetween);
  };
  // sweep(canvas, mandelbrotSet);
  // realTimeRender(canvas, mandelbrotSet);
  // weirdRender(canvas, mandelbrotSet);
  // patchWorkDraw(canvas, mandelbrotSet);
  multiplePassRender(canvas, mandelbrotSet);
};

//return time taken to run fn
const benchmark = fn => {
  const start = new Date();
  let result = fn();

  const finish = new Date();
  const elapsed = finish - start;
  if (result !== undefined) return [elapsed, result];
  return elapsed;
};

//TODO: finish this and refactor it into a form
///testing out the some jQuery styled things
const test = () => {
  let statsUI = $("#canvasStats");
  s = statsUI;
  let obj = {
    width: 0,
    height: 0,
    iteration: 0
  };
  //grab the values
  statsUI.children().each(function(idx) {
    console.log(`idx ${idx}, this ${this}`);
    if (obj[this.name]) {
      console.log("found ", this.name);
      obj[this.name] = this.value;
    }
  });
  return obj;
};

/* main entry point */
window.onload = () => {
  ///////////
  //testing , see the note above
  // let obj = test();
  // console.log(obj);
  ///////////
  //make our mandelbrot
  const m = new Mandelbrot();
  //set up some variable for reuse
  let canvas;
  let timeTaken;
  const draw = () => {
    //make the canvas, make and render the mandelbrot set
    //and benchmark I suppose
    // let res = benchmark(() => makeCanvas(m.aspectRatio, 2000, 1000)); //kills computer :(
    let res = benchmark(() => makeCanvas(m.aspectRatio));
    canvas = res[1];
    console.log(`make canvas took ${res[0] / 1000} seconds`);
    // canvas = makeCanvas(m.aspectRatio);

    let fn = () => drawMandel(canvas, m);
    timeTaken = benchmark(fn);
    console.log(`draw took ${timeTaken / 1000} seconds`);
  };
  // class UIComponent {
  //   constructor(name){
  //     this.el = $(`#statsCanvas${name}`)
  //   }
  //   get(){
  //     this.el.val()
  //   }
  //   set(value){
  //     this.el.val(value)
  //   }
  // }
  //IIFE  ftw
  const ui = (() => {
    //hook up the UI functionality
    //set the current stats
    // return {
    //   fields: {
    //     width: new UIComponent("Width"),
    //     height: new UIComponent("Height"),
    //     iteration: new UIComponent("Iteration"),
    //     time: new UIComponent("Time")
    //   },
    //
    //   update: function(){
    //     this.fields.forEach()
    //   }
    // }
    //grab these first so we don't have to later
    let w = $("#statCanvasWidth");
    let h = $("#statCanvasHeight");
    let i = $("#statIterationDepth");
    let timeUI = $("#statBenchmark");

    //return a function that updates their values
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
  })();
  //first render
  draw();
  ui();

  //redraw button
  $("#redrawButton").click(e => {
    //remove old canvas
    $("canvas").remove();
    draw();
    ui();
  });

  //TODO: CLEAN / REFACTOR THIS NONSENSE LATER
  //TODO: MAKE INTO FORM
  //might as well make this into a form
};
