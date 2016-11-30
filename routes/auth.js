/**
 * Created by zmk on 2016/11/3.
 */
var express = require('express');
var router = express.Router();
var User = require('../models/user');

var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
        usernameField : 'username',//页面上的用户名字段的name属性值
        passwordField : 'password'//页面上的密码字段的name属性值
    },
    function(uname, password, done){
        console.log("enter line myrouter 14 username:" + uname + "password:" + password);
        // done(null,false,{message:'用户名不存在'});
        User.findOne({name : uname}, function(err, user){

            if(err){
                return done(err);
            }
            else if(!user){
                return done(null, false, {message : 'Id o contraseña incorrectos'});
            }
            else if(!user.validPassword(password)){
                return done(null, false, {message : 'Id o contraseña incorrectos'});
            }
            else {
                //  console.log("find user"+user)
                return done(null, user);
            }
        });
    }));

passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        done(err, user);
    });
});

router.get('/login', function(req, res){
    res.render('login', {
        title : '用户登陆',
        layout : 'layout'
    });
});

router.post('/login',
    passport.authenticate('local',
        {
            passReqToCallback : true,
            failureFlash : 'Invalid username or password.',
            failureRedirect : '/login',
            failureFlash : true
        }),
    function(req, res){
        req.session.user = req.user;
        req.session.success = "登陆成功";
        // 验证成功则调用此回调函数
        res.redirect('/');
    });
router.get('/logout', function(req, res){
    req.session.user = 'undefined';
    res.redirect('/');
});

module.exports = router;
