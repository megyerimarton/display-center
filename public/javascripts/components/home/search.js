const search = document.querySelector('#search-main');
const searchResult = document.querySelector('#search-result');
const loader = searchResult.querySelector('.loader');


search.addEventListener('keyup', () => {
  loader.classList.add('active');

  fetch(`http://localhost:3000/api/products`, {
    method: 'POST',
    body: JSON.stringify({ search: search.value }),
    headers: { 'Content-Type': 'application/json' }
  }).then(res => res.text())
    .then(data => {
      loader.classList.remove('active');
      searchResult.querySelector('.content').innerHTML = data;
    })
    .catch(err => console.log(err));
});

search.addEventListener('focusin', () => {
searchResult.classList.remove('hide');
});

search.addEventListener('focusout', () => {
searchResult.classList.add('hide');
});
