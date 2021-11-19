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
    this.updateFilter(this.filters);
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
    this.elem.querySelector(".products-grid__inner").innerHTML = null;
    let nuts = document.querySelector("[data-no-nuts]");
    let vegeterian = document.querySelector("[data-vegetarian-only]");
    let spiciness = document.querySelector("[data-max-spiciness]");
    let category = document.querySelector("[data-category]");

    this.filters[Object.keys(nuts.dataset).join()] = nuts.checked;
    this.filters[Object.keys(vegeterian.dataset).join()] = vegeterian.checked;
    this.filters[Object.keys(spiciness.dataset).join()] = spiciness.checked;
    this.filters[Object.keys(category.dataset).join()] = category.checked;

    let filteredArr = this.products.filter((el) => {
      if (
        this.filters["noNuts"] == true &&
        el.nuts !== true &&
        el.nuts == undefined
      ) {
        return true;
      }
      if (this.filters["vegetarianOnly"] == true && el.vegeterian == true) {
        return true;
      }
      if (el.spiciness <= filters.maxSpiciness) {
        return true;
      }
      if (el.category == filters.category) {
        return true;
      }
      if (this.filters["noNuts"] == false && this.filters["vegetarianOnly"] == false) {
        return true;
      }
    });
    filteredArr.forEach((el) => {
      this.elem
        .querySelector(".products-grid__inner")
        .append(new ProductCard(el).elem);
    });
    console.log(this.elem.querySelectorAll(".card").length);
  }
}

// if (filters.noNuts == true) {
//   this.products.forEach((el) => {
//     if (el.nuts == false || el.nuts == undefined) {
//       this.elem
//         .querySelector(".products-grid__inner")
//         .append(new ProductCard(el).elem);
//       return true;
//     }
//   });
// }
// if (filters.vegeterianOnly == true) {
//   this.products.forEach((el) => {
//     if (el.vegeterian == true) {
//       this.elem
//         .querySelector(".products-grid__inner")
//         .append(new ProductCard(el).elem);
//       return true;
//     }
//   });
// }
