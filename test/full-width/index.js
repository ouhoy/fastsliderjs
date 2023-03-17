import {Slider} from "../../src/fastSlider.js";
import {getAverageColor} from "../../src/getAverageColor.js";
import {$} from "../../src/controller.js"

// TODO img should be inside of the container plus it should have an ID
const image = $("img");

if (image.complete) {
    const {R, G, B} = getAverageColor(image, 4);
    document.body.style.background = `rgb(${R}, ${G},${B})`;
}

const sliderOne = new Slider(".slider-container", 0, {getAverageColor: true});
document.body.addEventListener("keydown", (e) => {
    e.key === "ArrowLeft" && sliderOne.prevSlide();
    e.key === "ArrowRight" && sliderOne.nextSlide();
});