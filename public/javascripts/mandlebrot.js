//the idea hear is we test using the canvas api
//to draw the mandelbrot set

//
// const complex = function(){
//   return {
//     r: 0,
//     i: 0
//   }
// }

//check to see if c is in the mandlebrot set
const isMandelbrot = (cR, cI) => {
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
  maxIterations = 100;
  distance = 2 * 2;
  for (let i = 0; i < maxIterations; i++) {
    z = fn(...z, cR, cI);
    console.log(`iteration ${i}: z is now ${z}`);
    if (z[0] * z[0] + z[1] * z[1] > distance) {
      return false;
    }
  }
  return true;
};

//quick and dirty test function
const test = () => {
  //isMandelbrot test
  //note z = [real, imaginary]
  const tests = [
    //basic values of z that are in the set
    {
      z: [0, 0],
      answer: true
    },
    {
      z: [-1, 0],
      answer: true
    },
    {
      z: [0, 1],
      answer: true
    },
    {
      z: [0, -2],
      answer: true
    },
    //basic values of z that are not in the set, the corners
    {
      z: [-2, 1],
      answer: false
    },
    {
      z: [1, 1],
      answer: false
    },
    {
      z: [1, -1],
      answer: false
    },
    {
      z: [-2, -1],
      answer: false
    }
  ];
  let failedCases = 0;
  tests.forEach(t => {
    if ((ans = isMandelbrot(...t.z)) != t.answer) {
      console.error(
        `case : ${t.z}, isMandelbrot() -> ${ans}, expected ${t.answer}`
      );
      failedCases++;
    }
  });
  console.log(`failed ${failedCases} cases`);
};
test();

