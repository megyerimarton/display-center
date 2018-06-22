require('simplebar');
require('simplebar/dist/simplebar.css');
require('./promotions');
require('./search');


const modal = document.querySelector('.in-progress-modal');

document.querySelectorAll('.share-button').forEach(item => {
  item.addEventListener('click', () => {
    modal.classList.add('active');
  });
});


document.querySelectorAll('.new').forEach(item => {
  const content = item.querySelector('.content');
  if (content.offsetWidth > 225) content.parentElement.classList.add('active');
});
