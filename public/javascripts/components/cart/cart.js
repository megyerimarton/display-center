const increase = require('./increase');
const decrease = require('./decrease');
const deleteItem = require('./delete');


document.querySelectorAll('.cartItem').forEach(item => {
  increase(item);
  decrease(item);
  deleteItem(item);
});
