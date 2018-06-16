document.querySelectorAll('input').forEach(item => {
  item.addEventListener('keyup', () => {
    item.value ? item.classList.add('used') : item.classList.remove('used');
  });
});
