var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/reg', function(req, res){
    res.render('reg', {
        title : '用户注册',
        layout : 'layout'
    });
});
router.post('/reg', function(req, res){
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
});


module.exports=router;
