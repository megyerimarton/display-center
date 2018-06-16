module.exports = function(req, res, next) {
  req.on('end', () => {
    res.locals.conn.end();
  });
  next();
};
