module.exports = function(err, req, res, next) {
  res.render('error', {
    error: {
      message: err.message,
      status: err.status || 500,
      stack: process.env.NODE_ENV === 'development' ? err.stack : null
    }
  });
};
