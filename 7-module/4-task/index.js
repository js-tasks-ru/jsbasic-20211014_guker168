export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.elem = document.createElement("div");
    this.render();
    this.addEventListeners();
  }
  render() {
    this.elem.innerHTML = `
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
    `;
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
  // onClick = (event) => {
  //   let slider = this.elem.querySelector(".slider");
  //   let thumb = slider.querySelector(".slider__thumb"); // Ползунок
  //   let progress = slider.querySelector(".slider__progress"); // Бар для результата
  //   let left = event.clientX - slider.getBoundingClientRect().left;
  //   let leftRelative = left / slider.offsetWidth;
  //   let segments = this.steps - 1;
  //   let approximateValue = leftRelative * segments;
  //   let value = Math.round(approximateValue);
  //   let valuePercents = (value / segments) * 100;
  //   thumb.style.left = `${valuePercents}%`;
  //   progress.style.width = `${valuePercents}%`;
  //   slider.querySelector(".slider__value").innerHTML = value;
  //   this.value = +slider.querySelector(".slider__value").innerHTML;

  //   let customEvent = new CustomEvent("slider-change", {
  //     detail: this.value,
  //     bubbles: true,
  //   });
  //   slider.dispatchEvent(customEvent);
  // };

  pointerMove = (event) => {
    let slider = this.elem.querySelector(".slider");
    let left = event.clientX - slider.getBoundingClientRect().left;
    let leftRelative = left / slider.offsetWidth;

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
    slider.querySelector(".slider__value").innerHTML = value;
    this.value = +slider.querySelector(".slider__value").innerHTML;
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
    let left = event.clientX - slider.getBoundingClientRect().left;
    let leftRelative = left / slider.offsetWidth;

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
    slider.classList.remove("slider_dragging");

    let customEvent = new CustomEvent("slider-change", {
      detail: this.value,
      bubbles: true,
    });
    slider.dispatchEvent(customEvent);
  };

  pointerDown = (event) => {
    let slider = this.elem.querySelector(".slider");
    slider.classList.add("slider_dragging");
    document.addEventListener("pointermove", this.pointerMove);
    document.addEventListener("pointerup", this.pointerUp);
  };

  addEventListeners() {
    let thumb = this.elem.querySelector(".slider__thumb");
    thumb.ondragstart = () => false;
    thumb.ondrag = () => false;
    thumb.ondend = () => false;
    thumb.addEventListener("pointerdown", this.pointerDown);
  }
}

document.body.addEventListener("slider-change", (event) =>
  console.log(event.detail)
);
