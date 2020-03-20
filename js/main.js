const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// Переделать в ДЗ
let getRequest = (url) => {
  return  new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
              if (xhr.status === 200) {
                  resolve(xhr.responseText);
              } else {
                  reject('Error!')
              };
          }
      };
      xhr.send();
  });

};

class ProductList {
  constructor(container = '.products') {
    this.container = container;
    this.goods = [];
    this.allProducts = [];
    getRequest(`${API}/catalogData.json`).then((data) => {
      let array = JSON.parse(data);
      for(let i = 0; i<  array.length; i++ ){
          this.goods.push(array[i]);
      }
    console.log (this.goods);
    this.render();
  }

  );
  }

   
  calcSum(){
    return this.allProducts.reduce((accum, item) => accum += item.price, 0);
  }

  render() {
    const block = document.querySelector(this.container);
    for (let product of this.goods) {
      const productObject = new ProductItem(product);
      this.allProducts.push(productObject);
      block.insertAdjacentHTML('beforeend', productObject.render());
    }
  }
}

class ProductItem {
  constructor(product, img='https://placehold.it/200x150') {
    this.title = product.title;
    this.price = product.price;
    this.id = product.id;
    this.img = img;
  }

  render() {
    return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} \u20bd</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`;
  }
}

new ProductList();

