const authAdmin = require('../../middleware/admin');
const ordersCount = require('../../middleware/getnotapprovedorders');
const multer = require('multer');
const upload = multer({ dest: './public/images/news'});
const fs = require('fs');
const path = require('path');
const removeAccents = require('remove-accents');
const pool = require('../../modules/connection');
const express = require('express');
const router = express.Router();


router.get('/', [authAdmin, ordersCount], async (req, res) => {
  let n = await pool.query('SELECT COUNT(*) AS rows FROM product');
  n = n[0]['rows'];

  const page = +req.query.p ? +req.query.p : 1;
  const limit = 10;
  const pages = Math.ceil(n / limit);
  const offset = (page - 1) * limit;

  const products = await pool.query(`SELECT product.id, gyarto.name AS "gyarto", product.termek, product.allapot, product.ar, product.akcios_ar, product.aktiv
    FROM product INNER JOIN gyarto ON product.gyarto = gyarto.id ORDER BY product.id LIMIT ${limit} OFFSET ${offset}`);

  res.render('admin/products', {
    title: 'Termékek',
    page: 'adminproducts',
    products,
    pagination: {
      actual: page,
      prev: (page > 1) ? page - 1 : null,
      next: (page < pages) ? page + 1 : null
    }
  });
});


router.patch('/:id', authAdmin, async (req, res) => {
  await pool.query(`UPDATE product SET aktiv = IF(aktiv = 1, 0, 1) WHERE id = ${req.params.id}`);
  res.end();
});


router.get('/upload', authAdmin, async (req, res) => {
  let properties = await pool.query(`SELECT property_description.description, LOWER(property.name) AS "name"
    FROM property_description INNER JOIN property ON property_description.property_id = property.id WHERE product_id = 1`);
  properties = properties.map(item => {
    item.name2 = removeAccents(item.name);
    item.name = item.name[0].toUpperCase() + item.name.slice(1);
    return item;
  });
  let manufacturers = await pool.query('SELECT * FROM gyarto ORDER BY name');
  res.render('admin/uploadproducts', {
    title: 'Termék feltöltése',
    page: 'uploadproducts',
    properties,
    manufacturers
  });
});


router.get('/upload/:id', authAdmin, async (req, res) => {
  let product = await pool.query(`SELECT product.id, product.gyarto, product.termek, product.ar, product.akcios_ar, product.allapot, product.leiras, product.darab, product.kep1, product.kep2, product.kep3
    FROM product WHERE product.id = ${req.params.id}`);
  product = product[0];
  let properties = await pool.query(`SELECT property_description.description, LOWER(property.name) AS "name"
    FROM property_description INNER JOIN property ON property_description.property_id = property.id WHERE product_id = ${req.params.id}`);
  properties = properties.map(item => {
    item.name = item.name[0].toUpperCase() + item.name.slice(1);
    item.name2 = removeAccents(item.name);
    return item;
  });
  let manufacturers = await pool.query('SELECT * FROM gyarto ORDER BY name');

  res.render('admin/uploadproducts', {
    title: 'Termék feltöltése',
    page: 'uploadproducts',
    product,
    properties,
    manufacturers
  });
});


router.post('/upload', [authAdmin, upload.any()], async (req, res) => {
  let manufacturer = await pool.query(`SELECT name FROM gyarto WHERE id = ${req.body.gyarto}`);
  manufacturer = manufacturer[0].name;
  let imageNames = new Array(req.files.length);
  for (let i = 0; i < req.files.length; i++) {
    imageNames[i] = `${manufacturer}_${req.body.name}_${Date.now()}_${i}${path.extname(req.files[0].originalname)}`;
  }
  imageNames = imageNames.map(item => item.replace(/\s/g, '').toLocaleLowerCase());
  let properties = JSON.parse(JSON.stringify(req.body.properties));

  try {
    // Upload images
    if (req.files) {
      for (const item of req.files) {
        const index = req.files.indexOf(item);
        const tmpPath = req.files[index].path;
        const targetPath = `./public/images/products/${imageNames[index]}`;

        const src = fs.createReadStream(tmpPath);
        const dest = fs.createWriteStream(targetPath);

        src.pipe(dest);
        src.on('end', () => fs.unlinkSync(tmpPath));
        src.on('error', (err) => res.redirect('/admin/products/upload?message=error&text=Hiba történt a képek feltöltése során'));
      }
    } else throw new Error('There are no images uploaded');

    // Set the sql query
    let sql = 'START TRANSACTION;';
    sql += `INSERT INTO product (ar, allapot, gyarto, termek, leiras, darab, kep1, kep2, kep3) VALUES
      (${req.body.ar}, ${req.body.allapot}, "${req.body.gyarto}", "${req.body.name}", "${req.body.leiras}",
      ${req.body.darab}, "${imageNames[0]}", "${imageNames[1]}", "${imageNames[2]}");`;
    sql += 'SET @product_id = LAST_INSERT_ID();';

    let i = 1;
    for (const key in properties) {
      if (properties.hasOwnProperty(key)) {
        sql += `INSERT INTO property_description (product_id, property_id, description) VALUES
          (@product_id, ${i}, '${properties[key]}');`;
        i++;
      }
    }

    sql += 'COMMIT;';

    await pool.query(sql);
    res.redirect('/admin/products/upload?message=success&text=Sikeres feltöltés');

  } catch (error) {
    for (const item of imageNames) {
      const index = imageNames.indexOf(item);
      fs.unlinkSync(`./public/images/products/${imageNames[index]}`);
    }
    res.redirect('/admin/products/upload?message=error&text=Hiba történt a feltöltés során');
  }
});


router.post('/upload/:id', [authAdmin, upload.any()], async (req, res) => {
  let imageNames = await pool.query(`SELECT kep1, kep2, kep3 FROM product WHERE id = ${req.params.id}`);
  imageNames = Object.values(imageNames[0]);
  let properties = JSON.parse(JSON.stringify(req.body.properties));

  try {
    // Upload images
    if (req.files) {
      for (const item of req.files) {
        const index = req.files.indexOf(item);
        const tmpPath = req.files[index].path;
        const targetPath = `./public/images/products/${imageNames[index]}`;

        const src = fs.createReadStream(tmpPath);
        const dest = fs.createWriteStream(targetPath);

        src.pipe(dest);
        src.on('end', () => fs.unlinkSync(tmpPath));
        src.on('error', (err) => res.redirect('/admin/products/upload?message=error&text=Hiba történt a képek feltöltése során'));
      }
    }

    // Set the sql query
    const discount = req.body.akcios_ar ? `akcios_ar = ${req.body.akcios_ar},` : '';

    let sql = 'START TRANSACTION;';
    sql += `UPDATE product SET ar = ${req.body.ar}, ${discount} allapot = ${req.body.allapot},
      gyarto = "${req.body.gyarto}", termek = "${req.body.name}", leiras = "${req.body.leiras}",
      darab = "${req.body.darab}" WHERE id = ${req.params.id};`;

    let i = 1;
    for (const key in properties) {
      if (properties.hasOwnProperty(key)) {
        sql += `UPDATE property_description SET description = "${properties[key]}" WHERE product_id = ${req.params.id} AND property_id = ${i};`;
        i++;
      }
    }

    sql += 'COMMIT;';

    await pool.query(sql);
    res.redirect(`/admin/products/upload/${req.params.id}?message=success&text=Sikeres feltöltés`);

  } catch (error) {
    res.redirect(`/admin/products/upload/${req.params.id}?message=error&text=Hiba történt a feltöltés során`);
  }
});


module.exports = router;
