const numberFormat = require('../shared/numberformat');


document.querySelectorAll('.accept').forEach(item => {
  item.addEventListener('click', () => {
    if (confirm(`Jóváhagyod a rendelést?\nRendelés azonosító: ${item.dataset.id}`)) {
      fetch(`http://localhost:3000/admin/orders/${item.dataset.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      }).then(() => location.reload());
    }
  });
});


document.querySelectorAll('.shipping').forEach(item => {
  item.addEventListener('click', () => {
    if (confirm(`A terméket/termékeket átvette a futárszolgálat?\nRendelés azonosító: ${item.dataset.id}`)) {
      fetch(`http://localhost:3000/admin/orders/${item.dataset.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      }).then(() => location.reload());
    }
  });
});


document.querySelectorAll('.finish').forEach(item => {
  item.addEventListener('click', () => {
    if (confirm(`A rendelés lezárható?\nRendelés azonosító: ${item.dataset.id}`)) {
      fetch(`http://localhost:3000/admin/orders/${item.dataset.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      }).then(() => location.reload());
    }
  });
});


document.querySelectorAll('.delete').forEach(item => {
  item.addEventListener('click', () => {
    if (confirm(`Biztosan törlöd a rendelést?\nRendelés azonosító: ${item.dataset.id}`)) {
      fetch(`http://localhost:3000/admin/orders/${item.dataset.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      }).then(() => location.reload());
    }
  });
});


// Order description modal
const searchModal = document.querySelector('#searchModal');
const orderModal = document.querySelector('.orderDescription-modal');
const orderModalContent = orderModal.querySelector('.content');
const orderModalLoader = orderModal.querySelector('.loader');

document.querySelectorAll('.line').forEach(item => {
  item.addEventListener('click', e => {
    if (e.target.nodeName == 'A') {
      return false;
    }

    searchModal.classList.add('active');
    orderModal.classList.add('active');
    orderModal.querySelector('.title').innerHTML = `Rendelés ${item.dataset.id}`;

    fetch(`http://localhost:3000/admin/orders/description/${item.dataset.id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    }).then(data => data.json())
      .then(data => {
        orderModalContent.querySelector('.email').innerHTML = data[0][0].email;
        orderModalContent.querySelector('.name').innerHTML = data[0][0].nev;
        orderModalContent.querySelector('.tel').innerHTML = data[0][0].tel;
        orderModalContent.querySelector('.city').innerHTML = data[0][0].irszam + ' ' + data[0][0].varos;
        orderModalContent.querySelector('.address').innerHTML = data[0][0].utcaHazszam;
        orderModalContent.querySelector('.date').innerHTML = data[0][0].datum;
        orderModalContent.querySelector('.status').innerHTML = data[0][0].allapot;
        orderModalContent.querySelector('.finalPrice').innerHTML = numberFormat(data[0][0].ar_osszes, 0, '.', ' ') + ' Ft';

        for (const item of data[1]) {
          const div = document.createElement('div');
          div.classList.add('row', 'no-wrap', 'item-details');

          const left = document.createElement('div');
          left.classList.add('left');
          const right = document.createElement('div');
          left.classList.add('right');

          left.innerHTML =  `${item.darab} x ${item.gyarto} ${item.termek}`;
          right.innerHTML = numberFormat(item.arosszes, 0, '.', ' ') + ' Ft';

          div.appendChild(left);
          div.appendChild(right);

          const element = document.querySelector('.appendAfter');
          const parent = element.parentNode;
          parent.insertBefore(div, element.nextSibling);
        }

        orderModalContent.classList.add('show');
        orderModalLoader.classList.remove('active');
    });
  });
});


document.querySelector('.close-orderDescription-modal').addEventListener('click', () => {
  searchModal.classList.remove('active');
  orderModal.classList.remove('active');
  orderModalContent.classList.remove('show');
  setTimeout(() => {
    orderModalLoader.classList.add('active');

    orderModalContent.querySelectorAll('.item-details').forEach(item => item.remove());
  }, 250);
});
