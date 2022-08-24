const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class List {
  constructor(url, container, list = list2) {
    this.container = container;
    this.list = list;
    this.url = url;
    this.goods = [];
    this.allProducts = [];
    this._init();
  }
  getJson(url) {
    return fetch(url ? url : `${API + this.url}`)
      .then(result => result.json())
      .catch(error => {
        console.log(error);
      })
  }
  handleData(data) {
    this.goods = [...data];
    this.render();
  }
  calcSum() {
    return this.allProducts.reduce((accum, item) => accum += item.price, 0);
  }
  render() {
    const block = document.querySelector(this.container);
    for (let product of this.goods) {
      //console.log(this.constructor.name);
      const productObj = new this.list[this.constructor.name](product); //мы сделали объект товара либо CartItem, либо ProductItem
      console.log(productObj);
      this.allProducts.push(productObj);
      block.insertAdjacentHTML('beforeend', productObj.render());
    }
  }
  _init() {
    return false
  }
}

class Item {
  constructor(el, img = '../img/placeholder.jpg') {
    this.product_name = el.product_name;
    this.price = el.price;
    this.id_product = el.id_product;
    this.img = img;
  }
  render() { 
    return `
      <div class="product" data-id="${this.id_product}">
          <img class="product__img" src="${this.img}" alt="Picture">
          <h3 class="product__name">${this.product_name}</h3>
          <p class="product__price">${this.price} $</p>
          <button class="product__buy-btn"
          data-id="${this.id_product}"
          data-name="${this.product_name}"
          data-price="${this.price}">Купить</button>
      </div>
      `;
  }
}

class ProductsList extends List {
  constructor(cart, container = '.products', url = "/catalogData.json") {
    super(url, container);
    this.cart = cart;
    this.getJson()
      .then(data => this.handleData(data)); //handleData запускает отрисовку либо каталога товаров, либо списка товаров корзины
  }
  _init() {
    document.querySelector(this.container).addEventListener('click', e => {
      if (e.target.classList.contains('product__buy-btn')) {
        //                console.log(e.target);
        this.cart.addProduct(e.target);
      }
    });

  }
}


class ProductItem extends Item {}

class Cart extends List {
  constructor(container = ".cart__block", url = "/getBasket.json") {
    super(url, container);
    this.getJson()
      .then(data => {
        this.handleData(data.contents); //вывели все товары в корзине 
      });
  }
  addProduct(element) {
    this.getJson(`${API}/addToBasket.json`)
      .then(data => {
        if (data.result === 1) {
          let productId = +element.dataset['id'];
          let find = this.allProducts.find(product => product.id_product === productId);
          if (find) {
            find.quantity++;
            this._updateCart(find);
          } else {
            let product = {
              id_product: productId,
              price: +element.dataset['price'],
              product_name: element.dataset['name'],
              quantity: 1
            };
            this.goods = [product];
            this.render();
          }
        } else {
          alert('Error');
        }
      })
  }
  removeProduct(element) {
    this.getJson(`${API}/deleteFromBasket.json`)
      .then(data => {
        if (data.result === 1) {
          let productId = +element.dataset['id'];
          let find = this.allProducts.find(product => product.id_product === productId);
          if (find.quantity > 1) {
            find.quantity--;
            this._updateCart(find);
          } else {
            this.allProducts.splice(this.allProducts.indexOf(find), 1);
            document.querySelector(`.cart-item[data-id="${productId}"]`).remove();
          }
        } else {
          alert('Error');
        }
      })
  }
  _updateCart(product) {
    let block = document.querySelector(`.cart-item[data-id="${product.id_product}"]`);
    block.querySelector('.cart-item__quantity').textContent = `Quantity: ${product.quantity}`;
    block.querySelector('.cart-item__price').textContent = `$${product.quantity*product.price}`;
  }
  _init() {
    document.querySelector('.cart__btn').addEventListener('click', () => {
      document.querySelector(this.container).classList.toggle('invisible');
    });
    document.querySelector(this.container).addEventListener('click', e => {
      if (e.target.classList.contains('cart-item__del-btn')) {
        this.removeProduct(e.target);
      }
    })
  }
}

class CartItem extends Item {
  constructor(el, img = '../img/placeholder.jpg') {
    super(el, img);
    this.quantity = el.quantity;
  }
  render() {
    return `
    <div class="cart-item" data-id="${this.id_product}">
      <img class="cart-item__img" src="${this.img}" alt="Some image">
      <span class="cart-item__title">${this.product_name}</span>
      <span class="cart-item__quantity">Кол-во: ${this.quantity}</span>
      <span class="cart-item__single-price">$${this.price} за 1 ед.</span>
      <span class="cart-item__price">$${this.quantity * this.price}</span>
      <button class="cart-item__del-btn" data-id="${this.id_product}">&times;</button>
    </div>
    `;
  }
}
const list2 = {
  ProductsList: ProductItem,
  Cart: CartItem
};

let cart = new Cart();
let products = new ProductsList(cart); //Если мы хотим использовать в классе
//методы другого класса, то удобнее всего в конструктор передать объект класса,
//методы которого нам нужны в данном классе
//products.getJson(`getProducts.json`).then(data => products.handleData(data));