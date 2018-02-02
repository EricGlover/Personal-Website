//TODO: ADD CHANGING OUR LOCATION ON COMPLEX PLANE
//TODO: MAKE MULTIPLE RESOLUTIONS
//TODO: EXPERIMENT WITH DIFFERENT ALGORITHMS
//TODO: consider throwing this on the backend and doing some caching,
///////of course that kind of defeats the point

//the idea here is we test using the canvas api
//to draw the mandelbrot set

//MANDELBROT CONSTRUCTOR
const Mandelbrot = function() {
  //all cases pass at 100 for sure, so far
  this.depth = 100; //number of iterations

  //dimensions of our mandelbrot set
  //x axis : [-2.5, 1]      [ = inclusive
  //y axis : [-1, 1]
  this.bounds = {
    left: -2.5,
    right: 1,
    top: 1,
    bottom: -1
  };
  this.width = 3.5; //mandelbrot set width
  this.height = 2; //mandelbrot set height

  this.aspectRatio = [7, 4];
  this.pixelPatcherColor = Mandelbrot.prototype.pixelPatcherColor.bind(this);
};

//same as isMandelbrot but different return
//check to see if c is in the mandlebrot set, return [bool, escapeIteration]
Mandelbrot.prototype.inSet = function(cR, cI, maxIterations = this.depth) {
  //definition of mandelbrot set, for a given num c, if we iterate fn (the function below)
  //does the sequence go NaNers (go to infinity)

  //Using the typical Escape style of computation
  //we're going to use some estimation to compute this
  //if the sequence escapes a given distance from 0 then we'll assume it's not in the set
  //also we'll only check so many iterations

  //fn(z) = z^2 + c
  //z == (a + bi)
  //z^2 == a^2 + 2abi - b^2
  //Real(z^2 + c) == a^2 - b^2 + Real(c)
  //Imaginary(z^2 + c) == 2abi + Img(c)
  const fn = (zR, zI, cR, cI) => {
    const real = zR ** 2 - zI ** 2 + cR;
    const im = 2 * zR * zI + cI;
    return [real, im];
  };

  let z = [0, 0];
  const distance = 2 * 2;
  for (let i = 0; i < maxIterations; i++) {
    z = fn(z[0], z[1], cR, cI);
    if (z[0] * z[0] + z[1] * z[1] > distance) {
      return [false, i];
    }
  }
  return [true, null];
};

Mandelbrot.prototype.convertCoordinates = function(x, y, width, height) {
  const xRatio = this.width / width;
  const yRatio = this.height / height;
  //translate pixels coordinates to mandelbrot coordinates
  //scale x, then move it
  let mX = xRatio * x + this.bounds.left;
  //scale y, then move it
  let mY = yRatio * y + this.bounds.bottom;
  return [mX, mY];
};

//pretty much the same as Pixel patcher 2 but returns
//pixels[x][y] : escape iteration || true
//NOTE: moderately clean
//return both in set and out of set,
//return when complete or when timeAllotted runs out
Mandelbrot.prototype.pixelPatcherColor = function*(
  width,
  height,
  timeAllotted = 100
) {
  //dimensions of our mandelbrot set
  //x axis : [-2.5, 1]      [ = inclusive
  //y axis : [-1, 1]
  const xRatio = this.width / width;
  const yRatio = this.height / height;

  let pixels = {}; // our return obj of pixels
  let start = new Date();

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      //translate pixels coordinates to mandelbrot coordinates
      //scale x, then move it
      let mX = xRatio * x + this.bounds.left;
      //scale y, then move it
      let mY = yRatio * y + this.bounds.bottom;

      //housekeeping / add the pixel
      if (!pixels[x]) pixels[x] = {};

      pixels[x][y] = true; //defaults to is in set

      let res = this.inSet(mX, mY);
      //if it's not in the set then set
      //the escape iteration
      if (res[0] === false) {
        pixels[x][y] = res[1];
      }
    }
    //time to check in
    let now = new Date();
    if (timeAllotted > now - start) {
      //if past due then throw our results
      yield pixels;
      //reset things
      pixels = {};
      start = new Date();
    }
  }
  return;
};
