const updatePrice = require('./updatePrice');


module.exports = function(item) {
  item.querySelector('.removeFromCart').addEventListener('click', () => {

    fetch(`${window.location.origin}/api/cart`, {
      method: 'DELETE',
      body: JSON.stringify({ id: item.dataset.id }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    })
    .then(res => console.log(res.json()))
    .then(() => {
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

      const counter = document.querySelector('#menuitem_cart_mobile');

      counter.dataset.cartcounter--;

      if (+counter.dataset.cartcounter === 0) {
        counter.classList.remove('show');
      }
    });

  });
};
