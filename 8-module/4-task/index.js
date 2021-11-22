import createElement from "../../assets/lib/create-element.js";
import escapeHtml from "../../assets/lib/escape-html.js";

import Modal from "../../7-module/2-task/index.js";

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
    this.modal = new Modal();
    this.addEventListeners();
  }

  addProduct(product) {
    if (product == null || product === undefined) {
      return;
    } else {
      let cartItem = this.cartItems.find((el) => el.product.id == product.id);
      if (cartItem == undefined) {
        cartItem = {
          product: product,
          count: 1,
        };
        this.cartItems.push(cartItem);
      } else {
        cartItem.count++;
      }
      this.onProductUpdate(cartItem);
    }
  }

  updateProductCount(productId, amount) {
    let cartItem = this.cartItems.find((el) => el.product.id == productId);

    cartItem.count += amount;

    if (cartItem.count == 0) {
      this.cartItems.splice(this.cartItems.indexOf(cartItem), 1);
    }
    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    if (this.cartItems.length == 0) {
      return true;
    } else {
      return false;
    }
  }

  getTotalCount() {
    return this.cartItems.reduce((accum, el) => {
      accum += el.count;
      return accum;
    }, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce((accum, el) => {
      accum += el.product.price * el.count;
      return +accum.toFixed(2);
    }, 0);
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id}">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    // let modal = new Modal();
    let body = createElement(`<div></div>`);
    let formData = this.renderOrderForm();
    let modalBody = this.cartItems.map((product) =>
      this.renderProduct(product.product, product.count)
    );
    modalBody.forEach((product) => body.append(product));
    body.append(formData);

    this.modal.setTitle("Your order");
    this.modal.setBody(body);
    this.modal.open();
    body.addEventListener("click", this.productCountUpdate);
    body.addEventListener("submit", this.onSubmit);
  }

  productCountUpdate = (event) => {
    let button = event.target.closest(".cart-counter__button");

    if (!button) {
      return false;
    }

    let product = button.closest(".cart-product").dataset.productId;

    if (button.classList.contains("cart-counter__button_plus")) {
      this.updateProductCount(product, 1);
    }
    if (button.classList.contains("cart-counter__button_minus")) {
      this.updateProductCount(product, -1);
    }

    // console.log(button);
    // console.log(product);
  };

  onProductUpdate(cartItem) {
    if (document.body.classList.contains("is-modal-open")) {
      let productId = cartItem.product.id;
      let modalBody = document.querySelector(".modal__body");
      let productCount = modalBody.querySelector(
        `[data-product-id="${productId}"] .cart-counter__count`
      );
      let productPrice = modalBody.querySelector(
        `[data-product-id="${productId}"] .cart-product__price`
      );
      let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);
      let currentProduct = modalBody.querySelector(
        `[data-product-id="${productId}"]`
      );

      productCount.innerHTML = cartItem.count;
      productPrice.innerHTML = `€${
        cartItem.product.price.toFixed(2) * cartItem.count
      }`;
      infoPrice.innerHTML = `€${this.getTotalPrice(cartItem).toFixed(2)}`;

      if (cartItem.count == 0) {
        currentProduct.remove();
      }
      if (this.getTotalCount() == 0) {
        this.modal.close();
      }
    }

    this.cartIcon.update(this);
  }

  onSubmit = (event) => {
    event.preventDefault();
    let form = document.querySelector(".cart-form");
    let formData = new FormData(form);
    let submitButton = document.querySelector('button[type="submit"]');
    submitButton.classList.add("is-loading");

    fetch(`https://httpbin.org/post`, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          this.modal.setTitle("Sucess!");
          this.modal.setBody(createElement(`<div class="modal__body-inner">
          <p>
            Order successful! Your order is being cooked :) <br>
            We’ll notify you about delivery time shortly.<br>
            <img src="/assets/images/delivery.gif">
          </p>
        </div>`));
          this.cartItems.length = 0;
          console.log(this.cartItems);
        }
      });
  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}
