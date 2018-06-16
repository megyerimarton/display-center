const updatePrice = require('./updatePrice');
const addToCart = require('../shared/addtocart');


module.exports = function(item) {
  item.querySelector('.removeFromCart').addEventListener('click', () => {
    item.classList.add('removed');
    updatePrice(item);

    let hideBuyPanel = true;
    document.querySelectorAll('.cartItem').forEach(cartItem => {
      if (!cartItem.classList.contains('removed')) {
        hideBuyPanel = false;
        return;
      }
    });

    if (hideBuyPanel) {
      document.querySelector('#buyPanel').classList.add('hidden');
      document.querySelector('.cartMessage').classList.add('show');
    }

    fetch(`http://localhost:3000/api/cart`, {
      method: 'DELETE',
      body: JSON.stringify({ id: item.dataset.id }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    }).then(res => console.log(res.json()));

    const counter = document.querySelector('#menuitem_cart');
    const counterMobile = document.querySelector('#menuitem_cart_mobile');

    counter.dataset.counter--;
    counterMobile.dataset.counter--;

    if (+counter.dataset.counter === 0) {
      counter.classList.remove('show');
      counterMobile.classList.remove('show');
    }
  });
};
