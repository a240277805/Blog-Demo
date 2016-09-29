var User = require('../models/user');
var crypto = require('crypto');
var Post = require('../models/post');

exports.index = function(req, res){
    Post.find({}, function(err, posts){
        if(err){
            req.session.message = err.message;
            return res.redirect('/');
        }
        res.render('index', {
            title : '首页',
            layout : 'layout'
        });
    });
};
exports.user = function(req, res){
    console.log("000000000000000000000000 Clik User");
    res.render('index', {
        title : '首页1111',
        layout : 'layout'
    });
};
exports.post = function(req, res){
    console.log("post click");
    var currentUser = req.session.user;
    var post = new Post({
        username : currentUser.name,
        article : req.body.article,
        time : getTime(new Date())
    });
    post.addPost(post, function(err){
        if(err){
            req.session.message = err.message;
            return res.redirect('/users/' + req.params.username);
        }
        req.session.success = "发表成功";
        res.setHeader('content-type', 'text/html;charset=utf-8');
        console.log("success Post");
        console.log(encodeURIComponent("/users/" + currentUser.name));

        res.redirect("/users/" + encodeURIComponent(currentUser.name));
    });

};
exports.Reg = function(req, res){
    res.render('reg', {
        title : '用户注册',
        layout : 'layout'
    });
};
exports.doReg = function(req, res){
    if(req.body['password-repeat'] != req.body['password']){
        req.session.error = "密码输入不一致";
        return res.redirect('/reg');
    }
    User.find({name : req.body.username}, function(err, docs){
        if(docs.length > 0){
            var str = "<a href='/reg'>查找ID已经存在请重新输入</a><br />";
            res.send(str);
        }
        else {
            var newUser = new User();
            newUser.addUser({
                name : req.body.username,
                password : req.body['password'],
            }, function(err){
                if(!err){
                    req.session.user = newUser;
                    req.session.success = "注册成功";

                    res.redirect('/');
                }

            });
        }
    });

    // //生成口令的散列值
    // var md5 = crypto.createHash('md5');
    // var password = md5.update(req.body.password).digest('base64');
    // User.get(req.body.username, function(err, user){
    //     if(!user){
    //         req.flash('error', '用户不存在');
    //         return res.redirect('/login');
    //     }
    //     if(user.password != password){
    //         req.flash('error', '用户口令错误');
    //         return res.redirect('/login');
    //     }
    //     req.session.user = user;
    //     req.flash('success', '登入成功');
    //     res.redirect('/');
    // });
};
// 登陆
exports.Login = function(req, res){
    res.render('login', {
        title : '用户登陆',
        layout : 'layout',
    });
};
exports.doLogin = function(req, res){
    User.findOne({name : req.body.username}, function(err, finduser){
        if(err){
            console.log(err);
            return;
        }
        else if(finduser != null){
            if(finduser.password == req.body.password){
                req.session.user = finduser;
                req.session.success = "登陆成功";

                // res.locals.user = finduser;
                // res.locals.success = "登陆成功";
                res.redirect('/');
            }
            else {
                req.session.error = "密码输入错误";
                res.redirect('/');
            }
        }
    });
};
// 退出登陆
exports.Logout = function(req, res){
    req.session.user = 'undefined';
    res.redirect('/');
};


function getTime(date){
    return date.getFullYear() +
        "-" + date.getMonth() + 1 + "-" +
        date.getDate() + " " +
        date.getHours() + ":" +
        date.getMinutes();
}
