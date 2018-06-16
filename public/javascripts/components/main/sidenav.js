const nav = document.querySelector('#sidenav');
const body = document.querySelector('body');


document.querySelector('.openBtn').addEventListener('click', () => {
  body.classList.add('disableScroll');
  nav.classList.add('sideVisible');
});

document.querySelector('.closeBtn').addEventListener('click', () => {
  body.classList.remove('disableScroll');
  nav.classList.remove('sideVisible');
});
