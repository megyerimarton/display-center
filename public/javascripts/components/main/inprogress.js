const modal = document.querySelector('.in-progress-modal');


modal.addEventListener('click', () => {
  modal.classList.remove('active');
});

document.querySelector('.close-in-progress-modal').addEventListener('click', () => {
  modal.classList.remove('active');
});
