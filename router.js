//我先在这里阐述一下router的职能 
//1.他是一个相对比较重要的部门，他主要有两个 第一就是创造不同的路由端口，这个端口的作用很明显，就是前端浏览器给地址的那个端口号
//第二就是分配不同那个的控制函数
//1.导包
const express = require('express');
//导入用户控制器
const c_user = require('./controllers/c-user')
const c_topic = require('./controllers/c_topic')
//2.实例化router对象，这个对象是router模块进行操作的主要工具
const router = express.Router();
//3.给router 对象增加不同的属性，也就是让router监听不同的请求,这个router在这里支持链式编程
router
      .get('/signin',c_user.showSignin)
      .post('/signin',c_user.handleSignin)
      .get('/', c_topic.showTopicList)
      .get('/topic/create', c_topic.showCreatTopic)
      .post('/creatTopic', c_topic.handleCreatTopic)
      .get('/signout', c_user.signout)
      .get('/topic/detail/:topicID', c_topic.showDetail)
      .get('/topic/detail/:topicID/delete',c_topic.handleDeleteTopic)
      .get("/topic/:topicID/edit", c_topic.showEdit);
//4.将路由对象导出去。
module.exports = router;
//在这个时候就需要去前台来修改相应的app木块的内容了。