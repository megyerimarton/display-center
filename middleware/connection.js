const mysql = require('mysql');
const config = require('config');
const util = require('util');


module.exports = function(req, res, next) {
  res.locals.conn = mysql.createConnection({
    host: config.get('db.host'),
    user: config.get('db.user'),
    password: config.get('db.password'),
    database: config.get('db.database'),
    multipleStatements: true
  });

  res.locals.conn.connect((err) => {
    if (err) throw new Error(err);
    else {
      res.locals.conn.query = util.promisify(res.locals.conn.query);
      next();
    }
  });
};

