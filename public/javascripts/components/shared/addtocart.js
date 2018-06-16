module.exports = function(id) {
  return fetch(`http://localhost:3000/api/cart`, {
    method: 'POST',
    body: JSON.stringify({ id: id }),
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
  }).then(data => data.json());
};
