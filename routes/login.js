const jwt = require('jsonwebtoken');
const config = require('config');
const md5 = require('md5');
const pool = require('../modules/connection');
const express = require('express');
const router = express.Router();


router.post('/', async (req, res) => {
  const user = await pool.query(`SELECT id, email, pwd FROM user WHERE email = ${pool.escape(req.body.email)} AND pwd = "${md5(req.body.password)}" AND aktiv = 1`);

  if (user.length > 0) {
    const token = jwt.sign({ id: user[0].id, isAdmin: false }, config.get('jwtPrivateKey'));
    return res.cookie('token', token).redirect(`/?message=success&text=Sikeres bejelentkezés`);
  }

  const admin = await pool.query(`SELECT id, username, pwd FROM admin WHERE username = ${pool.escape(req.body.email)} AND pwd = "${md5(req.body.password)}"`);

  if (admin.length > 0) {
    const token = jwt.sign({ id: admin[0].id, isAdmin: true }, config.get('jwtPrivateKey'));
    return res.cookie('token', token).redirect(`/?message=success&text=Sikeres bejelentkezés`);
  }

  res.redirect('/?action=tryagain');
});


module.exports = router;
