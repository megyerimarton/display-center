const addToCart = require('../shared/addtocart');
const addToWish = require('../shared/addtowish');


const cartCounter = document.querySelector('#menuitem_cart');
const cartCounterMobile = document.querySelector('#menuitem_cart_mobile');
const moreModal = document.querySelector('#moreModal');
const orderDropdown = document.querySelector('#orderDropdown');
const filtersPopup = document.querySelector('.filtersPopup');
const searchModal = document.querySelector('#searchModal');
const searchContainer = document.querySelector('#searchContainer');


document.querySelectorAll('.item').forEach(item => {
  const product = item;
  const animationContainer = item.querySelector('.animationContainer');
  const btnPDShow = item.querySelector('.btnPDShow');
  const btnToWish = item.querySelector('.btnToWish');

  btnPDShow.addEventListener('click', (e) => {
    btnPDShow.classList.toggle('active');
    product.querySelector('.pDescriptionMore').classList.toggle('active');
    product.querySelector('.itemImg').classList.toggle('active');
    item.classList.toggle('active');
  });

  item.querySelector('.btnMore').addEventListener('click', () => {
    product.querySelector('.moreActions').classList.add('active');
    moreModal.classList.add('active');
    item.classList.add('active');
  });

  // Add to cart
  item.querySelector('.btnToCart').addEventListener('click', () => {
    moreModal.click();
    animationContainer.classList.add('active', 'cart');

    addToCart(item.dataset.id).then(data => {
      cartCounter.classList.add('show');
      cartCounterMobile.classList.add('show');
      cartCounter.dataset.counter = data.size;
      cartCounterMobile.dataset.counter = data.size;
    });

    setTimeout(() => animationContainer.classList.remove('active', 'cart', 'wish'), 1000);
  });

  // Add to wishlist
  btnToWish.addEventListener('click', () => {
    moreModal.click();
    animationContainer.classList.add('active', 'wish');

    addToWish(item.dataset.id).then(() => btnToWish.remove());

    setTimeout(() => animationContainer.classList.remove('active', 'cart', 'wish'), 1000);
  });
});


moreModal.addEventListener('click', e => {
  orderDropdown.classList.remove('active');
  document.querySelectorAll('.moreActions').forEach(item => item.classList.remove('active'));
  document.querySelectorAll('.btnMore').forEach(item => item.classList.remove('active'));
  e.target.classList.remove('active');
});


document.querySelector('#order').addEventListener('click', () => {
  orderDropdown.classList.add('active');
  moreModal.classList.add('active');
});


document.querySelector('#filter').addEventListener('click', () => {
  filtersPopup.classList.add('active');
  searchModal.classList.add('active');
  searchContainer.classList.add('active');
});


document.querySelector('#fClose').addEventListener('click', () => {
  filtersPopup.classList.remove('active');
  searchModal.classList.remove('active');
  searchContainer.classList.remove('active');
});
