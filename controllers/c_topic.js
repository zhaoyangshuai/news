//导入需要的数据模块
const M_topic = require('../models/m-topic')

//输出不同的处理模块
exports.showTopicList = (req, res) => {
    //这里要到页面之后，需要渲染真实的书，所以应该先找到所需要的数据
    M_topic.findAllTopics((err, data) => {
        if (err) {
            return res.send({
                code:500,
                msg:'服务器又错了'
            })
        }
        res.render("index.html", {topics:data})
    })
}
//因为这里的数据是假的，所以想让页面渲染的数据变成真数据
