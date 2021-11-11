function initCarousel() {
  // ваш код...
  let slides = document.querySelector(".carousel__inner");
  let slideWidth = document.querySelector(".carousel__slide").offsetWidth;

  let rightArrow = document.querySelector(".carousel__arrow_right");
  let leftArrow = document.querySelector(".carousel__arrow_left");

  let count = 0;
  let width = 0;

  leftArrow.style.display = "none";

  function switchSlider(event) {
    let target = event.target.closest("div");
    console.log(width);

    if (target === rightArrow) {
      width -= slideWidth;
      slides.style.transform = `translateX(${width}px)`;
      count++;
    } else if (target === leftArrow) {
      width += slideWidth;
      slides.style.transform = `translateX(${width}px)`;
      count--;
    }

    switch (count) {
    case 0:
      leftArrow.style.display = "none";
      break;
    case 3:
      rightArrow.style.display = "none";
      break;
    default:
      rightArrow.style.display = "";
      leftArrow.style.display = "";
      break;
    }
  }

  document.addEventListener("click", switchSlider);
}