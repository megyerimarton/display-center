const express = require('express');
const router = express.Router();


router.post('/', async (req, res) => {
  let sql = 'SELECT product.id, gyarto.name AS "gyarto", product.termek, product.kep1 FROM product INNER JOIN gyarto ON product.gyarto = gyarto.id WHERE product.aktiv = 1';

  const searchArray = req.body.search.split(' ');

  for (const item of searchArray) {
    sql += ` AND (gyarto.name LIKE "%${item}%" OR product.termek LIKE "%${item}%" OR product.leiras LIKE "%${item}%")`;
  }

  sql += ' LIMIT 3';

  const result = await res.locals.conn.query(sql);

  if (req.body.search !== '') {
    if (result.length > 0) {
      let string = '';

      for (const item of result) {
        string += `<a class="row" href="/products/${item.id}">
                      <img src="/images/products/${item.kep1}">
                      <div class="name">${item.gyarto} ${item.termek}<i class="material-icons">arrow_forward</i></div>
                  </a>`;
      }

      return res.send(string);
    } else {
      return res.send('<a class="row none"><i class="material-icons">info_outline</i>Nincs találat</a>');
    }
  } else {
    return res.send('<a class="row none"><i class="material-icons">info_outline</i>Keressen rá kulcsszavakra</a>');
  }
});


module.exports = router;
