document.querySelectorAll('.wishItem').forEach(item => {
  item.querySelector('.removeFromWish').addEventListener('click', () => {
    deleteWish(item.dataset.id);
    location.reload();
  });
});


function deleteWish(id) {
  fetch(`http://localhost:3000/api/wish`, {
    method: 'DELETE',
    body: JSON.stringify({ id: id }),
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
  });
}
