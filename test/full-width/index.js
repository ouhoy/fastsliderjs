import {Slider} from "../../src/fastSlider.js";
import {getAverageColor} from "../../src/getAverageColor.js";
import {$} from "../../src/controller.js"

const image = $("img");

if (image.complete) {
    const {R, G, B} = getAverageColor(image, 4);
    document.body.style.background = `rgb(${R}, ${G},${B})`;
}

const sliderOne = new Slider(".slider-container");
document.body.addEventListener("keydown", (e) => {
    e.key === "ArrowLeft" && sliderOne.prevSlide();
    e.key === "ArrowRight" && sliderOne.nextSlide();
});
