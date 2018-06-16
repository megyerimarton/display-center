const updatePrice = require('./updatePrice');
const addToCart = require('../shared/addtocart');


module.exports = function(item) {
  item.querySelector('.sub').addEventListener('click', () => {
    if (item.dataset.quantity > 1) {
      item.dataset.quantity--;
      item.querySelector('.quantity-value').innerHTML = item.dataset.quantity;

      updatePrice(item);

      fetch(`${window.location.origin}/api/cart`, {
        method: 'PATCH',
        body: JSON.stringify({ id: item.dataset.id }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      }).then(res => res.json());
    }
  });
};
