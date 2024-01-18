/* utility functions */
//arr1, arr2 => Map(arr1[i] => arr2[i], ...)
const mapper = (keys, values) => {
  let m = new Map();
  keys.forEach((key, i) => {
    m.set(key, values[i]);
  });
  return m;
};

//NOTE: this has a lot of different rendering methods stored
//render the mandelbrot set
async function drawMandel(canvas, mandelbrotSet, renderer = "goAPI") {
    //
    //color constructor
    const Color = function(r, g, b, a) {
      this.red = r;
      this.green = g;
      this.blue = b;
      this.alpha = a;
    };
  
    //colorPicker, given some iteration value return the corresponding color
    const colorPicker = (() => {
      //first we make our colors
      //then we'll return a picker function
      const alpha = 255;
      const white = new Color(0, 0, 0, 0);
      const blue = new Color(25, 169, 252, alpha);
      const red = new Color(220, 0, 0, alpha);
      const gold = new Color(243, 247, 12, alpha - 100);
      const gold2 = new Color(243, 247, 12, alpha);
      const black = new Color(0, 0, 0, 255);
  
      //color scheme #2
      const pink = new Color(253, 0, 255, alpha);
      const yellow = new Color(253, 255, 0, alpha);
      const lime = new Color(0, 255, 56, alpha);
      const cyan = new Color(0, 249, 255, alpha);
      const navy = new Color(60, 0, 255, alpha);
  
      const colors = [white, pink, cyan, gold, red, navy, gold2, blue];
      // const black = gold;
      // const iterations = [16, 32, 64, 128, 256, 512, 1024, 2048];
      const iterations = [16, 24, 28, 44, 64, 128, 400, 512];
      // const colors = [blue, white, red, gold, gold2];
      //tie the two arrays together in a map, iterate over it later
      const colorMap = mapper(iterations, colors);
      const flagValue = 0;
  
      //picker function
      return iteration => {
        if (iteration === true || iteration === flagValue) {
          return black;
        } else if (typeof iteration !== "number") {
          console.error(
            `colorPicker error iteration should be true or a number : ${iteration}`
          );
        }
        //find the smallest color greater than the escape iteration
        for (let [num, color] of colorMap.entries()) {
          if (iteration < num) {
            return color;
          }
        }
        return black;
      };
    })();
  
    //an accidental render function
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
  
    //
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
  
    //?
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
    //uses cooperative runtimes or whatever
    const patchWorkDraw = (canvas, mandelbrotSet) => {
      let ctx = canvas.getContext("2d");
      ctx.fillStyle = "rgb(0, 0, 0)";
      let iter = mandelbrotSet.pixelPatcher(canvas.width, canvas.height, 800000);
      let pixels = [];
      let current;
      let timeBetween = 20;
      let nextRun;
      let i = 0;
      // loadBar.reset();
      // loadBar.start();
      let runMaker = () => {
        console.log("runmaker", i);
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
            // loadBar.stop();
            console.log("done");
            // loadBar.updateUI();
          }
        };
      };
      nextRun = runMaker();
      setTimeout(nextRun, timeBetween);
    };
    //same thing as patch work but it gradually increases
    //the iterations
    //now uses imageData instead of fillRect
    const multiplePassRender = (canvas, mandelbrotSet, resolve) => {
      let ctx = canvas.getContext("2d");
      let pixels = [];
      let current;
      let timeBetween = 10;
      let nextRun;
      let i = 0; //?
      let iterations = [16, 32, 64, 128, 256, 512, 1024, 2048];
      let currentIteration = 0;
      mandelbrotSet.depth = iterations[currentIteration];
      let timeAllotted = 500;
      let genFn = mandelbrotSet.pixelPatcherColor;
      let iter = genFn(canvas.width, canvas.height, timeAllotted);
      let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  
      //here's the crux of our cooperative routine
      const runMaker = () => {
        i++;
        return () => {
          //get the next batch of pixels from our generator
          current = iter.next();
  
          //if we've completed all the pixels needed at this depth / iteration
          //level for the mandelbrot set
          if (current.done) {
            currentIteration++;
            if (currentIteration > iterations.length - 1) {
              //we're done, we've gone through all the iterations
              console.log("done");
              //TODO:
              //add some promise resolving for timing
              if (resolve) resolve();
            } else {
              //set up a new run
              console.log(`current depth = ${iterations[currentIteration]}`);
              mandelbrotSet.depth = iterations[currentIteration];
              iter = genFn(canvas.width, canvas.height, timeAllotted);
              nextRun = runMaker();
              //weave in some downtime
              setTimeout(nextRun, timeBetween);
            }
          }
  
          //if the we haven't run through all the pixels
          if (!current.done) {
            pixels = current.value;
            imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            // let imgData = ctx.createImageData(canvas.width, canvas.height);
            //old method of using fillRect, works but attempting to imageData now
            // for (let x in pixels) {
            //   for (let y in pixels[x]) {
            //     if (pixels[x][y]) {
            //       ctx.fillStyle = "rgb(0,0,0)";
            //       ctx.fillRect(x, y, 1, 1);
            //     } else {
            //       ctx.fillStyle = "rgb(255,255,255)";
            //       ctx.fillRect(x, y, 1, 1);
            //     }
            //   }
            // }
  
            // manipulate some pixels
            let data = imgData.data;
            const bytesPerPixel = 4;
            //iterate over the pixels we completed
            for (let x in pixels) {
              for (let y in pixels[x]) {
                //transform our x,y coords in the index in the pixel array
                let idx =
                  (y - 1) * bytesPerPixel * canvas.width +
                  (x - 1) * bytesPerPixel; //is it 0 based
                //if pixel is in set color black
                let color = colorPicker(pixels[x][y]);
                //set color
                data[idx] = color.red;
                data[idx + 1] = color.green;
                data[idx + 2] = color.blue;
                data[idx + 3] = color.alpha;
              }
            }
            // //render
            ctx.putImageData(imgData, 0, 0);
            //create the next function to run
            nextRun = runMaker();
            //weave in some downtime
            setTimeout(nextRun, timeBetween);
          }
        };
      }; //end of runMaker()
  
      //make our function and set it to run soon
      nextRun = runMaker();
      setTimeout(nextRun, timeBetween);
    };
    const renderFromAPI = async (canvas, mSet, maxIterations) => {
      let ctx = canvas.getContext("2d");
      let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      //
      //then make a call to our go api
      // let port = 8080;
      let url = "/api/img";
      let domain = "https://mandelbrot-api.herokuapp.com/";
      domain = "http://127.0.0.1:8080/";
      const makeParams = obj => {
        return Object.keys(obj)
          .map(key => `${key}=${obj[key]}`)
          .join("&");
      };
      const q = {
        canvasWidth: canvas.width,
        canvasHeight: canvas.height,
        maxIterations: maxIterations || 100,
        planeCoordinates: [1, 1, -1, -2]
      };
      const params = makeParams(q);
      // console.log(`params = ${params}`);
      const endpoint = "img";
      // console.log(`${host}:${port}/api/${endpoint}?${params}`);
      let res;
      let pixels;
      try {
        // loadBar.start();
        res = await fetch(`${domain}api/${endpoint}?${params}`);
        pixels = await res.json();
        // loadBar.stop();
        // loadBar.updateUI();
      } catch (e) {
        console.error(e);
      }
      //
      // manipulate some pixels
      let data = imgData.data;
  
      const bytesPerPixel = 4;
      //iterate over the pixels we completed
      for (let x in pixels) {
        for (let y in pixels[x]) {
          //transform our x,y coords in the index in the pixel array
          let idx =
            (y - 1) * bytesPerPixel * canvas.width + (x - 1) * bytesPerPixel; //is it 0 based
          //if pixel is in set color black
          let color = colorPicker(pixels[x][y]);
          //set color
          data[idx] = color.red;
          data[idx + 1] = color.green;
          data[idx + 2] = color.blue;
          data[idx + 3] = color.alpha;
        }
      }
      // //render
      ctx.putImageData(imgData, 0, 0);
    };
    //The actual call to the current render function being used
    ////
    var render = renderer;
    switch (render) {
      case "sweep":
        sweep(canvas, mandelbrotSet);
        break;
      case "realTime":
        realTimeRender(canvas, mandelbrotSet);
        break;
      case "weird":
        weirdRender(canvas, mandelbrotSet);
        break;
      case "patchWork":
        patchWorkDraw(canvas, mandelbrotSet);
        break;
      case "multiPassRender":
        multiplePassRender(canvas, mandelbrotSet);
        break;
      case "goAPI":
        await renderFromAPI(canvas, mandelbrotSet);
        break;
      default:
        await renderFromAPI(canvas, mandelbrotSet);
    }
  }
  function getRendererOptions() {
    return [
      "sweep",
      "realTime",
      "weird",
      "patchWork",
      "multiPassRender",
      "goAPI"
    ];
  };
  
  export {drawMandel, getRendererOptions};