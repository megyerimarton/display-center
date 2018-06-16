const imagePreview = require('../shared/imagepreview');


const image = document.querySelector('#kep1upload');
const preview = document.querySelector('#kep1preview');

image.addEventListener('change', () => {
  imagePreview(image, preview);
  preview.classList.add('active');
});
