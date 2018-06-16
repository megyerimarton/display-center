const express = require('express');
const router = express.Router();


router.post('/', async (req, res) => {
  const result = await res.locals.conn.query(`SELECT irszam FROM cim WHERE varos LIKE "${req.body.city}%"  LIMIT 1`);
  res.send(result[0]);
});


module.exports = router;
