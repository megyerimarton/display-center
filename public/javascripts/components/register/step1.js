const btnNext = document.querySelector('.btnStep');
const email = document.querySelector('#email');
const pass = document.querySelector('#password');
const pass2 = document.querySelector('#password2');


email.addEventListener('keyup', () => enableButton());
pass.addEventListener('keyup', () => enableButton());
pass2.addEventListener('keyup', () => enableButton());


function checkStep1() {
  if (!(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/).test(email.value)) return false;
  if (pass.value.length < 6) return false;
  if (pass2.value.length < 6) return false;
  if (pass.value !== pass2.value) return false;

  return true;
}


function enableButton() {
  if (checkStep1()) btnNext.classList.remove('disabled');
  else btnNext.classList.add('disabled');
}
