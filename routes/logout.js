const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
  res.clearCookie('token').redirect('/');

});


module.exports = router;
