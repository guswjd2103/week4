  
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var util = require('util');
var pool = require('../database/mysqlPool');
var config = require('../config.js');

var account = require('./account');
var fileList = require('./fileList');

router.use('/account', account);
router.use('/fileList', fileList);

module.exports = router;

