const numberFormat = require('../shared/numberformat');

module.exports = function() {
  let priceAll = 0;
  document.querySelectorAll('.cartItem').forEach(item => {
    if (!item.classList.contains('removed')) {
      priceAll += parseInt(item.dataset.price * item.dataset.quantity);
    }
  });

  document.querySelector('#cartValue').innerHTML = numberFormat(priceAll, 0, '.', ' ') + ' Ft';
  document.querySelector('#cartValueEnd').innerHTML = numberFormat(priceAll, 0, '.', ' ') + ' Ft';
};
