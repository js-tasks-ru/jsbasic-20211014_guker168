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
    this.updateFilter();
  }

  updateFilter(filters) {
    this.elem.querySelector(".products-grid__inner").innerHTML = null;
    let filteredArr = [];
    this.filters = Object.assign(this.filters, filters);
    let {
      noNuts = false,
      vegeterianOnly = false,
      maxSpiciness = 0,
      category = "",
    } = this.filters;
    filteredArr = this.products
      .filter((product) => {
        if (noNuts == true) {
          return noNuts == !product.nuts;
        } else {
          return true;
        }
      })
      .filter((product) => {
        if (vegeterianOnly == true) {
          return product.vegeterian;
        } else {
          return true;
        }
      })
      .filter((product) => {
        if (Boolean(maxSpiciness) == true) {
          return product.spiciness <= maxSpiciness;
        } else {
          return true;
        }
      })
      .filter((product) => {
        if (Boolean(category) == true) {
          return category == product.category;
        } else {
          return true;
        }
      });

    filteredArr.forEach((el) => {
      this.elem
        .querySelector(".products-grid__inner")
        .append(new ProductCard(el).elem);
    });
    // console.log(this.filters);
    // console.log(this.elem.querySelectorAll(".card").length);
  }
}
