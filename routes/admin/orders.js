const authAdmin = require('../../middleware/admin');
const ordersCount = require('../../middleware/getnotapprovedorders');
const pool = require('../../modules/connection');
const express = require('express');
const router = express.Router();


router.get('/', [authAdmin, ordersCount], async (req, res) => {
  let n = await pool.query('SELECT COUNT(*) AS rows FROM orders');
  n = n[0]['rows'];

  const page = +req.query.p ? +pool.escape(req.query.p) : 1;
  const limit = 10;
  const pages = Math.ceil(n / limit);
  const offset = (page - 1) * limit;

  const orders = await pool.query(`SELECT orders.id, orders.datum, orders.allapot, CAST(orders.allapot AS UNSIGNED) AS "allapot_number", orders.ar_osszes, user.email
    FROM orders INNER JOIN user ON orders.user_id = user.id ORDER BY ID DESC LIMIT ${limit} OFFSET ${offset}`);

  res.render('admin/orders', {
    title: 'Rendelések',
    page: 'orders',
    orders,
    pagination: {
      actual: page,
      prev: (page > 1) ? page - 1 : null,
      next: (page < pages) ? page + 1 : null
    }
  });
});


router.post('/:id', authAdmin, async (req, res) => {
  const result = await pool.query(`UPDATE orders SET allapot = (allapot + 1) WHERE id = ${pool.escape(req.params.id)};
    SELECT CAST(orders.allapot AS UNSIGNED) AS "allapot_number" FROM orders WHERE id = ${pool.escape(req.params.id)}`);

  if (result[1][0]['allapot_number'] === 4) {

    const items = await pool.query(`SELECT order_item.product_id, order_item.darab FROM order_item INNER JOIN orders ON order_item.order_id = orders.id WHERE orders.id = ${pool.escape(req.params.id)}`);

    for (const item of items) {
      await pool.query(`UPDATE product SET
      darab = IF(darab - ${item.darab} < 0, 0, (darab - ${item.darab})),
      allapot = IF(darab - ${item.darab} < 0, "Rendelésre", "Raktáron")
      WHERE id = ${item.product_id}`);
    }

  }

  res.end();
});


router.delete('/:id', authAdmin, async (req, res) => {
  await pool.query(`DELETE FROM orders WHERE id = ${pool.escape(req.params.id)}`);
  res.end();
});


router.get('/description/:id', authAdmin, async (req, res) => {
  const result = await pool.query(`SELECT orders.id, orders.datum, orders.allapot, CAST(orders.allapot AS UNSIGNED) AS "allapotnum", orders.ar_osszes, user.email, user.nev, user.tel, cim.irszam, cim.varos, user.utcaHazszam 
  FROM orders INNER JOIN user ON orders.user_id = user.id INNER JOIN cim ON user.cim_id = cim.id WHERE orders.id = ${pool.escape(req.params.id)};
  SELECT gyarto.name AS "gyarto", product.termek, order_item.darab, order_item.ar AS "arosszes" FROM order_item
  INNER JOIN product ON order_item.product_id = product.id INNER join gyarto ON product.gyarto = gyarto.id WHERE order_item.order_id = ${pool.escape(req.params.id)}`);

  res.send(result);
});


module.exports = router;
