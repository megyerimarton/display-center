const md5 = require('md5');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
  if (res.locals.user) return res.redirect('/');

  res.render('register', {
    title: 'Regisztráció',
    page: 'register'
  });
});


router.post('/', async (req, res) => {
  const check = await res.locals.conn.query(`SELECT email FROM user WHERE email = '${req.body.email}'`);
  if (check.length > 0) return res.redirect('/register?message=error&text=Az email cím már foglalt');

  const city = await res.locals.conn.query(`SELECT id FROM cim WHERE varos = '${req.body.city}' AND irszam = '${req.body.zip}'`);
  if (city.length === 0) return res.redirect('/register?message=error&text=Érvénytelen település');
  const cimId = city[0].id;

  if (
    !(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/).test(req.body.email) ||
    req.body.pass.length < 6 ||
    req.body.pass2.length < 6 ||
    req.body.pass !== req.body.pass2 ||
    req.body.name.length < 5 ||
    req.body.address.length < 5 ||
    req.body.mobile.length < 5
    ) {
    return res.redirect('/register?message=error&text=Érvénytelen település');
  }


  await res.locals.conn.query(`INSERT INTO user (nev, email, pwd, cim_id, utcaHazszam, tel, lastlogin, regdt, aktiv)
  VALUES ('${req.body.name}', '${req.body.email}', '${md5(req.body.pass)}', '${cimId}', '${req.body.address}', '${req.body.mobile}', NOW(), NOW(), 1)`);

  res.redirect('/?message=success&text=Sikeres regisztráció, most már bejelentkezhetsz');
});


module.exports = router;
