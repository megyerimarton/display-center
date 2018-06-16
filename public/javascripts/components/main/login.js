const loginModal = document.querySelector('#modal-login');


document.querySelectorAll('.loginBtn').forEach(item => {
  item.addEventListener('click', () => {
    loginModal.classList.add('active');
  });
});

document.querySelector('.closeBtn-login').addEventListener('click', () => {
  loginModal.classList.remove('active');
});

document.querySelector('#modalBg-login').addEventListener('click', () => {
  loginModal.classList.remove('active');
});
