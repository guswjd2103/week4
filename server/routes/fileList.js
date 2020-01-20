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
    destination : './public/uploads/',
    filename : function(req, file, cb) {
        cb(null, Date.now() + "-" + path.extname(file.originalname));
    }
})

var upload = multer({
    storage : storage,
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

router.post('/uploadFile', upload.single('file'), function(req, res) {

    console.log('file upload');
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

//서버에 있는 유저의 파일 리스트 보여주기
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

//과목에 해당하는 파일 리스트
router.post('/getfileSubject', function(req, res) {

    const subject = req.body.subject;

    console.log(subject);
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
        
        var query = util.format(
            'SELECT * FROM subject_files WHERE subject = %s;',
            mysql.escape(subject)
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
                    "data" : result 
                });
            });
    })
})

//서버에서 파일 다운받기
router.get('/download/:name', function(req, res) {
    var filename = req.params.name;

    var file = __dirname + '/../public/uploads/' + filename;
    res.download(file);
});

//파일에 해당하는 댓글 보여주기
router.post('/getComment', function(req, res) {

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

//학과에 해당하는 과목 명 불러오기
router.post('/getSubject', (req, res) => {
    const department = req.body.department;

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
            'SELECT subject FROM subject_department WHERE department = %s;',
            mysql.escape(department)
        );

        connection.query(query, function(err, data) {
            if(err) {
                res.json({
                    "code" : 2,
                    "success" : false,
                    "msg" : "fail to connect database",
                    "err" : err
                });
                return;

            } else { 
                console.log(data);
                res.json({
                    "code" : 0,
                    "success"  :true,
                    'msg' : 'successfully stored',
                    "subject" : data
                });
            }
        })
    })
})

//과목 상세정보 알려주기
router.post('/getSubjectDetail', (req, res) => {
    const subject = req.body.subject;
    
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
            'SELECT * FROM subject_details WHERE subject = %s;',
            mysql.escape(subject)
        );

        connection.query(query, function(err, data) {
            if(err) {
                res.json({
                    "code" : 2,
                    "success" : false,
                    "msg" : "fail to connect database",
                    "err" : err
                });
                return;

            } else { 
                console.log(data);
                res.json({
                    "code" : 0,
                    "success"  :true,
                    'msg' : 'successfully stored',
                    "data" : data
                });
            }
        })
    })
})

//파일 상세정보 보기
router.post('/getFileDetail', (req, res) => {
    const filename = req.body.filename;
    
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
            'SELECT * FROM file_details WHERE filename = %s;',
            mysql.escape(filename)
        );

        connection.query(query, function(err, data) {
            if(err) {
                res.json({
                    "code" : 2,
                    "success" : false,
                    "msg" : "fail to connect database",
                    "err" : err
                });
                return;

            } else { 
                console.log(data);
                res.json({
                    "code" : 0,
                    "success"  :true,
                    'msg' : 'successfully stored',
                    "data" : data
                });
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


//댓글 수정하기
router.post('/updateComment', function(req, res){ 
    var username = req.body.username;
    var filename = req.body.filename;
    var comment = req.body.comment;

    console.log(username);
    console.log(filename);
    console.log(comment);
    console.log('update');

    pool.getConnection(function(err, connection) {
      if(err) {
        // console.log('database connection error');
        res.send({
          'code': 2, 
          'msg': 'database connection error'
  
        });
        return;
      }

      var query = util.format(
        'UPDATE file_comments SET comment = %s WHERE username = %s and filename = %s;',
        mysql.escape(comment),
        mysql.escape(username),
        mysql.escape(filename)
      );

      connection.query(query, function(err, data) {
        if(err) {
          // console.log('database connection error');
          res.send({
            'code': 2, 
            'msg': 'database connection error'
          });
          connection.release();
          return;
        }

        if(!(data.toString() == "")) {
          // console.log('Update Notice Comment : successfully updated');
          res.send({
            'code': 0, 
            'msg': 'Update Notice Comment : successfully updated',
            'data' : data,
            'comment' : comment
          });
        } else {
          // console.log('Update Notice Comment : Fail to Update');
          res.send({
            'code': 1, 
            'msg': 'Update Notice Comment : Fail to Update'
          });
        }
        connection.release();
      });
    });
  });

//댓글 삭제
router.post('/deleteComment', function(req, res){
    var username = req.body.username;
    var comment = req.body.comment;

    console.log('delete');

    pool.getConnection(function(err, connection) {
      if(err) {
        // console.log('database connection error');
        res.send({
          'code': 2, 
          'msg': 'database connection error'
  
        });
        return;
      }

      var query = util.format(
        'DELETE FROM file_comments WHERE username = %s and comment = %s',
        mysql.escape(username),
        mysql.escape(comment)
      );

      connection.query(query, function(err, data) {
        if(err) {
          // console.log('database connection error');
          res.send({
            'code': 2, 
            'msg': 'database connection error'
          });
          connection.release();
          return;
        }

        if(!(data.toString() == "")) {
          // console.log('Delete Notice Comment : successfully deleted');
          res.send({
            'code': 0, 
            'msg': 'Delete Notice Comment : successfully deleted'
          });
        } else {
          // console.log('Delete Notice Comment : Fail to delete');
          res.send({
            'code': 1, 
            'msg': 'Delete Notice Comment : Fail to delete'
          });
        }
        connection.release();
      });
    });
  });

module.exports = router;
