"use strict";

/**
 * 
 The CanvasRenderingContext2D 2D rendering context represents a flat linear Cartesian surface whose 
 origin (0,0) is at the top left corner, with the coordinate space having x values increasing when going right,
 and y values increasing when going down.
 https://html.spec.whatwg.org/multipage/canvas.html
 */


export default async function render(canvas, maxIterations) {
    let tester = new Tester();
    // tester.paintStripes(canvas);
    // return;
    // tester.renderTop(canvas, tester.black);
    // tester.renderBottom(canvas, tester.gold);
    // tester.paintAll(canvas, tester.blue);
    // return;
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

    let arr = new Array(pixels.length);
    for (let x in pixels) {
        for (let y in pixels[x]) {

        }
    }

    //iterate over the pixels we completed
    // for (let x = pixels.length - 1; x >= 0; x--) {
    // remember the canvas is, top left (0,0)
    // debugger;

    for (let idx = 0; idx <= data.length - 1; idx += bytesPerPixel) {
        let ix = Math.round(idx / bytesPerPixel);
        //we start at top left of canvas
        let rowIdx = Math.round(ix / canvas.width);
        let pixIdx = Math.round(ix % canvas.width);
        let color = colorPicker(pixels[rowIdx][pixIdx]);
        //set color
        data[idx] = color.red;
        data[idx + 1] = color.green;
        data[idx + 2] = color.blue;
        data[idx + 3] = color.alpha;
    }

    // for (let i = pixels.length - 1; i >= 0; i--) {
    //     // for (let i=0; i < pixels.length -1 ; i++) {
    //     for (let y = pixels[i].length; y >= 0; y--) {
    //         // for (let y = 0; y < pixels[i].length; y++) {
    //         // debugger;
    //         //transform our x,y coords in the index in the pixel array
    //         let idx =
    //             (y - 1) * bytesPerPixel * canvas.width + (i - 1) * bytesPerPixel; //is it 0 based
    //         //if pixel is in set color black
    //         let color = colorPicker(pixels[i][y]);
    //         //set color
    //         data[idx] = color.red;
    //         data[idx + 1] = color.green;
    //         data[idx + 2] = color.blue;
    //         data[idx + 3] = color.alpha;
    //     }
    // }








    // for (let x in pixels) {
    //     for (let y in pixels[x]) {
    //         debugger;
    //         //transform our x,y coords in the index in the pixel array
    //         let idx =
    //             (y - 1) * bytesPerPixel * canvas.width + (x - 1) * bytesPerPixel; //is it 0 based
    //         //if pixel is in set color black
    //         let color = colorPicker(pixels[x][y]);
    //         //set color
    //         data[idx] = color.red;
    //         data[idx + 1] = color.green;
    //         data[idx + 2] = color.blue;
    //         data[idx + 3] = color.alpha;
    //     }
    // }
    // //render
    ctx.putImageData(imgData, 0, 0);
}

class Tester {
    constructor() {
        this.alpha = 255;
        this.white = new Color(0, 0, 0, 0);
        this.blue = new Color(25, 169, 252, this.alpha);
        this.red = new Color(220, 0, 0, this.alpha);
        this.gold = new Color(243, 247, 12, this.alpha - 100);
        this.gold2 = new Color(243, 247, 12, this.alpha);
        this.black = new Color(0, 0, 0, 255);
    }

    paintStripes(canvas, color1 = this.black, color2 = this.gold) {
        let ctx = canvas.getContext("2d");
        let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let data = imgData.data;

        const bytesPerPixel = 4;
        //iterate over the pixels we completed
        for (let i = 0; i + 3 <= data.length - 1; i += 4) {
            let color;
            if ((i / 4) % 2 === 0) {
                color = color1;
            } else {
                color = color2;
            }
            data[i] = color.red;
            data[i + 1] = color.green;
            data[i + 2] = color.blue;
            data[i + 3] = color.alpha;
        }
        ctx.putImageData(imgData, 0, 0);

    }
    paintAll(canvas, color = this.black) {
        let ctx = canvas.getContext("2d");
        let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let data = imgData.data;

        const bytesPerPixel = 4;
        //iterate over the pixels we completed
        for (let i = 0; i + 3 <= data.length - 1; i += 4) {
            data[i] = color.red;
            data[i + 1] = color.green;
            data[i + 2] = color.blue;
            data[i + 3] = color.alpha;
        }
        ctx.putImageData(imgData, 0, 0);
    }
    renderTop(canvas, color = this.black) {
        let ctx = canvas.getContext("2d");
        let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let data = imgData.data;

        const bytesPerPixel = 4;
        //iterate over the pixels we completed
        for (let i = 0; i + 3 <= data.length / 2 - 1; i += 4) {
            data[i] = color.red;
            data[i + 1] = color.green;
            data[i + 2] = color.blue;
            data[i + 3] = color.alpha;
        }
        ctx.putImageData(imgData, 0, 0);
    }
    renderBottom(canvas, color = this.black) {
        let ctx = canvas.getContext("2d");
        let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let data = imgData.data;

        const bytesPerPixel = 4;
        //iterate over the pixels we completed
        // console.log('width = ', imgData.width);
        // console.log("height = ", imgData.height);
        // console.log("pixels = ", imgData.width * imgData.height);
        // console.log('data length = ', data.length);
        for (let i = data.length / 2; i + 3 <= data.length - 1; i += 4) {
            data[i] = color.red;
            data[i + 1] = color.green;
            data[i + 2] = color.blue;
            data[i + 3] = color.alpha;
        }
        ctx.putImageData(imgData, 0, 0);
    }
}

class Color {
    constructor(r, g, b, a) {
        this.red = r;
        this.green = g;
        this.blue = b;
        this.alpha = a;
    };
}
/* utility functions */
//arr1, arr2 => Map(arr1[i] => arr2[i], ...)
const mapper = (keys, values) => {
    let m = new Map();
    keys.forEach((key, i) => {
        m.set(key, values[i]);
    });
    return m;
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