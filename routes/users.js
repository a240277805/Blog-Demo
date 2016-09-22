var express = require('express');
var router = express.Router();
var Post = require('../models/post');

/* GET users listing. */
router.get('/:username', function(req, res, next){
    console.log("users Entered");
    if(req.params.username == null || req.session.user.name != req.params.username){
        req.session.message = "用户不存在";
        return res.redirect('/');
    }

    Post.find({username : req.params.username}, function(err, posts){

        if(err){
            req.session.message = err.message;
            return res.redirect('/');
        }
        res.render('user', {
            title : "发表文章",
            thename : req.params.username,
            username : req.params.user,
            posts : posts
        });
    });
})
;

module.exports = router;
