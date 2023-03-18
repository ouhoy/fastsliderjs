import {Slider} from "../../src/fastSlider.js";

const sliderOne = new Slider(".slider-container", {timer: 0});


document.body.addEventListener("keydown", (e) => {

    e.key === "ArrowRight" && sliderOne.nextSlide();
    e.key === "ArrowLeft" && sliderOne.prevSlide();
});

