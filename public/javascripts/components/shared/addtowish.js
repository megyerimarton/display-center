module.exports = function(id) {
  return fetch(`${window.location.origin}/api/wish`, {
    method: 'POST',
    body: JSON.stringify({ id: id }),
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
  });
};
