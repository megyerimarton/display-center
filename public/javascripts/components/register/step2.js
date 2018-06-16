const btnReg = document.querySelector('#regSubmit');
const name = document.querySelector('#name');
const city = document.querySelector('#city');
const zip = document.querySelector('#zip');
const address = document.querySelector('#address');
const mobile = document.querySelector('#mobile');


name.addEventListener('keyup', () => enableRegButton());
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
  if (city.value.length < 2) return false;
  if (zip.value.length < 4) return false;
  if (address.value.length < 5) return false;
  if (mobile.value.length < 5) return false;

  return true;
}


function enableRegButton() {
  if (checkStep2()) btnReg.classList.remove('disabled');
  else btnReg.classList.add('disabled');
}
