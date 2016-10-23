var express = require('express');
var router = express.Router();
var Post = require('../models/post');

/* GET users listing. */
router.get('/:username', function(req, res, next){
    console.log("users Entered");
    if(req.params.username == null){
        req.session.message = "用户不存在";
        return res.redirect('/');
    }

    Post.find({username : req.params.username}, function(err, posts){

        if(err){
            req.session.message = err.message;
            return res.redirect('/');
        }
        var maxshowcount = 0;
        if(posts.length > 9){
            maxshowcount = 9;
        }
        else {
            maxshowcount = posts.length;
        }
        var ishost=req.params.username==req.session.user.name;
        res.render('information', {
            title : "发表文章",
            thename : req.params.username,
            ishost:ishost,
            maxshowcount : maxshowcount,
            posts : posts
        });
    });
})
;

module.exports = router;
