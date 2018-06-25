const updatePrice = require('./updatePrice');
const addToCart = require('../shared/addtocart');


let onTheWay = false;


module.exports = function(item) {
  item.querySelector('.sub').addEventListener('click', () => {
    if (!onTheWay && item.dataset.quantity > 1) {

      onTheWay = true;
      fetch(`${window.location.origin}/api/cart`, {
        method: 'PATCH',
        body: JSON.stringify({ id: item.dataset.id }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      })
      .then(res => res.json())
      .then(() => {
        item.dataset.quantity--;
        item.querySelector('.quantity-value').innerHTML = item.dataset.quantity;
        updatePrice(item);
        onTheWay = false;
      });

    }
  });
};
