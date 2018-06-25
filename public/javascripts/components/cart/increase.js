const updatePrice = require('./updatePrice');
const addToCart = require('../shared/addtocart');


let onTheWay = false;


module.exports = function(item) {
  item.querySelector('.add').addEventListener('click', () => {
    if (!onTheWay && item.dataset.quantity < 10) {

      onTheWay = true;
      addToCart(item.dataset.id).then(() => {
        item.dataset.quantity++;
        item.querySelector('.quantity-value').innerHTML = item.dataset.quantity;
        updatePrice(item);
        onTheWay = false;
      });

    }
  });
};
