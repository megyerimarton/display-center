let pass = document.querySelector('#password');
let pass2 = document.querySelector('#password2');
const passError = document.querySelector('#err_password');
const pass2Error = document.querySelector('#err_password2');


pass.addEventListener('keyup', () => {
  if (pass.value.length < 6) passwordShowError('A jelszó hossza min. 6 karakter');
  else passwordHideError();
});


function passwordShowError(text) {
  pass.classList.remove('valid');
  pass.classList.add('error');
  passError.classList.add('active');
  passError.innerHTML = text;
}


function passwordHideError() {
  pass.classList.add('valid');
  pass.classList.remove('error');
  passError.classList.remove('active');
  setTimeout(() => passError.innerHTML = '', 350);
}


pass2.addEventListener('keyup', () => {
  if (pass2.value !== pass.value) password2ShowError('A két jelszó nem egyezik');
  else password2HideError();
});


function password2ShowError(text) {
  pass2.classList.remove('valid');
  pass2.classList.add('error');
  pass2Error.classList.add('active');
  pass2Error.innerHTML = text;
}


function password2HideError() {
  pass2.classList.add('valid');
  pass2.classList.remove('error');
  pass2Error.classList.remove('active');
  setTimeout(() => pass2Error.innerHTML = '', 350);
}
