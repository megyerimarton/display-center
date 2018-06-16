module.exports = async function(req, res, next) {
  const result = await res.locals.conn.query('SELECT COUNT(id) AS "id" FROM orders WHERE allapot = 1');
  res.locals.ordersCount = result[0].id;

  next();
};
