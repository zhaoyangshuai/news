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
        res.render("index.html", {
            topics:data,
            user:req.session.user
        })
    })
}
//因为这里的数据是假的，所以想让页面渲染的数据变成真数据
//处理渲染创建文章页面的请求
exports.showCreatTopic = (req, res) => {
    //将在view页面找到的视图返回给浏览器
    res.render('topic/create.html')
}
exports.handleCreatTopic = (req, res) => {
    //接收到前端传来的数据
    //将数据传递到数据库中
    const body = req.body
    body.userId = req.session.user.id;
    console.log(body);
    //操作数据库，将应该有的信息插入到数据库中
    M_topic.addTopic(body, (err, data) =>{
        //如果错误的话，提示服务器出现了错误
        if(err) {
            return res.send({
                code:500,
                msg:'服务器出现了错误'
            })
        }
        res.send({
            code:200,
            msg:'登录成功了'
        })

    })
    
}
exports.showDetail = (req, res) => {
    //现在的需求变得更加精细了，就是需要的数据应该从数据库中取出来，想要在数据库中取数据，就应该根据前台提供的线索，也就是id值，所以需要先知道这篇文章的id值
    //req.params = {}  这里面存储的是动态发送而来的参数值
    //接受前面页面传来的动态参数值
    const topicID = req.params.topicID;
    // 根据id值连接数据库找到需要的信息
    M_topic.findTopicById(topicID, (err,data) => {
        
    })




    res.render('topic/show.html')
}
