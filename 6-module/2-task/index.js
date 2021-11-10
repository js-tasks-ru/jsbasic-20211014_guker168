export default class ProductCard {
  constructor(product) {
    this.title = product.name;
    this.price = product.price;
    this.category = product.category;
    this.image = product.image;
    this.id = product.id;
    //=======================================
    this.elem = document.createElement("div");
    this.render();
    //=======================================
    this.elem.querySelector('.card__button').addEventListener('click', this.onClick);
  }

  getPrice(price) {
    return `€${price.toFixed(2)}`;
  }

  render() {
    this.elem.innerHTML = `<div id="holder" class="container_half">
    <div class="card">
      <div class="card__top">
        <img src="/assets/images/products/${this.image}" class="card__image" alt="product">
        <span class="card__price">${this.getPrice(this.price)}</span>
      </div>
      <div class="card__body">
        <div class="card__title">${this.title}</div>
        <button type="button" class="card__button">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
      </div>
    </div>
  </div>`;
  }

  onClick = (event) => {
    console.log(this);
    let customEvent = new CustomEvent('product-add', { bubbles: true, detail: this.id });
    this.elem.dispatchEvent(customEvent);
  }
}

document.body.addEventListener('product-add', (event) => console.log(event.detail));