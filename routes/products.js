const pool = require('../modules/connection');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
  let sql = `SELECT id, gyarto, termek, ar, akcios_ar, kep1, felbontas, keparany, valaszido, szinmegjelenites, atmero, IF(id > (SELECT MAX(id) FROM product) - 5, true, false) AS ujtermek FROM product_view WHERE aktiv = 1`;

  // Filter
  if (req.query.search) {
    for (const item of req.query.search.split(' ')) {
      sql += ` AND (gyarto LIKE "%${item}%" OR termek LIKE "%${item}%" OR leiras LIKE "%${item}%")`;
    }
  }
  if (req.query.manufacturer) sql += ` AND gyarto = '${req.query.manufacturer}'`;
  if (req.query.priceFrom && req.query.priceTo) sql += ` AND (ar BETWEEN '${req.query.priceFrom}' AND '${req.query.priceTo}')`;
  if (req.query.sizeFrom && req.query.sizeTo) sql += ` AND (atmero BETWEEN '${req.query.sizeFrom}' AND '${req.query.sizeTo}')`;
  if (req.query.warrantyFrom && req.query.warrantyTo) sql += ` AND (CAST(garancia AS UNSIGNED) BETWEEN '${req.query.warrantyFrom}' AND '${req.query.warrantyTo}')`;
  if (req.query.order) sql += ` ORDER BY ${req.query.order}`;
  // Filter end

  let n = await pool.query(sql)
  n = n.length;

  const page = +req.query.p ? +req.query.p : 1;
  const limit = 12;
  const pages = Math.ceil(n / limit);
  const offset = (page - 1) * limit;


  sql += ` LIMIT ${limit} OFFSET ${offset}`;

  const result = await pool.query(sql)
  const manufacturers = await pool.query('SELECT * FROM gyarto');
  const minMaxPrice = await pool.query('SELECT MIN(ar) AS "min", MAX(ar) AS "max" FROM product');
  const minMaxSize = await pool.query('SELECT MIN(CAST(property_description.description AS UNSIGNED)) AS "min", MAX(CAST(property_description.description AS UNSIGNED)) AS "max" FROM property_description WHERE property_description.property_id = 1;');
  const minMaxWarranty = await pool.query('SELECT MIN(CAST(property_description.description AS UNSIGNED)) AS "min", MAX(CAST(property_description.description AS UNSIGNED)) AS "max" FROM property_description WHERE property_description.property_id = 14;');


  let wishlist;
  try {
    wishlist = await pool.query(`SELECT item_id FROM wishlist WHERE user_id = ${res.locals.user.id}`);
    wishlist = Array.from(new Set(wishlist.map(item => item.item_id)));
  } catch (error) {
    wishlist = [];
  }


  res.render('products', {
    title: 'Termékek',
    page: 'products',
    products: result,
    manufacturers,
    wishlist,
    filter: {
      price: {
        min: minMaxPrice[0].min,
        max: minMaxPrice[0].max
      },
      size: {
        min: minMaxSize[0].min,
        max: minMaxSize[0].max
      },
      warranty: {
        min: minMaxWarranty[0].min,
        max: minMaxWarranty[0].max
      }
    },
    pagination: {
      actual: page,
      prev: (page > 1) ? page - 1 : null,
      next: (page < pages) ? page + 1 : null
    }
  });
});


router.get('/:id', async (req, res) => {
  const result = await pool.query(`SELECT product.id, product.ar, product.akcios_ar, product.allapot, gyarto.name AS gyarto, product.termek, product.leiras, product.darab, product.kep1, product.kep2, product.kep3, gyarto.kep AS gyartokep, gyarto.web FROM product INNER JOIN gyarto ON product.gyarto = gyarto.id WHERE product.id = ${req.params.id}`);
  const details = await pool.query(`SELECT property_description.description, property.name FROM property_description INNER JOIN property ON property_description.property_id = property.id WHERE product_id = ${req.params.id}`);
  const garancia = details.filter(item => item.name === 'Garancia')[0]['description'];
  const saleProducts = await pool.query('SELECT product.id, product.ar, product.akcios_ar, product.kep1, gyarto.name AS "gyarto", product.termek FROM product INNER JOIN gyarto ON product.gyarto = gyarto.id WHERE product.akcios_ar IS NOT NULL ORDER BY (product.akcios_ar / product.ar) LIMIT 4');

  let isInWish = false;
  if (res.locals.user) {
    const wish = await pool.query(`SELECT item_id FROM wishlist WHERE user_id = ${res.locals.user.id} AND item_id = ${result[0].id}`);
    if (wish.length > 0) isInWish = true;
  }

  res.render('product', {
    title: `${result[0].gyarto} ${result[0].termek}`,
    page: 'product',
    product: result[0],
    details,
    garancia,
    saleProducts,
    isInWish
  });
});


module.exports = router;
