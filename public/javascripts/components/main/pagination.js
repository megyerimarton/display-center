const input = document.querySelector('.pagination-pages-input');

if (input) {
  input.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
      let url = window.location.href;
      url = url.replace(/&p=\d*/, '');
      url = url.replace(/\?p=\d*/, '');
      if (!url.includes('?')) url += '?p=' + input.value;
      else url += '&p=' + input.value;
      window.location.href = url;
    }
  });
}
