const authAdmin = require('../../middleware/admin');
const ordersCount = require('../../middleware/getnotapprovedorders');
const express = require('express');
const router = express.Router();


router.get('/dashboard', [authAdmin, ordersCount], async (req, res) => {
  const users = (await res.locals.conn.query('SELECT COUNT(id) AS "id" FROM user WHERE aktiv = 1'))[0].id;
  const ordersToApprove = (await res.locals.conn.query('SELECT COUNT(id) AS "id" FROM orders WHERE allapot = 1'))[0].id;
  const orders = (await res.locals.conn.query('SELECT COUNT(id) AS "id" FROM orders'))[0].id;
  // Sorry
  let dailyOrders = await res.locals.conn.query('SELECT DATE_FORMAT(a.date, "%m. %d.") AS date, COUNT(orders.id) AS orders FROM orders RIGHT JOIN (select a.Date FROM (select curdate() - INTERVAL (a.a + (10 * b.a) + (100 * c.a)) DAY as date from (select 0 as a union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) as a cross join (select 0 as a union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) as b cross join (select 0 as a union all select 1 union all select 2 union all select 3 union all select 4 union all select 5 union all select 6 union all select 7 union all select 8 union all select 9) as c) a WHERE a.Date BETWEEN (NOW() - INTERVAL 7 DAY) AND NOW()) AS a ON DATE(orders.datum) = a.date GROUP BY a.date');


  res.render('admin/dashboard', {
    title: 'Vezérlőpult',
    page: 'dashboard',
    users,
    ordersToApprove,
    orders,
    dailyOrders
  });
});


router.get('/adminmenumobile', [authAdmin, ordersCount], (req, res) => {
  res.render('admin/adminmenumobile', { title: 'Vezérlőpult', page: 'usermenumobile' });
});


module.exports = router;
