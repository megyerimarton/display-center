const jwt = require('jsonwebtoken');
const config = require('config');


module.exports = function(req, res, next) {
  const token = req.cookies.token;

  if (token) {
    try {
      const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
      res.locals.user = decoded;
    } catch (ex) { }
  }

  next();
};
