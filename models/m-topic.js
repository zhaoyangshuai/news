//查找数据需要先找到数据库
const  connection = require('../config/db_config')

//查找文章所需要的数据
exports.findAllTopics = (callback) => {
    const sqlstr = "SELECT *FROM `topics` ORDER BY id DESC";
    connection.query(sqlstr, (err,data) => {
        if(err) {
            return callback(err);
        }
        callback(null,data);
    })
}