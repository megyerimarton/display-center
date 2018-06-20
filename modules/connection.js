const mysql = require('mysql');
const config = require('config');
const util = require('util');


const pool = mysql.createPool({
  host: config.get('db.host'),
  user: config.get('db.user'),
  password: config.get('db.password'),
  database: config.get('db.database'),
  multipleStatements: true,
  connectionLimit: 10
});


pool.getConnection((err, conn) => {
  if (err) throw new Error(err);

  conn.release();
});


pool.query = util.promisify(pool.query);


module.exports = pool;
