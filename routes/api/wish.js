const auth = require('../../middleware/auth');
const pool = require('../../modules/connection');
const express = require('express');
const router = express.Router();


router.get('/', auth, async (req, res) => {
  const wish = await pool.query(`SELECT gyarto.name AS "gyarto", product.kep1, product.id, product.termek, product.ar, product.akcios_ar, product.allapot
    FROM wishlist INNER JOIN product ON wishlist.item_id = product.id INNER JOIN gyarto ON product.gyarto = gyarto.id WHERE wishlist.user_id = ${res.locals.user.id}`);
  res.send(wish);
});


router.post('/', auth, async (req, res) => {
  await pool.query(`INSERT INTO wishlist (user_id, item_id) VALUES (${res.locals.user.id}, ${pool.escape(req.body.id)})`);
  res.end();
});


router.delete('/', async (req, res) => {
  await pool.query(`DELETE FROM wishlist WHERE user_id = ${res.locals.user.id} AND item_id = ${pool.escape(req.body.id)}`);
  res.end();
});


module.exports = router;
