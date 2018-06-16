const express = require('express');
const router = express.Router();


router.get('/:caption', (req, res) => {
  res.render('info', {
    title: 'Információ',
    page: 'info',
    caption: req.params.caption
  });
});


module.exports = router;
