import {getAverageColor} from "./getAverageColor.js";
import {$} from "./controller.js"


const arrowBtn = $(".arrow-btn", true);

export class Slider {
    constructor(container, timer) {

        this.curSlide = 0;



        this.container = container;
        this.slides = $(`${container} .slide`, true);

        window.onload = () => {
            this.slides.forEach((el) => (el.style.transition = "transform .5s"));
        };

        this.img = $("img", true);
        this.timer = timer * 1000;
        this.sliderTimer =
            this.timer && setInterval(() => this.nextSlide(), this.timer);


        this.dotContainer = $(`${container} .dots`);
        this.sliderBtnRight = $(`${container} .button-right`);
        this.sliderBtnLeft = $(`${container} .button-left`);


        this.slides.forEach(
            (slide, i) => (slide.style.transform = ` translateX(${100 * i}%)`)
        );

        this.#createDots();
        this.gotToSlide(0);

        this.sliderBtnRight &&
        this.sliderBtnRight.addEventListener("click", this.nextSlide.bind(this));

        this.sliderBtnLeft &&
        this.sliderBtnLeft.addEventListener("click", this.prevSlide.bind(this));

        this.dotContainer &&
        $(`${container} .dots__dot`, true)[0].classList.add("dots__dot--active");

        this.dotContainer &&
        this.dotContainer.addEventListener("click", this.dotsSliderHandler.bind(this));
    };

     dotsSliderHandler(e) {
            if (e.target.classList.contains("dots__dot")) {
                const {slider} = e.target.dataset;
                this.curSlide = slider;
                this.gotToSlide(slider);
                this.activateDots(slider);
            }
        }

    activateDots(slides) {
        if (!this.dotContainer) return;
        $(`${this.container} .dots__dot`, true).forEach((dot) =>
            dot.classList.remove("dots__dot--active")
        );
        $(`${this.container} .dots__dot[data-slider="${slides}"]`).classList.add(
            "dots__dot--active"
        );
        this.getAverageColor();
    }

    #createDots() {
        if (!this.dotContainer) return;
        this.slides.forEach((_, i) => {
            const insertedHTML = `<div class="dots__dot" data-slider=${i}></div>`;
            this.dotContainer.insertAdjacentHTML("beforeend", insertedHTML);
        });
    }

    gotToSlide(slide) {
        this.slides.forEach((s, i) => {
            s.style.transform = ` translateX(${100 * (i - slide)}%)`;
        });
    }

    nextSlide() {
        if (this.timer) {
            clearInterval(this.sliderTimer);
            this.sliderTimer = setInterval(() => this.nextSlide(), this.timer);
        }
        this.curSlide++;

        if (this.curSlide === this.slides.length) {
            this.curSlide = 0;
        }

        this.gotToSlide(this.curSlide);
        this.activateDots(this.curSlide);
    }

    prevSlide() {
        if (this.timer) {
            clearInterval(this.sliderTimer);
            this.sliderTimer = setInterval(() => this.nextSlide(), this.timer);
        }
        this.curSlide--;
        if (this.curSlide < 0) {
            this.curSlide = this.slides.length - 1;
        }
        this.gotToSlide(this.curSlide);
        this.activateDots(this.curSlide);
    }

    getAverageColor() {
        const {R, G, B} = getAverageColor(this.img[this.curSlide], 4);
        document.body.style.background = `rgb(${R}, ${G},${B})`;
        arrowBtn.forEach(
            (el) => (el.style.background = `rgb(${R + 11}, ${G + 11},${B + 8})`)
        );

    }
}
