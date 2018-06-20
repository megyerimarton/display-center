const pool = require('../modules/connection');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
  let userData;

  try {
    userData = await pool.query(`SELECT user.nev, user.email, cim.varos, cim.irszam, user.utcaHazszam, user.tel
      FROM user INNER JOIN cim ON user.cim_id = cim.id WHERE user.id = ${res.locals.user.id}`);
  } catch (error) {
    userData = [];
  }

  const cookieCart = JSON.parse(req.cookies.cart);
  const cart = [];
  let totalPrice = 0;

  for (const key in cookieCart) {
    if (cookieCart.hasOwnProperty(key)) {
      let product = await pool.query(`SELECT gyarto.name AS "gyarto", product.termek, product.ar, product.akcios_ar
      FROM product INNER JOIN gyarto ON product.gyarto = gyarto.id WHERE product.id = ${key}`);

      const item = Object.assign(product[0], {});
      item.quantity = cookieCart[key];

      cart.push(item);
      totalPrice += (item.akcios_ar) ? item.quantity * item.akcios_ar : item.quantity * item.ar;
    }
  }

  res.render('checkout', {
    title: 'Rendelés',
    page: 'checkout',
    userData: userData[0],
    cart,
    totalPrice
  });
});


router.post('/', async (req, res) => {
  let userId;
  let totalPrice = 0;

  // Check data
  if (
    req.body.name.length < 5 ||
    !(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/).test(req.body.email) ||
    req.body.mobile.length < 5 ||
    req.body.city.length < 5 ||
    req.body.zip.length !== 4 ||
    req.body.address.length < 4 ||
    !req.body.szallitas
  ) return res.redirect('/checkout?message=error&text=Hibát találtunk a megadott adatokban');

  // Check city, zip and set cimID
  const city = await pool.query(`SELECT id FROM cim WHERE varos = ${pool.escape(req.body.city)} AND irszam = ${pool.escape(req.body.zip)}`);
  if (city.length === 0) return res.redirect('/checkout?message=error&text=Érvénytelen település');
  const cimId = city[0].id;

  // If user is logged in, update data, else register the user with an inactive profile
  if (res.locals.user) {
    await pool.query(`UPDATE user SET nev = ${pool.escape(req.body.name)}, cim_id = "${cimId}", utcaHazszam = ${pool.escape(req.body.address)}, tel = ${pool.escape(req.body.mobile)} WHERE id = ${res.locals.user.id}`);
    userId = res.locals.user.id;
  } else {
    const result = await pool.query(`INSERT INTO user (nev, email, cim_id, utcaHazszam, tel, lastlogin, regdt, aktiv)
      VALUES (${pool.escape(req.body.name)}, ${pool.escape(req.body.email)}, '${cimId}', ${pool.escape(req.body.address)}, ${pool.escape(req.body.mobile)}, NOW(), NOW(), 0)`);
    userId = result.insertId;
  }

  // Calculate total price
  const cookieCart = JSON.parse(req.cookies.cart);
  const cart = [];
  for (const key in cookieCart) {
    if (cookieCart.hasOwnProperty(key)) {
      let product = await pool.query(`SELECT product.id, product.ar, product.akcios_ar FROM product WHERE product.id = ${key}`);
      const item = Object.assign(product[0], {});
      item.quantity = cookieCart[key];
      cart.push(item);
      totalPrice += (item.akcios_ar) ? item.quantity * item.akcios_ar : item.quantity * item.ar;
    }
  }

  try {
    let sql = 'START TRANSACTION;';
    sql += `INSERT INTO orders (user_id, datum, allapot, ar_osszes) VALUES (${userId}, NOW(), 1, ${totalPrice});`;
    sql += 'SET @order_id = LAST_INSERT_ID();';

    for (const item of cart) {
      let ar = (item.akcios_ar) ? item.quantity * item.akcios_ar : item.quantity * item.ar;
      sql += `INSERT INTO order_item (order_id, product_id, darab, ar) VALUES (@order_id, ${item.id}, ${item.quantity}, ${ar});`;
    }

    sql += 'COMMIT;';
    await pool.query(sql);
    res.clearCookie('cart').redirect('/?message=success&text=Rendelését rögzítettük');

  } catch (error) {
    res.redirect('/checkout?message=error&text=Hiba történt a rendelés leadása során, kérjük próbálja újra');
  }

});


module.exports = router;
