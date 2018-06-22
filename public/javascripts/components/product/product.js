import { tns } from 'tiny-slider/src/tiny-slider.module';


const addToCart = require('../shared/addtocart');
const addToWish = require('../shared/addtowish');


const btnCart = document.querySelector('#addCart');
const btnWish = document.querySelector('#addWish');
const cartCounter = document.querySelector('#menuitem_cart');
const cartCounterMobile = document.querySelector('#menuitem_cart_mobile');


btnCart.addEventListener('click', () => {
  addToCart(btnCart.dataset.id).then((data) => {
    cartCounter.classList.add('show');
    cartCounterMobile.classList.add('show');
    cartCounter.dataset.counter = data.size;
    cartCounterMobile.dataset.counter = data.size;
  });
});


if (btnWish) {
  btnWish.addEventListener('click', () => {
    addToWish(btnWish.dataset.id);
    btnWish.classList.add('hide');
  });
}


// Gallery
const images = document.querySelectorAll('.productImage');

document.querySelectorAll('.btnPic').forEach(item => {
  if (item.classList.contains('right')) {
    item.addEventListener('click', () => nextPic());
  } else if (item.classList.contains('left')) {
    item.addEventListener('click', () => prevPic());
  }
});


function nextPic() {
  let active;

  images.forEach(item => {
    if (item.classList.contains('active')) {
      active = parseInt(item.dataset.id);
      item.classList.remove('active');
    }
  });

  if (active !== 3) {
    images.forEach(item => {
      if (+item.dataset.id === (active + 1)) item.classList.add('active');
    });
  }
  else {
    images.forEach(item => {
      if (+item.dataset.id === 1) item.classList.add('active');
    });
  }
}


function prevPic() {
  let active;

  images.forEach(item => {
    if (item.classList.contains('active')) {
      active = parseInt(item.dataset.id);
      item.classList.remove('active');
    }
  });

  if (active !== 1) {
    images.forEach(item => {
      if (+item.dataset.id === (active - 1)) item.classList.add('active');
    });
  }
  else {
    images.forEach(item => {
      if (+item.dataset.id === 3) item.classList.add('active');
    });
  }
}


const newProductSlider = tns({
  container: '#saleProducts',
  mouseDrag: true,
  speed: 400,
  controls: false,
  loop: false,
  nav: false,
  fixedWidth: 350
});
