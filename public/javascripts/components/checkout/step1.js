require('../register/form.email.check');


const name = document.querySelector('#name');
const email = document.querySelector('#email');
const city = document.querySelector('#city');
const zip = document.querySelector('#zip');
const address = document.querySelector('#address');
const mobile = document.querySelector('#mobile');


let btnNext;
document.querySelectorAll('.btnStep').forEach(item => {
  if (+item.dataset.id === 1) return btnNext = item;
});


name.addEventListener('keyup', () => enableRegButton());
email.addEventListener('keyup', () => enableRegButton());
zip.addEventListener('keyup', () => enableRegButton());
address.addEventListener('keyup', () => enableRegButton());
mobile.addEventListener('keyup', () => enableRegButton());
city.addEventListener('keyup', () => {
  enableRegButton();
  zip.classList.add('used');
  fetch('http://localhost:3000/api/city', {
    method: 'POST',
    body: JSON.stringify({ city: city.value }),
    headers: { 'Content-Type': 'application/json' }
  }).then(res => res.json())
    .then(data => zip.value = data.irszam)
    .catch(err => console.log(err));
});


function checkStep2() {
  if (name.value.length < 5) return false;
  if (!(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/).test(email.value)) return false;
  if (city.value.length < 2) return false;
  if (zip.value.length < 4) return false;
  if (address.value.length < 5) return false;
  if (mobile.value.length < 5) return false;

  return true;
}


function enableRegButton() {
  if (checkStep2()) btnNext.classList.remove('disabled');
  else btnNext.classList.add('disabled');
}
