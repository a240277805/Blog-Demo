/**
 * Created by zmk on 2016/9/30.
 */
var express = require('express');
var router = express.Router();
var Post = require('../models/post');

/* delete posts. */
router.get('/delete/:_id', function(req, res, next){
    console.log("posts delete start Enter");
    if(req.params._id == null){
        req.session.message = "删除的 微博不存在";
        //重定向个人信息页
        res.redirect("/users/" + encodeURIComponent(req.session.user.name));
    } else {
        Post.remove({_id : req.params._id}, function(err, docs){

            if(err){
                req.session.message = err.message;
            } else {
                req.session.success = "成功删除"+ docs.result.n+ "条数据！";
            }
            //删除成功，重定向个人信息页
            res.redirect("/users/" + encodeURIComponent(req.session.user.name));
        });
    }
})
;

module.exports = router;
