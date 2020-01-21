var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var util = require('util');
var pool = require('../database/mysqlPool');

router.post('/signup', (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  var name = req.body.name;
  var department = req.body.department;
  
  pool.getConnection(function(err, connection) {
    if(err) {
      res.json({
        "code" : 3,
        "success" : false,
        "msg": "addUserData: mysql connection error",
        "err": err
      });
      return;
    }

    var query = util.format(
      'SELECT * FROM user_info WHERE email = %s;',
      mysql.escape(email)
    );
      
    connection.query(query, function(err, firstdata) {
      if(err) {
        res.json({
          "code" : 3,
          "success" : false,
          "msg" : "mysql error",
          "err" : err
        });
        // throw err;
        return;
      } 

      if(firstdata.toString() == "") { //기존에 없는 경우
        var newQuery = util.format(
          'INSERT INTO user_info (email, password, name, department) VALUES (%s, %s, %s, %s)', 
          mysql.escape(email),
          mysql.escape(password),
          mysql.escape(name),
          mysql.escape(department)
        );
        
        connection.query(newQuery, function(err, data) {
          if(err) {
            res.json({
              "code " : 2,
              "success" : false,
              "msg" : "mysql error",
              "err" : err
            });
            // throw err;
            return;
          }
        
          res.json({
            "code" : 0,
            "success" : true,
            "msg": "insert user info",
            "data": data
          });
        });

      } else { //기존에 있는 경우
        res.json({
        'code': 1, 
        'msg': 'Signup: given account is already registered'
        });
        throw err;
      }

      connection.release();
    });
  });
});

router.post('/login', (req, res) => {
  var email = req.body.email;
  var password = req.body.password;

  pool.getConnection(function(err, connection) {
    if(err) { 
      res.json({
        'code': 3, 
        'msg': 'Login: database connection error'
      });
      throw err;
      // return;
    }

    var query = util.format(
      'SELECT * FROM user_info WHERE email = %s AND password = %s;',
      mysql.escape(email),
      mysql.escape(password)
    );

    connection.query(query, function(err, data) {
      if(err) {
        res.json({
        'code': 3, 
        'msg': 'Login: database connection error'
        });
        throw err;
        // return;
      } 

      if(!(data.toString() == "")) { 
        let session = req.session;
        session.loginInfo = {
          username : data.username,
          id : data.id
        };
        
        res.json({
          'code': 0, 
          'msg': 'findAccountWithPW: found the account',
          'data' : data,
          'success' : true
        });
      } else { 
        res.json({
          'code': 1, 
          'msg': 'findAccountWithPW: not registered account'
        });
        throw err;
      }
      connection.release();
    });
  });
});

router.get('/getinfo', (req, res) => {
  if(typeof req.session.loginInfo === "undefined") {
      return res.status(401).json({
          error: "THERE IS NO LOGIN DATA",
          code: 1
      });
  }

  res.json({ info: req.session.loginInfo });
});


router.post('/logout', (req, res) => {
    retrun.res.json({success : true});
});

module.exports = router;