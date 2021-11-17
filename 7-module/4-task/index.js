import createElement from "../../assets/lib/create-element.js";

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    // this.elem = document.createElement("div");
    this.render();
    this.addEventListeners();
  }
  render() {
    this.elem = createElement(`
    <div class="slider">

    <!--Ползунок слайдера с активным значением-->
    <div class="slider__thumb" style="left: 0%;">
      <span class="slider__value">${this.value}</span>
    </div>

    <!--Заполненная часть слайдера-->
    <div class="slider__progress" style="width: 0%;"></div>

    <!--Шаги слайдера-->
    <div class="slider__steps">
    </div>
  </div>
    `);
    document.querySelector(".container").append(this.elem);
    this.sliderSteps();
  }
  sliderSteps() {
    let sliderSteps = this.elem.querySelector(".slider__steps");
    let sliders = [];
    for (let i = 0; i < this.steps; i++) {
      if (i == 0) {
        sliders.push(`<span class="slider__step-active"></span>`);
      } else {
        sliders.push(`<span></span>`);
      }
    }
    sliderSteps.innerHTML = [...sliders].join("");
  }
  onClick = (event) => {
    let thumb = this.elem.querySelector(".slider__thumb"); // Ползунок
    let progress = this.elem.querySelector(".slider__progress"); // Бар для результата
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;
    let segments = this.steps - 1;
    let approximateValue = leftRelative * segments;
    let value = Math.round(approximateValue);
    let valuePercents = (value / segments) * 100;
    thumb.style.left = `${valuePercents}%`;
    progress.style.width = `${valuePercents}%`;
    this.elem.querySelector(".slider__value").innerHTML = value;
    this.value = +this.elem.querySelector(".slider__value").innerHTML;

    let sliderSpans = this.elem
      .querySelector(".slider__steps")
      .querySelectorAll("span");
    sliderSpans.forEach((el, i, arr) => {
      if (i == this.value) {
        el.classList.add("slider__step-active");
      } else {
        el.classList.remove("slider__step-active");
      }
    });

    let customEvent = new CustomEvent("slider-change", {
      detail: this.value,
      bubbles: true,
    });
    this.elem.dispatchEvent(customEvent);
  };

  pointerMove = (event) => {
    let slider = this.elem.querySelector(".slider");
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;

    if (leftRelative < 0) {
      leftRelative = 0;
    }
    if (leftRelative > 1) {
      leftRelative = 1;
    }
    let leftPercents = leftRelative * 100;

    let thumb = this.elem.querySelector(".slider__thumb");
    let progress = this.elem.querySelector(".slider__progress");

    thumb.style.left = `${leftPercents}%`;
    progress.style.width = `${leftPercents}%`;

    let segments = this.steps - 1;
    let approximateValue = leftRelative * segments;
    let value = Math.round(approximateValue);

    if (value <= 0) {
      this.value = 0;
    } else if (value >= segments) {
      this.value = segments;
    }
    this.elem.querySelector(".slider__value").innerHTML = value;
    this.value = +this.elem.querySelector(".slider__value").innerHTML;
    //============================================================
    let sliderSpans = this.elem
      .querySelector(".slider__steps")
      .querySelectorAll("span");
    sliderSpans.forEach((el, i, arr) => {
      if (i == this.value) {
        el.classList.add("slider__step-active");
      } else {
        el.classList.remove("slider__step-active");
      }
    });
  };

  pointerUp = (event) => {
    let slider = this.elem.querySelector(".slider");
    document.removeEventListener("pointermove", this.pointerMove);
    document.removeEventListener("pointerdown", this.pointerDown);
    document.removeEventListener("pointerup", this.pointerUp);
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;

    if (leftRelative < 0) {
      leftRelative = 0;
    }
    if (leftRelative > 1) {
      leftRelative = 1;
    }
    let leftPercents = leftRelative * 100;

    let thumb = this.elem.querySelector(".slider__thumb");
    let progress = this.elem.querySelector(".slider__progress");

    let segments = this.steps - 1;
    let approximateValue = leftRelative * segments;
    let value = Math.round(approximateValue);
    let valuePercents = (value / segments) * 100;
    thumb.style.left = `${valuePercents}%`;
    progress.style.width = `${valuePercents}%`;
    this.elem.classList.remove("slider_dragging");

    let customEvent = new CustomEvent("slider-change", {
      detail: this.value,
      bubbles: true,
    });
    this.elem.dispatchEvent(customEvent);
  };

  pointerDown = (event) => {
    // let slider = this.elem.querySelector(".slider");
    this.elem.classList.add("slider_dragging");
    document.addEventListener("pointermove", this.pointerMove);
    document.addEventListener("pointerup", this.pointerUp);
  };

  addEventListeners() {
    let thumb = this.elem.querySelector(".slider__thumb");
    thumb.ondragstart = () => false;
    thumb.ondrag = () => false;
    thumb.ondend = () => false;
    thumb.addEventListener("pointerdown", this.pointerDown);
    this.elem.addEventListener("click", this.onClick);
  }
}

document.body.addEventListener("slider-change", (event) =>
  console.log(event.detail)
);
