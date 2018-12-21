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
        //拿到了数据库中相应id的数据
        console.log(data[0]);
        //将拿到的数据渲染在模板引擎中
        if(err) {
            return res.render({
                code:500,
                msg: '服务器出现了错误'
            })
        }
        res.render("topic/show.html",{
            //注意后端给的数据是数组，取的时候要注意方法
            topic:data[0],
            sessionUserId: req.session.user ? req.session.user.id : 0
        })
        
    })
    // res.render('topic/show.html')
}
exports.handleDeleteTopic = (req, res) => {
    //将相应的id值传来，通过id值操作数据库删除相应的内容
    //接受到前端传来的动态路由
    const topicID = req.params.topicID;
    //操作数据库，将该条信息删除了
    M_topic.deleteTopicById(topicID, (err, data) => {
        if(err) {
            return res.send({
                code:500,
                msg:'服务器出现错误了'
            })
        }
        res.redirect("/");
    })
}
    exports.showEdit = (req, res) => {
        // 1 获取话题id
        var topicID = req.params.topicID;
        // 2 让模型根据话题id去找到要编辑的话题
        M_topic.findTopicById(topicID, (err, results) => {
            if (err) {
                return res.send({
                    code: 500,
                    message: err.message
                });
            }
            // 3 渲染edit.html
            res.render("topic/edit.html", {
                topic: results[0]
            });
        });
    }

