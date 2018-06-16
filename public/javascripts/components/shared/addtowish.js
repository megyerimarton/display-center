module.exports = function(id) {
  return fetch(`http://localhost:3000/api/wish`, {
    method: 'POST',
    body: JSON.stringify({ id: id }),
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
  });
};
