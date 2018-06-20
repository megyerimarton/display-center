const authAdmin = require('../../middleware/admin');
const ordersCount = require('../../middleware/getnotapprovedorders');
const pool = require('../../modules/connection');
const express = require('express');
const router = express.Router();


router.get('/', [authAdmin, ordersCount], async (req, res) => {
  let n = await pool.query('SELECT COUNT(*) AS rows FROM user');
  n = n[0]['rows'];

  const page = +req.query.p ? +pool.escape(req.query.p) : 1;
  const limit = 10;
  const pages = Math.ceil(n / limit);
  const offset = (page - 1) * limit;

  const users = await pool.query(`SELECT id, nev, email, lastlogin, aktiv FROM user LIMIT ${limit} OFFSET ${offset}`);

  res.render('admin/users', {
    title: 'Felhasználók',
    page: 'users',
    users,
    pagination: {
      actual: page,
      prev: (page > 1) ? page - 1 : null,
      next: (page < pages) ? page + 1 : null
    }
  });
});


router.patch('/:id', authAdmin, async (req, res) => {
  await pool.query(`UPDATE user SET aktiv = IF(aktiv = 1, 0, 1) WHERE id = ${pool.escape(req.params.id)}`);
  res.end();
});


module.exports = router;
