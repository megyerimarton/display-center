const updatePrice = require('./updatePrice');
const addToCart = require('../shared/addtocart');


module.exports = function(item) {
  item.querySelector('.add').addEventListener('click', () => {
    if (item.dataset.quantity < 10) {
      item.dataset.quantity++;
      item.querySelector('.quantity-value').innerHTML = item.dataset.quantity;

      updatePrice(item);
      addToCart(item.dataset.id);
    }
  });
};
