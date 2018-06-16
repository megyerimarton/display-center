const imagePreview = require('../shared/imagepreview');


const image1 = document.querySelector('#kep1upload');
const preview1 = document.querySelector('#kep1preview');
image1.addEventListener('change', () => {
  imagePreview(image1, preview1);
  preview1.classList.add('active');
});


const image2 = document.querySelector('#kep2upload');
const preview2 = document.querySelector('#kep2preview');
image2.addEventListener('change', () => {
  imagePreview(image2, preview2);
  preview2.classList.add('active');
});


const image3 = document.querySelector('#kep3upload');
const preview3 = document.querySelector('#kep3preview');
image3.addEventListener('change', () => {
  imagePreview(image3, preview3);
  preview3.classList.add('active');
});
