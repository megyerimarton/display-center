document.querySelectorAll('.wishItem').forEach(item => {
  item.querySelector('.removeFromWish').addEventListener('click', () => {
    deleteWish(item.dataset.id);
    location.reload();
  });
});


function deleteWish(id) {
  fetch(`${window.location.origin}/api/wish`, {
    method: 'DELETE',
    body: JSON.stringify({ id: id }),
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
  });
}
