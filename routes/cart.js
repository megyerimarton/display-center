const pool = require('../modules/connection');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
  if (res.locals.cartSize === 0) return res.render('cart', { title: 'Kosár', page: 'cart' });

  const cookieCart = JSON.parse(req.cookies.cart);
  const cart = [];
  let totalPrice = 0;

  for (const key in cookieCart) {
    if (cookieCart.hasOwnProperty(key)) {
      let product = await pool.query(`SELECT product.id, gyarto.name AS "gyarto", product.termek, product.allapot, product.ar, product.akcios_ar, product.kep1 FROM product INNER JOIN gyarto ON product.gyarto = gyarto.id WHERE product.id = ${key}`);

      const item = Object.assign(product[0], {});
      item.quantity = cookieCart[key];

      cart.push(item);
      totalPrice += (item.akcios_ar) ? item.quantity * item.akcios_ar : item.quantity * item.ar;
    }
  }

  res.render('cart', {
    title: 'Kosár',
    page: 'cart',
    cart,
    totalPrice
  });
});


module.exports = router;
