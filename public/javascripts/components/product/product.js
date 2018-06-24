import { tns } from 'tiny-slider/src/tiny-slider.module';


const addToCart = require('../shared/addtocart');
const addToWish = require('../shared/addtowish');


const btnCart = document.querySelector('#addCart');
const btnWish = document.querySelector('#addWish');
const cartCounter = document.querySelector('#menuitem_cart_mobile');


btnCart.addEventListener('click', () => {
  addToCart(btnCart.dataset.id).then((data) => {
    cartCounter.classList.add('show');
    cartCounter.dataset.cartcounter = data.size;
  });
});


if (btnWish) {
  btnWish.addEventListener('click', () => {
    addToWish(btnWish.dataset.id);
    btnWish.classList.add('hide');
  });
}


document.querySelectorAll('.btn-pic-change').forEach(item => {
  item.addEventListener('click', (e) => {
    if (item.classList.contains('left')) itemImages.goTo('prev');
    if (item.classList.contains('right')) itemImages.goTo('next');
  });
});

const itemImages = tns({
  container: '.itemImages',
  mouseDrag: true,
  speed: 500,
  lazyload: true,
  controls: false,
  nav: false
});


const newProductSlider = tns({
  container: '#saleProducts',
  mouseDrag: true,
  speed: 500,
  controls: false,
  loop: false,
  nav: false,
  fixedWidth: 350
});
