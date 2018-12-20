//这个文件的目的就是处理本项目中数据查询的部分所以先引入的就是数据库操作
const connection = require('../config/db_config')
//将验证邮箱是否存在 的功能放在这里
//封装不同的函数

//验证邮箱
exports.checkEmail = (email, callback) => {
    const sqlstr = 'SELECT *FROM `users` WHERE email = ?';
    connection.query(sqlstr, email, (err,data) => {
        if(err) {
            //这时候会有err的结果
            callback(err, null);
        }else{
            //这时候会有data的结果
            callback(null, data);
        }
    })
}