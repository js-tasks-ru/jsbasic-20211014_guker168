export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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
    let sum = 0;
    for (let i = 0; i < this.cartItems.length; i++) {
      sum += this.cartItems[i].count;
    }
    return sum;
  }

  getTotalPrice() {
    return this.cartItems.reduce((accum, el) => {
      accum += el.product.price * el.count;
      return +accum.toFixed(2);
    }, 0);
  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);
  }
}
