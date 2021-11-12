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
      // console.log(target);
    };
  }

  update() {
    let buttonRigth = this.sub("arrow_right");
    let buttonLeft = this.sub("arrow_left");
    let ribbonInner = this.sub("inner");
    buttonRigth.onclick = function () {
      console.log("click right");
      ribbonInner.scrollBy(350, 0);
    };
    buttonLeft.onclick = function () {
      console.log("click left");
      ribbonInner.scrollBy(-350, 0);
    };
  }
}
