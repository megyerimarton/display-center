module.exports = function(req, res, next) {
  if (!res.locals.user.isAdmin) return res.status(403).send('Access denied'); // 403 - Forbidden

  next();
};
