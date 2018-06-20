require('./load');
require('./message');
require('./used');
require('./login');
require('./inprogress');
require('./sidenav');
require('./clickEffect');


const modal = document.querySelector('.in-progress-modal');

document.querySelector('#subscribe').addEventListener('click', () => {
  modal.classList.add('active');
});


document.querySelectorAll('.footer-head').forEach(item => {
  item.addEventListener('click', () => {
    item.nextElementSibling.classList.toggle('active');
    item.querySelector('i').classList.toggle('active');
  });
});
