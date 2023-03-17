import {$} from "../src/controller.js";
import {Slider} from "../src/fastSlider.js";
import {getAverageColor} from "../src/getAverageColor.js";


const img = $("img", true);
const arrowButtons = $(".arrow-btn", true);

if (img[0].complete) {
    const {R, G, B} = getAverageColor(img[0], 4);
    document.body.style.background = `rgb(${R}, ${G},${B})`;
    arrowButtons.forEach(
        (el) => (el.style.background = `rgb(${R + 11}, ${G + 11},${B + 8})`)
    );
} else {
    img[0].addEventListener("load", () => {
        const {R, G, B} = getAverageColor(img[0], 4);
        document.body.style.background = `rgb(${R}, ${G},${B})`;
        arrowButtons.forEach(
            (el) => (el.style.background = `rgb(${R + 11}, ${G + 11},${B + 8})`)
        );
    });
}
const nextSlideButton = arrowButtons[1].innerHTML;

if (!img[1].complete) {
    arrowButtons[1].innerHTML = `
  
  <div class="lds-ring">
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>
  
  `;
}

img[1].addEventListener("load", function () {
    arrowButtons[1].innerHTML = nextSlideButton;

    console.log("img[1] loaded");
});

const slider1 = new Slider(".slider-container", {getAverageColor: true});
document.body.addEventListener("keydown", (e) => {
    e.key === "ArrowLeft" && slider1.prevSlide();
    e.key === "ArrowRight" && slider1.nextSlide();
});
