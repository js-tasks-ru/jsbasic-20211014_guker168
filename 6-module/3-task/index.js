import createElement from "../../assets/lib/create-element.js";

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    const slider = `
    <div class="carousel">
 
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>
    
      <div class="carousel__inner">
  
      ${this.slides.map((slide) => `<div class="carousel__slide" data-id="${slide.id}">
      <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
      <div class="carousel__caption">
        <span class="carousel__price">${this.getPrice(slide.price)}</span>
        <div class="carousel__title">${slide.name}</div>
        <button type="button" class="carousel__button">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
      </div>
      </div>`)}

      </div>
    </div>`;

    this.elem = createElement(slider);
    this.slideCount = this.elem.querySelectorAll('.carousel__slide').length;

    this.initCarousel();
    this.elem.querySelectorAll('.carousel__button').forEach(el => el.addEventListener('click', this.onClick));
  }
  //========================================
  
  initCarousel() {
    let currentSlideNumber = 0;
    let slidesAmount = this.slideCount;
    let elem = this.elem;
  
    let carouselInnerElem = elem.querySelector('.carousel__inner');
    let carouselArrowRight = elem.querySelector('.carousel__arrow_right');
    let carouselArrowLeft = elem.querySelector('.carousel__arrow_left');
  
    update();
  
    elem.onclick = ({target}) => {
      if (target.closest('.carousel__arrow_right')) {
        next();
      }
  
      if (target.closest('.carousel__arrow_left')) {
        prev();
      }
    };
  
    function next() {
      currentSlideNumber++;
      update();
    }
  
    function prev() {
      currentSlideNumber--;
      update();
    }
  
    function update() {
      let offset = -carouselInnerElem.offsetWidth * currentSlideNumber;
      carouselInnerElem.style.transform = `translateX(${offset}px)`;
  
      if (currentSlideNumber == slidesAmount - 1) {
        carouselArrowRight.style.display = 'none';
      } else {
        carouselArrowRight.style.display = '';
      }
  
      if (currentSlideNumber == 0) {
        carouselArrowLeft.style.display = 'none';
      } else {
        carouselArrowLeft.style.display = '';
      }
    }
  }
  //========================================

  getPrice(price) {
    return `€${price.toFixed(2)}`;
  }

  onClick = (event) => {
    let id = event.target.closest('.carousel__slide').dataset.id;
    let customEvent = new CustomEvent('product-add', { bubbles: true, detail: id});
    this.elem.dispatchEvent(customEvent);
  }
}
document.body.addEventListener('product-add', (event) => console.log(event.detail));
