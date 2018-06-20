const authAdmin = require('../../middleware/admin');
const ordersCount = require('../../middleware/getnotapprovedorders');
const multer = require('multer');
const upload = multer({ dest: './public/images/news'});
const fs = require('fs');
const path = require('path');
const pool = require('../../modules/connection');
const express = require('express');
const router = express.Router();


router.get('/', [authAdmin, ordersCount], async (req, res) => {
  let n = await pool.query('SELECT COUNT(*) AS rows FROM news');
  n = n[0]['rows'];

  const page = +req.query.p ? +req.query.p : 1;
  const limit = 10;
  const pages = Math.ceil(n / limit);
  const offset = (page - 1) * limit;

  const news = await pool.query(`SELECT id, cim, szerzo, datum, aktiv
    FROM news ORDER BY datum DESC LIMIT ${limit} OFFSET ${offset}`);

  res.render('admin/news', {
    title: 'Hírek',
    page: 'adminnews',
    news,
    pagination: {
      actual: page,
      prev: (page > 1) ? page - 1 : null,
      next: (page < pages) ? page + 1 : null
    }
  });
});


router.patch('/:id', authAdmin, async (req, res) => {
  await pool.query(`UPDATE news SET aktiv = IF(aktiv = 1, 0, 1) WHERE id = ${req.params.id}`);
  res.end();
});


router.delete('/:id', authAdmin, async (req, res) => {
  await pool.query(`DELETE FROM news WHERE id = ${req.params.id}`);
  res.end();
});


router.get('/upload', authAdmin, (req, res) => {
  res.render('admin/uploadnews', { title: 'Hír feltöltése', page: 'uploadnews' });
});


router.get('/upload/:id', authAdmin, async (req, res) => {
  let result = await pool.query(`SELECT id, cim, szerzo, datum, tartalom, kep, aktiv FROM news WHERE id = ${req.params.id}`);
  result = result[0];

  res.render('admin/uploadnews', {
    title: 'Hír feltöltése',
    page: 'uploadnews',
    new: result
  });
});


router.post('/upload', [authAdmin, upload.single('kep')], async (req, res) => {
  let fileName = '';
  let tmpPath = '';
  let targetPath = '';

  if (req.file) {

    fileName = req.body.title.replace(/\s/g, '') + Date.now() + path.extname(req.file.originalname);
    tmpPath = req.file.path;
    targetPath = './public/images/news/' + fileName;

    const src = fs.createReadStream(tmpPath);
    const dest = fs.createWriteStream(targetPath);

    src.pipe(dest);
    src.on('end', () => fs.unlink(tmpPath));
    src.on('error', (err) => res.redirect('/admin/news/upload?message=error&text=Hiba történt a feltöltés során'));

  }

  try {
    await pool.query(`INSERT INTO news (cim, szerzo, datum, tartalom, kep)
      VALUES ("${req.body.title}", "admin", NOW(), "${req.body.content}", "${fileName}")`);
  } catch (error) {
    fs.unlink(targetPath);
    return res.redirect('/admin/news/upload?message=error&text=Hiba történt a feltöltés során');
  }

  res.redirect('/admin/news/upload?message=success&text=Sikeres feltöltés');
});


router.post('/upload/:id', [authAdmin, upload.single('kep')], async (req, res) => {
  const imageName = await pool.query(`SELECT kep FROM news WHERE id = ${req.params.id}`);

  let fileName = imageName[0].kep;
  if (!fileName) fileName = req.body.title.replace(/\s/g, '') + Date.now() + path.extname(req.file.originalname);
  let tmpPath = '';
  let targetPath = '';

  if (req.file) {

    tmpPath = req.file.path;
    targetPath = './public/images/news/' + fileName;

    const src = fs.createReadStream(tmpPath);
    const dest = fs.createWriteStream(targetPath);

    src.pipe(dest);
    src.on('end', () => fs.unlink(tmpPath));
    src.on('error', (err) => res.redirect(`/admin/news/upload/${req.params.id}?message=error&text=Hiba történt a feltöltés során`));

  }

  try {
    await pool.query(`UPDATE news SET cim = "${req.body.title}", tartalom="${req.body.content}" WHERE id = ${req.params.id}`);
  } catch (error) {
    return res.redirect(`/admin/news/upload/${req.params.id}?message=error&text=Hiba történt a feltöltés során`);
  }

  res.redirect(`/admin/news/upload/${req.params.id}?message=success&text=Az adatok frissítése sikerült`);
});


module.exports = router;
