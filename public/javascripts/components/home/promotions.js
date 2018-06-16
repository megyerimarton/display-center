const container = document.querySelector('.promo-container');
const progress = container.querySelector('.load-progress');
let intervalChange = setInterval(nextPromotion, 7500);


document.querySelector('.arrow.right').addEventListener('click', () => {
  nextPromotion();
  resetLoader();
  clearInterval(intervalChange);
  intervalChange = setInterval(nextPromotion, 7500);
});

document.querySelector('.arrow.left').addEventListener('click', () => {
  prevPromotion();
  resetLoader();
  clearInterval(intervalChange);
  intervalChange = setInterval(nextPromotion, 7500);
});

function nextPromotion() {
  const active = +container.querySelector('.active').dataset.id;
  const next = (active < 3) ? active + 1 : 1;

  container.querySelectorAll('.promotion').forEach(item => {
    (+item.dataset.id === next) ? item.classList.add('active') : item.classList.remove('active');
  });
}

function prevPromotion() {
  const active = +container.querySelector('.active').dataset.id;
  const prev = (active > 1) ? active - 1 : 3;

  container.querySelectorAll('.promotion').forEach(item => {
    (+item.dataset.id === prev) ? item.classList.add('active') : item.classList.remove('active');
  });
}

function resetLoader() {
  const active1 = container.querySelector('.active1');
  if (active1) {
    progress.classList.remove('active1');
    progress.classList.add('active2');
  } else {
    progress.classList.remove('active2');
    progress.classList.add('active1');
  }
}
