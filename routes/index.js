const pool = require('../modules/connection');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
  const manufacturers = await pool.query('SELECT * FROM gyarto ORDER BY name');
  const news = await pool.query('SELECT @rownum := @rownum + 1 AS `order`, id, cim, DATE(datum) AS "datum", tartalom, kep FROM news CROSS JOIN (SELECT @rownum := 0) AS `r` WHERE aktiv = 1 ORDER BY id DESC LIMIT 4');
  const mainProducts = await pool.query(`SELECT product.id, product.ar, product.akcios_ar, product.kep1, gyarto.name AS "gyarto", product.termek
    FROM product INNER JOIN gyarto ON product.gyarto = gyarto.id WHERE product.kiemelt = 1 ORDER BY product.id DESC LIMIT 4`);
  const saleProducts = await pool.query(`SELECT product.id, product.ar, product.akcios_ar, product.kep1, gyarto.name AS "gyarto", product.termek
    FROM product INNER JOIN gyarto ON product.gyarto = gyarto.id WHERE product.akcios_ar IS NOT NULL ORDER BY (product.akcios_ar / product.ar) LIMIT 4`);
  const newProducts = await pool.query(`SELECT product.id, product.ar, product.akcios_ar, product.kep1, gyarto.name AS "gyarto", product.termek
    FROM product INNER JOIN gyarto ON product.gyarto = gyarto.id ORDER BY product.id DESC LIMIT 4`);

  res.render('index', {
    title: 'DisplayCenter',
    page: 'index',
    manufacturers,
    news,
    mainProducts,
    saleProducts,
    newProducts
  });

});


module.exports = router;
