const md5 = require('md5');
const auth = require('../../middleware/auth');
const express = require('express');
const router = express.Router();


router.get('/orders', auth, async (req, res) => {
  const orders = await res.locals.conn.query(`SELECT gyarto.name AS "gyarto", product.termek, product.kep1, order_item.ar, order_item.darab, order_item.ar, orders.allapot, orders.datum
    FROM order_item INNER JOIN orders ON order_item.order_id = orders.id INNER JOIN product ON order_item.product_id = product.id INNER JOIN gyarto ON product.gyarto = gyarto.id
    WHERE orders.user_id = ${res.locals.user.id}`);

  res.render('user/orders', {
    title: 'Rendelések',
    page: 'orders',
    orders
  });
});


router.get('/wishlist', auth, async (req, res) => {
  const wishlist = await res.locals.conn.query(`SELECT gyarto.name AS "gyarto", product.kep1, product.id, product.termek, product.ar, product.akcios_ar, product.allapot
    FROM wishlist INNER JOIN product ON wishlist.item_id = product.id
    INNER JOIN gyarto ON product.gyarto = gyarto.id WHERE wishlist.user_id = ${res.locals.user.id}`);

  res.render('user/wishlist', {
    title: 'Kívánságlista',
    page: 'wishlist',
    wishlist
  });
});


router.get('/userdata', auth, async (req, res) => {
  const result = await res.locals.conn.query(`SELECT user.nev, user.email, cim.varos, cim.irszam, user.cim_id, user.utcaHazszam, user.tel
  FROM user INNER JOIN cim ON user.cim_id = cim.id WHERE user.id = ${res.locals.user.id}`);

  res.render('user/userdata', {
    title: 'Adatok módosítása',
    page: 'userdata',
    user: result[0]
  });
});


router.post('/userdata', auth, async (req, res) => {
  const city = await res.locals.conn.query(`SELECT id FROM cim WHERE varos = '${req.body.city}' AND irszam = '${req.body.zip}'`);
  if (city.length === 0) return res.redirect('/user/userdata?message=error&text=Érvénytelen település');
  const cimId = city[0].id;

  try {
    await res.locals.conn.query(`UPDATE user SET nev = "${req.body.name}", cim_id = "${cimId}", utcaHazszam = "${req.body.address}", tel = "${req.body.mobile}" WHERE id = ${res.locals.user.id}`);
    res.redirect('/user/userdata?message=success&text=Adataid frissítve');
  } catch (error) {
    res.redirect('/user/userdata?message=error&text=A megadott adatokban hibát találtunk');
  }
});


router.get('/userpass', auth, async (req, res) => {
  res.render('user/userpass', {
    title: 'Jelszó módosítása',
    page: 'userpass'
  });
});


router.post('/userpass', auth, async (req, res) => {
  const result = await res.locals.conn.query(`SELECT pwd FROM user WHERE id = '${res.locals.user.id}' AND pwd = "${md5(req.body.pass)}"`);

  if (result.length === 0) return res.redirect('/user/userpass?message=error&text=Hibás jelszó');
  if (req.body.passNew !== req.body.passNew2) return res.redirect('/user/userpass?message=error&text=Az új jelszó nem egyezik');
  if (req.body.passNew.length < 6) return res.redirect('/user/userpass?message=error&text=A jelszó hossza minimum 6 karakter');

  try {
    await res.locals.conn.query(`UPDATE user SET pwd = "${md5(req.body.passNew)}" WHERE id = ${res.locals.user.id}`);
    res.redirect('/user/userpass?message=success&text=Adataid frissítve');
  } catch (error) {
    res.redirect('/user/userpass?message=error&text=A megadott adatokban hibát találtunk');
  }
});


router.get('/usermenumobile', auth, (req, res) => {
  res.render('user/usermenumobile', { title: 'Saját fiók', page: 'orders' });
});


module.exports = router;
