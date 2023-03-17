import {Slider} from "../../src/fastSlider.js";
import {getAverageColor} from "../../src/getAverageColor.js";
import {$} from "../../src/controller.js"

// TODO img should be inside of the container plus it should have an ID
const images = $("img", true);
const arrowBtn = $(".arrow-btn", true);

if (images[0].complete) {
    const {R, G, B} = getAverageColor(images[0], 4);
    document.body.style.background = `rgb(${R}, ${G},${B})`;
}

function avg() {
    const {R, G, B} = getAverageColor(images[sliderOne.prevSlide()], 4);
    document.body.style.background = `rgb(${R}, ${G},${B})`;
    arrowBtn.forEach(
        (el) => (el.style.background = `rgb(${R + 11}, ${G + 11},${B + 8})`)
    );

}


const sliderOne = new Slider(".slider-container");


document.body.addEventListener("keydown", (e) => {

    if (e.key === "ArrowLeft") {


        avg()
    }

    if (e.key === "ArrowRight") {

        function avg() {
            const {R, G, B} = getAverageColor(images[sliderOne.nextSlide()], 4);
            document.body.style.background = `rgb(${R}, ${G},${B})`;
            arrowBtn.forEach(
                (el) => (el.style.background = `rgb(${R + 11}, ${G + 11},${B + 8})`)
            );

        }

        avg()
    }

    e.key === "ArrowLeft" && sliderOne.prevSlide();
    e.key === "ArrowRight" && sliderOne.nextSlide();
});
