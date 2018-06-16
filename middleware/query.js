module.exports = function(req, res, next) {
  res.locals.query = req.query;

  next();
};
