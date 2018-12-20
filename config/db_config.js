//导入数据库对象
const mysql = require('mysql');
//配置数据库
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database:'news57'
});
//连接数据表
connection.connect();
//从数据库中查找信息
//将这个对象导出去
module.exports = connection;