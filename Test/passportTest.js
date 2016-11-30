var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
//User模型需自己实现
var User = require('../models/user');
var bcrypt = require('bcrypt');

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

//这里的username可以改成前端表单对应的命名，如：
// <form><input type="text" name="hehe">...</form>
//则这里将所有的username改为hehe
passport.use(new LocalStrategy({ usernameField: 'username' }, function(username, password, done) {
    //实现用户名或邮箱登录
    //这里判断提交上的username是否含有@，来决定查询的字段是哪一个
    var criteria = (username.indexOf('@') === -1) ? {username: username} : {email: username};
    User.findOne(criteria, function(err, user) {
        if (!user) return done(null, false, { message: '用户名或邮箱 ' + username + ' 不存在'});
        bcompare(password, hash, function(err, isMatch) {
            if (isMatch) {
                return done(null, user);
            } else {
                return done(null, false, { message: '密码不匹配' });
            }
        });
    });
}));

...

app.use(cookieParser());
app.use(session({secret: "need change"}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

...

app.post('/login', passport.authenticate('local', function(err, user, info) {
        if (err) return next(err);
        if (!user) {
            req.flash('errors', { msg: info.message });
            return res.redirect('/login');
        }
        req.logIn(user, function(err) {
            if (err) return next(err);
            req.flash('success', { msg: '登录成功！' });
            res.redirect('/');
        });
    })(req, res, next)
);
//这里getUser方法需要自定义
app.get('/user', isAuthenticated, getUser);
app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

//将req.isAuthenticated()封装成中间件
var isAuthenticated = function(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/login');
};

var bcompare = function (str, hash, callback) {
    bcrypt.compare(str, hash, callback);
};
