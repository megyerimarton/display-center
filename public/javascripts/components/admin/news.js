document.querySelectorAll('.archive').forEach(item => {
  item.addEventListener('click', () => {
    if (confirm(`Archiválod a hírt?\nAzonosító: ${item.dataset.id}`)) {
      fetch(`${window.location.origin}/admin/news/${item.dataset.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      }).then(() => location.reload());
    }
  });
});


document.querySelectorAll('.unarchive').forEach(item => {
  item.addEventListener('click', () => {
    if (confirm(`Aktiválod a hírt?\nAzonosító: ${item.dataset.id}`)) {
      fetch(`${window.location.origin}/admin/news/${item.dataset.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      }).then(() => location.reload());
    }
  });
});


document.querySelectorAll('.delete').forEach(item => {
  item.addEventListener('click', () => {
    if (confirm(`Biztosan törlöd a hírt?\nAzonosító: ${item.dataset.id}`)) {
      fetch(`${window.location.origin}/admin/news/${item.dataset.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      }).then(() => location.reload());
    }
  });
});
