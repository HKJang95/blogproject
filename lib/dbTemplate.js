// db 직접접근 위한 객체생성 후 return
var mysql = require('mysql2');

const db = mysql.createConnection({
  host:'',
  user:'',
  password:'',
  database:'myblog'
});

module.exports = db;