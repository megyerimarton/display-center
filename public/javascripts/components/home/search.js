const search = document.querySelector('#search-main');
const searchResult = document.querySelector('#search-result');
const loader = searchResult.querySelector('.loader');
let timeout;


search.addEventListener('keyup', () => {
  if (search.value.length >= 2) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      loader.classList.add('active');

      fetch(`${window.location.origin}/api/products`, {
        method: 'POST',
        body: JSON.stringify({ search: search.value }),
        headers: { 'Content-Type': 'application/json' }
      }).then(res => res.text())
        .then(data => {
          loader.classList.remove('active');
          searchResult.querySelector('.content').innerHTML = data;
        })
        .catch(err => console.log(err));
    }, 1000);
  }
});

search.addEventListener('focusin', () => {
searchResult.classList.remove('hide');
});

search.addEventListener('focusout', () => {
searchResult.classList.add('hide');
});
