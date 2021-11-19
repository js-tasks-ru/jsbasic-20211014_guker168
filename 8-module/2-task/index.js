import createElement from "../../assets/lib/create-element.js";
import ProductCard from "../../6-module/2-task/index.js";

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.render();
  }

  render() {
    this.elem = createElement(`<div class="products-grid">
    <div class="products-grid__inner">
      <!--ВОТ ТУТ БУДУТ КАРТОЧКИ ТОВАРОВ-->
    </div>
  </div>`);
    // this.showCards();
  }

  // showCards() {
  //   this.products.forEach((el) => {
  //     this.elem
  //       .querySelector(".products-grid__inner")
  //       .append(new ProductCard(el).elem);
  //   });
  // }

  updateFilter(filters) {
    // this.elem.querySelector(".products-grid__inner").innerHTML = null;
    let nuts = document.querySelector("[data-no-nuts]");
    let vegeterian = document.querySelector("[data-vegetarian-only]");
    let spiciness = document.querySelector("[data-max-spiciness]");
    let category = document.querySelector("[data-category]");

    this.filters[Object.keys(nuts.dataset).join()] = nuts.checked;
    this.filters[Object.keys(vegeterian.dataset).join()] = vegeterian.checked;
    this.filters[Object.keys(spiciness.dataset).join()] = spiciness.checked;
    this.filters[Object.keys(category.dataset).join()] = category.checked;

    if (filters.noNuts == true) {
      this.products.forEach((el) => {
        if (el.nuts == false || el.nuts == undefined) {
          this.elem
            .querySelector(".products-grid__inner")
            .append(new ProductCard(el).elem);
        }
      });
    }
    if (filters.vegeterianOnly == true) {
      this.products.forEach((el) => {
        if (el.vegeterian == true) {
          this.elem
            .querySelector(".products-grid__inner")
            .append(new ProductCard(el).elem);
        }
      });
    }
    console.log(this.filters);

   
  }
}
