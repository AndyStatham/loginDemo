var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/',function(req, res, next) {
  res.render('index', { 
    title: '登录' 
  });
});

router.get('/sign',function(req, res, next) {
  res.render('sign', { 
    title: '帐号注册' 
  });
});

router.post('/', function(req, res, next) {
  var name = req.body.username;
  var pwd = req.body.password;
  var mysql = require('mysql');

   //配置连接
   var connection = mysql.createConnection({
    host: 'localhost',//主机地址
    user: 'root',//登录名
    password: 'password',//密码
    database:'nodejsdb'//数据库
  });
  //输入验证
  if(!name || name == "") {
    console.log("用户名不能为空");
    res.render('index', { 
      nameMes:'用户名不能为空'
    });
    // alert("用户名不能为s空");
    // res.send("用户名不能为空");
    return;
  }
  if(!pwd || pwd == "") {
    console.log("密码不能为空"); 
    res.render('index', { 
     pwdMes:'密码不能为空'
   });
    // res.send('密码不能为空');
    return;
  }
  //查库比较
  connection.connect();
  connection.query('SELECT COUNT(*) checkNum FROM `t_user` WHERE name = \''+name+'\' AND psw =\''+ pwd +'\'', function(err, rows, fields) {
    if (err) throw err;
    var checkNum = rows[0].checkNum;
    console.log('结果为: ', rows[0].checkNum);
    if(checkNum == 0){
      console.log('账号或密码不正确');
      res.render('index', { 
       messageCheck:'账号或密码不正确'
     });
    }else{
      console.log('登录成功');
      //返回结果
      res.redirect(307, 'login');
    }
  });
  connection.end();
});

// get login
router.post('/login', function(req, res,next) {
  var mysql = require('mysql');
  var dataArray=[{
    id:idData,
    name:nameData
  }];
  var nameData = [];
  var idData = [];

  //配置连接
  var connection = mysql.createConnection({
    host: 'localhost',//主机地址
    user: 'root',//登录名
    password: 'password',//密码
    database:'nodejsdb'//数据库
  });
  //查库比较
  connection.connect();
  connection.query('SELECT name,id FROM `t_user` ',function(err, result, fields) {
  	if (err) throw err;
  	// console.log(result);
  	for (var i = 0; i < result.length; i++) {
  		nameData[i] = result[i].name;
      idData[i] = result[i].id;
      dataArray[i] = {
        id:idData[i],
        name:nameData[i]
      }
    }
    res.render('login', { 
      title: 'login',
      // name: name,
      dataArray:dataArray
    });
    console.log(dataArray);
  });
  //关闭连接
  connection.end();
});

router.post('/accountDel', function(req,res) {
  var id = req.body.id;
  var mysql = require('mysql');
  // console.log(res);
  console.log(id);
   //配置连接
   var connection = mysql.createConnection({
    host: 'localhost',//主机地址
    user: 'root',//登录名
    password: 'password',//密码
    database:'nodejsdb'//数据库
  });
  //查库比较
  connection.connect();
  connection.query('DELETE FROM `t_user` WHERE id = \''+id+'\'',function(err, results, fields) {
    if (err) throw err;

  });

  connection.end();

});

module.exports = router;


