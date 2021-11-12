import createElement from "../../assets/lib/create-element.js";

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;

    this.render();
    this.addEventListeners();
  }

  render() {
    this.elem = createElement(`
      <div class="ribbon">
    <!--Кнопка прокрутки влево-->
    <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>

    <!--Ссылки на категории-->
    <nav class="ribbon__inner">
    </nav>

    <!--Кнопка прокрутки вправо-->
    <button class="ribbon__arrow ribbon__arrow_right">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
  </div>
      `);

    let categoriesMap = this.categories.map((el) => {
      return createElement(`
      <a href="#" class="ribbon__item ribbon__item_active" data-id=${el.id}>${el.name}</a>
      `);
    });

    this.sub("inner").append(...categoriesMap);
    this.update();
  }

  sub(ref) {
    return this.elem.querySelector(`.ribbon__${ref}`);
  }

  addEventListeners() {
    this.elem.onclick = ({ target }) => {
      let ribbonInner = this.sub("inner");
      // let button = target.closest(".ribbon__arrow");
      if (target.closest(".ribbon__arrow_right")) {
        this.right();
        this.update();
      } else if (target.closest(".ribbon__arrow_left")) {
        this.left();
        this.update();
      }
    };
  }

  right = () => {
    this.sub("inner").scrollLeft += 350;
    // this.update();
  };
  left = () => {
    this.sub("inner").scrollLeft -= 350;
    // this.update();
  };

  update() {
    let buttonRight = this.sub("arrow_right");
    let buttonLeft = this.sub("arrow_left");
    let ribbonInner = this.sub("inner");
    // console.log(ribbonInner.scrollLeft);
    // buttonRight.classList.add("ribbon__arrow_visible");
    let scrollWidth = ribbonInner.scrollWidth;
    let scrollLeft = ribbonInner.scrollLeft;
    let clientWidth = ribbonInner.clientWidth;

    let scrollRight = scrollWidth - scrollLeft - clientWidth;

    if (ribbonInner.scrollLeft == 0) {
      buttonLeft.classList.remove("ribbon__arrow_visible");
    } else if (ribbonInner.scrollLeft !== 0) {
      buttonLeft.classList.add("ribbon__arrow_visible");
    }
    if (ribbonInner.scrollLeft < 1) {
      buttonRight.classList.add('ribbon__arrow_visible');
    } else {
      buttonRight.classList.remove('ribbon__arrow_visible');
    }

    console.log(this.elem.querySelector(".ribbon__inner").scrollLeft);
  }
}
