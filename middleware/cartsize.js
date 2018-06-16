module.exports = function(req, res, next) {
  if (req.cookies.cart) res.locals.cartSize = Object.keys(JSON.parse(req.cookies.cart)).length;
  else res.locals.cartSize = 0;

  next();
};
