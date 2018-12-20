//1.导包
const express = require('express');
const router = require('./router');
const bodyParser = require('body-parser');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'news57'
};
const sessionStore = new MySQLStore(options);
//2.配置，实例化app 对象
const app = express();
//登录页的功能实现分析
// 先想一下我们要的效果，就是用户输入某个端口标识之后然后返还给其一个页面
//公开静态资源,这个功能由express的static方法实现
app.use('/public',express.static('./public'));
app.use('/node_modules',express.static('./node_modules'))
//配置模板引擎包
app.engine('html', require('express-art-template'));
//配置body-parser  效果是res多了一个render方法
app.use(bodyParser.urlencoded({
    extended: false
}));
//配置express-session 包
app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));
//3.监听各种请求
app.use(router);
//4.监听端口，
app.listen(12236,() => {
    console.log('run it -----');
})   