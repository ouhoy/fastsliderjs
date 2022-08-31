function $(id, slectAll = false) {
  return slectAll ? document.querySelectorAll(id) : document.querySelector(id);
}
const image = $("img");
const arrowBtn = $(".arrow-btn", true);

function getAverageColor(imageElement, ratio) {
  const canvas = document.createElement("canvas");

  let height = (canvas.height = imageElement.naturalHeight);
  let width = (canvas.width = imageElement.naturalWidth);

  const context = canvas.getContext("2d");
  context.drawImage(imageElement, 0, 0);

  let data, length;
  let i = -4,
    count = 0;

  try {
    data = context.getImageData(0, 0, width, height);
    length = data.data.length;
  } catch (err) {
    console.error(err);
    return {
      R: 0,
      G: 0,
      B: 0,
    };
  }
  let R, G, B;
  R = G = B = 0;

  while ((i += ratio * 4) < length) {
    ++count;

    R += data.data[i];
    G += data.data[i + 1];
    B += data.data[i + 2];
  }

  R = ~~(R / count);
  G = ~~(G / count);
  B = ~~(B / count);

  return {
    R,
    G,
    B,
  };
}
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

class Slider {
  constructor(container, timer) {
    function dotsSliderHandler(e) {
      if (e.target.classList.contains("dots__dot")) {
        const { slider } = e.target.dataset;
        this.curSlide = slider;
        this.#gotToSlide(slider);
        this.#activateDots(slider);
      }
    }
    this.img = $("img", true);
    this.timer = timer;
    this.sliderTimer =
      this.timer && setInterval(() => this.nextSlide(), this.timer);
    this.curSlide = 0;
    this.slideContainer = $(`${container} .slider`);
    this.dotContainer = $(`${container} .dots`);
    this.sliderBtnRight = $(`${container} .button-right`);
    this.sliderBtnLeft = $(`${container} .button-left`);
    this.slides = $(`${container} .slide`, true);
    this.container = container;
    this.slides.forEach(
      (slide, i) => (slide.style.transform = ` translateX(${100 * i}%)`)
    );
    this.#createDots();
    this.#gotToSlide(0);
    this.sliderBtnRight.addEventListener("click", this.nextSlide.bind(this));
    this.sliderBtnLeft.addEventListener("click", this.prevSlide.bind(this));
    this.dotContainer &&
      $(`${container} .dots__dot`, true)[0].classList.add("dots__dot--active");

    this.dotContainer &&
      this.dotContainer.addEventListener("click", dotsSliderHandler.bind(this));
  }

  #activateDots(slides) {
    if (!this.dotContainer) return;
    $(`${this.container} .dots__dot`, true).forEach((dot) =>
      dot.classList.remove("dots__dot--active")
    );
    $(`${this.container} .dots__dot[data-slider="${slides}"]`).classList.add(
      "dots__dot--active"
    );
    const { R, G, B } = getAverageColor(this.img[this.curSlide], 4);
    document.body.style.background = `rgb(${R}, ${G},${B})`;
    arrowBtn.forEach(
      (el) => (el.style.background = `rgb(${R + 11}, ${G + 11},${B + 8})`)
    );
  }
  #createDots() {
    if (!this.dotContainer) return;
    this.slides.forEach((_, i) => {
      const insertedHTML = `<div class="dots__dot" data-slider=${i}></div>`;
      this.dotContainer.insertAdjacentHTML("beforeend", insertedHTML);
    });
  }
  #gotToSlide(slide) {
    this.slides.forEach((s, i) => {
      s.style.transform = ` translateX(${103 * (i - slide)}%)`;
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

    const { R, G, B } = getAverageColor(this.img[this.curSlide], 4);
    document.body.style.background = `rgb(${R}, ${G},${B})`;
    arrowBtn.forEach(
      (el) => (el.style.background = `rgb(${R + 11}, ${G + 11},${B + 8})`)
    );

    this.#gotToSlide(this.curSlide);
    this.#activateDots(this.curSlide);
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
    const { R, G, B } = getAverageColor(this.img[this.curSlide], 4);
    document.body.style.background = `rgb(${R}, ${G},${B})`;
    arrowBtn.forEach(
      (el) => (el.style.background = `rgb(${R + 11}, ${G + 11},${B + 8})`)
    );
    this.#gotToSlide(this.curSlide);
    this.#activateDots(this.curSlide);
  }
}

const slider1 = new Slider(".slider-container");
