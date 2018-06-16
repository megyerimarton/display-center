document.querySelectorAll('.archive').forEach(item => {
  item.addEventListener('click', () => {
    if (confirm(`Archiválod a terméket?\nRendelés azonosító: ${item.dataset.id}`)) {
      fetch(`http://localhost:3000/admin/products/${item.dataset.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      }).then(() => location.reload());
    }
  });
});


document.querySelectorAll('.unarchive').forEach(item => {
  item.addEventListener('click', () => {
    if (confirm(`Aktiválod a terméket?\nRendelés azonosító: ${item.dataset.id}`)) {
      fetch(`http://localhost:3000/admin/products/${item.dataset.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      }).then(() => location.reload());
    }
  });
});
