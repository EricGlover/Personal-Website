/* utility functions */
//arr1, arr2 => Map(arr1[i] => arr2[i], ...)
const mapper = (keys, values) => {
  let m = new Map();
  keys.forEach((key, i) => {
    m.set(key, values[i]);
  });
  return m;
};

//TODO: look into bundling these scripts together
//TODO: ATTEMPT TO SPEED IT UP
//THEN ADD IT AS MY NEW BACKGROUND IMAGE
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
  // const iterations = [16, 32, 64, 128, 256, 512, 1024, 2048];
  const iterations = [16];

  //color constructor
  const Color = function(r, g, b, a) {
    this.red = r;
    this.green = g;
    this.blue = b;
    this.alpha = a;
  };
  const black = new Color(0, 0, 0, 255);
  let inSetColor = black;

  //colorPicker, given some iteration value return the corresponding color
  const colorPicker = (inSetColor => {
    //first we make our colors
    //then we'll return a picker function
    const alpha = 255;
    const white = new Color(0, 0, 0, 0);
    const blue = new Color(25, 169, 252, alpha);
    const red = new Color(220, 0, 0, alpha);
    const gold = new Color(243, 247, 12, alpha - 100);
    const gold2 = new Color(243, 247, 12, alpha);
    // const black = new Color(0, 0, 0, 255);
    const black = inSetColor;
    // const inSetColor = black;

    //color scheme #2
    const pink = new Color(253, 0, 255, alpha);
    const yellow = new Color(253, 255, 0, alpha);
    const lime = new Color(0, 255, 56, alpha);
    const cyan = new Color(0, 249, 255, alpha);
    const navy = new Color(60, 0, 255, alpha);

    const colors = [white, pink, cyan, gold, red, navy, gold2, blue];
    // const black = gold;
    // const iterations = [16, 32, 64, 128, 256, 512, 1024, 2048];
    // const colors = [blue, white, red, gold, gold2];
    //tie the two arrays together in a map, iterate over it later
    const colorMap = mapper(iterations, colors);

    //picker function
    return iteration => {
      if (iteration === true) {
        return inSetColor;
      } else if (typeof iteration !== "number") {
        console.error(
          `colorPicker error iteration should be true or a number : ${iteration}`
        );
      }
      for (let [num, color] of colorMap.entries()) {
        if (iteration < num) {
          return color;
        }
      }
      return inSetColor;
    };
  })(inSetColor);

  //section off the canvas into chunks
  //schedule separate functions for each chunk
  //plop all the functions we'll need into a queue
  //pop through the queue checking the time as we go
  //
  //all the anon functions should only consider black pixels
  ////the pixels still thought to be in the set

  //grab our canvas
  let ctx = canvas.getContext("2d");
  // ctx.fillStyle = "rgb(0, 0, 0, 0)";
  ctx.fillStyle = `rgb(${inSetColor.red},${inSetColor.green},${
    inSetColor.blue
  },${inSetColor.alpha}`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  let img = ctx.getImageData(0, 0, canvas.width, canvas.height);

  //first paint it black
  // ctx.fillStyle = `rgb(${inSetColor.red},${inSetColor.green},${
  //   inSetColor.blue
  // }`;

  //make our canvas chunks
  const pixelsPerChunk = 500;
  const bytesPerPixel = 4;

  const queue = [];
  let imgData = img.data;
  console.log(imgData);
  //make enough functions for all the different iterations x chunks
  for (let i = 0; i < iterations.length; i++) {
    let currentIeration = iterations[i];

    img = ctx.getImageData(0, 0, canvas.width, canvas.height);
    for (let j = 0; j < imgData.length; j += bytesPerPixel * pixelsPerChunk) {
      //make our function & push it onto the queue
      queue.push(() => {
        console.log("running");
        //iterate over your chunk
        for (let k = j; k < j + bytesPerPixel * pixelsPerChunk; k += 4) {
          //if it's the inSetColor, then check it out
          // console.log(inSetColor);
          if (
            imgData[k] === inSetColor.red &&
            imgData[k + 1] === inSetColor.green &&
            imgData[k + 2] === inSetColor.blue &&
            imgData[k + 3] === inSetColor.alpha
          ) {
            //convert imgData index to x,y coords
            // console.log("found ");
            const bytesPerRow = bytesPerPixel * canvas.width;
            const x = k % bytesPerRow + 1;
            const y = Math.floor(k / bytesPerRow) + 1;

            //convert x,y coords to mandelbrot set coords
            const [cR, cI] = mandelbrotSet.convertCoordinates(
              x,
              y,
              canvas.width,
              canvas.height
            );

            //check if it's in the Set at the depth
            const [inMSet, escapeIteration] = mandelbrotSet.inSet(
              cR,
              cI,
              currentIeration
            );

            let color;
            if (inMSet) {
              color = inSetColor;
              // console.log(inMSet, escapeIteration);
              // console.log(`k = ${k}`);
              // console.log(color);
            } else {
              console.log(inMSet, escapeIteration);
              color = colorPicker(escapeIteration);
              // console.log(color);
            }

            //manipulate some pixels
            imgData[k] === color.red;
            imgData[k + 1] === color.green;
            imgData[k + 2] === color.blue;
            imgData[k + 3] === color.alpha;
          }
        }
      });
    }
  }
  //scheduling
  let timeAllotted = 500;
  //simple first
  let delay = 1;
  console.log("scheduling");
  console.log(queue);
  queue.forEach((fn, i) => {
    setTimeout(fn, i * delay);
  });
  // while(queue.length > 0){
  //   //change this nasty shift later
  //   setTimeout(queue.shift(), )
  //
  // }
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
