export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
    // this.addProduct(null);
  }

  addProduct(product) {
    let cartItem = this.cartItems.find((el) => el.product.id == product.id);
    if (product == null) {
      return;
    } else {
      if (cartItem == undefined) {
        cartItem = {
          product: product,
          count: 1,
        };
        this.cartItems.push(cartItem);
      } else {
        cartItem.count++;
      }
    }
    // this.onProductUpdate(cartItem);
    console.log(this.cartItems);
  }

  updateProductCount(productId, amount) {
    let cartItem = this.cartItems.find((el) => el.product.id == productId);

    cartItem.count += amount;

    if (cartItem.count == 0) {
      this.cartItems.splice(this.cartItems.indexOf(cartItem), 1);
    }
    // this.onProductUpdate(cartItem);
    console.log(this.cartItems);
  }

  isEmpty() {
    if (this.cartItems.length == 0) {
      return true;
    } else {
      return false;
    }
  }

  getTotalCount() {
    let totalCount = this.cartItems.reduce((accum, el) => {
      accum + el.count;
      return accum;
    }, 0);
    console.log(totalCount);
  }

  getTotalPrice() {
    let totalSum = this.cartItems.reduce((accum, el) => {
      accum + el.getTotalPrice;
      return accum;
    }, 0);
    console.log(totalSum);
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}
