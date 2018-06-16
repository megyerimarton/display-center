const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
  res.render('contact', { title: 'Kapcsolat', page: 'contact' });
});


module.exports = router;
