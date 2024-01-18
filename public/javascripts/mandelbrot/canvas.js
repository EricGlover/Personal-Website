"use strict";

import LoadBar from "./Utils/LoadBar.js";
import Stats from "./Utils/Stats.js";
import Mandelbrot from "./mandelbrot.js";
import {drawMandel, getRendererOptions} from "./DrawMandel.js";
import render from './render.js';

const stats = new Stats();
const loadBar = new LoadBar();

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
  statsUI.children().each(function (idx) {
    console.log(`idx ${idx}, this ${this}`);
    if (obj[this.name]) {
      console.log("found ", this.name);
      obj[this.name] = this.value;
    }
  });
  return obj;
};

function getCanvasSettings($container = $("#stats")) {
  let width = $container.find("#canvasWidth").val();
  let height = $container.find("#canvasHeight").val();
  let aspectRatio = $container.find("#canvasAspectRatio").val() || [7, 4];
  let iterations = $container.find("#iterations").val() || 100;
  let renderMethod = $container.find("#renderer").val() || "goAPI";
  return {
    width,
    height,
    aspectRatio,
    iterations,
    renderer: renderMethod
  };
}

/* main entry point */
window.onload = async () => {
  //populate options for renders
  let renderers = getRendererOptions();
  let $select = $("#stats").find("#renderer");
  renderers.forEach(option => {
    let selected = option === "goAPI";
    $select.append(
      $(`<option ${selected ? selected : ""}val=${option}>${option}</option>`)
    );
  });
  $("#canvasWidth").val(document.body.scrollWidth);
  $("#canvasHeight").val(document.body.scrollHeight);
  $("#renderer").val("goAPI");

  //make our mandelbrot
  const m = new Mandelbrot();
  window.m = m;
  //set up some variable for reuse
  let canvas;
  let timeTaken;
  const draw = async (useDefault = true) => {
    let width, height, aspectRatio, iterations, renderer;
    if (useDefault) {
      width = document.body.scrollWidth;
      height = document.body.scrollHeight;
      aspectRatio = m.aspectRatio;
      iterations = 100;
    } else {
      let data = getCanvasSettings();
      width = data.width;
      height = data.height;
      aspectRatio = data.aspectRatio;
      iterations = data.iterations;
      renderer = data.renderer;
    }
    //make the canvas, make and render the mandelbrot set
    //and benchmark I suppose

    // let res = benchmark(() => makeCanvas(m.aspectRatio, 2000, 1000)); //kills computer :(
    // let res = benchmark(() => makeCanvas(aspectRatio, width, height));
    // canvas = res[1];
    canvas = makeCanvas(aspectRatio, width, height);
    // canvas = makeCanvas(m.aspectRatio);
    console.log("renderer = ", renderer)
    // let fn = () => drawMandel(canvas, m, renderer);
    // timeTaken = benchmark(fn);
    // console.log(`draw took ${timeTaken / 1000} seconds`);
    // await drawMandel(canvas, m, renderer);
    await render(canvas, iterations)
  };

  //first render
  loadBar.start();
  await draw();
  loadBar.stop();
  loadBar.updateUI();

  //redraw button
  $("#redrawButton").click(async (e) => {
    //remove old canvas
    $("canvas").remove();
    loadBar.start();
    await draw(false);
    loadBar.stop();
    loadBar.updateUI();
  });
};
