// const tns = require('tiny-slider/src/tiny-slider.module');
import { tns } from 'tiny-slider/src/tiny-slider.module';
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
  if (content && content.offsetWidth && content.offsetWidth > 225) content.parentElement.classList.add('active');
});


const slider = tns({
  container: '#news',
  items: 3,
  mouseDrag: true,
  speed: 400,
  controls: false,
  loop: false,
  nav: false,
  fixedWidth: 350
});
