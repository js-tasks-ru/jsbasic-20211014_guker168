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
  addEventListeners() {
    this.elem.onclick = (event) => {
      let slider = this.elem.querySelector(".slider");
      let thumb = slider.querySelector(".slider__thumb"); // Ползунок
      let progress = slider.querySelector(".slider__progress"); // Бар для результата
      let left = event.clientX - slider.getBoundingClientRect().left;
      let leftRelative = left / slider.offsetWidth;
      let segments = this.steps - 1;
      let approximateValue = leftRelative * segments;
      let value = Math.round(approximateValue);
      let valuePercents = (value / segments) * 100;
      thumb.style.left = `${valuePercents}%`;
      progress.style.width = `${valuePercents}%`;
      slider.querySelector(".slider__value").innerHTML = value;
      this.value = +slider.querySelector(".slider__value").innerHTML;

      let customEvent = new CustomEvent("slider-change", {
        detail: this.value,
        bubbles: true,
      });
      slider.dispatchEvent(customEvent);
    };
  }
}

document.body.addEventListener("slider-change", (event) =>
  console.log(event.detail)
);

// console.log(event)
// let thumb = this.elem.querySelector(".slider__thumb"); // Ползунок
// let progress = this.elem.querySelector(".slider__progress"); // Бар для результата
// let left = event.clientX - this.elem.getBoundingClientRect().left;
// let leftRelative = left / this.elem.offsetWidth;
// let segments = this.steps - 1;
// let approximateValue = leftRelative * segments;
// let value = Math.round(approximateValue);
// let valuePercents = value / segments * 100;
// thumb.style.left = valuePercents + '%';
// progress.style.width = valuePercents + '%';
// console.log(value, valuePercents);
