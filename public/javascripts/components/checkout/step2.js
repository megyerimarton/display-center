const utanvet = document.querySelector('#utanvet');


let btnNext;
document.querySelectorAll('.btnStep').forEach(item => {
  if (+item.dataset.id === 2) return btnNext = item;
});


utanvet.addEventListener('click', () => {
  if (utanvet.checked) {
    btnNext.classList.remove('disabled');
  }
});
