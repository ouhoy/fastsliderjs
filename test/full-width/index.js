import {Slider} from "../../src/fastSlider.js";
import {getAverageColor} from "../../src/getAverageColor.js";
import {$} from "../../src/controller.js"

// TODO img should be inside of the container plus it should have an ID
const image = $("img");
const dots = $(".dots");

const getAvgColor = () => {
    const {R, G, B} = getAverageColor($("img", true)[sliderOne.curSlide], 4);
    document.body.style.background = `rgb(${R}, ${G},${B})`;
    sliderOne.sliderBtnRight.style.background = `rgb(${R + 11}, ${G + 11},${B + 8})`
    sliderOne.sliderBtnLeft.style.background = `rgb(${R + 11}, ${G + 11},${B + 8})`
}

// Wait for the first img in the slider to load
if (image.complete) {
    const {R, G, B} = getAverageColor(image, 4);
    document.body.style.background = `rgb(${R}, ${G},${B})`;
}

const sliderOne = new Slider(".slider-container", {timer: 5});


document.body.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
        sliderOne.prevSlide()
        getAvgColor()
    }

    if (e.key === "ArrowRight") {
        sliderOne.nextSlide()
        getAvgColor()

    }


    // e.key === "ArrowRight" && sliderOne.nextSlide();
    // e.key === "ArrowLeft" && sliderOne.prevSlide();
});

dots.addEventListener("click", function (e) {

    const selectedDot = e.target.closest(".dots__dot");
    if (selectedDot) getAvgColor()
})