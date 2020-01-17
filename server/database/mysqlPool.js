var config = require('../config');
var mysql = require('mysql');

var pool = mysql.createPool({
  host: config.mysqlConfig.host,
  port: config.mysqlConfig.port,
  user: config.mysqlConfig.user,
  password: config.mysqlConfig.password,
  database: config.mysqlConfig.database,
  connectionLimit: config.mysqlConfig.connectionLimit,
  waitForConnections: config.mysqlConfig.waitForConnections,
  multipleStatements: true
});

module.exports = pool;  