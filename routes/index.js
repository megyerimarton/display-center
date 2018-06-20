const pool = require('../modules/connection');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
  const manufacturers = await pool.query('SELECT * FROM gyarto');
  let news = await pool.query('SELECT id, cim, DATE(datum) AS "datum", tartalom, kep FROM news WHERE aktiv = 1 ORDER BY id DESC LIMIT 3');
  const saleProducts = await pool.query('SELECT product.id, product.ar, product.akcios_ar, product.kep1, gyarto.name AS "gyarto", product.termek FROM product INNER JOIN gyarto ON product.gyarto = gyarto.id WHERE product.akcios_ar IS NOT NULL ORDER BY (product.akcios_ar / product.ar) LIMIT 4');
  const newProducts = await pool.query('SELECT product.id, product.ar, product.akcios_ar, product.kep1, gyarto.name AS "gyarto", product.termek FROM product INNER JOIN gyarto ON product.gyarto = gyarto.id ORDER BY product.id DESC LIMIT 4');

  res.render('index', {
    title: 'DisplayCenter',
    page: 'index',
    manufacturers,
    news,
    saleProducts,
    newProducts
  });

});


module.exports = router;
