import { Slider } from "../../src/fastSlider.js";
import { getAverageColor } from "../../src/getAverageColor.js";

function $(id, slectAll = false) {
  return slectAll ? document.querySelectorAll(id) : document.querySelector(id);
}

const image = $("img");

if (image.complete) {
  const { R, G, B } = getAverageColor(image, 4);
  document.body.style.background = `rgb(${R}, ${G},${B})`;
}
const slider1 = new Slider(".slider-container");
