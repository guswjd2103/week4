var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');
var cors = require('cors');
var favicon = require('serve-favicon');
var routes = require('./routes');

var app = express();

app.use(logger('dev'));
app.set('port', 8000);
app.set('view engine', 'ejs');
app.use(express.static('./public'));

app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.get('/', (req, res) => res.render('index'));

app.pool = require('./database/mysqlPool');

//cors
// app.use(cors({
//   origin : 'http://127.0.0.1;3000',
//   exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
//   maxAge: 5,
//   credentials: true,
//   allowMethods: ['GET', 'POST', 'DELETE'],
//   allowHeaders: ['Content-Type', 'Authorization', 'Accept','application/json','X-Requested-With','Origin'],
// }));

//routes '/api'로 들어오는 요청을 api폴더의 라우트들로 위임
app.use('/routes', routes); //api/account/signup 등 접근 가능

app.listen(8000, () => {
    console.log('server is running');
});

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

module.exports = app;