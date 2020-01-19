var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var fs = require('fs');
var ejs = require('ejs');
var multer = require('multer');
var path = require('path');
var pool = require('../database/mysqlPool');
var util = require('util');

var storage = multer.diskStorage({
    // destination : function (req, file, callback) {
    //     if(file.mimetype == "image/jpeg" || file.mimetype == "image/jpg" || file.mimetype == "image/png") {
    //         console.log('image file');
    //         callback(null, './public/uploads/images')
    //     } else if (file.mimetype == "application/pdf" || file.mimetype == "application/txt" || file.mimetype == "application/octet-stream") {
    //         console.log('file type');
    //         callback(null, './public/uploads/texts');
    //     }
    // },
    destination : './public/uploads/',
    filename : function(req, file, cb) {
        cb(null, Date.now() + "-" + path.extname(file.originalname));
    }
})

var upload = multer({
    storage : storage,
    // fileFilter : function(req, file, cb) {
    //     checkFileType(file, cb);
    // }
});

function checkFileType(file, cb) {
    const filetypes = /jpeg | jpg | png | gif/;

    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if(mimetype && extname) {
        return cb(null, true);
    } else {
        cb('ERROR : Images only!');
    }
}

// router.get('/', function(req, res) {
//     res.send('index');
// });

router.post('/uploadFile', upload.single('fileupload'), function(req, res) {
    console.log('file upload');
    console.log(req.file); // file passed from client
    console.log(req.body); //other values passed from the client like name...
    console.log(req.file.path);
    // const username = req.body.username;
    const username = "haha";
    const filename = req.file.filename; //file path
    const type = req.file.mimetype;
    const size = req.file.size;

    pool.getConnection(function(err, connection) {
        if(err) {
            res.json({
                "code" : 3,
                "success" : false,
                "msg" : 'fail to connect database',
                "err" : err
            });
            return;
        }

        var query = util.format(
            'INSERT INTO user_file (username, filename, type, size) VALUES (%s, %s, %s, %d)',
            mysql.escape(username),
            mysql.escape(filename),
            mysql.escape(type),
            mysql.escape(size)
        );

        connection.query(query, function(err, data) {
            if(err) {
                res.json({
                    "code" : 2,
                    "success" : false,
                    "msg" : 'fail to connect database',
                    "err" : err
                });
                console.log(err);

                return;
            }

            res.render('index');
        })
    })
});

router.get('/fileList', function(req, res) {
    var department = req.body.department;

    pool.getConnection(function(err, connection) {
        if(err) {
            res.json({
                "code" : 3,
                "success" : false,
                "msg" : "mysql connection error",
                "err" : err
            })
            
            return;
        } 
        fs.readFile('file.html', 'utf-8', function(error, data) {
            var query = util.format(
                'SELECT * FROM user_file where department = %s;',
                mysql.escape(department)
            );
    
            connection.query(query, function(err, result) {
                if(err) {
                    res.json({
                        "code" : 2,
                        "success" : false,
                        "msg" : 'fail to connect database',
                        "err" : err
                    });
                    return;
                }
    
                res.json({
                    data : result 
                });
            });
        })
    })
})

//서버에 있는 파일 리스트 보여주기
router.get('/filepage', function(req, res) {

    var path = __dirname + '/../' + 'public/uploads';

    pool.getConnection(function(err, connection) {
        if(err) {
            res.json({
                "code" : 3,
                "success" : false,
                "msg" : "mysql connection error",
                "err" : err
            })
            
            return;
        } 
        fs.readFile('file.html', 'utf-8', function(error, data) {
            var query = util.format(
                'SELECT * FROM user_file',
            );
    
            connection.query(query, function(err, result) {
                if(err) {
                    res.json({
                        "code" : 2,
                        "success" : false,
                        "msg" : 'fail to connect database',
                        "err" : err
                    });
                    return;
                }
    
                res.json({
                    data : result 
                });
            });
        })
    })
})


//서버에서 파일 다운받기
router.get('/download/:name', function(req, res) {
    var filename = req.params.name;

    var file = __dirname + '/../public/uploads/' + filename;
    res.download(file);
});

//파일에 해당하는 댓글 보여주기
router.get('/getComment', function(req, res) {
    // const filename = req.body.filename;
    // console.log(filename);
    console.log(req.body);
    pool.getConnection(function(err, connection) {
        if(err) {
            res.json({
                "code" : 3,
                "success" : false,
                "msg" : 'fail to connect database',
                "err" : err
            });
            return;
        }

        // var query = util.format(
        //     'SELECT comment FROM file_comments WHERE filename = %s;',
        //     mysql.escape(filename)
        // );

        var query = util.format(
            'SELECT * FROM file_comments;'
        );

        connection.query(query, function(err, data) {
            if(err) {
                res.json({
                    "code" : 3,
                    "success" : false,
                    "msg" : 'fail to connect database',
                    "err" : err
                });

                return;
            }

            console.log('connection success');

            if(!(data.toString() == "")){ //file에 대한 comment가 있을 때
                res.json({
                    'code' : 0,
                    'comments' : data
                })
                console.log(data);

            } else {
                res.json({
                    "code" : 1,
                    'msg' : 'no exist comments'
                })
                console.log('fail');
            }
        })
    })
})

//댓글 추가하기
router.post('/addComment', (req, res) => {
    const username = req.body.username;
    const filename = req.body.filename;
    const comment = req.body.content;

    pool.getConnection(function(err, connection) {
        if(err) {
            res.json({
                "code" : 3,
                "success" : false,
                "err" : err
            });

            return;
        }
        
        var query = util.format(
            'INSERT INTO file_comments (username, filename, comment) VALUES (%s, %s, %s);',
            mysql.escape(username),
            mysql.escape(filename),
            mysql.escape(comment)
        );

        connection.query(query, function(err, data) {
            if(err) {
                res.json({
                    "code" : 2,
                    "success" : false,
                    "msg" : "fail to connect database",
                    "err" : err
                });
                console.log('fail server');

                return;
            } else { 
                res.json({
                    "code" : 0,
                    "success"  :true,
                    'msg' : 'successfully stored'
                });
            }
        })
    })
})

module.exports = router;
