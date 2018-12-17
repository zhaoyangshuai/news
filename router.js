//我先在这里阐述一下router的职能 
//1.他是一个相对比较重要的部门，他主要有两个 第一就是创造不同的路由端口，这个端口的作用很明显，就是前端浏览器给地址的那个端口号
//第二就是分配不同那个的控制函数
//1.导包
const express = require('express');
const user = require('./controllers/user')
//2.实例化router对象，这个对象是router模块进行操作的主要工具
const router = express.Router();
//3.给router 对象增加不同的属性，也就是让router监听不同的请求,这个router在这里支持链式编程
router.get('/', user.showSignin);

//4.将路由对象导出去。
module.exports = router;
//在这个时候就需要去前台来修改相应的app木块的内容了。