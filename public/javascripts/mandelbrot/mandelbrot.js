//TODO: ADD CHANGING OUR LOCATION ON COMPLEX PLANE
//TODO: MAKE MULTIPLE RESOLUTIONS
//TODO: EXPERIMENT WITH DIFFERENT ALGORITHMS
//TODO: consider throwing this on the backend and doing some caching,
///////of course that kind of defeats the point

//the idea here is we test using the canvas api
//to draw the mandelbrot set

//MANDELBROT CONSTRUCTOR
function Mandelbrot() {
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
}

//check to see if c is in the mandlebrot set
Mandelbrot.prototype.isMandelbrot = function(cR, cI) {
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
  const maxIterations = this.depth;
  const distance = 2 * 2;
  for (let i = 0; i < maxIterations; i++) {
    z = fn(z[0], z[1], cR, cI);
    // console.log(`iteration ${i}: z is now ${z}`);
    if (z[0] * z[0] + z[1] * z[1] > distance) {
      return false;
    }
  }
  return true;
};

//same as isMandelbrot but different return
//check to see if c is in the mandlebrot set, return [bool, escapeIteration]
Mandelbrot.prototype.inSet = function(cR, cI) {
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
  const maxIterations = this.depth;
  const distance = 2 * 2;
  for (let i = 0; i < maxIterations; i++) {
    z = fn(z[0], z[1], cR, cI);
    if (z[0] * z[0] + z[1] * z[1] > distance) {
      return [false, i];
    }
  }
  return [true, null];
};

//given width in pixels and height in pixels
//return a matrix of bools indicating if that pixel is part of
//the mandelbrot set
Mandelbrot.prototype.makeMandelbrotPixels = function(width, height) {
  xRatio = this.width / width;
  yRatio = this.height / height;

  //make a 2d array of bools
  pixels = Array(width)
    .fill(0)
    .map(row => Array(height).fill(false));
  // console.log(pixels);
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      //translate pixels coordinates to mandelbrot coordinates
      let mX = xRatio * x - 2.5;
      let mY = yRatio * y - 1;
      pixels[x][y] = this.isMandelbrot(mX, mY);
    }
  }
  return pixels;
};

//return only pixels in the set, return when complete or when timeAllotted runs out
Mandelbrot.prototype.pixelPatcher = function*(
  width,
  height,
  timeAllotted = 100
) {
  //dimensions of our mandelbrot set
  //x axis : [-2.5, 1]      [ = inclusive
  //y axis : [-1, 1]
  const xRatio = this.width / width;
  const yRatio = this.height / height;
  let pixels = [];
  let start = new Date();

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      //translate pixels coordinates to mandelbrot coordinates
      let mX = xRatio * x - 2.5;
      let mY = yRatio * y - 1;
      if (this.isMandelbrot(mX, mY)) {
        pixels.push([x, y]);
      }
    }
    //time to check in
    let now = new Date();
    if (timeAllotted > now - start) {
      //if past due then throw our results
      yield pixels;
      //reset things
      pixels = [];
      start = new Date();
    }
  }
  return;
};

//NOTE: moderately clean
//return both in set and out of set,
//return when complete or when timeAllotted runs out
Mandelbrot.prototype.pixelPatcher2 = function*(
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
      pixels[x][y] = false; //default to false

      //if the complex num (mX, mY) is in the set
      //then add that pixel and set it to true
      if (this.isMandelbrot(mX, mY)) pixels[x][y] = true;
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

//yields a pixel at a time
Mandelbrot.prototype.pixelGenerator = function*(width, height) {
  //dimensions of our mandelbrot set
  //x axis : [-2.5, 1]      [ = inclusive
  //y axis : [-1, 1]
  const xRatio = this.width / width;
  const yRatio = this.height / height;

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      //translate pixels coordinates to mandelbrot coordinates
      let mX = xRatio * x - 2.5;
      let mY = yRatio * y - 1;
      yield [x, y, this.isMandelbrot(mX, mY)];
    }
  }
  return;
};

//TODO: setup some tests for pixels scaling
//TODO: add some benchmarking
//quick and dirty test function
Mandelbrot.prototype.test = () => {
  //isMandelbrot test
  //note z = [real, imaginary]
  const tests = [
    //basic values of z that are in the set
    {
      z: [0, 0],
      answer: true,
      failed: true
    },
    {
      z: [-1, 0],
      answer: true,
      failed: true
    },
    {
      z: [0, 1],
      answer: true,
      failed: true
    },
    {
      z: [-2, 0],
      answer: true,
      failed: true
    },
    //basic values of z that are not in the set, the corners
    {
      z: [-2, 1],
      answer: false,
      failed: true
    },
    {
      z: [1, 1],
      answer: false,
      failed: true
    },
    {
      z: [1, -1],
      answer: false,
      failed: true
    },
    {
      z: [-2, -1],
      answer: false,
      failed: true
    },
    //testing floats
    {
      z: [-0.2, -0.1],
      answer: true,
      failed: true
    },
    {
      z: [0, 0.1],
      answer: true,
      failed: true
    },
    {
      z: [-1, 0.0001],
      answer: true,
      failed: true
    },
    {
      z: [-0.2, 0.2],
      answer: true,
      failed: true
    },
    //zooming in and starting to look for detail
    {
      z: [-0.75, 0],
      answer: true,
      failed: true
    },
    {
      z: [-0.784, 0.344],
      answer: false,
      failed: true
    },
    {
      z: [-0.784, 0.275],
      answer: false,
      failed: true
    },
    {
      z: [-0.767, 0.189],
      answer: false,
      failed: true
    },
    {
      z: [-0.802, 0.12],
      answer: true,
      failed: true
    }
  ];
  let failedCases = 0;
  tests.forEach((t, i) => {
    if ((ans = isMandelbrot(...t.z)) != t.answer) {
      console.error(
        `case : ${i}, isMandelbrot(${t.z}) -> ${ans}, expected ${t.answer}`
      );
      failedCases++;
    } else {
      t.failed = false;
    }
  });
  tests.forEach(printOverview);
  console.log(`failed ${failedCases} cases`);
};

const printOverview = (c, i) =>
  console.log(`case ${i}: ${c.failed ? "FAIL" : "Pass"}`);

export default Mandelbrot;
