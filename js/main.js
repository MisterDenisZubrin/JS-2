'use strict';

class ProductsList {
  constructor(container = '.goods-list') {
    this.container = container;
    this.goods = [];
    this._fetchGoods();
    this._render();
  }

  _fetchGoods() {
    this.goods = [{
        id: 1,
        title: 'Shirt',
        price: 150,
        img: '../img/shirt.jpg'
      },
      {
        id: 2,
        title: 'Socks',
        price: 50,
        img: '../img/socks.jpg'
      },
      {
        id: 3,
        title: 'Jacket',
        price: 350,
        img: '../img/jacket.jpg'
      },
      {
        id: 4,
        title: 'Shoes',
        price: 250,
        img: '../img/shoes.jpg'
      },
      {

      },
    ];
  }

  #countTotalPrice() {
    let totalPrice = 0;
    for (let product of this.goods) {
      if (product.price) {
        totalPrice += product.price;
      }
    }
    return totalPrice;
  }

  _render() {
    const container = document.querySelector(this.container);
    for (let item of this.goods) {
      const product = new Product(item);
      container.insertAdjacentHTML('beforeend', product._render());
    }
    container.insertAdjacentHTML('afterend', `Общая стоимость товаров равна: ${this.#countTotalPrice()}`);
  }
}

class Product {
  constructor(product) {
    this.title = product.title || 'Product';
    this.id = product.id;
    this.price = product.price || 0;
    this.img = product.img || '../img/placeholder.jpg';
  }

  _render() {
    return `
    <div class="goods-item" id="${this.id}">
      <img class="goods-item-img" src="${this.img}" alt="product picture">
      <h3 class="goods-item-title">${this.title}</h3>
      <p class="goods-item-price">${this.price}</p>
      <button class="goods-item-button button">Добавить</button>
    </div>
  `;
  }
}

const productsList = new ProductsList();

class Basket {
  constructor(container = '.basket') {
    this.container = container;
  }

  _render() {}

  #countTotalPrice() {

  }
}

class BasketItem {
  constructor(product) {

  }

  _removeFromBasket() {

  }

  _increaseAmount() {

  }

  _decreaseAmount() {

  }

  _render() {}
}
