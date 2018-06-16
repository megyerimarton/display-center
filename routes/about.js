const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
  res.render('about', { title: 'Rólunk', page: 'about' });
});


module.exports = router;
