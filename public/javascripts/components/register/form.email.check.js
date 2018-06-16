const email = document.querySelector('#email');
const emailError = document.querySelector('#err_email');


email.addEventListener('keyup', () => {
  if (email.value.trim() === '') emailShowError('Az email mező nem lehet üres');
  else if (!(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/).test(email.value)) emailShowError('Az email cím nem megfelelő formátumú');
  else emailHideError();
});


function emailShowError(text) {
  email.classList.remove('valid');
  email.classList.add('error');
  emailError.classList.add('active');
  emailError.innerHTML = text;
}


function emailHideError() {
  email.classList.add('valid');
  email.classList.remove('error');
  emailError.classList.remove('active');
  setTimeout(() => emailError.innerHTML = '', 350);
}
