import { Slider } from "../src/fastSlider.js";
import { getAverageColor } from "../src/getAverageColor.js";

function $(id, slectAll = false) {
  return slectAll ? document.querySelectorAll(id) : document.querySelector(id);
}
const image = $("img");
const img = $("img", true);
const arrowBtn = $(".arrow-btn", true);

if (image.complete) {
  const { R, G, B } = getAverageColor(image, 4);
  document.body.style.background = `rgb(${R}, ${G},${B})`;
  arrowBtn.forEach(
    (el) => (el.style.background = `rgb(${R + 11}, ${G + 11},${B + 8})`)
  );
} else {
  image.addEventListener("load", () => {
    const { R, G, B } = getAverageColor(image, 4);
    document.body.style.background = `rgb(${R}, ${G},${B})`;
    arrowBtn.forEach(
      (el) => (el.style.background = `rgb(${R + 11}, ${G + 11},${B + 8})`)
    );
  });
}
const btn1 = arrowBtn[1].innerHTML;

if (!img[1].complete) {
  arrowBtn[1].innerHTML = `
  
  <div class="lds-ring">
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>
  
  `;
}

img[1].addEventListener("load", function () {
  arrowBtn[1].innerHTML = btn1;

  console.log("img[1] loaded");
});

const slider1 = new Slider(".slider-container");
document.body.addEventListener("keydown", (e) => {
  e.key === "ArrowLeft" && slider1.prevSlide();
  e.key === "ArrowRight" && slider1.nextSlide();
});
