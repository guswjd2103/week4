// require('dotenv').config();
// DEPENDENCIES
const express = require('express');
// const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var path = require('path');
var logger = require('morgan');
// var routes = require('./routes');
// const User = require('./models/list');
// const socketio = require('socket.io');

const app = express();
const port = 80;

// Static File Service
app.use(express.static('public'));

// Body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.engine('html', require('ejs').renderFile);
app.use(logger('dev'));

// Node.js의 native Promise 사용
// mongoose.Promise = global.Promise;
// mongoose.set('useCreateIndex', true);
// mongoose.set('useNewUrlParser', true);
// mongoose.set('useUnifiedTopology', true);

// // CONNECT TO MONGODB SERVER
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('Successfully connected to mongodb'))
//   .catch(e => console.error(e));

// var index = require('./routes/index')(app);

// app.use('/', index);
// app.get('/', function(req, res, next) {
//     res.render('index');
// })

app.get('/hi', function(req, res, next) {
    res.send("hi");
})

const server = app.listen(port, () => console.log(`Server listening on port ${port}`));
// var io = socketio.listen(server);
// var roomName;

// var whoIsOn = [];
// io.sockets.on('connection', function (socket){
//     // console.log('Socket ID : ' + socket.id + ', Connect');
    
//     //메세지 보내기
//     socket.on('clientMessage', function(data){ 
//         console.log('Client Message : ' + data);
         
//         var message = {
//             msg : 'server',
//             data : data
//         };

//         socket.emit('serverMessage', message);
//     });

//     //특정 방에 들어감
//     socket.on('joinRoom', function(data){  //클라이언트가 보내는 이벤트 듣기 : socket.on('event', function(data)...)
//         console.log(data); //들어간 방, username
//         socket.join(data.roomName);
//         roomName = data.roomName;
//         username = data.username;
//         if(!whoIsOn.includes(username)) {
//             whoIsOn.push(username);
//         }
//         console.log(roomName);
//         console.log(username);
//         console.log(whoIsOn);

//         // var whoIsOnJson = `${whoIsOn}`;
//         // console.log(whoIsOnJson);
//         io.sockets.in(roomName).emit('newUser', {username : username, roomName : roomName}); //server에서 client로 이벤ㅌ 보내기
//     });

//     socket.on('reqMsg', function(data) {
//         console.log(data);
//         roomName = data.roomName;
//         console.log(typeof(roomName));
//         // io.sockets.emit('recMsg', {answer: data.userName + " : " + data.answer+'\n'})
//         io.to(roomName).emit('recMsg', {answer: data.userName + " : " + data.answer+'\n'});
//     })

//     socket.on('draw', function(data) {
//         console.log(data);
//         roomName = data.roomName;
//         socket.broadcast.to(roomName).emit('paint',{x : data.x, y : data.y, check : data.check, color : data.color});
//     })

//     socket.on('reset', function(data) {
//         console.log(data);
//         roomName = data.roomName;
        
//         // io.sockets.emit('resetPaint', {resetMsg : data.userName});
//         io.to(roomName).emit('resetPaint', {resetMsg : data.userName});
//     })

//     socket.on('countUsers', function(data) {
//         console.log(whoIsOn);
//         console.log(whoIsOn.length);
//         io.sockets.emit('countUserNum', {userNum : whoIsOn.length, users : whoIsOn});
//     })

//     socket.on('leave', function(data) {
//         console.log('leave socket');
//         roomName = data.roomName;
//         userName = data.userName;

//         socket.leave(roomName);
//         var i;
//         for(i=0;i<whoIsOn.length;i++) {
//             if(whoIsOn[i] == userName) {
//                 whoIsOn.splice(i, 1);
//             }
//         }
//         console.log(whoIsOn);
//         io.to(roomName).emit('leaveMsg', {userName : data.userName, roomName : roomName});

//     })

//     socket.on('problem', function(data) {
//         answer = data.problem;
//         roomName = data.roomName;
//         console.log(answer);
//         socket.broadcast.to(roomName).emit('receiveProblem', {answer: answer});
//     })
// });