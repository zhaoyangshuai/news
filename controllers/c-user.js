//将处理函数分发给每个控制器的时候需要对控制器进行模块处理，各司其职，不然控制器会有许多年需要去处理的函数，就会混乱，达不到模块开发，各司其职的目的，而这个模块就是进行用户功能的实现。so  起名字
//引入model 模块
const M_user = require('../models/m-user');


exports.showSignin = (req, res) => {
    res.render('signin.html');
};
exports.handleSignin = (req,res) => {
    //获取前端提供的数据
    const body = req.body;
    // console.log(body);
    //验证邮箱
    //现在处于一个难点，就是在这里要进行一个数据的封装，但是想拿到一步操作中得到的结果，所以要用到回调函数  拿到什么结果呢，就是拿到数据库查找后的返回结果，返回结果有两种情况，一种就是返回一个数组，一种就是返回一个错误。然后我们要对返回的结果进行不同的操作如果错误的话，就报服务器错误，否则就针对返数据的情况做不同的分析。
    // 使用在m模块中处理好的方法
    M_user.checkEmail(body.email, (err, data) => {
        if(err) {
            return res.send({
                code: 500,
                msg:'服务器出现错误'
            })
        }
        if(data.length === 0) {
            return res.send({
                code:1,
                msg:'邮箱不存在'
            })
        }
        if (data[0].password !== body.password) {
            return res.send({
                code: 2,
                msg: "密码不正确"
            });
        }
        // 保存此时session的信息
        req.session.user = data[0];
        res.send({
            code:200,
            msg:"可以登录了"
        })
    })
}
    
   

