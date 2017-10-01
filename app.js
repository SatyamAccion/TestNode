var express = require('express');
var mysql = require('mysql');

var app = express();

var port = process.env.port || 8000;
var bodyParser = require('body-parser');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "teradyne11",
    database: "test"
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//var urlEncodedParser = bodyParser.urlencoded({ extended: false });

app.post('/',function(req,res){
    //res.setHeader('Content-Type', 'application/json');
    var query1=req.body.var1;
    var query2=req.body.var2;
    console.log(query1 + ' ' + query2);
    res.send = 'Hello World';//JSON.stringify({firstname:'satyam', lastname:'kumar'});
    });

app.get('/', function(req, res){
    res.send('<HTML><HEAD></HEAD<BODY>Hello World!</BODY></HTML>');
});

app.get('/person/:id', function(req, res){
    var id = req.params.id;
    console.log(id);
    console.log(con);
    if(con._connectCalled === false)
    {
        con.connect(function(err) {
            if (err) throw err;
        });
    }
    con.query('SELECT * FROM customers WHERE ID = ' + id, function (err, result, fields) {
          if (err) throw err;
          console.log(result);
          res.json(result);
          con.end();
    });   
});

app.get('/login', function(req, res){
    let user = req.query.user;
    let pwd = req.query.pwd;
    var sql = 'SELECT COUNT(*) AS valid FROM login WHERE email = \'' + user+ '\' and PASSWORD =\''+pwd+'\'';
        con.query(sql, 
        function (err, result, fields) {
          if (err) throw err;
          console.log(result);
          res.json(result);
        });    
});

app.post('/login', function(req, res){
    let user = req.body.user;
    let pwd = req.body.pwd;
    var sql = 'INSERT INTO `login`(`email`, `PASSWORD`) VALUES (\''+ user +'\',\''+ pwd +'\')';
    console.log(sql);
        con.query(sql, 
        function (err, result, fields) {
          if (err) throw err;
          console.log(result);
          res.json(result);
        });    
});

app.post('/employee', function(req, res){
    let name = req.body.name;
    let phone = req.body.phone;
    let shift = req.body.shift;
    var sql = 'INSERT INTO `Employee`(`Name`, `Phone`, `Shift`) VALUES (\''+ name +'\',\''+ phone + '\',\''+ shift +'\')';
    console.log(sql);
        con.query(sql, 
        function (err, result, fields) {
          if (err) throw err;
          console.log(result);
          res.json(result);
        });    
});

app.get('/json', function(req, res){
    res.json({firstname:'satyam', lastname:'kumar'});
})

//app.listen(port, '127.0.0.1');
app.listen(port, '0.0.0.0');


//var msg = 'Hello World!!!';
//console.log(msg);

//var http = require('http');

//http.createServer(function(req, res){
//    res.writeHead(200, {'Content-type':'application\json'});

//    var obj = {
//        firstName:'Hello World',
//        lastName:'How are you ?'
//    }
    //res.end(obj.toString());
//    res.end(JSON.stringify(obj));
//}).listen(1337, '127.0.0.1');