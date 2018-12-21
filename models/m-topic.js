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
exports.addTopic = (body, callback) => {
    const sqlstr = "INSERT INTO `topics` SET ?";
    //查找数据库，增加数据信息
    connection.query(sqlstr, body, (err, data) => {
        if (err) {
            return callback(err);
        }
        callback(null, data);
    })
}
exports.findTopicById = (topicID, callback) => {
    const sqlstr = "SELECT *FROM `topics` WHERE id = ?";
    connection.query(sqlstr, topicID, (err, data) => {
        if(err) {
            return callback(err);
        }
        callback(null, data)
    })
}
exports.deleteTopicById = (topicID, callback) => {
    const sqlstr = "DELETE FROM `topics` WHERE id = ?";
    connection.query(sqlstr, topicID, (err, data) => {
        if(err) {
            return callback(err);
        }
        callback(null,data);
    })

}
