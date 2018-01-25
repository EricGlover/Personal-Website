$(document).ready(() => {
  //get the canvas
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");

  //grab our canvas' image data
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let data = imgData.data;
  // console.log("loaded");
  // console.log(imgData);
  // console.log(data);
  const red = 0;
  const green = 0;
  const blue = 255;
  const alpha = 255;
  //manipulate it
  //seems like 0, 0 on the canvas is the bottom left corner
  //which is typical for graphics
  //
  for (let i = 0; i < data.length; i += 4) {
    //bottom should be blue
    if (i < data.length / 2) {
      data[i] = red;
      data[i + 1] = green;
      data[i + 2] = blue;
      data[i + 3] = alpha;
    } else {
      //top half should be red
      data[i] = 255;
      data[i + 1] = 0;
      data[i + 2] = 0;
      data[i + 3] = alpha;
    }
  }
  // console.log(imgData);
  //place it back into the context for rendering
  ctx.putImageData(imgData, 0, 0);
});
