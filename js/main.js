const goods = [
  {
    title: 'Shirt',
    price: 150,
    img: '../img/shirt.jpg'
  },
  {
    title: 'Socks',
    price: 50,
    img: '../img/socks.jpg'
  },
  {
    title: 'Jacket',
    price: 350,
    img: '../img/jacket.jpg'
  },
  {
    title: 'Shoes',
    price: 250,
    img: '../img/shoes.jpg'
  },
  {
    
  },
];
const renderGoodsItem = (img = '../img/placeholder.jpg',title = 'Product', price = 0) => {
  return `
    <div class="goods-item">
      <img class="goods-item-img" src="${img}" alt="product picture">
      <h3 class="goods-item-title">${title}</h3>
      <p class="goods-item-price">${price}</p>
      <button class="goods-item-button button">Добавить</button>
    </div>
  `;
};
const renderGoodsList = (list) => {
  const goodsList = list.map(item => renderGoodsItem(item.img, item.title, item.price));
  document.querySelector('.goods-list').innerHTML = goodsList.join(' ');
}
renderGoodsList(goods);