const _ = require('lodash');
const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
  if (req.cookies.cart) res.send(JSON.parse(req.cookies.cart));
  else res.send({});
});


router.post('/', (req, res) => {
  let cart;

  if (req.cookies.cart) cart = JSON.parse(req.cookies.cart);
  else cart = {};

  cart[req.body.id] = cart[req.body.id] + 1 || 1;

  res.cookie('cart', JSON.stringify(cart)).send({cart, size: Object.keys(cart).length});
});


router.delete('/', (req, res) => {
  let cart;

  if (req.cookies.cart) {
    cart = _.omit(JSON.parse(req.cookies.cart), `${req.body.id}`);
  }
  else cart = {};

  res.cookie('cart', JSON.stringify(cart)).send({cart, size: Object.keys(cart).length});
});


router.patch('/', (req, res) => {
  let cart;

  if (req.cookies.cart) cart = JSON.parse(req.cookies.cart);
  else cart = {};

  if (cart[req.body.id] === 1) delete cart[req.body.id];
  else cart[req.body.id] = cart[req.body.id] - 1 || 1;

  res.cookie('cart', JSON.stringify(cart)).send({cart, size: Object.keys(cart).length});
});


module.exports = router;
