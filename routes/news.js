const pool = require('../modules/connection');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
  let n = await pool.query('SELECT COUNT(*) AS rows FROM news WHERE aktiv = 1');
  n = n[0]['rows'];

  const page = +req.query.p ? +req.query.p : 1;
  const limit = 5;
  const pages = Math.ceil(n / limit);
  const offset = (page - 1) * limit;

  const news = await pool.query(`SELECT id, cim, szerzo, datum, tartalom, kep FROM news WHERE aktiv = 1 ORDER BY id DESC LIMIT ${limit} OFFSET ${offset}`);

  res.render('news', {
    title: 'Hírek',
    page: 'news',
    news,
    pagination: {
      actual: page,
      prev: (page > 1) ? page - 1 : null,
      next: (page < pages) ? page + 1 : null,
      pages
    }
  });
});


router.get('/:id', async (req, res) => {
  const result = await pool.query(`SELECT cim, szerzo, datum, tartalom, kep FROM news WHERE aktiv = 1 AND id = ${pool.escape(req.params.id)}`);

  res.render('new', {
    title: result[0].cim,
    page: 'new',
    new: result[0]
  });
});


module.exports = router;
