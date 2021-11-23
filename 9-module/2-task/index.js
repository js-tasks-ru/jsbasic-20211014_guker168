import Carousel from "../../6-module/3-task/index.js";
import slides from "../../6-module/3-task/slides.js";

import RibbonMenu from "../../7-module/1-task/index.js";
import categories from "../../7-module/1-task/categories.js";

import StepSlider from "../../7-module/4-task/index.js";
import ProductsGrid from "../../8-module/2-task/index.js";

import CartIcon from "../../8-module/1-task/index.js";
import Cart from "../../8-module/4-task/index.js";

export default class Main {
  constructor() {
    this.carousel = null;
    this.ribbonMenu = null;
    this.stepSlider = null;
    this.productsGrid = null;
    this.cartIcon = null;
    this.cart = null;
    this.products = null;
  }

  async render() {
    this.carousel = new Carousel(slides);
    document.querySelector(`[data-carousel-holder]`).append(this.carousel.elem);
    this.ribbonMenu = new RibbonMenu(categories);
    document.querySelector(`[data-ribbon-holder]`).append(this.ribbonMenu.elem);
    this.stepSlider = new StepSlider({ steps: 5, value: 0 });
    document.querySelector(`[data-slider-holder]`).append(this.stepSlider.elem);
    this.cartIcon = new CartIcon();
    document
      .querySelector(`[data-cart-icon-holder]`)
      .append(this.cartIcon.elem);
    this.cart = new Cart(this.cartIcon);

    await this.showProducts();

    this.productsGrid.updateFilter({
      nuNuts: document.querySelector("#nuts-checkbox").checked,
      vegeterianOnly: document.querySelector("#vegeterian-checkbox").checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value,
    });
    this.addEventListeners();
  }

  async getProductArr() {
    // Возвращает массив с товарами
    let fetchResponse = await fetch("products.json");
    let products = [];

    if (fetchResponse.ok) {
      products = await fetchResponse.json();
    }
    return products;
  }
  async showProducts() {
    // Выводит на страницу
    document.querySelector("[data-products-grid-holder]").innerHTML = null;
    this.products = await this.getProductArr();
    this.productsGrid = new ProductsGrid(this.products);

    document
      .querySelector("[data-products-grid-holder]")
      .append(this.productsGrid.elem);
  }

  onAddProduct() {
    document.body.addEventListener("product-add", (event) => {
      let productId = event.detail;
      let currentProduct = this.products.find((el) => {
        return el.id == productId;
      });

      this.cart.addProduct(currentProduct);
    });
  }

  onSliderChange() {
    this.stepSlider.elem.addEventListener("slider-change", (event) => {
      let value = event.detail;
      this.productsGrid.updateFilter({
        maxSpiciness: value,
      });
    });
  }
  onRibbonSelect() {
    this.ribbonMenu.elem.addEventListener("ribbon-select", (event) => {
      let value = event.detail;
      this.productsGrid.updateFilter({
        category: value,
      });
    });
  }
  onCheckCheckboxes() {
    let nutsCheckbox = document.querySelector("#nuts-checkbox");
    let vegeterianCheckbox = document.querySelector("#vegeterian-checkbox");
    nutsCheckbox.addEventListener("change", () => {
      this.productsGrid.updateFilter({
        noNuts: nutsCheckbox.checked,
      });
    });
    vegeterianCheckbox.addEventListener("change", () => {
      this.productsGrid.updateFilter({
        vegeterianOnly: vegeterianCheckbox.checked,
      });
    });
  }

  addEventListeners() {
    this.onAddProduct();
    this.onSliderChange();
    this.onRibbonSelect();
    this.onCheckCheckboxes();
  }
}
